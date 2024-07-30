import { gql } from "@apollo/client";

export const GET_ALL_ADS_QUERY = gql`
  query GetAllAds {

    getAllAds {
        id
        title
        description
        price
        picture
    }
    getAllCategories {
        id
        name
    }
    
  }
`;

export const PUBLISH_AD_MUTATION = gql`
  mutation PublishAd($title: String!, $description: String, $price: Int, $tags: [String!]!, $categoryId: Int, $categoryName: String) {

    publishAd(adData: { 
        title: $title,
        description: $description,
        price: $price,
        tags: $tags,
        category: { id: $categoryId, name: $categoryName } 
     }) {
        id
        title
        description
        price
        picture
        createdAt
    }
    
  }
`;
