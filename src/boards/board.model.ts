const BoardStatus = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE"
} as const;

export type BoardStatusType = typeof BoardStatus;
export type BoardStatusKey = keyof BoardStatusType;
export type BoardStatusValue = BoardStatusType[BoardStatusKey];

export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatusValue;
}
