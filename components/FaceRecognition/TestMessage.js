import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useSelector } from 'react-redux';

const TestMessage = React.memo(
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

    let testMessage;
    switch (faceRecState) {
      case eFaceRecState.FACE_DETECTED:
        testMessage = _getRandomQuote();
        break;
      case eFaceRecState.FACE_NOT_DETECTED:
        testMessage = 'Face not detected';
        break;
      case eFaceRecState.TAKE_SELFIE:
        testMessage = `Take a selfie to enter ${selectedDoor.name}`;
        break;
      case eFaceRecState.CHECKING_FACE:
        testMessage = 'We are checking your identity';
        break;
      default:
        testMessage = '';
    }

    // RENDER
    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>{testMessage}</Text>
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

export default TestMessage;
