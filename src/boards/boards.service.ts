import { Injectable } from "@nestjs/common";
import { Board, BoardStatusValue } from "./board.model";
import { v1 as uuid } from "uuid";
import { CreateBoardDto } from "./dto/createBoard.dto";

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards() {
    return this.boards;
  }

  getBoardById(id: string) {
    return this.boards.find((board) => board.id === id);
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: "PUBLIC"
    };

    this.boards.push(board);
    return board;
  }

  updateBoardStatus(id: string, status: BoardStatusValue) {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }

  deleteBoard(id: string) {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
}
