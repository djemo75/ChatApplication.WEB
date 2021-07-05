import { Box, Button, CircularProgress, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from "redux/auth/actions";
import { STATIC_ROUTES } from "Routes";
import AuthMain from "shared/components/AuthMain/index";
import { useAuthStyles } from "shared/components/AuthMain/styles";
import FormikField from "shared/components/FormikField";
import { loginSchema } from "validationSchemas/loginSchema";

const Register = () => {
  const classes = useAuthStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(register(values)).then((action) => {
      setSubmitting(false);
      if (!action.error) {
        history.push(STATIC_ROUTES.login);
      }
    });
  };

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  return (
    <AuthMain>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <Box className={classes.title}>Register</Box>
            <Box height="400px" pt={6}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <FormikField
                    label="Username"
                    name="username"
                    error={touched.username && errors.username}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikField
                    label="Email"
                    name="email"
                    error={touched.email && errors.email}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikField
                    label="Password"
                    type="password"
                    name="password"
                    error={touched.password && errors.password}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    startIcon={
                      isSubmitting && (
                        <CircularProgress size={12} color="inherit" />
                      )
                    }
                    disabled={isSubmitting}
                  >
                    Register
                  </Button>
                  <Box
                    component={Link}
                    ml={2}
                    className={classes.textLink}
                    to={STATIC_ROUTES.login}
                  >
                    Already have an account?
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthMain>
  );
};

export default Register;
