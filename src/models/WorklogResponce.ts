export interface IWorklogItem {
  userCrmProfileID?: string;
  dayOfWeek: number;
  fromTime: string;
  toTime: string;
  userCrmProfile?: string | null;
  id: string;
  isActive?: boolean;
  hasConflictTime?: boolean;
  createdManualy?: boolean;
}

export interface IWorklogResponse {
  value: Array<IWorklogItem>;
}
