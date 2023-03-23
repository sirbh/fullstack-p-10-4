import { useQuery } from "@apollo/client";
import { FlatList, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../../graphQL/queries";
import RepositiryItem from "../RepositoryContainer/RepositoryItem";
import ReviewList from "./ReviewList";


const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const RespostitoryView = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network'
  });
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>Something Went Wrong...</Text>
      </View>
    );
  }


  const reviews = data.repository.reviews.edges.map((review) => review.node);


  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <View>
      <FlatList
        data={reviews}
        renderItem={({item}) => <ReviewList review={item} />}
        ListHeaderComponent={() => <RepositiryItem repository={data.repository} />}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default RespostitoryView;
