import Link from "next/link";
import { getCategories, type WikiPage } from "@/lib/wiki";

interface SidebarProps {
  pages: WikiPage[];
  currentSlug?: string;
}

export function Sidebar({ pages, currentSlug }: SidebarProps) {
  const categories = getCategories(pages);
  const rootPages = pages.filter((p) => !p.category);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">
        知识库导航
      </h2>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">分类</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {cat}
                </span>
                <ul className="ml-3 mt-1 space-y-1">
                  {pages
                    .filter((p) => p.category === cat)
                    .map((page) => (
                      <li key={page.slug}>
                        <Link
                          href={`/wiki/${page.slug}`}
                          className={`text-sm block py-0.5 ${
                            page.slug === currentSlug
                              ? "text-blue-700 font-semibold"
                              : "text-blue-600 hover:text-blue-800 hover:underline"
                          }`}
                        >
                          {page.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Root pages */}
      {rootPages.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">其他页面</h3>
          <ul className="space-y-1">
            {rootPages.map((page) => (
              <li key={page.slug}>
                <Link
                  href={page.slug === "INDEX" ? "/" : `/wiki/${page.slug}`}
                  className={`text-sm block py-0.5 ${
                    (currentSlug === page.slug || (!currentSlug && page.slug === "INDEX"))
                      ? "text-blue-700 font-semibold"
                      : "text-blue-600 hover:text-blue-800 hover:underline"
                  }`}
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
