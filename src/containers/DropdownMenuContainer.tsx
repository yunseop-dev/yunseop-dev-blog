import { useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import DropdownMenu, {
  DropdownItems,
  DropdownItem,
  DropdownSeperator,
} from "../components/DropdownMenu";
import LoginDialog from "../components/LoginDialog";
import { profileImage } from "../constants";
import { isLoggedInVar, myInfoVar } from "../graphql/cache";
import useModal from "../hooks/useModal";
import { Account, useMyLazyQuery } from "../generated/graphql";

const DropdownMenuContainer = () => {
  const { isShowing, toggle: toggleModal } = useModal();
  const [useMyQuery, { data: my }] = useMyLazyQuery();
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const account: Account | null = useReactiveVar(myInfoVar);
  useEffect(() => {
    if (!account && isLoggedIn) {
      useMyQuery();
    }
  }, [account, isLoggedIn]);

  useEffect(() => {
    myInfoVar(my?.my);
  }, [my]);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <DropdownMenu
        imageUrl={isLoggedIn ? profileImage : ""}
        onClick={isLoggedIn ? toggleMenu : toggleModal}
      >
        {isLoggedIn ? my?.my?.user.firstName : "Login"}
        {showMenu && (
          <DropdownItems>
            <DropdownItem>My Profile</DropdownItem>
            <DropdownItem>Group Chat</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownSeperator></DropdownSeperator>
            <DropdownItem>Logout</DropdownItem>
          </DropdownItems>
        )}
      </DropdownMenu>
      <LoginDialog isShowing={isShowing} hide={toggleModal} />
    </>
  );
};
export default DropdownMenuContainer;
