import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';

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
  console.log('Sign-in values', values );
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

const SignIn = () => (
    <View style={ styles.container }>
      <Text color={ 'text-primary' } fontWeight={ 'bold' }
            style={ { fontSize: 20 } }>Sign in</Text>
      <Formik initialValues={ initialValues } onSubmit={ submitHandler }
              validationSchema={ validationSchema }>
        { ( { handleSubmit } ) => <SignInForm onSubmit={ handleSubmit }/> }
      </Formik>
    </View>
);

export default SignIn;