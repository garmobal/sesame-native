import * as actionTypes from './actionTypes';
import * as FileSystem from 'expo-file-system';
import mockQuotes from './../../mockData/quotes.mock';

/**
 * Write the mock quotes in the csv file and set the state equal to the mock quotes.
 *
 * @param {string} fileUri, location of the csv file.
 */
export const setQuotes = (fileUri) => {
  return (dispatch) => {
    FileSystem.writeAsStringAsync(fileUri, mockQuotes.join(';')).then(() => {
      dispatch({ type: actionTypes.SET_QUOTES, payload: mockQuotes });
    });
  };
};

/**
 * Read the quotes saved in the csv file and set the state equal to the read quotes.
 *
 * @param {string} fileUri, location of the csv file.
 */
export const fetchQuotes = (fileUri) => {
  return (dispatch) => {
    FileSystem.readAsStringAsync(fileUri).then((data) => {
      const payload = data.split(';');
      dispatch({ type: actionTypes.SET_QUOTES, payload: payload });
    });
  };
};