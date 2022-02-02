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

### @Param()

nestjs에서 개발자가 원하는 값이 있다면 요청을 해야한다. @Param은 parameter값을 요청하는 데코레이터다.

```typescript
@Controller(){
  @Get('/:id')
    getOne(@Param('id') id: string) {
      return `this will return :id ${id}`;
    }
}
```

@Get, @Param의 괄호 안에 문자 이름은 같아야한다.

다 만들었다면 Insomnia와 같은 툴에서 테스트 해볼 수 있다.

### services

컨트롤러는 url을 가져오는 역할
비지니스 로직은 services에서 실행.

```typescript
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getHi(): string {
    return 'hi';
  }
}
```

### nest cli

nest cli를 사용해서 프로젝트에 필요한 기본 바탕을 생성할 수 있다.

```shell
nest generate controller
```

폴더가 생성되고 controller.ts와 spec 파일이 생성된다.
