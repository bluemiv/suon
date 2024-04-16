import { ReactNode } from 'react';
import Link from 'next/link';
import Copyright from '@/components/Layout/Footer/Copyright';
import { Icons } from '@/components';

export default function Footer() {
  return (
    <footer className="h-footer px-lg py-md text-center flex flex-col gap-md">
      <Copyright />
      <div className="flex items-center justify-center gap-lg text-sm">
        {(
          [
            {
              label: 'Github',
              href: process.env.NEXT_PUBLIC_GITHUB_URL,
              icon: <Icons.Github />,
            },
          ] as { label: string; href: string; icon: ReactNode }[]
        )
          .filter((v) => !!v.href)
          .map(({ label, href, icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-sm hover:text-primary-hover active:text-primary-active"
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
      </div>
    </footer>
  );
}
