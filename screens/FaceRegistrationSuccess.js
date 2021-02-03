import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';

import {
  clearCurrentImage,
  clearCurrentUser,
} from '../store/actions/registrationActions';

const FaceRegistrationSuccess = ({ navigation }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.registrationStatus);

  useEffect(() => {
    dispatch(clearCurrentImage());
    dispatch(clearCurrentUser());
    //   navigation.addListener('beforeRemove', (e) => {
    //     e.preventDefault();
    //     navigation.dispatch(StackActions.popToTop());
    //   });
    //   console.log(StackActions.popToTop());
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Congratulations! You're face is now registered! Click on any door and
        point the camera to your face to open it. This is your manual entry
        code: {status.doorKey}.
      </Text>
      <Pressable
        style={styles.goHomeButton}
        // onPress={() => navigation.dispatch(StackActions.pop(1))}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.goHomeButtonText}>Done</Text>
      </Pressable>
    </View>
  );
};

export default FaceRegistrationSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    flex: 1,
  },
  goHomeButton: {
    flex: 1,
  },
  goHomeButtonText: {
    flex: 1,
  },
});
