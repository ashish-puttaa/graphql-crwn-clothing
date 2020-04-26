import { gql } from 'apollo-boost';

export const GET_CART_HIDDEN = gql`
   {
      cartHidden @client
   }
`;

export const GET_CART_ITEMS = gql`
   {
      cartItems @client
   }
`;

export const GET_CART_QUANTITY = gql`
   {
      cartQuantity @client
   }
`;

export const GET_CART_TOTAL = gql`
   {
      cartTotal @client
   }
`;

export const GET_COLLECTIONS = gql`
   {
      collections {
         id
         title
         items {
            id
            name
            price
            imageUrl
         }
      }
   }
`;

export const GET_COLLECTION_BY_TITLE = gql`
   query getCollectionsByTitle($title: String!) {
      getCollectionsByTitle(title: $title) {
         id
         title
         items {
            id
            name
            price
            imageUrl
         }
      }
   }
`;

export const GET_CART_ITEMS_AND_TOTAL = gql`
   {
      cartItems @client
      cartTotal @client
   }
`;

export const GET_CURRENT_USER = gql`
   {
      currentUser @client
   }
`;
