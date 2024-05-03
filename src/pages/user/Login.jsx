import { Container } from "@mui/material"
import FormUser from "./FormUser"

export const Login = () => {
  return (
    <Container>
        <h1>Login</h1>

        <FormUser action={"login"}/>

    </Container>
)
}
