import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { SET_CURRENT_USER } from './../graphql/mutations';
import { GET_CURRENT_USER } from './../graphql/queries';

import App from './App';

const AppContainer = ({ currentUserData: { currentUser }, setCurrentUser }) => (
   <App
      currentUser={currentUser}
      setCurrentUser={(user) => setCurrentUser({ variables: { user } })}
   />
);

export default compose(
   graphql(GET_CURRENT_USER, { name: 'currentUserData' }),
   graphql(SET_CURRENT_USER, { name: 'setCurrentUser' })
)(AppContainer);
