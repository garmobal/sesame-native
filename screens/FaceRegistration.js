import React, { useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RedButton from '../components/UI/RedButton';
import door from '../assets/registration/door.png';

import * as cStyle from '../style';
import { clearCurrentUserImages } from '../store/actions/registrationActions';

function FaceRegistration({ navigation }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCurrentUserImages());
  }, [dispatch]);
  return (
    <React.Fragment>
      {user.fetching === 'success' ? (
        <View style={styles.container}>
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTextTitle}>
              Welcome to the recognition process{' '}
              <Text style={styles.welcomeTextTitleHighlight}>{user.name}</Text>!
            </Text>
            <Image source={door} style={styles.door} />
            <RedButton
              text={'Get started'}
              clicked={() => navigation.navigate('FaceRegistrationProcess')}
              size={'100%'}
            />
            <Text style={styles.welcomeTextBody}>
              Continuing signifies that you have read and agree to the
              <Text style={styles.welcomeTextSpan}> Terms of Service </Text>
              and our
              <Text style={styles.welcomeTextSpan}> Privacy Policy</Text>
            </Text>
          </View>
        </View>
      ) : user.fetching === 'pending' ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator
            animating={true}
            size="large"
            color={cStyle.colors.highlight}
          />
        </View>
      ) : user.fetching === 'fail' ? (
        <View style={styles.spinnerContainer}>
          <Text>Something went wrong</Text>
        </View>
      ) : null}
    </React.Fragment>
  );
}

export default FaceRegistration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: cStyle.colors.lightest,
    paddingBottom: 20,
  },
  welcomeCard: {
    width: '80%',
    flex: 4,
    ...cStyle.whiteCard,
    marginHorizontal: 30,
    justifyContent: 'space-evenly',
    marginTop: 60,
  },
  welcomeTextTitle: {
    fontFamily: cStyle.fonts.medium,
    fontSize: 38,
    color: '#444',
    // lineHeight: 50,
  },
  welcomeTextTitleHighlight: {
    fontFamily: cStyle.fonts.bold,
    // fontSize: 38,
    color: cStyle.colors.highlight,
  },
  welcomeTextBody: {
    fontFamily: cStyle.fonts.medium,
    fontSize: 12,
    marginVertical: 30,
    textAlign: 'center',
    color: cStyle.colors.fontColor,
    lineHeight: 20,
  },
  welcomeTextSpan: {
    marginVertical: 30,
    fontFamily: cStyle.fonts.medium,
    fontSize: 12,
    textAlign: 'center',
    color: cStyle.colors.fakeLink,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  door: {
    // flex: 1,
    width: 280,
    height: 280,
    resizeMode: 'contain',
    marginVertical: 30,
    // borderRadius: 100,
  },
});
