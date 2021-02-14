import { useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import DropdownMenu, {
  DropdownItems,
  DropdownItem,
  DropdownSeperator,
} from "../components/DropdownMenu";
import LoginDialog from "../components/LoginDialog";
import { profileImage } from "../constants";
import { isLoggedInVar, myInfoVar } from "../graphql/cache";
import useModal from "../hooks/useModal";
import { removeCookie } from "../utils/cookie";
import { ssrMy } from "../generated/page";
import { withApollo } from "../withApollo";

const DropdownMenuContainer = () => {
  const { isShowing, toggle: toggleModal } = useModal();
  const { isShowing: isShowingMenu, toggle: toggleMenu } = useModal();
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  const { data, client, refetch } = ssrMy.usePage(() => ({
    errorPolicy: "ignore",
    onError(error) {
      console.log(error.message);
    },
  }));

  useEffect(() => {
    if (!data?.my && isLoggedIn) {
      refetch();
    }
  }, [data, isLoggedIn]);

  function logout() {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      isLoggedInVar(false);
      myInfoVar(null);
      removeCookie("token");
      client?.resetStore();
    }
  }

  return (
    <>
      <DropdownMenu
        imageUrl={isLoggedIn ? profileImage : ""}
        onClick={isLoggedIn ? toggleMenu : toggleModal}
      >
        {isLoggedIn ? data?.my?.user.firstName ?? "error" : "Login"}
        {isShowingMenu && (
          <DropdownItems>
            <DropdownItem>My Profile</DropdownItem>
            <DropdownItem>Group Chat</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownSeperator></DropdownSeperator>
            <DropdownItem onClick={logout}>Logout</DropdownItem>
          </DropdownItems>
        )}
      </DropdownMenu>
      <LoginDialog isShowing={isShowing} hide={toggleModal} />
    </>
  );
};

export const getServerSideProps = async () => {
  return await ssrMy.getServerPage({});
};

export default withApollo(DropdownMenuContainer);
