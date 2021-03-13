import { useReactiveVar } from "@apollo/client";
import styled from "@emotion/styled";
import { useState } from "react";
import { profileImage } from "../constants";
import Input from "./Input";
import {
  Account,
  PostFieldFragment,
  PostFieldFragmentDoc,
  useLikePostMutation,
} from "../generated/graphql";
import { myInfoVar } from "../graphql/cache";
import Comment from "./Comment";

export const Post = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  margin: 1.5rem;
  padding: 1rem;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileCover = styled.img`
  object-fit: cover;
  width: 2rem;
  height: 2rem;
  border-radius: 0.8rem;
  margin: 0.5rem;
`;

export const ProfileInformation = styled.div``;
export const PostTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0.4rem;
`;
export const PostSubtitle = styled.div`
  margin: 0.4rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: #bdbdbd;
`;

export const PostContent = styled.p`
  font-size: 1rem;
  line-height: 2.2rem;
  letter-spacing: -0.035em;
  color: #4f4f4f;
`;

export const PostCounts = styled.div`
  text-align: right;
`;

export const PostCountItem = styled.div`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.6rem;
  letter-spacing: -0.035em;
  color: #bdbdbd;
`;

export const PostButtonGroup = styled.div`
  display: flex;
  padding: 0.2rem;
  justify-content: space-around;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
`;
export const PostButton = styled.button`
  width: 100%;
  padding: 0.8rem;

  // TODO: 이 아래것들은 묶을 생각 해보자
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    background: #f2f2f2;
    border-radius: 8px;
  }
`;

interface PostProps {
  id: string;
  profileImage: string;
  title: string;
  subtitle: string;
  content: string;
  likeCount: number;
  isLiked: boolean;
  comments: PostFieldFragment["comments"];
}

const PostComponent = (props: PostProps) => {
  const my: Account | null = useReactiveVar(myInfoVar);
  const [isInputOpened, setIsInputOpened] = useState<boolean>(false);
  const [likePostMutation] = useLikePostMutation({
    variables: {
      postId: props.id,
    },
    update(cache, result) {
      const id = `Post:${props.id}`;
      const data = cache.readFragment<PostFieldFragment>({
        id,
        fragment: PostFieldFragmentDoc,
        fragmentName: "PostField",
      });
      if (my && data) {
        cache.writeFragment({
          id,
          fragment: PostFieldFragmentDoc,
          fragmentName: "PostField",
          data: result.data?.likePost,
        });
      }
    },
    onError(error) {
      console.log(error);
      if (error.graphQLErrors?.[0]?.extensions?.code === "UNAUTHENTICATED") {
        window.alert("로그인 해주세요");
      }
    },
  });
  return (
    <Post>
      <PostHeader>
        <ProfileCover src={props.profileImage} alt="author" />
        <ProfileInformation>
          <PostTitle>{props.title}</PostTitle>
          <PostSubtitle>{props.subtitle}</PostSubtitle>
        </ProfileInformation>
      </PostHeader>
      <PostContent>{props.content}</PostContent>
      <PostCounts>
        <PostCountItem>{props.likeCount ?? 0} Likes</PostCountItem>
      </PostCounts>
      <PostButtonGroup>
        <PostButton onClick={() => likePostMutation()}>
          {props.isLiked ? "Liked" : "Like"}
        </PostButton>
        <PostButton
          onClick={() => {
            setIsInputOpened((val) => !val);
          }}
        >
          Comment
        </PostButton>
        {/* <PostButton>Retweeted</PostButton> */}
        {/* <PostButton>Saved</PostButton> */}
      </PostButtonGroup>
      <ul>
        {props?.comments?.map((item) => (
          <Comment
            {...{
              key: item?.id,
              profileImage,
              name: `${item?.user.lastName} ${item?.user.firstName}`,
              createdAt: item?.createdAt ?? "",
              content: item?.content ?? "",
            }}
          />
        ))}
      </ul>
      {isInputOpened && (
        <div style={{ display: "flex", margin: "1rem auto" }}>
          <ProfileCover src={profileImage} alt="commenter" />
          <Input type="text" placeholder="Tweet your reply" />
        </div>
      )}
    </Post>
  );
};

export default PostComponent;
