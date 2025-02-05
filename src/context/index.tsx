import { createContext, useContext } from "react";
import { Cycle } from "../@types";

interface CyclesContextTypeProps {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  handleSetSecondsPassed: (value: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextTypeProps);

export const useCycles = () => {
  const context = useContext(CyclesContext);

  if (!context) {
    throw new Error("useCycles deve ser usado dentro de um CyclesProvider");
  }

  return context;
};
