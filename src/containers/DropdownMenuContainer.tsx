import { useReactiveVar } from "@apollo/client";
import React from "react";
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
import { Account } from "../generated/graphql";

const DropdownMenuContainer = () => {
  const { isShowing, toggle: toggleModal } = useModal();
  const { isShowing: isShowingMenu, toggle: toggleMenu } = useModal();
  const my: Account | null = useReactiveVar(myInfoVar);

  function logout() {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      isLoggedInVar(false);
      myInfoVar(null);
      removeCookie("token");
    }
  }

  return (
    <>
      <DropdownMenu
        imageUrl={my ? profileImage : ""}
        onClick={my ? toggleMenu : toggleModal}
      >
        {my ? my?.user.firstName ?? "error" : "Login"}
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

export default React.memo(withApollo(DropdownMenuContainer));
