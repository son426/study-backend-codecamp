function getToken(자릿수) {
  if (자릿수 === undefined) {
    console.log("에러발생. 갯수 제대로 입력");
    return;
  } else if (자릿수 <= 0) {
    console.log("에러발생. 갯수가 너무 적음");
    return;
  } else if (자릿수 > 10) {
    console.log("에러발생. 갯수가 너무 많음");
    return;
  }

  const token = String(Math.floor(Math.random() * 10 ** 자릿수)).padStart(
    자릿수,
    "0"
  );
  console.log("token : ", token);
}

getToken();
getToken(-1);
getToken(12);
getToken(4);
