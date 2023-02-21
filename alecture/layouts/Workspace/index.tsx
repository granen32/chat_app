import fetcher from "@utils/fetcher";
import React, { FC, useCallback } from "react";
import useSWR from "swr";
import axios from "axios";
import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceModal,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from "./style";
import { Redirect, Route, Switch } from "react-router-dom";
import gravatar from "gravatar";
import loadable from "@loadable/component";

const Channel = loadable(() => import("@pages/Channel"));
const DirectMessage = loadable(() => import("@pages/Channel/DirectMessage"));

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
      .then((reponse) => mutate());
  }, []);
  if (!data) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Header>
        <RightMenu>
          <span>
            {/* 사용자의 프로필 이미지 */}
            {/* 그라바타 랜덤으로 프로필 이미지 생성 */}
            <ProfileImg
              src={gravatar.url(data.nickname, { s: "28px", d: "retro" })}
              alt={data.nickname}
            ></ProfileImg>
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Slect</WorkspaceName>
          <MenuScroll></MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path="/workspace/channel" component={Channel} />
            <Route path="/workspace/dm" component={DirectMessage} />
          </Switch>
        </Chats>
      </WorkspaceWrapper>
      {children}
    </div>
  );
};

export default Workspace;
