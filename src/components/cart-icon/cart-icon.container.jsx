import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation, Query, graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import CartIcon from './cart-icon.component';

const TOGGLE_CART_HIDDEN = gql`
   mutation ToggleCartHidden {
      toggleCartHidden @client
   }
`;

const GET_CART_QUANTITY = gql`
   {
      cartQuantity @client
   }
`;

const CartIconContainer = ({ data: { cartQuantity }, toggleCartHidden }) => (
   <CartIcon toggleCartHidden={toggleCartHidden} itemCount={cartQuantity} />
);

export default compose(
   graphql(GET_CART_QUANTITY, { name: 'data' }),
   graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' })
)(CartIconContainer);
