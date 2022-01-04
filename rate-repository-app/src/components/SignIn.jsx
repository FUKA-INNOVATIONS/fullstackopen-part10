import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create( {
  container: {
    //alignItems: 'center'
    padding: 10,
    backgroundColor: 'white',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 10,
    padding: 15,
  },

} );

const initialValues = {
  userName: '',
  password: '',
};

const validationSchema = yup.object().shape( {
  userName: yup.string().required( 'Username is required' ),
  password: yup.string().required( 'Password is required' ),
} );

const submitHandler = ( values ) => {
  console.log( 'Sign-in values', values );

};

const SignInForm = ( { onSubmit } ) => {
  return (
      <View>
        <FormikTextInput style={ styles.textInput } name={ 'userName' }
                         placeholder={ 'Username' }/>
        <FormikTextInput style={ styles.textInput } secureTextEntry
                         name={ 'password' } placeholder={ 'Password' }/>
        <Button title={ 'Sign in' } onPress={ onSubmit }/>
      </View>
  );
};

const SignIn = () => {
  //Result contains accessToken and expiresAt
  const [ signIn, result ] = useSignIn();
  const [ token, setToken ] = useState( null );
  const history = useHistory();

  const onSubmit = async ( values ) => {
    const { userName, password } = values;
    try {
      await signIn( userName, password );
      // setToken issue here
      // result.data.authorize is retrieved too late, causes error
      // login need twice calling onSbmit, this is fixed with useEffect
    } catch ( e ) {
      console.log( 'error in SignIn: ', e );
    }
  };

  useEffect( () => {
    if ( result.loading === false && result.called && result.data !==
        'undefined' ) {
      const { accessToken } = result.data.authorize;
      setToken( accessToken );
    }
  }, [ result ] );

  useEffect( () => {
      if (token ) history.push( '/' );
  }, [ token ] );


  return (
      <View style={ styles.container }>
        <Text color={ 'text-primary' } fontWeight={ 'bold' }
              style={ { fontSize: 20 } }>Sign in</Text>
        <Formik initialValues={ initialValues } onSubmit={ onSubmit }
                validationSchema={ validationSchema }>
          { ( { handleSubmit } ) => <SignInForm onSubmit={ handleSubmit }/> }
        </Formik>
      </View>
  );
};

export default SignIn;