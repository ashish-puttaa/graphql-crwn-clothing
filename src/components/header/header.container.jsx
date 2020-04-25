import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import Header from './header.component';

const GET_CART_HIDDEN = gql`
   {
      cartHidden @client
   }
`;

const HeaderContainer = () => (
   <Query query={GET_CART_HIDDEN}>
      {({ data: { cartHidden } }) => <Header hidden={cartHidden} />}
   </Query>
);

export default HeaderContainer;
