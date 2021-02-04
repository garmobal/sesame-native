import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useSelector } from 'react-redux';

const TextMessage = React.memo(
  ({ faceRecState, selectedDoor, eFaceRecState }) => {
    // GLOBAL STATE
    const quotes = useSelector((state) => state.quotes);

    // HELPER FUNCTIONS
    /**
     * Return a random quote from the quotes saved in the .csv file.
     */
    const _getRandomQuote = () => {
      const index = Math.floor(Math.random() * quotes.length);
      return quotes[index];
    };

    let textMessage;
    switch (faceRecState) {
      case eFaceRecState.FACE_DETECTED:
        textMessage = _getRandomQuote();
        break;
      case eFaceRecState.FACE_NOT_DETECTED:
        textMessage = 'Face not detected';
        break;
      case eFaceRecState.TAKE_SELFIE:
        textMessage = `Take a selfie to enter ${selectedDoor.name}`;
        break;
      case eFaceRecState.CHECKING_FACE:
        textMessage = 'We are checking your identity';
        break;
      case eFaceRecState.TAKING_PICTURE:
        textMessage = 'Taking the picture';
        break;
      default:
        textMessage = '';
    }

    // RENDER
    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>{textMessage}</Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default TextMessage;
