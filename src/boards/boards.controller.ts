import { Controller, Get, Param } from '@nestjs/common';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/:boardId')
  getBoardById(@Param('boardId') boardId: number): Promise<Board> {
    return this.boardsService.getBoardById(boardId);
  }
  // @Post('/')
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }
  // @Patch('/:boardId/status')
  // updateBoardStatus(
  //   @Param('boardId') boardId: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(boardId, status);
  // }
  // @Delete('/:boardId')
  // deleteBoard(@Param('boardId') boardId: string): void {
  //   this.boardsService.deleteBoard(boardId);
  // }
}
