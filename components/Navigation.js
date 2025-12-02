'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (href) => pathname === href

  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/guards', label: 'Guards' },
    { href: '/shifts', label: 'Shifts' },
    { href: '/locations', label: 'Locations' },
  ]

  return (
    <nav className="w-64 bg-slate-900 text-white p-6 shadow-lg">
      <h1 className="text-2xl font-bold mb-8">Liuify</h1>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-slate-800'
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
