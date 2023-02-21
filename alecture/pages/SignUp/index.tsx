import React, { useCallback, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useInput } from "@hooks/useInput";
import axios from "axios";
import {
  Success,
  Form,
  Error,
  Label,
  Input,
  LinkContainer,
  Button,
  Header,
} from "./style";
import fetcher from "@utils/fetcher";
import useSWR from "swr";
const SignUp = () => {
  // 첫번째는 주소를 받고 그 이후에 함수로 전달됨
  const { data, error, mutate } = useSWR("/api/users", fetcher, {
    // 불러오는 인터벌을 길게 늘려줌
    dedupingInterval: 100000,
  });
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  // 초기 스테이트는 빈문자열 false등이 낫다.
  const [signUpError, setSignUpError] = useState("");

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [password]
  );
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [passwordCheck]
  );
  // 디펜더시는 외부변수에 할당하는게 좋음 내부변수는 XX
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(email, nickname, password, passwordCheck);
      if (!mismatchError && nickname) {
        console.log("서버로 전송");
        setSignUpError("");
        setSignUpSuccess(false);
        // 비동기 처리전에 보통 초기화 작업을 진행하는 게 좋음
        axios
          // 로럴호스트 3090 -> 3095로 api 보내는 거임
          .post("/api/users", {
            email,
            nickname,
            password,
          })
          .then((response) => {
            console.log(response);
            setSignUpSuccess(true);
          }) // promise 성공
          .catch((error) => {
            console.log(error.response);
            setSignUpError(error.response.data);
          }) // promise 실패
          .finally(() => {}); // promise 성공하든 실패하든 무조건
      }
    },

    [email, nickname, password, passwordCheck, mismatchError]
  );

  // return은 무조건 훅스 아래에
  if (data) {
    return <Redirect to="/workspace/channel" />;
  }
  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input
              type="text"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={onChangeNickname}
            />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && (
            <Success>회원가입되었습니다! 로그인해주세요.</Success>
          )}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
