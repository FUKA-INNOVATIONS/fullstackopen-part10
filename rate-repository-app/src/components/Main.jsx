import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';


import theme from '../theme';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const Main = () => {
  return (
      <View style={styles.container}>
        <AppBar />
        <Switch>
          <Route path="/" exact>
            <RepositoryList />
          </Route>
          <Route path={'/user-reviews'} exact>
            <UserReviews />
          </Route>
          <Route path={'/create-review'} exact>
            <CreateReview />
          </Route>
          <Route path={'/sign-in'} exact>
            <SignIn />
          </Route>
          <Route path={'/sign-up'} exact>
            <SignUp />
          </Route>
          <Route path={'/:id'} exact>
            <SingleRepository />
          </Route>
          <Redirect to="/" />
        </Switch>
      </View>
  );
};

export default Main;