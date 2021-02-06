import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import * as QuoteActions from './../store/actions/quotesActions';

import Quote from '../components/HandleQuotes/Quote';

import fileUri from './../fileSystemUri';

function HandleQuotes() {
  const dispatch = useDispatch();
  const quotes = useSelector((state) => state.quotes);

  const removeQuote = (id) => {
    dispatch(QuoteActions.removeQuote(fileUri, quotes, id));
  };

  return (
    <View>
      {quotes.length !== 0
        ? quotes.map((quote) => (
            <Quote key={quote.id} quote={quote} removeQuote={removeQuote} />
          ))
        : null}
    </View>
  );
}

export default HandleQuotes;
