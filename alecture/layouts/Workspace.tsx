import fetcher from "@utils/fetcher";
import React, { FC, useCallback } from "react";
import useSWR from "swr";
import axios from "axios";
const Workspace: FC = ({ children }) => {
  // FC 안에 칠드런이 안에 들어가있음 칠드런을 쓰는 컴포넌트면 VFC를 넣으면됨
  const { data, error, mutate } = useSWR("/api/users", fetcher);
  const onLogOut = useCallback(() => {
    axios
      .post("/api/users/logout", null, {
        withCredentials: true,
      })
      .then((response) => mutate(false, false));
  }, []);
  return (
    <>
      <button onClick={onLogOut}>로그아웃</button>
      {children}
    </>
  );
};

export default Workspace;
