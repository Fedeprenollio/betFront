/* eslint-disable react/prop-types */
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import { useBoundStore } from "../../stores";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"; // Importa useNavigate de react-router-dom

const validationSchema = yup.object({
  username: yup.string().required("Usuario es requerido"),
  password: yup.string().required("Contraseña es requerida"),
});

const FormUser = ({ action }) => {
  const {
    loginUser,
    registerUser,
    error,
    isAuthenticated,
    setToken
  } = useBoundStore((state) => state);
  const [loginError, setLoginError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Inicializa navigate usando useNavigate

  useEffect(() => {
   const loggedUserJSON = window.localStorage.getItem("loggedUser")
   if(loggedUserJSON){
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    setToken(user?.token)
   }
  }, [])
  

  const handleSubmit = async (values, { resetForm }) => {
    // alert(JSON.stringify(values, null, 2));

    if (action === "register") {
      console.log(values);
      try {
        await registerUser({ values });
      } catch (error) {
        console.log("Error en register");
      }
    } else if (action === "login") {
      try {
        const loginResponse = await loginUser({ values });
        window.localStorage.setItem("loggedUser", JSON.stringify(loginResponse))


        setUser(loginResponse);
        setToken(loginResponse.token)
        console.log("loginResponse", loginResponse);
        if (loginResponse?.status === "ok") {
          // Redireccionar a la página de administrador si el inicio de sesión es exitoso
          navigate("/teams/adm");
        } else {
          // Si el inicio de sesión falla, mostrar un mensaje de error al usuario
          setLoginError(error);
        }
      } catch (error) {
        console.log("EROR LOGIN", error);
        setLoginError(
          "Error en credenciales"
        );
      }
    }
    resetForm();
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
console.log("ERROR EN LOGIN", loginError, user)
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Typography variant="h5" gutterBottom>
            {action === "register" ? "Crea una cuenta" : "Logueate"}
          </Typography>
          <Field
            as={TextField}
            fullWidth
            id="username"
            name="username"
            label="Usuario"
            variant="outlined"
            margin="dense"
            autoComplete="off "
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />
          <Field
            as={TextField}
            fullWidth
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="dense"
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          {loginError && (
            <Typography variant="body2" color="error">
              {loginError}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary">
            Iniciar sesión
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormUser;
