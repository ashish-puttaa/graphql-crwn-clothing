import { gql } from 'apollo-boost';

import {
   addItemToCart as addItemToCartUtil,
   getCartQuantity as getCartQuantityUtil,
} from './cart.utils';

export const typeDefs = gql`
   extend type Item {
      quantity: Int
   }

   extend type Mutation {
      ToggleCartHidden: Boolean!
      AddItemToCart(item: Item!): [Item]!
   }
`;

const GET_CART_HIDDEN = gql`
   {
      cartHidden @client
   }
`;

const GET_CART_ITEMS = gql`
   {
      cartItems @client
   }
`;

const GET_CART_QUANTITY = gql`
   {
      cartQuantity @client
   }
`;

export const resolvers = {
   Mutation: {
      toggleCartHidden: (_root, _args, { cache }) => {
         const { cartHidden } = cache.readQuery({
            query: GET_CART_HIDDEN,
         });

         cache.writeQuery({
            query: GET_CART_HIDDEN,
            data: { cartHidden: !cartHidden },
         });

         return !cartHidden;
      },

      addItemToCart: (_root, _args, _context) => {
         const { item } = _args;
         const { cache } = _context;

         const { cartItems } = cache.readQuery({
            query: GET_CART_ITEMS,
         });

         const newCartItems = addItemToCartUtil(cartItems, item);

         cache.writeQuery({
            query: GET_CART_QUANTITY,
            data: { cartQuantity: getCartQuantityUtil(newCartItems) },
         });

         cache.writeQuery({
            query: GET_CART_ITEMS,
            data: { cartItems: newCartItems },
         });

         return newCartItems;
      },
   },
};
