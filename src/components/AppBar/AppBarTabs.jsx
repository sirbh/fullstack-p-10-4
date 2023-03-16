import { Pressable, StyleSheet } from "react-native"
import Text from "../Text";

const AppBarTab = ({ tabText, onPress }) => {
    const styles = StyleSheet.create({
        textStyle: {
            color:"white",
            marginRight:10,
            marginLeft:10
        },
    });
    return <Pressable onPress={onPress}>
        <Text style={styles.textStyle}>{tabText}</Text>
    </Pressable>
}

export default AppBarTab