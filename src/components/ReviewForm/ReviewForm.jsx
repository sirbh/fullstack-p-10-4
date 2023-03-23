import { Pressable, StyleSheet, View } from "react-native"
import FormikTextInput from "../FormikTextInput"
import Text from "../Text";

const styles = StyleSheet.create({
    button:{
        backgroundColor: '#0366d6',
        borderRadius: 4,
        color: 'white',
        padding: 10,
        fontSize:20,
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        marginTop:20
    },
    buttonText:{
        fontSize:20,
        color:'white'
    },
    error:{
        color:'red'
    }
  });

const ReviewForm = ({handleSubmit,error}) => {
    return <View>
        <Text style={styles.error}>{error?error:null}</Text>
        <FormikTextInput name="owner" placeholder="Repository Owner Name" />
        <FormikTextInput name="name" placeholder="Repository Name" />
        <FormikTextInput name="rating" placeholder="Rating 0 to 100" />
        <FormikTextInput name="review" placeholder="Review" multiline/>
        <Pressable onPress={handleSubmit} style={styles.button} testID="signin">
            <Text style={styles.buttonText}>Create a review</Text>
        </Pressable>
    </View>
}

export default ReviewForm