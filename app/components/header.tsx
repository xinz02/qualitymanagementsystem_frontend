import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1 pl-7 p-3">
          <Link href="/">
            <Image src="/logo_fc.png" width={230} height={53} alt="FC Logo" />
          </Link>
        </div>

        <div className="flex-none pr-2">
          <ul className="menu menu-horizontal px-1">
            <li className="px-5">
              <a className="text-base">Procedures</a>
            </li>
            <li className="px-5">
              <a className="text-base">Forms</a>
            </li>
            <li className="px-5">
              <a className="text-base">Inquiries</a>
            </li>
            <li className="px-5">
              <Link href="/login" className="text-base">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
