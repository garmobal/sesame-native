import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';

import allowed from './../../assets/allowed.png';
import notAllowed from './../../assets/not_allowed.png';
import notFound from './../../assets/not_found.png';

import * as cStyle from './../../style';

const TextMessage = React.memo(
  ({ userRecState, eUserRecState, userName, selectedDoor }) => {
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

    // RENDER
    return (
      <View style={styles.content}>
        {userRecState === eUserRecState.ALLOWED ? (
          <>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={allowed} />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.textCard}>
                <Text style={styles.text}>
                  Welcome,
                  <Text style={[styles.text, styles.textRed]}> Francesco</Text>!
                </Text>
              </View>
            </View>

            <View style={styles.quoteContainer}>
              <Text style={styles.quoteText}>{quote}</Text>
            </View>
          </>
        ) : null}
        {userRecState === eUserRecState.NOT_ALLOWED ? (
          <>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={notAllowed} />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.textCard}>
                <Text style={styles.text}>
                  Sorry
                  <Text style={[styles.text, styles.textRed]}> Francesco</Text>,
                  you are not allowed to enter{' '}
                  <Text style={[styles.text, styles.textRed]}>
                    {selectedDoor.doorName}
                  </Text>
                  .
                </Text>
              </View>
            </View>
            <View style={styles.quoteContainer} />
          </>
        ) : null}
        {userRecState === eUserRecState.NO_USER_FOUND ? (
          <>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={notFound} />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.textCard}>
                <Text style={styles.text}>
                  Sorry, we were not able to find you.
                </Text>
              </View>
            </View>
            <View style={styles.quoteContainer} />
          </>
        ) : null}
        {userRecState === eUserRecState.CHECKING_USER ? (
          <LottieView
            source={require('./../../assets/animations/notspinner.json')}
            autoPlay
            loop
          />
        ) : null}
      </View>
    );
  },
);

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
  textRed: {
    fontFamily: cStyle.fonts.bold,
    color: cStyle.colors.highlight,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
