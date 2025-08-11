'use client';
import NavbarSearch from './NavbarSearch';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="w-screen bg-transparent h-[4rem] flex flex-row justify-between px-10 items-center">
      <div className="flex flex-row gap-4">
        <Link className="cursor-pointer" href="/"> Home </Link>
        <Link className="cursor-pointer" href="/info"> About </Link>
      </div>

      <NavbarSearch></NavbarSearch>
    </div>
  );
};

export default Navbar;
