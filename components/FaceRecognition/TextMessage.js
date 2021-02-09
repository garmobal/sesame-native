import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';

import allowed from './../../assets/allowed.png';
import notAllowed from './../../assets/not_allowed.png';
import notFound from './../../assets/not_found.png';

import * as cStyle from './../../style';

const TextMessage = React.memo(
  ({
    userRecState,
    eUserRecState,
    userName,
    selectedDoor,
    setUserRecState,
  }) => {
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

    const _getImage = () => {
      let image;
      switch (userRecState) {
        case eUserRecState.ALLOWED:
          image = allowed;
          break;
        case eUserRecState.NOT_ALLOWED:
          image = notAllowed;
          break;
        case eUserRecState.NO_USER_FOUND:
          image = notFound;
          break;
        default:
          image = notFound;
          break;
      }
      return image;
    };

    const _renderText = () => {
      let text;
      switch (userRecState) {
        case eUserRecState.ALLOWED:
          text = (
            <Text style={styles.text}>
              Welcome,
              <Text style={[styles.text, styles.textRed]}> {userName}</Text>!
            </Text>
          );
          break;
        case eUserRecState.NOT_ALLOWED:
          text = (
            <Text style={styles.text}>
              Sorry
              <Text style={[styles.text, styles.textRed]}> {userName}</Text>,
              you are not allowed to enter{' '}
              <Text style={[styles.text, styles.textRed]}>
                {selectedDoor.doorName}
              </Text>
              .
            </Text>
          );
          break;
        case eUserRecState.NO_USER_FOUND:
          text = (
            <Text style={styles.text}>
              Sorry, we were not able to find you.
            </Text>
          );
          break;
        default:
          text = (
            <Text style={styles.text}>
              Sorry, we were not able to find you.
            </Text>
          );
          break;
      }
      return text;
    };

    const _renderQuote = () => {
      if (userRecState === eUserRecState.ALLOWED) {
        return <Text style={styles.quoteText}>{quote}</Text>;
      } else {
        return null;
      }
    };

    // RENDER
    return (
      <View style={styles.content}>
        {userRecState !== eUserRecState.CHECKING_USER ? (
          <>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={_getImage()} />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.textCard}>{_renderText()}</View>
            </View>
            <View style={styles.quoteContainer}>{_renderQuote()}</View>
            <View style={styles.goBackBtnContainer}>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                  },
                  styles.goBackBtn,
                ]}
                onPress={() => {
                  setUserRecState(eUserRecState.TAKE_SELFIE);
                }}
              >
                <Text style={styles.goBackBtnText}>Go back</Text>
              </Pressable>
            </View>
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
  goBackBtnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  goBackBtn: {
    ...cStyle.redButton,
    width: '50%',
    marginHorizontal: 'auto',
  },
  goBackBtnText: {
    ...cStyle.redButtonText,
    fontSize: 18,
  },
});

export default TextMessage;
