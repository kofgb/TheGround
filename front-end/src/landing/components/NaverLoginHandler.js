import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const NaverLoginHandler = () => {

  const navigate = useNavigate();
  const CLIENT_ID = "PVGrBZM8vqHq_92Vh6Wx";
  const CLIENT_SECRET = "tSbysXbRL1";
  const MAIN_URI = "https://j7d109.p.ssafy.io";
  // const MAIN_URI = "http://localhost:3000";
  const REDIRECT_URI = MAIN_URI + "/naverLogin";
  const CORS_URI = "https://cors-anywhere.herokuapp.com/";

  // 인가코드
  const location = useLocation();

  const CODE = location.search.split('=')[1];
  const STATE = location.search.split('=')[2];
  

  // 네이버로 토큰 발급 요청
  const getNaverToken = () => {
    axios
      .post(
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${CODE}&state=${STATE}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        },
        {
          responseType: "json"
        },
      )
      .then((res) => res.data)
      .then((data) => {
        if (data.access_token) {
          axios
            .post(
              "https://j7d109.p.ssafy.io/back/users/login",
              {
                accessToken: data.access_token,
                loginType: "N",
              },
              {
                headers: {
                  "Content-type": "application/json",
                  Accept: "application/json",
                },
              },
            )
            .then((res) => {
              console.log(res)
              if (res.data.message === "회원가입을 먼저 해주세요.") {
                // 전역 스테이트로 메인에서 화면이 모달이 뜨게 하기
                navigate("/signupModal");
              } else {
                navigate("/main");
              }
            });
        } else {
          navigate("/");
        }
      });
  };



  // 취소시 로직
  let error = new URL(window.location.href).searchParams.get("error_description");

  useEffect(() => {
    if (!CODE) return;
    getNaverToken();
    if (error === 'Canceled By User') {
      navigate("/");
    };  
  }, []);

  return <p style={{color:'green'}}>네이버 로그인 중</p>;
};


export default NaverLoginHandler;