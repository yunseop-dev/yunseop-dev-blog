import styled from "@emotion/styled";
import React from "react";
import { ProfileCover } from "./Post";

interface CommentProps {
  profileImage: string;
  name: string;
  createdAt: string;
  content: string;
}

const CommentWrapper = styled.div`
  display: flex;
  margin: 1rem auto;
`;

const Name = styled.span`
  margin-right: 0.5rem;
  font-style: normal;
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 1.2rem;
  letter-spacing: -0.035em;
  color: #000000;
`;

const CreatedAt = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1rem;
  letter-spacing: -0.035em;
  color: #bdbdbd;
`;

const Content = styled.p`
  margin: 1rem auto;
  font-size: 1rem;
  line-height: 1.2rem;
  letter-spacing: -0.035em;
  color: #4f4f4f;
`;

const ContentWrapper = styled.div`
  background: #fafafa;
  border-radius: 0.5rem;
  width: 100%;
  padding: 1rem;
`;

export default function Comment({
  profileImage,
  name,
  createdAt,
  content,
}: CommentProps) {
  return (
    <CommentWrapper>
      <ProfileCover src={profileImage} alt="commenter" />
      <ContentWrapper>
        <Name>{name}</Name>
        <CreatedAt>{createdAt}</CreatedAt>
        <Content>{content}</Content>
      </ContentWrapper>
    </CommentWrapper>
  );
}
