import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Image,
} from 'react-native';

import { redButton, colors } from './../style';
import DoorsList from './../components/Home/DoorsList';
import logo from './../assets/logo_placeholder.png';

function Home({ navigation }) {
  // RENDER
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logo} />
        {/* <Text style={styles.logo}>Sesame Logo</Text> */}
      </View>
      {/* <View style={styles.titleContainer}>
        <Text style={styles.title}>Sesame</Text>
      </View> */}
      <View style={styles.doorsListContainer}>
        <DoorsList navigation={navigation} />
      </View>
      <View style={styles.registerBtnContainer}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            },
            styles.registerBtn,
          ]}
          onPress={() => {
            navigation.navigate('FaceRegistration');
          }}
        >
          <Text style={styles.registerText}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
}

const centerItem = {
  justifyContent: 'center',
  alignItems: 'center',
  width: Dimensions.get('window').width,
  // borderWidth: 3,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    // padding: 10,
    backgroundColor: colors.background,
    ...centerItem,
  },
  logoContainer: {
    flex: 1.5,
    ...centerItem,
  },
  logo: {
    // width: 100,
    resizeMode: 'contain',
    width: '30%',
  },
  // titleContainer: {
  //   flex: 1,
  //   ...centerItem,
  // },
  // title: {
  //   fontSize: 20,
  // },
  doorsListContainer: {
    flex: 4,
    ...centerItem,
  },
  registerBtnContainer: {
    flex: 1,
    ...centerItem,
  },
  registerBtn: {
    ...redButton,
  },
  registerText: {
    fontSize: 20,
    padding: 5,
    color: '#FFF',
  },
});
export default Home;
