import { gql } from "@apollo/client";

export const USER_LOGIN_QUERY = gql`
  query LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const USER_CREATE_QUERY = gql`
  mutation CreateUser($email: String!, $role: String!, $password: String!) {
    createUser(email: $email, role: $role, password: $password) {
      id
    }
  }
`;