import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div className="fixed items-center bg-black flex justify-between h-[3rem] w-full px-4 text-2xl text-neutral-100">
        <Link href="/" className="font-bold text-lg sm:text-[1.5rem]">
          Nathan&apos;s <span>Music</span> Blog
        </Link>
        <Link href="/" className="invisible sm:visible text-xl">
          (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
        </Link>
      </div>
    </header>
  );
};
export default Header;
