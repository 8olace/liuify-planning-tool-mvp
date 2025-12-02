import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata = {
  title: 'Liuify Planning Tool MVP',
  description: 'Planning tool for Liuify',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <Navigation />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
