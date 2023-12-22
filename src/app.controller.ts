import { Controller, Get, Logger } from "@nestjs/common";

@Controller("/")
export class AppController {
  private logger = new Logger("health check");

  @Get("/ping")
  getAllBoard() {
    this.logger.verbose("health check ping pong");
    return "pong";
  }
}
