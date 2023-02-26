import { ApolloServer, gql } from "apollo-server";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
// The GraphQL schema
const typeDefs = gql`
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type BoardReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    fetchBoards: [BoardReturn]
  }

  type Mutation {
    createBoards(writer: String, title: String, contents: String): String
    createBoards2(createBoardInput: CreateBoardInput): String
    createTokenOfPhone(myphone: String): String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    fetchBoards: () => {
      // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
      const result = [
        {
          number: 1,
          writer: "철수",
          title: "제목입니다~~",
          contents: "내용이에요@@@",
        },
        {
          number: 2,
          writer: "영희",
          title: "영희 제목입니다~~",
          contents: "영희 내용이에요@@@",
        },
        {
          number: 3,
          writer: "훈이",
          title: "훈이 제목입니다~~",
          contents: "훈이 내용이에요@@@",
        },
      ];

      // 응답 보내기
      return result;
    },
  },

  Mutation: {
    createBoards: (_, args) => {
      // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
      console.log(args);

      // 응답 보내기
      return "등록 성공";
    },

    createBoards2: (_, args) => {
      // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
      console.log(args);

      // 응답 보내기
      return "등록 성공";
    },

    createTokenOfPhone: (_, args) => {
      // 1. 휴대폰번호 자릿수 맞는지 확인하기
      const isValid = checkValidationPhone(args.myphone);
      if (isValid) {
        // 2. 핸드폰 토큰 6자리 만들기
        const mytoken = getToken(6);

        // 3. 핸드폰번호에 토큰 전송하기
        sendTokenToSMS(args.myphone, mytoken);

        return "인증완료";
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url} on port ${3001}`);
});

const result1 = [] === [];
const result2 = null === null;

console.log(result1, result2);

const v1 = 1 / 0;
console.log(v1);
