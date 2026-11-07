import type { NextConfig } from "next";

/**
 * Pages 部署（.github/workflows/pages.yml）用 PAGES_BASE_PATH=/wikillm 打开静态导出。
 * 不设该变量时，本地 dev / next start 仍是原来的运行时应用：rewrites + /api/assets。
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";
const pagesBuild = basePath !== "";

const nextConfig: NextConfig = {
  turbopack: {},
  // 构建期内联：markdown 渲染出的裸 URL 需要带上项目子路径
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(pagesBuild
    ? {
        output: "export" as const,
        basePath,
        trailingSlash: true,
        // 页面约定文件全是 .tsx；收窄后 app/api/.../route.ts 不参与静态导出，
        // 但本地 dev 仍由 rewrites + /api/assets 提供图片。
        pageExtensions: ["tsx"],
      }
    : {
        async rewrites() {
          return [
            {
              source: "/assets/:path*",
              destination: "/api/assets/:path*",
            },
          ];
        },
      }),
};

export default nextConfig;
