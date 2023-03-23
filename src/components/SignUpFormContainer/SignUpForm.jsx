import { Pressable, StyleSheet, Text, View } from "react-native"
import FormikTextInput from "../FormikTextInput"

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0366d6',
        borderRadius: 4,
        color: 'white',
        padding: 10,
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 20
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    },
    error: {
        color: 'red'
    }
});

const SignUpForm = ({ handleSubmit, error }) => {
    return <View>
        <Text style={styles.error}>{error ? error : null}</Text>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" />
        <FormikTextInput name="confirmPassword" placeholder="Confirm Password" />
        <Pressable onPress={handleSubmit} style={styles.button} testID="signup">
            <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
    </View>
}

export default SignUpForm