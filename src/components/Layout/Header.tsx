import { Button } from '@/components';

export default function Header() {
  return (
    <header className="h-[60px] p-md border-b flex items-center justify-between">
      <Button type="link" href="/">
        SUON
      </Button>
      <div>
        <nav></nav>
      </div>
    </header>
  );
}
