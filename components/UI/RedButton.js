import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import * as cStyle from './../../style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

function RedButton(props) {
  return (
    <Pressable
      style={{ ...styles.redButton, width: props.size }}
      onPress={props.clicked}
    >
      <Text style={styles.redButtonText}>{props.text}</Text>
      {props.icon ? (
        <FontAwesomeIcon icon={faCamera} style={styles.icon} />
      ) : null}
    </Pressable>
  );
}

export default RedButton;

const styles = StyleSheet.create({
  redButton: {
    padding: 14,
    flexDirection: 'row',
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: cStyle.colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 7,
  },
  redButtonText: {
    fontSize: 15,
    color: cStyle.colors.lightest,
    textAlign: 'center',
    fontFamily: cStyle.fonts.medium,
  },
  icon: {
    marginLeft: 10,
    color: 'white',
  },
});
