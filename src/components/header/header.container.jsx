import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import Header from './header.component';

import { GET_CART_HIDDEN, GET_CURRENT_USER } from './../../graphql/queries';

const HeaderContainer = ({
   cartHiddenData: { cartHidden },
   currentUserData: { currentUser },
}) => <Header hidden={cartHidden} currentUser={currentUser} />;

export default compose(
   graphql(GET_CART_HIDDEN, { name: 'cartHiddenData' }),
   graphql(GET_CURRENT_USER, { name: 'currentUserData' })
)(HeaderContainer);
