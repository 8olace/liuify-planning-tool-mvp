import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to Liuify Planning Tool MVP</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Getting Started</h3>
          <p className="text-gray-600 text-sm mb-4">
            Welcome to Liuify Planning Tool MVP. Start by managing your guards and shifts.
          </p>
          <ul className="text-sm text-gray-600 space-y-2 mb-4">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Add guards to your system
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Create shifts and assign locations
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              Manage assignments and availability
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Setup Complete</h3>
          <p className="text-gray-600 text-sm mb-4">
            Your Supabase environment is configured and ready to use:
          </p>
          <div className="bg-gray-50 p-3 rounded text-xs font-mono text-gray-700 mb-4">
            <div className="mb-1">✓ NEXT_PUBLIC_SUPABASE_URL</div>
            <div>✓ NEXT_PUBLIC_SUPABASE_ANON_KEY</div>
          </div>
          <p className="text-xs text-green-600">All systems operational</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Quick Actions</h3>
          <div className="space-y-2">
            <Link href="/guards">
              <Button variant="outline" className="w-full justify-start text-sm">
                → Manage Guards
              </Button>
            </Link>
            <Link href="/shifts">
              <Button variant="outline" className="w-full justify-start text-sm">
                → Manage Shifts
              </Button>
            </Link>
            <Link href="/locations">
              <Button variant="outline" className="w-full justify-start text-sm">
                → Manage Locations
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
