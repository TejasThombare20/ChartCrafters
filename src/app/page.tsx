"use client";

import Header from "@/components/Header";
import Main from "@/components/Main";
import MaxWidthWrapper from "@/components/MaxwidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { useData } from "./DataContext";
import ContributionGraph from "@/components/ContributionGraph";

export default function Home() {
  const [loading, setloading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const { graphData, setGraphData } = useData();

  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/contribution/${username}`);
      const data = await res.json();
      setGraphData(data);

      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center ">
        <div className="py-10 md:py-14">
          <h1 className="text-center text-3xl font-bold md:mx-auto md:px-20 md:text-6xl md:leading-[1.2]">
          Enter your username and witness a captivating chart showcasing your unique contributions.

          </h1>

          <div className="py-12 md:py-16">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="flex flex-col items-center justify-center gap-y-6 md:flex-row md:gap-x-5">
                <input
                  required
                  name="username"
                  placeholder="Enter Username"
                  type="text"
                  value={username}
                  className={cn(
                    "inline-block h-[2.8rem] overflow-hidden rounded-lg bg-main-100 px-5 text-center text-lg font-medium text-main-600 caret-main-500 shadow-main-300/90 outline-none transition-all duration-300 placeholder:select-none placeholder:font-normal placeholder:text-main-400 focus:bg-slate-200 focus:shadow-lg focus:shadow-slate-100 inset-1 bg-slate-50  dark:text-slate-700"
                  )}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                {/* <input
                  // ref={inputRef}
                  
                  // onFocus={() => inputRef.current?.select()}
                /> */}
                {/* <GenerateButton loading={loading} type="submit" /> */}
                <Button>Generate Graph</Button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <ContributionGraph />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
