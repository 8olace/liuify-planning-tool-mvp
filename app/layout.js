import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata = {
  title: 'Liuify Planning Tool MVP',
  description: 'Planning tool for Liuify',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="flex min-h-screen">
          <Navigation />
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
