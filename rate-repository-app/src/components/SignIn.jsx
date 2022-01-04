import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
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
  const [signIn, result] = useSignIn();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const onSubmit = async (values) => {
    const { userName, password } = values;
    console.log('u: ', userName);
    console.log('p: ', password);
    console.log('v: ', values);

    try {
       await signIn(userName, password);
       await setToken(result.data.authorize);
     } catch (e) {
       console.log(e);
     }
  };

  console.log('r: ', result.data);
  console.log('token: ', token);

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