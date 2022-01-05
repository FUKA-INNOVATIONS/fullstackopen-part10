import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';

import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = yup.object().shape( {
  username: yup.string().required( 'Owner name is required' ),
  password: yup.string().
      min( 5, 'Too low' ).
      max( 16, 'Too high' ).
      required( 'Password is required' ),
  passwordConfirm: yup.string().
      min( 5, 'Too short' ).
      max( 16, 'Too long' ).
      required( 'Password confirmation is required' ).
      oneOf( [ yup.ref( 'password' ), null ], 'Passwords must match' ),
} );

const SignUpForm = ( { onSubmit } ) => {
  return (
      <ScrollView>
        <FormikTextInput style={ styles.textInput } name={ 'username' }
                         placeholder={ 'Username' }/>
        <FormikTextInput style={ styles.textInput } name={ 'password' }
                         placeholder={ 'Password' }/>
        <FormikTextInput style={ styles.textInput } name={ 'passwordConfirm' }
                         placeholder={ 'Password confirmation' }/>


        <Button title={ 'Sign up' } onPress={ onSubmit }/>
      </ScrollView>
  );
};

const SignUp = () => {
  const history = useHistory();
  const [ createUser, result ] = useSignUp();
  const [ signIn ] = useSignIn();

  const onSubmit = async ( values ) => {
    const { username, password } = values;
    try {
      const data = await createUser( username, password );
      await signIn( username, password );
      history.push( '/' );
    } catch ( e ) {
      console.log( 'error in sign up: ', e );
    }
  };

  return (
      <View style={ styles.container }>
        <Text color={ 'text-primary' } fontWeight={ 'bold' }
              style={ { fontSize: 20 } }>Sign up</Text>
        <Formik initialValues={ initialValues } onSubmit={ onSubmit }
                validationSchema={ validationSchema }>
          { ( { handleSubmit } ) => <SignUpForm onSubmit={ handleSubmit }/> }
        </Formik>
      </View>
  );

};
export default SignUp;

const styles = StyleSheet.create( {
  container: {
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