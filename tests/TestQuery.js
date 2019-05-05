// @flow
import { graphql } from 'react-relay';

graphql`
  query TestQueryNestedLinkedRecordsQuery {
    viewer {
      favoritePet {
        owner {
          name
        }
      }
    }
  }
`;

graphql`
  query TestQueryQuery {
    viewer {
      ...TestQueryQuery_user
    }
  }
`;

graphql`
  query TestQueryViewerPetsQuery {
    viewer {
      name
      pets(first: 2) {
        edges {
          node {
            _id
            name
          }
        }
      }
    }
  }
`;

graphql`
  query TestQueryGetSinglePetQuery($petId: ID!) {
    Pet(petId: $petId) {
      id
      _id
      name
    }
  }
`;

graphql`
  query TestQueryUserWithAgeQuery {
    viewer {
      age
      ...TestQueryQuery_userWithAge
    }
  }
`;

graphql`
  fragment TestQueryQuery_pet on Pet {
    id
    _id
    name
    type
    grade
  }
`;

graphql`
  fragment TestQueryQuery_petWithOwner on Pet {
    id
    _id
    name
    owner {
      name
    }
  }
`;

graphql`
  fragment TestQueryQuery_user on User {
    name
    pets(first: 2) @connection(key: "TestQuery_viewer_pets") {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          _id
          name
          ...TestQueryQuery_pet
        }
      }
    }
  }
`;

graphql`
  fragment TestQueryQuery_userWithAge on User {
    name
    age
  }
`;
