"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { logoutCookie } from "../../(auth)/logout";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt != null) {
      setIsLogin(true);
      const userRole = localStorage.getItem("userRole");
      if (userRole == "ADMIN") {
        setIsAdmin(true);
      }
    }
  }, []);

  function logoutAction() {
    console.log("going to clear cookie");

    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");

    logoutCookie();

    console.log("token" + localStorage.getItem("jwt"));
    console.log("role" + localStorage.getItem("userRole"));

    setIsLogin(false);
    window.location.href = "/";
  }

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="pl-7 p-3 w-[230px]">
          <Link href="/">
            <Image src="/logo_fc.png" width={230} height={53} alt="FC Logo" />
          </Link>
        </div>

        <div className=" flex-1 pr-2">
          <ul className="menu menu-horizontal px-1 flex justify-end items-center w-full">
            {isAdmin && (
              <>
                <li className="px-5">
                  <Link href="/usermanagement" className="text-base">
                    Users
                  </Link>
                </li>
                <li className="px-5">
                  <Link href="/module" className="text-base">
                    Module
                  </Link>
                </li>
              </>
            )}
            <li className="px-5">
              <Link href="/procedure" className="text-base">
                Procedures
              </Link>
            </li>
            <li className="px-5">
              <Link href="/form" className="text-base">
                Forms
              </Link>
            </li>
            {/* <li className="px-5">
              <a className="text-base">Inquiries</a>
            </li> */}
            <li className="px-5">
              {!isLogin ? (
                <Link href="/login" className="text-base">
                  Login
                </Link>
              ) : (
                <button className="px-5 text-base" onClick={logoutAction}>
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
