import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getBoardById(boardId: number): Promise<Board> {
    const found = await this.boardRepository.findOne({
      where: { id: boardId },
    });
    if (!found) {
      throw new NotFoundException(`Can not find board with id ${boardId}`);
    }
    return found;
  }
}
