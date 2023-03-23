import { useApolloClient, useMutation } from "@apollo/client";
import { Alert, Pressable, StyleSheet, View } from "react-native"
import { useNavigate } from "react-router-native";
import Text from '../../components/Text'
import { DELETE_REVIEW } from "../../graphQL/mutation";

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    descriptionHead: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 5,
        backgroundColor: 'white'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: '#0366d6',
        borderStyle: 'solid',
        borderWidth: 2,
        marginRight: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bigText: {
        fontSize: 25,
        color: '#0366d6'
    },
    description: {
        flex: 1
    },
    repoFacts: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center'
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 25,
        paddingRight: 25
    },
    // fact: {
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center"
    // },
    boltText: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    greyText: {
        color: 'grey',
        marginBottom: 10,
    },
    buttonStyle: {
        backgroundColor: '#0366d6',
        borderRadius: 5,
        color: 'white',
        alignSelf: "baseline",
        padding: 5,
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteButton: {
        backgroundColor: 'red',
        borderRadius: 5,
        color: 'white',
        alignSelf: "baseline",
        padding: 5,
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
    }

    // fullWidth: {
    //     backgroundColor: '#0366d6',
    //     borderRadius: 5,
    //     padding: 15,
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     marginTop: 15
    // },
    // whiteText: {
    //     color: 'white',
    // }


});

const ReviewList = ({ review, showButtons }) => {
    const navigate = useNavigate()
    const deleteMutation = useMutation(DELETE_REVIEW)
    const apolloClient = useApolloClient();

    const deleteHandler = async ()=>{
        try{
            await deleteMutation[0]({
                variables:{
                    deleteReviewId:review.id
                }
            })
            await apolloClient.resetStore()
        }catch(e){
            console.log(e)
        }
     
    }
    return <View style={styles.container}>
        <View style={styles.descriptionHead}>
            <View style={styles.avatar}><Text style={styles.bigText}>{review.rating}</Text></View>
            <View style={styles.description} >
                {/* <Text style={styles.boltText}>{review.user.username}</Text> */}
                <View><Text style={styles.greyText}>{new Date(review.createdAt).toLocaleString()}</Text></View>
                <Text>{review.text}</Text>
            </View>
        </View>
        {
            showButtons && <View style={styles.buttons}>
                <Pressable style={styles.buttonStyle} onPress={() => { navigate('/repository/' + review.repositoryId) }}><Text style={styles.btnText}>View Repository</Text></Pressable>
                <View style={{ flex: 0.5 }}></View>
                <Pressable style={styles.deleteButton} onPress={() => {
                    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress:async () => {await deleteHandler()} },
                    ]);
                }}><Text style={styles.btnText}>Delete</Text></Pressable>
            </View>
        }

    </View>
}

export default ReviewList