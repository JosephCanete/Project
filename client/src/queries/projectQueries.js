import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      name
    }
  }
`;

export { GET_PROJECTS };
