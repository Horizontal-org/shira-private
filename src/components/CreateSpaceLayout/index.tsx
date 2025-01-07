import { FunctionComponent, useState } from "react";
import {
  Form,
  Link1,
  H1,
  SubHeading2,
  Button,
  TextInput,
  styled,
} from "@horizontal-org/shira-ui";
import backgroundSvg from "../../assets/Background.svg";

interface Props {}

export const CreateSpaceLayout: FunctionComponent<Props> = () => {
  const [email, handleEmail] = useState("");
  const [pass, handlePass] = useState("");
  const [passConfirmation, handlePassConfirmation] = useState("");
  const [passphrase, handlePassphrase] = useState("");
  const [name, handleName] = useState("");
  const description = (
    <>
      Shira spaces are currently in closed beta. To obtain the passphrase
      necessary to join the beta, email us at{" "}
      <Link1 href="mailto:contact@wearehorizontal.org">
        contact@wearehorizontal.org
      </Link1>
    </>
  );

  return (
    <Container>
      <BackgroundPattern />
      <Content>
        <Header>
          <H1>Shira spaces</H1>
          <SubHeading2>
            After you create a space, you will be able to create custom quizzes
            and questions specifically relevant to your context and communities.
          </SubHeading2>
        </Header>

        <StyledForm
          title="Create a new space"
          description={description}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <InputsContainer>
            <TextInput 
              label="Enter passphrase" 
              value={passphrase} 
              onChange={(e) => handlePassphrase(e.target.value)}
            />
            <TextInput 
              label="Name your space" 
              value={name} 
              onChange={(e) => handleName(e.target.value)}
            />
            <TextInput
              label="Your email address"
              value={email}
              onChange={(e) => handleEmail(e.target.value)}
            />
            <TextInput
              type="password"
              label="Password"
              value={pass}
              onChange={(e) => handlePass(e.target.value)}
            />

            <TextInput
              type="password"
              label="Confirm Password"
              value={passConfirmation}
              onChange={(e) => handlePassConfirmation(e.target.value)}
            />
          </InputsContainer>

          <ButtonContainer>
            <Button
              text="Create new space"
              type="primary"
              disabled={true}
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          </ButtonContainer>
        </StyledForm>
      </Content>
    </Container>
  );
};

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: white;
    position: relative;
    overflow-y: visible;
    height: auto;

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        padding: 16px;
        align-items: flex-start;
        padding-top: 48px; 
    }
`;

const Content = styled.div`
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 48px auto; 
    width: 100%;
    height: auto;
`;

const Header = styled.div`
  padding: 32px 0;

  display: flex;
  flex-direction: column;
  gap: 16px;
`

const BackgroundPattern = styled.div`
   background-image: url(${backgroundSvg});
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.15;
  pointer-events: none; 

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

const StyledForm = styled(Form)`
  position: relative;
  z-index:1;
  text-align: left;
  margin-bottom: 32px;
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

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100%;
    
    button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;