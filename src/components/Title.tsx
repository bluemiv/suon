import { TPropsWithChildren } from '@/types';

interface TProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function Title({ children, size = 'md' }: TPropsWithChildren<TProps>) {
  return (
    <div
      className={[
        'font-semibold',
        {
          sm: 'text-md',
          md: 'text-lg',
          lg: 'text-2xl',
        }[size],
      ]
        .filter((v) => !!v)
        .join(' ')}
    >
      {children}
    </div>
  );
}
