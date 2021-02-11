import styled from "@emotion/styled";

export const NavBar = styled.ul({
    display: "flex",
});

export const NavItem = styled.li`
  display: inline-block;
  position: relative;
  margin: auto 1rem;
  padding: 1rem;
  color: rgb(119, 119, 119);
  &:hover a,
  &.active a {
    color: rgb(32, 118, 229);
  }
  &:hover:after,
  &.active:after {
    position: absolute;
    left: 0;
    bottom: 0;
    content: " ";
    display: block;
    height: 4px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    width: 100%;
    background: rgb(32, 118, 229);
  }

  & a {
    color: inherit;
    text-decoration: none;
  }
`;