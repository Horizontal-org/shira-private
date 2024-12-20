import { FunctionComponent, useEffect, useState } from "react";
import {
  Form,
  Link1,
  Button,
  TextInput,
  styled,
} from "@horizontal-org/shira-ui";
import { useNavigate } from "react-router-dom";
import shallow from "zustand/shallow";
import { useStore } from "../../store";

interface Props {}

export const LoginLayout: FunctionComponent<Props> = () => {
  const navigate = useNavigate();

  const { user, login } = useStore(
    (state) => ({
      user: state.user,
      login: state.login,
    }),
    shallow
  );

  const [email, handleEmail] = useState("");
  const [pass, handlePass] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const description = (
    <>
      Shira spaces are currently in closed beta. To obtain the passphrase necessary to join the beta, email us at{' '}
      <Link1 href="mailto:contact@wearehorizontal.org">
        contact@wearehorizontal.org
      </Link1>
    </>
  );
  return (
    <Container>
      <Form 
        title="Log in" 
        description= {description}
        onSubmit={(e) => {
          e.preventDefault()
          login(email, pass)
        }}
      >
        <InputsContainer>
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => handleEmail(e.target.value)}
          />
          <TextInput
            type="password"
            label="Password"
            value={pass}
            onChange={(e) => handlePass(e.target.value)}
          />
        </InputsContainer>

        <ButtonContainer>
          <StyledButton
            text="Log in"
            type="primary"
            disabled={!(email && pass)}
            onClick={() => console.log("Login clicked")}
          />
        </ButtonContainer>
      </Form>
    </Container>
  );
};

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        padding: 16px;
    }
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    
    button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const StyledButton = styled(Button)`
  padding: 12px 24px;
  width: auto;
`;
