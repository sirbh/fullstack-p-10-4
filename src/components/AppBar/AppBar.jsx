import { ScrollView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTabs";
import { useNavigate } from "react-router-native";

const AppBar = () => {
  const navigate = useNavigate();
  const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: "#24292e",
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
  });
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab
          onPress={() => {
            navigate("/");
          }}
          tabText={"Repositories"}
        />
        <AppBarTab
          onPress={() => {
            navigate("/sign-in");
          }}
          tabText={"Sign In"}
        />
      </ScrollView>
    </View>
  );
};

export default AppBar;
