import Link from "next/link";
import React from "react";
import { useData } from "@/app/DataContext";
import { DisplayName } from "@/enums";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import styles from '@/Graph.module.css'

const GraphHeader = () => {
  const { graphData } = useData();

  if (!graphData) {
    return null;
  }
  console.log("graphData", graphData);

  return (
    <div className="mb-4 px-2 py-1 flex  items-center justify-center   rounded-md bg-slate-300 dark:bg-stone-50 ">
      <Link
        className="group flex items-center"
        href={`https://github.com/${graphData?.login}`}
        target="_blank"
      >
        <span className="mr-3 flex items-center">
          <Avatar>
        
            <AvatarImage 
             
            src={graphData?.data?.githubUser?.avatarUrl} />
            <AvatarFallback>TT</AvatarFallback>
          </Avatar>
        </span>
        <span
          className="text-xl font-bold group-hover:underline dark:text-slate-950"
          translate="no"
        >
        
          {
                
          graphData?.data?.githubUser?.name}
        </span>
      </Link>

      <div className="ml-auto flex items-center text-xs dark:text-slate-950">
        <span>Less</span>
        <ul className={`${styles["grids"]} mx-2 grid grid-cols-5 gap-[3px]`}>
          <li className="day h-3 w-3" data-level="0" />
          <li className="day h-3 w-3" data-level="1" />
          <li className="day h-3 w-3" data-level="2" />
          <li className="day h-3 w-3" data-level="3" />
          <li className="day h-3 w-3" data-level="4" />
        </ul>
        <span>More</span>
      </div>
    </div>
  );
};

export default GraphHeader;
