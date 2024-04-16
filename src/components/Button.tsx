'use client';

import Link from 'next/link';
import { TPropsWithBasic } from '@/types';

interface TProps {
  type: 'link';
  href?: string;
}

export default function Button({ type, href, className, children }: TPropsWithBasic<TProps>) {
  if (type === 'link')
    return (
      <Link
        href={href!}
        className={[className, 'text-primary hover:text-primary-hover active:text-primary-active']
          .filter((v) => !!v)
          .join(' ')}
      >
        {children}
      </Link>
    );

  return (
    <button
      className={[className, 'text-primary hover:text-primary-hover active:text-primary-active']
        .filter((v) => !!v)
        .join(' ')}
    >
      {children}
    </button>
  );
}
