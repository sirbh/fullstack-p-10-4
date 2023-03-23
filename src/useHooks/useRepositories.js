import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphQL/queries";

const useRepositories = (orderBy, direction,query) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: orderBy,
      orderDirection: direction,
      searchKeyword:query
    },
  });
  return { data, loading, error };
};

export default useRepositories;
