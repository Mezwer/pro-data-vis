'use client';
import NavbarSearch from './NavbarSearch';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const showSearch = usePathname() !== '/';

  return (
    <div className="w-screen bg-transparent h-[4rem] flex flex-row justify-between px-10 items-center">
      <div className="flex flex-row gap-4">
        <Link className="cursor-pointer" href="/">
          Home
        </Link>
        <Link className="cursor-pointer" href="/about">
          About
        </Link>
      </div>

      {showSearch && <NavbarSearch />}
    </div>
  );
};

export default Navbar;
