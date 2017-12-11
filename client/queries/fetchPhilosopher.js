import gql from 'graphql-tag';

export default gql`
  query PhilosopherQuery($id: ID!) {
    philosopher(id: $id) {
      id
      name
      opponents {
        id
        content
      }
      doctorines {
        id
        content
      }
      arguments {
        id
        content
      }
    }
  }
`;
