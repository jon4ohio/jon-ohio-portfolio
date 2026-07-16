'use client'

import { usePathname } from 'next/navigation'
import CommandPalette from './CommandPalette'
import Footer from './Footer'
import Nav from './Nav'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const isLanding = path === '/anchor' || path.startsWith('/anchor/')
  return (
    <>
      {!isLanding && <Nav />}
      <main id="main">{children}</main>
      {!isLanding && <Footer />}
      {!isLanding && <CommandPalette />}
    </>
  )
}
