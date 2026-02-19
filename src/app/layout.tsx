import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: "Lieb's Log",
    description: 'An experiment in decoupled Drupal',
    icons: {
        other: [
            {
                rel: 'me',
                url: 'https://paullieberman.net/about'
            },
            {
                rel: 'webmention',
                url: 'https://webmention.io/paullieberman.net/webmention'
            }
        ]
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Navbar />
                <main className="p-4 mt-10 place-items-center">{children}</main>
            </body>
        </html>
    )
}
