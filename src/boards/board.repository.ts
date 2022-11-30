import { NotFoundException } from "@nestjs/common";
import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { BoardStatusValue } from "./boardStatus.type";
import { CreateBoardDto } from "./dto/createBoard.dto";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async getAllBoards() {
    return await this.find();
  }

  async getBoardById(id: number) {
    const found = await this.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Can not found board with id ${id}`);
    }
    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: "PUBLIC"
    });
    await this.save(board);
    return board;
  }

  async updateBoardStatus(id: number, status: BoardStatusValue) {
    const board = await this.getBoardById(id);
    board.status = status;
    this.save(board);
    return board;
  }

  async deleteBoard(id: number) {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can not found board with id ${id}`);
    }
  }
}
