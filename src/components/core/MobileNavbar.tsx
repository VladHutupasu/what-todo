import { HomeIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function MobileNavbar({ plusCliked }: { plusCliked?: () => void }) {
  return (
    <div className="md:hidden btm-nav text-primary bg-transparent backdrop-blur-lg">
      <button>
        <Link href="/">
          <HomeIcon className="w-5 h-5" />
        </Link>
      </button>

      <button onClick={plusCliked}>
        <PlusIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
