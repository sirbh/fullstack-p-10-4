import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import SignInForm from "./SignInForm";
import * as yup from 'yup';
import useSignIn from "../useHooks/useSignIn";
import { useNavigate } from "react-router-native";


const validationSchema = yup.object().shape({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white"
  },
});

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()
  return (
    <View style={styles.container}>
      <Formik
        onSubmit={async (values) => {
          try {
            const {data}  = await signIn(values)
            console.log(data)
            navigate('/')
          }
          catch (e) {
            console.log(e)
          }

        }}
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm handleSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;
