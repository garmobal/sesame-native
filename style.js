import { Dimensions } from 'react-native';

export const colors = {
  highlight: '#B00E23',
  background: '#E8E8E8',
  fontColor: '#8E8E8E',
  lightest: '#FFF',
  darkest: '#000',
};

export const container = {
  flexDirection: 'column',
  flex: 1,
  ...centerItem,
};

export const content = {
  flex: 5,
  backgroundColor: colors.background,
};

export const centerItem = {
  justifyContent: 'center',
  alignItems: 'center',
  width: Dimensions.get('window').width,
};

export const fonts = {
  light: 'Roboto_300Light',
  regular: 'Roboto_400Regular',
  medium: 'Roboto_500Medium',
  bold: 'Roboto_700Bold',
  black: 'Roboto_900Black',
};

export const door = {
  borderWidth: 3,
  height: '100%',
  width: 200,
  marginLeft: 30,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 15,
};

export const whiteCard = {
  backgroundColor: colors.lightest,
  borderRadius: 15,
  alignItems: 'center',
  justifyContent: 'center',
};

export const card = {
  backgroundColor: colors.lightest,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 15,
};

export const redButton = {
  fontSize: 30,
  padding: 10,
  borderRadius: 5,
  backgroundColor: colors.highlight,
  justifyContent: 'center',
  alignItems: 'center',
};

export const redButtonText = {
  fontSize: 30,
  color: colors.lightest,
  textAlign: 'center',
  fontFamily: fonts.regular,
};

export const textInput = {};
