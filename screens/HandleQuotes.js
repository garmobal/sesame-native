import React from 'react';
import { Text, View } from 'react-native';

import { useSelector } from 'react-redux';

function HandleQuotes() {
  const quotes = useSelector((state) => state.quotes);
  console.log('quotes :>> ', quotes);
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
}

export default HandleQuotes;
