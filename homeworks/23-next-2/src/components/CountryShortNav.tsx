import { Button } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { JSX } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

export default function CountryShortNav(): JSX.Element {
  const router = useRouter();
  return (
    <div className="mb-3 gap-3 sm:mb-6 grid sm:flex items-center justify-between">
      <Link href="/">
        <Button color="gray" size="sm" className="cursor-pointer">
          <FaArrowLeft className="mr-2 h-3 w-3" />
          Back to All Countries
        </Button>
      </Link>
      <Button
        onClick={() => router.push('/random')}
        color="blue"
        size="sm"
        className="cursor-pointer"
      >
        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Random Country
      </Button>
    </div>
  );
}
