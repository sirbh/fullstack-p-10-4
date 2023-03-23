import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import * as yup from 'yup';
import ReviewForm from "./ReviewForm";


const validationSchema = yup.object().shape({
  owner: yup.string().required('owner name is required'),
  name: yup.string().required('name is required'),
  rating: yup.number().positive().min(1,'should be more than 1').max(100,'cannot be more than 100').required('rating is required'),
  review: yup.string()
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white"
  },
});

const ReviewFormContainer = ({onSubmit,error}) => {
  return (
    <View style={styles.container}>
      <Formik
        onSubmit={onSubmit}
        initialValues={{ owner: "", name: "", rating:"", review:"" }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <ReviewForm handleSubmit={handleSubmit} error={error}/>}
      </Formik>
    </View>
  );
};

export default ReviewFormContainer;
