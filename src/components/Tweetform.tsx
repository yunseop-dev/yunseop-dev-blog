import styled from "@emotion/styled";
import React, { useState } from "react";

import {
  PostsDocument,
  PostsQuery,
  PostsQueryVariables,
  usePublishPostMutation,
} from "../generated/graphql";
import { ProfileCover } from "./Post";

export const TweetForm = styled.form`
  margin: 1.5rem;
  padding: 1rem;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
`;

export const TweetTitle = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
  letter-spacing: -0.035em;
  color: #4f4f4f;
`;

export const TweetDivider = styled.hr`
  color: #e0e0e0;
  border: 1px solid;
  margin: 0.1rem;
`;

export const TweetTextarea = styled.textarea`
  border: none;
  width: 100%;
  resize: none;
  height: 6rem;
`;

export const TweetButton = styled.button`
  background: #2f80ed;
  border-radius: 0.4rem;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
`;

export const TweetContent = styled.div`
  display: flex;
`;

export const TweetFooter = styled.div`
  text-align: right;
  margin-top: 0.5rem;
`;

interface TweetFormComponentProps {
  profileImage: string;
}

const TweetFormComponent = ({ profileImage }: TweetFormComponentProps) => {
  const [content, setContent] = useState<string>("");
  const [publishPostMutation] = usePublishPostMutation({
    update(cache, mutation) {
      const data = cache.readQuery<PostsQuery, PostsQueryVariables>({
        query: PostsDocument,
      });
      if (mutation.data?.publishPost) {
        cache.writeQuery({
          query: PostsDocument,
          data: {
            ...data,
            posts: [mutation.data.publishPost, ...(data?.posts ?? [])],
          },
        });
        setContent("");
      }
    },
    onError(error) {
      window.alert(error.message);
    },
  });
  return (
    <TweetForm
      onSubmit={(e) => {
        e.preventDefault();
        publishPostMutation({
          variables: {
            input: {
              title: "no title",
              content,
            },
          },
        });
      }}
    >
      <TweetTitle>Tweet something</TweetTitle>
      <TweetDivider />
      <TweetContent>
        <ProfileCover src={profileImage} alt="writer" />
        <TweetTextarea
          placeholder="What's happening?"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        />
      </TweetContent>
      <TweetFooter>
        <TweetButton>Tweet</TweetButton>
      </TweetFooter>
    </TweetForm>
  );
};

export default TweetFormComponent;
