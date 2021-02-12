import styled from "@emotion/styled";

export const DropdownMenu = styled.button<{
    imageUrl?: string;
}>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  font-weight: bold;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  width: 120px;
  &:hover {
    background: #f2f2f2;
  }
  ${(props) =>
        props.imageUrl
            ? `
  &:before {
    content: "";
    width: 2rem;
    height: 2rem;
    border-radius: 8px;
    margin-right: 1rem;
    background: url("${props.imageUrl}");
    background-size: cover;
  }
  `
            : ""}
`;

export const DropdownItems = styled.ul`
  position: absolute;
  top: 4rem;
  left: 0;
  text-align: left;
  width: 10rem;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.8rem;
  background: white;
`;

export const DropdownItem = styled.li`
  padding: 0.5rem;
  &:hover {
    background: #f2f2f2;
    border-radius: 0.5rem;
  }
`;

export const DropdownSeperator = styled.li`
  display: block;
  height: 1px;
  background: #f2f2f2;
  margin: 0.2rem;
`;

export default DropdownMenu;