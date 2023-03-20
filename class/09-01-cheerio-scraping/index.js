import axios from "axios";
import cheerio from "cheerio";

async function createBoardAPI(mydata) {
  // 입력된 컨텐츠에서 http로 시작하는 글자 찾기
  const myurl = mydata.contents
    .split(" ")
    .filter((el) => el.includes("https:"));
  // 만약 있다면, 찾은 주소로, axios.get 요청해서 html 받아오기
  const result = await axios.get(myurl);

  // 스크래핑 결과에서 og 코드 골라내서 변수 저장
  const $ = cheerio.load(result.data);

  // 반복문 돌리기 (cheerio 사용법)
  $("meta").each((index, el) => {
    if ($(el).attr("property")) {
      // property 안에가 og:title / og:description 이 모양으로 생김
      // html 내에서 property attribute 가진 애가 og 달린 얘네 뿐임. 그래서 반복문이 여기 안에서 돔.
      const key = $(el).attr("property").split(":")[1];
      const value = $(el).attr("content");
      console.log(key, value);
    }
  });
}

const frontData = {
  title: "제목",
  contents: "하이. 반가워 https://naver.com",
};

createBoardAPI(frontData);
