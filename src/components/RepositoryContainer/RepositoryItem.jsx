import { View, Image, StyleSheet, Pressable } from "react-native"
import { useNavigate } from "react-router-native";
import Text from "../Text";
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
    RepoContainer: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    descriptionHead: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginRight: 10,
    },
    description: {
        flex: 1
    },
    repoFacts: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center'
    },
    fact: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
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
        padding: 5
    },
    fullWidth: {
        backgroundColor: '#0366d6',
        borderRadius: 5,
        padding: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    whiteText: {
        color: 'white',
    }


});

const RepositiryItem = ({ repository }) => {

    const navigate = useNavigate()

    return <Pressable onPress={() => navigate(`/repository/${repository.id}`)}><View style={styles.RepoContainer} testID="repositoryItem">
        <View style={styles.descriptionHead}>
            <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
            <View style={styles.description} >
                <Text style={styles.boltText}>{repository.fullName}</Text>
                <View><Text style={styles.greyText}>{repository.description}</Text></View>
                <Text style={styles.buttonStyle}>{repository.language}</Text>
            </View>
        </View>
        <View style={styles.repoFacts}>
            <View style={styles.fact}>
                <Text style={styles.boltText}>{repository.stargazersCount > 1000 ? (repository.stargazersCount / 1000).toFixed(1) + 'k' : repository.stargazersCount}</Text>
                <Text>Stars</Text>
            </View>
            <View style={styles.fact}>
                <Text style={styles.boltText}>{repository.forksCount > 1000 ? (repository.forksCount / 1000).toFixed(1) + 'k' : repository.forksCount}</Text>
                <Text>Forks</Text>
            </View>
            <View style={styles.fact}>
                <Text style={styles.boltText}>{repository.reviewCount > 1000 ? (repository.reviewCount / 1000).toFixed(1) + 'k' : repository.reviewCount}</Text>
                <Text>Reviews</Text>
            </View>
            <View style={styles.fact}>
                <Text style={styles.boltText}>{repository.ratingAverage > 1000 ? (repository.ratingAverage / 1000).toFixed(1) + 'k' : repository.ratingAverage}</Text>
                <Text>Ratings</Text>
            </View>
        </View>
        {repository.url ? <Pressable style={styles.fullWidth} onPress={()=>{Linking.openURL(repository.url)}}>
            <Text style={styles.whiteText}>Open In Github</Text>
        </Pressable> : null}
    </View>
    </Pressable>
}

export default RepositiryItem