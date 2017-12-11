import gql from 'graphql-tag';

export default gql`
  {
    philosophers {
      id
      name
      opponents {
        id
        content
      }
      arguments {
        id
        content
      }
      doctorines {
        id
        content
      }
    }
  }

`;
