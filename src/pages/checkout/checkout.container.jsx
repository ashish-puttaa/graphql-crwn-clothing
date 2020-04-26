import React from 'react';
import { Query } from 'react-apollo';

import CheckoutPage from './checkout.component';

import { GET_CART_ITEMS_AND_TOTAL } from './../../graphql/queries';

const CheckoutPageContainer = () => (
   <Query query={GET_CART_ITEMS_AND_TOTAL}>
      {({ data: { cartItems, cartTotal } }) => (
         <CheckoutPage cartItems={cartItems} total={cartTotal} />
      )}
   </Query>
);

export default CheckoutPageContainer;
