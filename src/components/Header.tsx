import React from "react";
import MaxWidthWrapper from "./MaxwidthWrapper";
import Link from "next/link";
import { ModeToggle } from "./ToggleButton";

const Header = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b dark:border-gray-700 border-gray-200 dark:bg-gray-900 bg-white/75 backdrop-blur-lg transition-all ">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between  ">
          <Link
            href="/"
            className="flex z-40 font-semibold dark:text-zinc-950 "
          >
            <span className="dark:text-white">ChartCrafters</span>
          </Link>
          <ModeToggle/>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Header;
