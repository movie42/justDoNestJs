import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { BoardRepository } from "./board.repository";
import { BoardStatusValue } from "./boardStatus.type";
import { CreateBoardDto } from "./dto/createBoard.dto";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository
  ) {}
  async getAllBoards(user: User) {
    const query = this.boardRepository.createQueryBuilder("board");
    query.where("board.userId = :userId", { userId: user.id });
    const board = await query.getMany();
    return board;
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
  async deleteBoard(id: number, user: User) {
    return await this.boardRepository.deleteBoard(id, user);
  }
}
