export const BoardStatus = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE"
} as const;

export type BoardStatusType = typeof BoardStatus;
export type BoardStatusKey = keyof BoardStatusType;
export type BoardStatusValue = BoardStatusType[BoardStatusKey];
