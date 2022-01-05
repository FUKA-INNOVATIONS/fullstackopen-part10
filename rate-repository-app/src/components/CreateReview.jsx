import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';

import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create( {
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 10,
    padding: 15
  },

} );

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape( {
  ownerName: yup.string().required( 'Owner name is required' ),
  repositoryName: yup.string().required( 'Repo name is required' ),
  rating: yup.number().min(0, 'Too low').max(100, 'Too high').required( 'Rating is required' ),
  review: yup.string().max(250, 'Too long text, max 250 characters'),
} );

const CreateReviewForm = ( { onSubmit } ) => {
  return (
      <ScrollView>
        <FormikTextInput style={ styles.textInput } name={ 'ownerName' }
                         placeholder={ 'Repository owner name' }/>
        <FormikTextInput style={ styles.textInput } name={ 'repositoryName' }
                         placeholder={ 'Repository name' }/>
        <FormikTextInput style={ styles.textInput } name={ 'rating' }
                         placeholder={ 'Rating between 0 and 100' }/>
        <FormikTextInput style={ styles.textInput } name={ 'text' }
                         placeholder={ 'Review text' } multiline />

        <Button title={ 'Create a review' } onPress={ onSubmit }/>
      </ScrollView>
  );
};



const CreateReview = () => {
  const [createReview, result] = useCreateReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    console.log(values)
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const data = await createReview( repositoryName, ownerName, Number(rating), text )
      console.log('DDDDA: ', data)
      history.push(`/${data.createReview.repository.id}`);
    } catch ( e ) {
      console.log('error: ', e);
      alert('Have already voted? Something went wrong and review creation failed,\n\n double check given details and try again!')
    }
  }

  return (
      <View style={ styles.container }>
        <Text color={ 'text-primary' } fontWeight={ 'bold' }
              style={ { fontSize: 20 } }>Create review</Text>
        <Formik initialValues={ initialValues } onSubmit={ onSubmit }
                validationSchema={ validationSchema }>
          { ( { handleSubmit } ) => <CreateReviewForm onSubmit={ handleSubmit }/> }
        </Formik>
      </View>
  );
};

export default CreateReview;