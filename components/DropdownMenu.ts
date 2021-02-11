import styled from "@emotion/styled";

const DropdownMenu = styled.button<{
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

export default DropdownMenu;