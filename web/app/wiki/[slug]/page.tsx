import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPages, getPageBySlug, type WikiPage as WikiPageType } from "@/lib/wiki";
import { Sidebar } from "@/components/Sidebar";

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function WikiPageComponent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const allPages = await getAllPages();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">
              WikiLLM
            </Link>
            <nav className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                首页
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Sidebar pages={allPages} currentSlug={slug} />
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-sm p-8">
              {/* Page header */}
              <header className="mb-8 border-b border-gray-200 pb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {page.title}
                </h1>
                {page.frontmatter.last_updated && (
                  <p className="text-sm text-gray-500">
                    最后更新: {String(page.frontmatter.last_updated)}
                  </p>
                )}
                {page.frontmatter.tags && page.frontmatter.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {page.frontmatter.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Page content */}
              <div
                className="prose-wikillm"
                dangerouslySetInnerHTML={{ __html: page.html }}
              />
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
