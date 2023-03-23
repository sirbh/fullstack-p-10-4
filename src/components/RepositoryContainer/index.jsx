import RepositiryItem from "./RepositoryItem";
import { FlatList, StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryContainer = ({ repositioriesList }) => {
   
    const repositiories = repositioriesList.repositories.edges.map(edge=>edge.node)

    return <FlatList
        data={repositiories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) =>
            <RepositiryItem repository={item} />
        }
        keyExtractor={(item) => item.id}
    />
}

export default RepositoryContainer