import { useState } from "react";
import ReactModal from "react-modal";
import { useSignInMutation } from "../src/generated/graphql";
import { isLoggedInVar } from "../src/graphql/cache";

interface LoginDialogProps {
  isShowing: boolean;
  hide: Function;
}

const LoginDialog = ({ isShowing, hide }: LoginDialogProps) => {
  //   const [modalIsOpen, setIsOpen] = useState(false);
  const [signInMutation, { data, loading, error }] = useSignInMutation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
          hide();
        },
      });
    } catch (error) {}
  }

  return (
    <ReactModal
      isOpen={isShowing}
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
      <button onClick={() => hide()}>close</button>
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
  );
};

export default LoginDialog;