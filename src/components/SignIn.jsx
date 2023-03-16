import { Formik } from "formik";
import { StyleSheet } from "react-native";
import { View } from "react-native-web";
import SignInForm from "./SignInForm";
import * as yup from 'yup';


const validationSchema = yup.object().shape({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor:"white"
  },
});

const SignIn = () => {
  return (
    <View style = {styles.container}>
      <Formik
        onSubmit={(values) => {
          console.log(values);
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
