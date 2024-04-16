import { Layout } from '@/components';

export default function Template() {
  return (
    <div className="flex flex-col min-h-screen">
      <Layout.Header />
      <main className="flex-1"></main>
      <Layout.Footer />
    </div>
  );
}
