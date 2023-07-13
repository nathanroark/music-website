import { HeartIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="max-w-md px-4 py-6 mx-auto overflow-hidden md:py-8 lg:py-12 sm:px-6 lg:px-8 ">
      <div className="flex flex-col gap-6">
        <p className="flex items-center justify-center text-lg text-zinc-400 gap-x-2">
          <Link
            href="https://github.com/nathanroark/music-website"
            target={'_blank'}
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-white decoration-dotted focus:outline-none focus:text-white rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent focus-visible:ring-text-white"
          >
            View on GitHub
          </Link>
        </p>
        <p className="flex items-center justify-center text-lg text-zinc-400 gap-x-2">
          <span>Made with</span>
          <HeartIcon aria-hidden="true" className="w-6 h-6 mx-1 text-red-500" />
          <span>by</span>
          <Link
            href="https://nathanroark.dev"
            target={'_blank'}
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-white decoration-dotted focus:outline-none focus:text-white rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-transparent focus-visible:ring-white"
          >
            Nathan Roark
          </Link>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
