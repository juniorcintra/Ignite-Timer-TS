import { Cycle } from "../@types";

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export enum CyclesActionType {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
  MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED",
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case CyclesActionType.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload],
        activeCycleId: action.payload.id,
      };

    case CyclesActionType.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      };

    case CyclesActionType.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      };

    default:
      return state;
  }
}
