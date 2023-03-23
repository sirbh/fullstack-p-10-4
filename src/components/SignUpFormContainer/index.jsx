import { Formik } from "formik"
import { StyleSheet, View } from "react-native"
import * as yup from 'yup';
import SignUpForm from "./SignUpForm";

const validationSchema = yup.object().shape({
    username: yup.string().max(30).required('username is required'),
    password: yup.string().min(5).max(50).required('password is required'),
    confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match')
  });
  
  const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: "white"
    },
  });

const SignUpFormContainer = ({onSubmit,error})=>{
    return   <View style={styles.container}>
    <Formik
      onSubmit={onSubmit}
      initialValues={{ username: "", password: "", confirmPassword:""}}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm handleSubmit={handleSubmit} error={error}/>}
    </Formik>
  </View>
}

export default SignUpFormContainer