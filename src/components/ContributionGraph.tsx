import GraphHeader from "./GraphHeader";
import { useData } from "@/app/DataContext";
import Graph from "./Graph";
import { toast } from "sonner"


const ContributionGraph = () => {
  const { graphData, settings, firstYear, lastYear } = useData();
  

  if (!graphData) {
    return 
  }
    console.log("graphData2", graphData);

  
    if(!graphData?.data?.contributionCalendars){
         toast("Invalid Username")
         return 
    }


  return (
    <div className="-mx-5 p-5 md:mx-0">
      <GraphHeader />

      <div className="flex flex-col gap-y-6 rounded-md px-4 py-2 shadow-md shadow-slate-50 border dark:border-white">
     
        { 
        graphData?.data?.contributionCalendars?.map((calender : any) => {
          let [startYear, endYear] = settings.yearRange ?? [];
          startYear =
            startYear && Number.isInteger(Number(startYear))
              ? startYear
              : firstYear;
          endYear =
            endYear && Number.isInteger(Number(endYear)) ? endYear : lastYear;

          return(
            
            <Graph key={calender.year} data={calender} />
        
          )
        })}
      </div>
    </div>
  );
};

export default ContributionGraph;
