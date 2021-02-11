import { PagePostsComp, ssrPosts } from "../src/generated/page";
import { withApollo } from "../src/withApollo";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import {
  Account,
  useMyLazyQuery,
  useSignInMutation,
} from "../src/generated/graphql";
import { ParsedUrlQuery } from "querystring";
import { isLoggedInVar, myInfoVar } from "../src/graphql/cache";
import { useReactiveVar } from "@apollo/client";
import Post from "../components/Post";
import DropdownMenu from "../components/DropdownMenu";
import Header from "../components/Header";
import Logo from "../components/Logo";
import { NavBar, NavItem } from "../components/Nav";

const profileImage =
  "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

ReactModal.setAppElement("#__next");

const HomePage: PagePostsComp = () => {
  const [query] = useState<string>("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signInMutation, { data, loading, error }] = useSignInMutation();
  const [
    useMyQuery,
    { data: my, loading: myLoading, error: myError },
  ] = useMyLazyQuery();
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  const account: Account | null = useReactiveVar(myInfoVar);

  const { data: pageData, refetch } = ssrPosts.usePage();

  useEffect(() => {
    if (!account) {
      useMyQuery();
    }
  }, [account]);

  useEffect(() => {
    myInfoVar(my?.my);
  }, [my]);

  useEffect(() => {
    if (query.length > 0) {
      refetch({
        q: query,
      });
    }
  }, [query]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await signInMutation({
        variables: {
          email,
          password,
        },
        update(_, result) {
          const token = result.data?.signIn;
          document.cookie = `token=Bearer ${token};`;
          isLoggedInVar(true);
          closeModal();
        },
      });
    } catch (error) {}
  }

  return (
    <>
      <Header>
        <Logo>
          <img
            className="logo-image"
            src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
            alt="Home"
          />
          <span>Tweeeter</span>
        </Logo>
        <NavBar>
          <NavItem>
            <a href="#">Home</a>
          </NavItem>
          <NavItem>
            <a href="#">Explore</a>
          </NavItem>
          <NavItem>
            <a href="#">Bookmarks</a>
          </NavItem>
        </NavBar>
        <DropdownMenu
          imageUrl={isLoggedIn ? profileImage : ""}
          onClick={openModal}
        >
          {isLoggedIn ? my?.my?.user.firstName : "Login"}
        </DropdownMenu>
      </Header>
      <main style={{ background: "#FAFAFB", padding: "1rem" }}>
        {/* <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        /> */}
        <section style={{ maxWidth: "1024px", margin: "0 auto" }}>
          {pageData?.posts?.map?.((item) => (
            <Post
              key={item?.id}
              {...{
                profileImage,
                title: `${item?.author.firstName} ${item?.author.lastName}`,
                subtitle: item?.publishedAt ?? "",
                content: item?.content ?? "",
                likeCount: item?.likedBy?.length ?? 0,
              }}
            />
          ))}
        </section>
      </main>
      <ReactModal
        isOpen={modalIsOpen}
        contentLabel="Example Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h2>Login</h2>
        <button onClick={closeModal}>close</button>
        <form onSubmit={login}>
          <label>
            Email:
            <input
              type="email"
              placeholder="Enter your ID"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <button>Login</button>
          <div>{error?.message}</div>
        </form>
      </ReactModal>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = (
  ctx: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  return ssrPosts.getServerPage({}, ctx);
};

export default withApollo(ssrPosts.withPage(() => ({}))(HomePage));
