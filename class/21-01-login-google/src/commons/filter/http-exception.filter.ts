import { ExceptionFilter, HttpException, Catch } from '@nestjs/common';

// 얘는 결국에, service에 로직에서 try/catch를 일일이 쓰기 싫어서 쓰는 거.
// 여기 클래스 만들어주고, main.ts 가서 app.use 써주면 됨.
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;

    console.log('==============');
    console.log('예외 발생');
    console.log('예외내용 :', message);
    console.log('예외코드 :', status);
    console.log('==============');

    if (status === 500) {
      return new HttpException('이건 서버 문제로 인한 예외에요!!', 500);
    }
  }
}
