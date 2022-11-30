import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";

import { BoardsService } from "./boards.service";
import { BoardStatusValue } from "./boardStatus.type";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { BoardStatusValidationPipe } from "./pipes/boardStatusValidation.pipe";

@Controller("boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get("/")
  getAllBoard() {
    return this.boardsService.getAllBoards();
  }

  @Get("/:id")
  getBoardById(@Param("id") id: number) {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Patch("/:id/status")
  updateBoardStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", BoardStatusValidationPipe) status: BoardStatusValue
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Delete("/:id")
  deleteBoard(@Param("id", ParseIntPipe) id: number) {
    return this.boardsService.deleteBoard(id);
  }
}
