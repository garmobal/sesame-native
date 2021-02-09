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

    const _renderHeaderMsg = () => {
      let text;
      switch (userRecState) {
        case eUserRecState.ALLOWED:
          text = (
            <Text style={styles.headerText}>
              Welcome,
              <Text style={[styles.headerText, styles.textRed]}>
                {' '}
                {userName}
              </Text>
              !
            </Text>
          );
          break;
        case eUserRecState.NOT_ALLOWED:
          text = <Text style={styles.headerText}>You shall not pass! </Text>;
          break;
        case eUserRecState.NO_USER_FOUND:
          text = <Text style={styles.headerText}>Oh, noooooo </Text>;
          break;
        default:
          text = (
            <Text style={styles.headerText}>
              Sorry, we were not able to find you.
            </Text>
          );
          break;
      }
      return text;
    };

    const _renderDescription = () => {
      let text;
      switch (userRecState) {
        case eUserRecState.ALLOWED:
          text = <Text style={styles.quoteText}>{quote}</Text>;
          break;
        case eUserRecState.NOT_ALLOWED:
          text = (
            <Text style={styles.text}>
              Sorry {userName}, you are not allowed to enter{' '}
              {selectedDoor.doorName}.
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

    const renderIssueBtn = () => {
      if (userRecState !== eUserRecState.ALLOWED) {
        return (
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
              },
              styles.issueBtn,
            ]}
            onPress={() => {
              console.log('Report issue');
            }}
          >
            <Text style={styles.issueBtnText}>Report issue</Text>
          </Pressable>
        );
      } else {
        return null;
      }
    };

    // RENDER
    return (
      <View style={styles.content}>
        {userRecState === eUserRecState.CHECKING_USER ? (
          <LottieView
            source={require('./../../assets/animations/notspinner.json')}
            autoPlay
            loop
          />
        ) : (
          <>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={_getImage()} />
            </View>
            <View style={styles.headerMsgContainer}>
              <View style={styles.textCard}>{_renderHeaderMsg()}</View>
            </View>
            <View style={styles.descriptionContainer}>
              {_renderDescription()}
            </View>
            <View style={styles.issueBtnContainer}>{renderIssueBtn()}</View>
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
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  headerMsgContainer: {
    flex: 40,
    ...cStyle.centerItem,
    textAlign: 'center',
  },
  textCard: {
    textAlign: 'center',
    ...cStyle.whiteCard,
    padding: 40,
  },
  headerText: {
    fontFamily: cStyle.fonts.bold,
    fontSize: 50,
    color: 'black',
    textAlign: 'center',
  },
  text: {
    fontFamily: cStyle.fonts.regular,
    fontSize: 27,
    color: 'black',
    textAlign: 'center',
  },
  textRed: {
    fontFamily: cStyle.fonts.bold,
    color: cStyle.colors.highlight,
  },
  imageContainer: {
    flex: 60,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  descriptionContainer: {
    flex: 16,
    padding: 40,
    ...cStyle.centerItem,
  },
  quoteText: {
    fontFamily: cStyle.fonts.regular_italic,
    fontSize: 20,
    color: cStyle.colors.highlight,
    textAlign: 'center',
  },
  issueBtnContainer: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  issueBtn: {
    width: '50%',
    marginHorizontal: 'auto',
  },
  issueBtnText: {
    fontSize: 18,
    color: cStyle.colors.fontColor,
    alignSelf: 'center',
    fontFamily: cStyle.fonts.medium,
    borderBottomWidth: 3,
    borderBottomColor: cStyle.colors.fontColor,
  },
  goBackBtnContainer: {
    flex: 20,
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
