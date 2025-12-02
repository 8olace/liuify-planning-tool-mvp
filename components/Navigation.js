'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (href) => pathname === href

  return (
    <nav>
      <h1>Liuify</h1>
      <ul>
        <li>
          <Link
            href="/"
            className={isActive('/') ? 'active' : ''}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/guards"
            className={isActive('/guards') ? 'active' : ''}
          >
            Guards
          </Link>
        </li>
        <li>
          <Link
            href="/shifts"
            className={isActive('/shifts') ? 'active' : ''}
          >
            Shifts
          </Link>
        </li>
        <li>
          <Link
            href="/locations"
            className={isActive('/locations') ? 'active' : ''}
          >
            Locations
          </Link>
        </li>
      </ul>
    </nav>
  )
}
