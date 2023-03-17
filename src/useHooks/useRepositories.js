import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphQL/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  return { data,loading,error};
};

export default useRepositories;