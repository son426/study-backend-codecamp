import { getToday } from "./utils.js";
import nodemailer from "nodemailer";
import "dotenv/config";

export function checkValidationEmail(email) {
  if (email === undefined || !email.includes("@")) {
    console.log("정확한 이메일 주소를 입력해주세요.");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ name, age, school }) {
  return `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다.</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>나이: ${age}살</div>
                <div>학교: ${school}</div>
                <div>가입일: ${getToday()}</div>
            </body>
        </html>
    `;
}

export async function sendWelcomeTemplateToEmail(email, template) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;

  // 템플릿을 이메일에 전송
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER, // generated ethereal user
      pass: EMAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const result = await transporter.sendMail({
    from: EMAIL_SENDER, // sender address
    to: email, // list of receivers
    subject: "[코드캠프] 가입을 축하합니다 !!!", // Subject line
    html: template, // html body
  });

  console.log(result);
  return result;
}
