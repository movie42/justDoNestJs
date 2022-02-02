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
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello')
  sayHello(): string {
    return 'hi';
  }
}
```

### @Get, @Post

@Get, @Post데코레이터는 express의 router와 비슷한 역할을 한다.
데코레이터는 함수 사이에 빈칸을 두면 안된다.

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
