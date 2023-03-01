
import express from "express";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkValidationEmail,
  getWelcomeTemplate,
  sendWelcomeTemplateToEmail,
} from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
app.use(cors());

app.get("/boards", (req, res) => {
  
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

  res.send(result); // 응답 보내기
});

app.post("/boards", (req, res) => {
  console.log("post 요청 req.body : ", req.body);

  res.send("게시물 등록에 성공하였습니다.");
});

app.post("/tokens/phone", (req, res) => {
  // req.body 객체의 myphone의 값을 myphone이라는 변수에 담기.
  const myphone = req.body.myphone;

  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone);
  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken();

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken);

    res.send("인증완료!!!");
  }
});

app.post("/users", (req, res) => {
  const user = req.body.myuser;

  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkValidationEmail(user.email);
  if (isValid) {
    // 2. 가입환영 템플릿 만들기
    const template = getWelcomeTemplate(user);

    // 3. 이메일에 가입환영 템플릿 전송하기
    sendWelcomeTemplateToEmail(user.email, template);
  }

  // 얘로 끊어줘야함. 안그러면 postman에서 sending request 무한.
  res.send("이메일 전송완료");
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
