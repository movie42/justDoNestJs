<div style="display:flex; align-items:center; width:100%;">
  <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
<h1>사용해보기</h1>
</div>

## 설치

```bash
$ npm i -g @nestjs/cli
$ nest new project-name
```

## 실행

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## main.ts

어플리케이션 실행은 main.ts에서 시작된다.

## module

한가지 역할을 하는 어플리케이션

```typescript
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
```

### nest cli

nest cli를 사용해서 프로젝트에 필요한 기본 바탕을 생성할 수 있다.

```shell
nest generate controller
```

폴더가 생성되고 controller.ts와 spec 파일이 생성된다.

### controller

기본적인 url을 가져오고 함수를 실행하는 부분
함수를 실행하는 역할을 한다.

```typescript
@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'this will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `this will return :id ${movieId}`;
  }

  @Post()
  create() {
    return 'this will create a movie';
  }

  @Delete('/:id')
  deleteMovie(@Param('id') movieId: string) {
    return `this will delete a ${movieId}`;
  }

  @Patch('/:id')
  patchMovie(@Param('id') movieId: string) {
    return `this will patch a ${movieId}`;
  }
}
```

### @Contorller()

괄호 안에 있는 문자열은 해당 컨트롤러의 root가 된다.

예를 들어 괄호 안에 'say-hello'를 넣으면

http:localhost:3000/say-hello가 된다.

### @Get, @Post, @Delete, @Put, @Patch

nestjs에서 @Get, @Post, @Delete, @Put, @Patch 데코레이터를 제공한다. HTTP method와 같다. express의 router와 비슷한 역할을 한다.
데코레이터는 함수 사이에 빈칸을 두면 안된다.

### @Body(), @Param(), @Query

nestjs에서 개발자가 원하는 값이 있다면 요청을 해야한다.
@Param은 parameter값을 요청하는 데코레이터다.
@Body는 body 값을 요청하는 데코레이터다.

```typescript
@Controller(){
  @Get('/:id')
    getOne(@Param('id') id: string) {
      return `this will return :id ${id}`;
    }
   @Post()
    create(@Body() movieData) {
      return movieData
    }
}
```

@Get, @Param의 괄호 안에 문자 이름은 같아야한다.

다 만들었다면 Insomnia와 같은 툴에서 테스트 해볼 수 있다.

### services

nest cli로 services.ts를 만들 수 있다.

```shell
nest g s
```

이름은 movies로 만든다. movies폴더 안에 services.ts가 생성된것을 확인할 수 있다.

컨트롤러는 url을 가져오는 역할
비지니스 로직은 services에서 실행.

```typescript
import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  deleteOne(id: string): boolean {
    this.movies.filter((movie) => movie.id !== +id);
    return true;
  }

  createMovie(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
}
```

이름은 controller의 함수와 같아도 상관 없다.
entities 폴더를 만들고 가짜 DB를 만든다.
nestjs는 import를 하드코딩 하지 않는다. 내가 요청하는 값을 입력하면 자동으로 import된다.

error handling
nestjs에서 제공하는 throw new NotFoundException()를 사용할 수 있다.
괄호 안에 error 메시지를 띄울 수 있다.
