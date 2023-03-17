import { ScrollView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTabs";
import { useNavigate } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from "../../graphQL/queries";
import { useAuthStorage } from "../../useHooks/useAuthStorage";

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

const AppBar = () => {
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data } = useQuery(ME)
  console.log(data)
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab
          onPress={() => {
            navigate("/");
          }}
          tabText={"Repositories"}
        />
        {data?.me ?
          <AppBarTab
            onPress={async () => {
              await authStorage.removeAccessToken()
              apolloClient.resetStore();
            }}
            tabText={"Sign Out"}
          /> : <AppBarTab
            onPress={() => {
              navigate("/sign-in");
            }}
            tabText={"Sign In"}
          />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
