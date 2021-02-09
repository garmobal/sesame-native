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
  light_italic: 'Roboto_300Light_Italic',
  regular: 'Roboto_400Regular',
  regular_italic: 'Roboto_400Regular_Italic',
  medium: 'Roboto_500Medium',
  medium_italic: 'Roboto_500Medium_Italic',
  bold: 'Roboto_700Bold',
  bold_italic: 'Roboto_700Bold_Italic',
  black: 'Roboto_900Black',
  black_italic: 'Roboto_900Black_Italic',
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
  fontSize: 20,
  padding: 14,
  borderRadius: 10,
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

export const codeInput = {
  color: colors.highlight,
  borderColor: colors.fontColor,
  paddingVertical: 8,
  textAlign: 'center',
  fontSize: 25,
  borderBottomWidth: 1,
};
