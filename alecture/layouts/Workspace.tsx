import fetcher from "@utils/fetcher";
import React, { FC, useCallback } from "react";
import useSWR from "swr";
import axios from "axios";
import { Redirect } from "react-router-dom";
const Workspace: FC = ({ children }) => {
  // FC 안에 칠드런이 안에 들어가있음 칠드런을 쓰는 컴포넌트면 VFC를 넣으면됨
  const { data, error, mutate } = useSWR("/api/users", fetcher, {
    // 여러번 요청을 보내도 2초안에 같은게 호출이 되면 첫 데이터만 가져온다.
    dedupingInterval: 2000,
  });
  const onLogOut = useCallback(() => {
    axios
      .post("/api/users/logout", null, {
        withCredentials: true,
      })
      .then((reponse) => mutate(false, false));
  }, []);
  if (!data) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <button onClick={onLogOut}>로그아웃</button>
      {children}
    </>
  );
};

export default Workspace;
