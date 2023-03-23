import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import SignInForm from "./SignInForm";
import * as yup from 'yup';


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

const SignIn = ({onSubmit}) => {
  return (
    <View style={styles.container}>
      <Formik
        onSubmit={onSubmit}
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm handleSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;
