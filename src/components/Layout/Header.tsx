import { Button } from '@/components';

export default function Header() {
  return (
    <header className="h-[60px] p-md shadow flex items-center justify-between">
      <Button type="link" href="/">
        SUON
      </Button>
      <div>
        <nav></nav>
      </div>
    </header>
  );
}
