import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { BoardStatusValue } from "./board.model";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/createBoard.dto";

@Controller("boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get("/")
  getAllBoard() {
    return this.boardsService.getAllBoards();
  }

  @Get("/:id")
  getBoard(@Param("id") id: string) {
    return this.boardsService.getBoardById(id);
  }

  @Post("/")
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Patch("/:id/status")
  updateBoardStatus(
    @Param("id") id: string,
    @Body("status") status: BoardStatusValue
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Delete("/:id")
  deleteBoard(@Param("id") id: string) {
    return this.boardsService.deleteBoard(id);
  }
}
