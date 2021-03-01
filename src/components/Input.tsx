import styled from "@emotion/styled";

const Input = styled.input`
  display: block;
  width: 100%;
  background: #fafafa;
  border: 1px solid #f2f2f2;
  box-sizing: border-box;
  border-radius: 8px;
  outline: none;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
`;

const StyledInput = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return <Input {...props} />;
};


export default StyledInput;