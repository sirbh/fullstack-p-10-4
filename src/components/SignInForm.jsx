import { Pressable, StyleSheet, View } from "react-native"
import FormikTextInput from "./FormikTextInput"
import Text from "./Text";

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
    }
  });


const SignInForm = ({handleSubmit}) => {
    return <View>
    <FormikTextInput name="username" placeholder="username" />
    <FormikTextInput name="password" placeholder="password"  secureTextEntry />
    <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
    </Pressable>
</View>
}

export default SignInForm