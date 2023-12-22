import { NotFoundException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { BoardStatusValue } from "./boardStatus.type";
import { CreateBoardDto } from "./dto/createBoard.dto";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async getBoardById(id: number) {
    const found = await this.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Can not found board with id ${id}`);
    }
    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto, user: User) {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: "PUBLIC",
      user
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

  async deleteBoard(id: number, user: User) {
    const result = await this.delete({ id, user: { id: user.id } });
    if (result.affected === 0) {
      throw new NotFoundException(`Can not found board with id ${id}`);
    }
  }
}
