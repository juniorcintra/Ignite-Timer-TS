export type Cycle = {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
};

export type CreateCycleData = {
  task: string;
  minutesAmount: number;
};
