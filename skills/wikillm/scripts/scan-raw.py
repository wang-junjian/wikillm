#!/usr/bin/env python3
"""WikiLLM 增量扫描：对比 raw/ 与 wiki/compile-results.tsv，输出编译范围。

用法：
    python3 -I skills/wikillm/scripts/scan-raw.py          # 只读扫描，输出四类清单
    python3 -I skills/wikillm/scripts/scan-raw.py --write  # 回写真实 hash 并记录日志

输出四类清单：新增 / 已修改 / 未变更 / 已删除。
另检查 raw/images/ 内图片 basename 冲突（web 端按文件名扁平服务，冲突即覆盖）。
"""

import argparse
import csv
import hashlib
import sys
from datetime import date
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[3]
RAW_DIR = REPO_ROOT / "raw"
IMAGES_DIR = RAW_DIR / "images"
LEDGER = REPO_ROOT / "wiki" / "compile-results.tsv"
LOG = REPO_ROOT / "wiki" / "compile.log"

LEDGER_FIELDS = ["raw_path", "hash", "last_modified", "wiki_paths", "compile_time", "status"]
HASH_PREFIX = "sha256:"


def sha256_of(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            digest.update(chunk)
    return HASH_PREFIX + digest.hexdigest()


def load_ledger() -> dict[str, dict[str, str]]:
    """raw_path -> 行记录。台账不存在时返回空。"""
    if not LEDGER.exists():
        return {}
    with LEDGER.open(newline="", encoding="utf-8") as f:
        return {row["raw_path"]: row for row in csv.DictReader(f, delimiter="\t")}


def write_ledger(rows: dict[str, dict[str, str]]) -> None:
    with LEDGER.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=LEDGER_FIELDS, delimiter="\t", lineterminator="\n")
        writer.writeheader()
        for raw_path in sorted(rows):
            writer.writerow(rows[raw_path])


def check_image_conflicts() -> list[tuple[str, list[str]]]:
    """按 basename 分组，返回有冲突的 (basename, [相对路径...]) 列表。"""
    if not IMAGES_DIR.is_dir():
        return []
    by_name: dict[str, list[str]] = {}
    for path in IMAGES_DIR.rglob("*"):
        if path.is_file():
            by_name.setdefault(path.name, []).append(str(path.relative_to(REPO_ROOT)))
    return sorted((name, paths) for name, paths in by_name.items() if len(paths) > 1)


def main() -> int:
    parser = argparse.ArgumentParser(description="WikiLLM raw/ 增量扫描")
    parser.add_argument("--write", action="store_true", help="回写真实 hash 到台账并追加 compile.log")
    args = parser.parse_args()

    ledger = load_ledger()
    raw_files = sorted(p for p in RAW_DIR.glob("*.md") if p.is_file())

    added, modified, unchanged, deleted = [], [], [], []
    hashes: dict[str, str] = {}
    for path in raw_files:
        raw_path = str(path.relative_to(REPO_ROOT))
        digest = sha256_of(path)
        hashes[raw_path] = digest
        record = ledger.get(raw_path)
        if record is None:
            added.append(raw_path)
        elif record["hash"] != digest:
            modified.append(raw_path)
        else:
            unchanged.append(raw_path)
    deleted = sorted(set(ledger) - {str(p.relative_to(REPO_ROOT)) for p in raw_files})

    print(f"## 新增（{len(added)}）")
    for p in added:
        print(f"  {p}")
    print(f"## 已修改（{len(modified)}）")
    for p in modified:
        marker = "（占位 hash）" if not ledger[p]["hash"].startswith(HASH_PREFIX) or ledger[p]["hash"] == "sha256:initial" else ""
        print(f"  {p} {marker}".rstrip())
    print(f"## 未变更（{len(unchanged)}）")
    for p in unchanged:
        print(f"  {p}")
    print(f"## 已删除（{len(deleted)}）")
    for p in deleted:
        print(f"  {p}")

    conflicts = check_image_conflicts()
    print(f"## 图片 basename 冲突（{len(conflicts)}）")
    for name, paths in conflicts:
        print(f"  {name}: {', '.join(paths)}")

    if args.write:
        today = date.today().isoformat()
        fixed = 0
        for raw_path, digest in hashes.items():
            record = ledger.get(raw_path)
            if record is not None and record["hash"] != digest:
                record["hash"] = digest
                fixed += 1
        write_ledger(ledger)
        with LOG.open("a", encoding="utf-8") as f:
            f.write(f"{today} scan-raw --write: 回写 {fixed} 条真实 hash；"
                    f"新增 {len(added)}，已修改 {len(modified)}，未变更 {len(unchanged)}，已删除 {len(deleted)}\n")
        print(f"## 已回写 {fixed} 条真实 hash 到 {LEDGER.relative_to(REPO_ROOT)}")

    # 有图片冲突时非零退出：必须先重命名再同步 assets
    return 1 if conflicts else 0


if __name__ == "__main__":
    sys.exit(main())
