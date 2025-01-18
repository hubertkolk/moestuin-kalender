import './globals.css'
import { Inter, Fredoka } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const fredoka = Fredoka({ subsets: ['latin'] })

export const metadata = {
  title: 'Moestuin in je agenda',
  description: 'Genereer een zaaikalender voor je moestuin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={`${inter.className} ${fredoka.className}`}>
        <header className="bg-green-600 text-white p-4 text-center">
          <h1 className="text-2xl font-bold">Moestuin in je agenda</h1>
        </header>
        {children}
      </body>
    </html>
  )
}

