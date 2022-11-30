import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardRepository } from "./board.repository";
import { BoardStatusValue } from "./boardStatus.type";
import { User } from "src/auth/user.entity";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository
  ) {}
  async getAllBoards() {
    return await this.boardRepository.getAllBoards();
  }

  async getBoardById(id: number) {
    return await this.boardRepository.getBoardById(id);
  }
  async createBoard(createBoardDto: CreateBoardDto, user: User) {
    return await this.boardRepository.createBoard(createBoardDto, user);
  }
  async updateBoardStatus(id: number, status: BoardStatusValue) {
    return await this.boardRepository.updateBoardStatus(id, status);
  }
  async deleteBoard(id: number) {
    return await this.boardRepository.deleteBoard(id);
  }
}
