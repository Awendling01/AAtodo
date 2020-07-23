import React from "react";
import "./App.css";
import gql from "graphql-tag";
import { useCurrentUserQuery, User } from "./generated/graphql";
import Dashboard from "./components/Dashboard";

export const currentUserQuery = gql`
  query CurrentUser($id: Int!) {
    userById(id: $id) {
      __typename
      id
      nodeId
      firstName
      lastName
      username
      createdAt
      updatedAt
      todosByUserId {
        __typename
        nodes {
          __typename
          id
          nodeId
          name
          category
          dueDate
          completed
          sortOrder
          userId
          createdAt
          updatedAt
        }
      }
    }
  }
`;

const App = () => {
  const currentUserId = 1;
  const { data, loading } = useCurrentUserQuery({
    variables: { id: currentUserId },
  });

  if (loading) {
    return <div>"...User Loading"</div>;
  }
  if (data?.userById) {
    return <Dashboard currentUser={data.userById as User} />;
  }
  return <div>Login form</div>;
};

export default App;
