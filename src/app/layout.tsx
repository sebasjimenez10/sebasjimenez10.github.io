import { type Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Sebastian Jimenez',
    default:
      'Sebastian Jimenez - Software engineer, creative thinker, drummer, and aspiring entrepreneur.',
  },
  description:
    'I\'m Sebastian, a software engineer based in Orange County, CA. I love to write software that fosters growth and unlocks opportunities.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

const isProduction = process.env.NODE_ENV === 'production';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
      { isProduction && <GoogleAnalytics gaId="G-FLBETR66QD" />}
    </html>
  )
}
