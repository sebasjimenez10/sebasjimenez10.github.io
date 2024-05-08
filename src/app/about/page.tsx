import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpeg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'I\'m Sebastian Jimenez. I live in California, where I write software bringing ideas to life.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I'm Sebastian Jimenez. I live in California, where I write software bringing ideas to life.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              From an early age, I loved exploring the world through creativity and technology.
              It wasn't until high school, however, that I wrote my first lines of code, building websites using FrontPage and other tools.
              This initial foray into programming sparked a lifelong passion for problem-solving and software development.
            </p>
            <p>
              Music played a key role in my creative journey as well.
              By the time I graduated, I wasn't just building websites but also drumming, combining the rhythms of code with the beats of music.
              This duality shaped my creative drive, pushing me to explore and innovate across both domains.
            </p>
            <p>
              After gaining extensive experience as a software engineer, working with a myriad of technologies from Ruby on Rails to GraphQL,
              I started experimenting with different business ideas. Constantly pivoting, I'm on a mission to carve my path to entrepreneurship
              and establish my own company one day. I aspire to build transformative solutions that blend technical excellence with creative impact.
            </p>
            <p>
              Today, I continue blending logic and creativity, ensuring that each project functions seamlessly and resonates on a deeper level.
              My ultimate goal is not just to innovate, but to inspire — whether it's through a software and open source or music.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://twitter.com/sbstnjmnzv" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink href="https://github.com/sebasjimenez10" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/sebasjimenezv/" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            {/* <SocialLink href="#" icon={InstagramIcon} className="mt-4">
              Follow on Instagram
            </SocialLink> */}
            {/* <SocialLink
              href="mailto:sebasjimenezv@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              spencer@planetaria.tech
            </SocialLink> */}
          </ul>
        </div>
      </div>
    </Container>
  )
}
