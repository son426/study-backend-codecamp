import { Injectable } from "@nestjs/common";

@Injectable()
export class BoardService{
        // aaa(){
        //     return "hello world"
        // }

        findAll(){
            // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
    const result = [
        {
          number: 1,
                  writer: '철수',
          title: '제목입니다~~',
          contents: '내용입니다!!!',
        },
        {
          number: 2,
                  writer: '철수',
          title: '제목입니다~~',
          contents: '내용입니다!!!',
        },
        {
          number: 3,
                  writer: '철수',
          title: '제목입니다~~',
          contents: '내용입니다!!!',
        },
      ];
  
      // 2. 꺼내온 결과 응답 주기
      return result;
        }

        create(args){
            // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
            console.log(args);

            // 2. 저장 결과 응답 주기
            return '게시물 등록에 성공하였습니다!!';
        }
}