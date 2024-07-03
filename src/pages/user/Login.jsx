import { Container } from "@mui/material";
import FormUser from "./FormUser";

export const Login = () => {
  return (
    <Container>     
      <FormUser action={"login"} />
    </Container>
  );
};
