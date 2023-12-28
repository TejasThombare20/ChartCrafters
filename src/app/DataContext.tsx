"use client"
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
} from "react";

import { GraphData , GraphSettings } from "@/Types/types";
import { useGraphSetting } from "@/useGraphSetting";

type DispatchSettings = ReturnType<typeof useGraphSetting>[1]

interface SettingContextData {
    graphData: GraphData | undefined
    setGraphData: Dispatch<SetStateAction<GraphData | undefined>>
    settings: GraphSettings
    dispatchSettings: DispatchSettings
    firstYear: string | undefined
    lastYear: string | undefined
  }

  const Setting = createContext({} as SettingContextData);
  
  export function DataProvider(props: React.PropsWithChildren) {
      const { children } = props;
      
  const [graphData, setGraphData] = useState<GraphData>();
  const [settings, dispatchSettings] = useGraphSetting()

  const firstYear = graphData?.contributionYears?.at(-1)?.toString();
  const lastYear = graphData?.contributionYears?.at(0)?.toString();

  return (
    <Setting.Provider
    value={{ graphData, settings, dispatchSettings, firstYear, lastYear ,setGraphData }}>
      {children}
    </Setting.Provider>
  );
}

export function useData(){
    return useContext(Setting)
}
