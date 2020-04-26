import { gql } from 'apollo-boost';

import {
   addItemToCart as addItemToCartUtil,
   getCartQuantity as getCartQuantityUtil,
   getCartTotal as getCartTotalUtil,
   clearItemFromCart as clearItemFromCartUtil,
   removeItemFromCart as removeItemFromCartUtil,
} from './cart.utils';

import {
   GET_CART_HIDDEN,
   GET_CART_ITEMS,
   GET_CART_QUANTITY,
   GET_CART_TOTAL,
   GET_CURRENT_USER,
} from './queries';

export const typeDefs = gql`
   extend type Item {
      quantity: Int
   }

   extend type DateTime {
      nanoseconds: Int!
      seconds: Int!
   }

   extend type User {
      id: ID!
      displayName: String!
      email: String!
      createdAt: DateTime!
   }

   extend type Mutation {
      ToggleCartHidden: Boolean!
      AddItemToCart(item: Item!): [Item]!
      ClearItemFromCart(item: Item!): [Item]!
      RemoveItemFromCart(item: Item!): [Item]!
      SetCurrentUser(user: User!): User!
   }
`;

const newCartItemsRelatedQueries = (cache, newCartItems) => {
   cache.writeQuery({
      query: GET_CART_ITEMS,
      data: { cartItems: newCartItems },
   });

   cache.writeQuery({
      query: GET_CART_QUANTITY,
      data: { cartQuantity: getCartQuantityUtil(newCartItems) },
   });

   cache.writeQuery({
      query: GET_CART_TOTAL,
      data: { cartTotal: getCartTotalUtil(newCartItems) },
   });
};

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

         newCartItemsRelatedQueries(cache, newCartItems);

         return newCartItems;
      },

      clearItemFromCart: (_root, _args, _context) => {
         const { item } = _args;
         const { cache } = _context;

         const { cartItems } = cache.readQuery({
            query: GET_CART_ITEMS,
         });

         const newCartItems = clearItemFromCartUtil(cartItems, item);

         newCartItemsRelatedQueries(cache, newCartItems);

         return newCartItems;
      },

      removeItemFromCart: (_root, _args, _context) => {
         const { item } = _args;
         const { cache } = _context;

         const { cartItems } = cache.readQuery({
            query: GET_CART_ITEMS,
         });

         const newCartItems = removeItemFromCartUtil(cartItems, item);

         newCartItemsRelatedQueries(cache, newCartItems);

         return newCartItems;
      },

      setCurrentUser: (_root, _args, _context) => {
         const { user } = _args;
         const { cache } = _context;

         console.log('Woohoo');

         cache.writeQuery({
            query: GET_CURRENT_USER,
            data: { currentUser: user },
         });

         return user;
      },
   },
};
