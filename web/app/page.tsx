import Link from "next/link";
import { getAllPages } from "@/lib/wiki";
import { Sidebar } from "@/components/Sidebar";

export default async function Home() {
  const pages = await getAllPages();
  const indexPage = pages.find(p => p.slug === "INDEX");

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
            <Sidebar pages={pages} />
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {indexPage ? (
                <div
                  className="prose-wikillm"
                  dangerouslySetInnerHTML={{ __html: indexPage.html }}
                />
              ) : (
                <div>
                  <h1 className="text-3xl font-bold mb-6 text-gray-900">
                    欢迎来到 WikiLLM 知识库
                  </h1>
                  <p className="text-gray-600 mb-4">
                    请从侧边栏选择一个页面开始浏览。
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
