import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import { Cycle, CreateCycleData } from "../@types";
import { CyclesActionType, cyclesReducer } from "../reducers/cycles";

interface CyclesContextTypeProps {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  handleSetSecondsPassed: (value: number) => void;
  createCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextTypeProps);

export const useCycles = () => {
  const context = useContext(CyclesContext);

  if (!context) {
    throw new Error("useCycles deve ser usado dentro de um CyclesProvider");
  }

  return context;
};

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const { activeCycleId, cycles } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function handleSetSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: CyclesActionType.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: activeCycleId,
    });
  }

  function createCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    dispatch({ type: CyclesActionType.ADD_NEW_CYCLE, payload: newCycle });
    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch({
      type: CyclesActionType.INTERRUPT_CURRENT_CYCLE,
      payload: activeCycleId,
    });
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        handleSetSecondsPassed,
        createCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
