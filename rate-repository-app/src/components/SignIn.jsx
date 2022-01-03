import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    //alignItems: 'center'
    padding: 10,
    backgroundColor: 'white'
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 10,
    padding: 15,
  }

});

const initialValues = {
  userName: '',
  password: ''
}

const onSubmit = (values) => {
  console.log(values)
}

const SignIn = () => (
    <View style={styles.container}>
      <Text color={'primary'} fontWeight={'bold'}>The sign-in vjiew</Text>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <View>
          <FormikTextInput style={styles.textInput} name={'userName'} placeholder={'Username'} />
          <FormikTextInput style={styles.textInput} secureTextEntry name={'password'} placeholder={'Password'} />
          <Button title={'Sign in'} onPress={onSubmit} />
        </View>
      </Formik>
    </View>
);

export default SignIn;