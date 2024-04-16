import { Layout } from '@/components';
import { TPropsWithChildren } from '@/types';

export default function Template({ children }: TPropsWithChildren) {
  return (
    <div className="flex flex-col min-h-screen">
      <Layout.Header />
      {children}
      <Layout.Footer />
    </div>
  );
}
