import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useSelector } from 'react-redux';

import * as cStyle from './../../style';

const TextMessage = React.memo(({ faceRecState, eFaceRecState }) => {
  // GLOBAL STATE
  const quotes = useSelector((state) => state.quotes);

  // LOCAL STATE
  const [quote, setQuote] = useState('');

  useEffect(() => {
    /**
     * Return a random quote from the quotes saved in the .csv file.
     */
    const _getRandomQuote = () => {
      const index = Math.floor(Math.random() * quotes.length);
      return quotes[index];
    };
    setQuote(`"${_getRandomQuote()}"`);
  }, [quotes]);

  let textMessage;
  switch (faceRecState) {
    case eFaceRecState.FACE_DETECTED:
      textMessage = 'Welcome, Francesco!';
      break;
    case eFaceRecState.FACE_NOT_DETECTED:
      textMessage = "Sorry, we can't recognize you";
      break;
    case eFaceRecState.CHECKING_FACE:
      textMessage = 'Checking identity..';
      break;
    default:
      textMessage = '';
  }

  // RENDER
  return (
    <View style={styles.content}>
      <View style={styles.textContainer}>
        <View style={styles.textCard}>
          <Text style={styles.text}>{textMessage}</Text>
        </View>
      </View>
      {faceRecState === eFaceRecState.FACE_DETECTED ? (
        <View style={styles.quoteContainer}>
          <View style={styles.quoteCard}>
            <Text style={styles.quoteText}>{quote}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    ...cStyle.centerItem,
  },
  textCard: {
    ...cStyle.whiteCard,
    padding: 40,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: 'black',
  },
  quoteContainer: {
    flex: 3,
    padding: 20,
  },
  quoteCard: {
    ...cStyle.whiteCard,
    padding: 30,
  },
  quoteText: {
    fontFamily: 'Roboto',
    fontSize: 27,
    color: cStyle.colors.highlight,
  },
});

export default TextMessage;
