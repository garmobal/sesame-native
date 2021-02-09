import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useSelector } from 'react-redux';

import * as cStyle from './../../style';

const TextMessage = React.memo(({ userRecState, eUserRecState, userName }) => {
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
      return quotes[index].text;
    };
    setQuote(`"${_getRandomQuote()}"`);
  }, [quotes]);

  let textMessage;
  switch (userRecState) {
    case eUserRecState.ALLOWED:
      textMessage = `Welcome, ${userName}!`;
      break;
    case eUserRecState.NOT_ALLOWED:
      textMessage = `Sorry ${userName}, you're not allowed to enter`;
      break;
    case eUserRecState.CHECKING_USER:
      textMessage = 'Checking identity..';
      break;
    case eUserRecState.NO_USER_FOUND:
      textMessage = 'No user found';
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
      {userRecState === eUserRecState.ALLOWED ? (
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>{quote}</Text>
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
    fontFamily: cStyle.fonts.regular,
    fontSize: 27,
    color: 'black',
  },
  quoteContainer: {
    flex: 0.4,
    padding: 40,
    ...cStyle.centerItem,
  },
  quoteText: {
    fontFamily: cStyle.fonts.regular_italic,
    fontSize: 20,
    color: cStyle.colors.highlight,
  },
});

export default TextMessage;
