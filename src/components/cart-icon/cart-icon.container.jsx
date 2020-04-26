import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import CartIcon from './cart-icon.component';

import { GET_CART_QUANTITY } from './../../graphql/queries';
import { TOGGLE_CART_HIDDEN } from './../../graphql/mutations';

const CartIconContainer = ({ data: { cartQuantity }, toggleCartHidden }) => (
   <CartIcon toggleCartHidden={toggleCartHidden} itemCount={cartQuantity} />
);

export default compose(
   graphql(GET_CART_QUANTITY, { name: 'data' }),
   graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' })
)(CartIconContainer);
