import gql from 'graphql-tag';

export default gql`
  query gqlGenTestQuery {
    allFilms {
      edges {
        node {
          title
        }
      }
    }
  }
`;
