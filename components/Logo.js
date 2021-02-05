import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import * as cStyle from './../style';
import logo from './../assets/logo_placeholder.png';

function Logo() {
  // RENDER
  return (
    <View style={styles.logoContainer}>
      <Image style={styles.logo} source={logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    // flex: 0.8,
    ...cStyle.centerItem,
    backgroundColor: cStyle.colors.lightest,
  },
  logo: {
    resizeMode: 'contain',
    width: '40%',
  },
});
export default Logo;
