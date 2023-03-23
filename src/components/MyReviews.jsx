import { useQuery } from "@apollo/client"
import { FlatList, View } from "react-native"
import { ME } from "../graphQL/queries"
import ReviewList from "./RepositoryView/ReviewList"
import Text from "./Text"

const MyReviews = () => {
    const { data, error, loading } = useQuery(ME, {
        variables: {
            includeReviews: true
        }
    })
    if(error){
        return <View><Text>Something went wrong....</Text></View>
    }
    if(loading){
        return <View><Text>Loading...</Text></View>
    }
    const reviews = data.me.reviews.edges.map((review) => review.node);
    return <View style={{marginTop:10}}>
         <FlatList
        data={reviews}
        renderItem={({item}) => <ReviewList review={item} showButtons={true} />}
      />
    </View>
}

export default MyReviews