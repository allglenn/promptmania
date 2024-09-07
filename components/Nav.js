"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getProviders, signIn, signOut } from "next-auth/react";

const Nav = () => {
  const [session, setSession] = useState(null);
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const providerList = await getProviders();
      setProviders(providerList);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="flex-between w-full p-4 mb-16">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="promptopia logo"
          width={30}
          height={30}
          className="cursor-pointer object-contain"
        />
        <h1 className="text-xl font-bold cursor-pointer logo_text">
          Promptopia
        </h1>
      </Link>
      {/* Mobile Navigation */}
      <div className="sm:flex hidden gap-4">
        {/* If user is logged in */}
        {session?.user ? (
          <div className="flex gap-4 items-center md:gap-5">
            {/* connected menu */}
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>
            <button className="outline_btn" onClick={() => signOut()}>
              Logout
            </button>
            <Link href="/profile" className="nav_link">
              <Image
                src="/assets/images/logo.svg"
                alt="user profile"
                width={30}
                height={30}
                className="cursor-pointer object-contain"
                onClick={() => setToggleDropdown((prev) => !prev)}
              />
            </Link>
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  className="outline_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </button>
              ))}
          </div>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex gap-4 relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              alt="menu"
              width={30}
              height={30}
              className="cursor-pointer object-contain"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
                console.log(toggleDropdown);
              }}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Profile
                </Link>
                <button
                  className="dropdown_link outline_btn mt-5"
                  onClick={() => {
                    signOut();
                    setToggleDropdown(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  className="outline_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </button>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
