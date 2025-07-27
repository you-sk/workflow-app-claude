import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
          <p className="mt-2 text-gray-600">ようこそ、{session.user.name || session.user.email}さん</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">申請一覧</h3>
              <p className="mt-1 text-sm text-gray-500">
                あなたが作成した申請を確認できます
              </p>
              <div className="mt-3">
                <a href="/applications" className="text-primary hover:text-primary/80 font-medium">
                  申請を見る →
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">承認待ち</h3>
              <p className="mt-1 text-sm text-gray-500">
                あなたの承認を待っている申請があります
              </p>
              <div className="mt-3">
                <a href="/approvals" className="text-primary hover:text-primary/80 font-medium">
                  承認待ちを見る →
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">新規申請</h3>
              <p className="mt-1 text-sm text-gray-500">
                新しい申請を作成します
              </p>
              <div className="mt-3">
                <a href="/applications/new" className="text-primary hover:text-primary/80 font-medium">
                  申請を作成 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}