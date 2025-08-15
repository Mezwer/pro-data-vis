'use client';
import NavbarSearch from './NavbarSearch';
import Link from 'next/link';

const Navbar = () => {
  const showSearch = window.location.pathname !== '/';

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
