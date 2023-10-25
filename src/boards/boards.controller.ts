import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/getUser.decorator";
import { User } from "src/auth/user.entity";
import { BoardStatusValue } from "./boardStatus.type";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { BoardStatusValidationPipe } from "./pipes/boardStatusValidation.pipe";

@Controller("boards")
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger("board controller");
  constructor(private boardsService: BoardsService) {}

  @Get("/")
  getAllBoard(@GetUser() user: User) {
    this.logger.verbose(`User ${user.username} trying to get all board`);
    return this.boardsService.getAllBoards(user);
  }

  @Get("/:id")
  getBoardById(@Param("id") id: number) {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User) {
    this.logger.verbose(`User ${user.username} creating a new board.
      Payload : ${JSON.stringify(createBoardDto)}
    `);
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Patch("/:id/status")
  updateBoardStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", BoardStatusValidationPipe) status: BoardStatusValue
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Delete("/:id")
  deleteBoard(@Param("id", ParseIntPipe) id: number, @GetUser() user: User) {
    return this.boardsService.deleteBoard(id, user);
  }
}
