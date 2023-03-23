import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import RepositiryList from "./RepositoryContainer/RepositoryList";
import AppBar from "./AppBar/AppBar";
import { Navigate, Route, Routes, useNavigate } from "react-router-native";
import SignIn from "./SignIn";
import useSignIn from "../useHooks/useSignIn";
import RespostitoryView from "./RepositoryView/index";
import ReviewForm from "./ReviewForm/index";
import { ADD_REVIEW, CREATE_USER } from "../graphQL/mutation";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import SignUpForm from "./SignUpFormContainer/index";
import { Picker } from "@react-native-picker/picker";
import TextInput from "./TextInput";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "#e1e4e8",
    },
});

const Main = () => {
    const [signIn] = useSignIn();
    const [query, setQuery] = useState('');
    const [searchQuery,setSearchQuery] = useState('')
    const mutate = useMutation(ADD_REVIEW);
    const createUserMutation = useMutation(CREATE_USER);
    const [orderBy, setOrderBy] = useState();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setSearchQuery(query)
        },500)

        return ()=>{
            clearTimeout(timeout)
        }
    },[query,setSearchQuery])

    const addUser = async ({ username, password }) => {
        try {
            const { data } = await createUserMutation[0]({
                variables: {
                    user: {
                        username: username,
                        password: password,
                    },
                },
            });
            console.log(data);
            await signIn({ username, password });
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    };
    const addReveiw = async ({ owner, name, rating, review }) => {
        try {
            const { data } = await mutate[0]({
                variables: {
                    review: {
                        ownerName: owner,
                        rating: parseInt(rating),
                        repositoryName: name,
                        text: review,
                    },
                },
            });
            console.log(data);
            navigate("/repository/" + data.createReview.repositoryId);
        } catch (e) {
            setError("Something went wrong");
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    };
    const onSubmit = async (values) => {
        try {
            await signIn(values);
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    };

    const orderDetails = {
        orderBy: "CREATED_AT",
        direction: "ASC",
    };
    if (orderBy === "RATING_AVERAGE_ASC") {
        orderDetails.orderBy = "RATING_AVERAGE";
        orderDetails.direction = "ASC";
    } else if (orderBy === "RATING_AVERAGE_DSC") {
        orderDetails.orderBy = "RATING_AVERAGE";
        orderDetails.direction = "DESC";
    }

    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <TextInput style={{backgroundColor:'white', marginBottom:5}} value={query} onChangeText={(val => {setQuery(val);console.log(val)})} placeholder='Search Repository'/>
                            <Picker
                                style={{
                                    height: 40,
                                    marginBottom: 20,
                                }}
                                selectedValue={orderBy}
                                onValueChange={(itemValue) => setOrderBy(itemValue)}
                            >
                                <Picker.Item label="Latest repositories" value="CREATED_AT" />
                                <Picker.Item
                                    label="Highest rated repositories"
                                    value="RATING_AVERAGE_DSC"
                                />
                                <Picker.Item
                                    label="Lowest rated repositories"
                                    value="RATING_AVERAGE_ASC"
                                />
                            </Picker>
                            <RepositiryList {...orderDetails} query={searchQuery} />
                        </>
                    }
                    exact
                />
                <Route path="/sign-in" element={<SignIn onSubmit={onSubmit} />} exact />
                <Route path="/repository/:id" element={<RespostitoryView />} exact />
                <Route
                    path="/add-review"
                    element={<ReviewForm error={error} onSubmit={addReveiw} />}
                    exact
                />
                <Route
                    path="/sign-up"
                    element={
                        <SignUpForm
                            error={null}
                            onSubmit={(values) => {
                                addUser({
                                    username: values.username,
                                    password: values.password,
                                });
                            }}
                        />
                    }
                    exact
                />
                <Route path="/my-reviews" element={<MyReviews/>} exact />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    );
};

export default Main;
