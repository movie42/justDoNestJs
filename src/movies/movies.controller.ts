import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'this will return all movies';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `searching ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `this will return :id ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete('/:id')
  deleteMovie(@Param('id') movieId: string) {
    return `this will delete a ${movieId}`;
  }

  @Patch('/:id')
  patchMovie(@Param('id') movieId: string, @Body() updateData) {
    return {
      updateData: movieId,
      ...updateData,
    };
  }
}
