import {Box} from 'native-base';
import React from 'react';
import {FlatList} from 'react-native';

import CardProductBuy from './CardProductBuy';

export const ProductsList = ({products}: any) => {
  return (
    <>
      <FlatList
        data={products}
        horizontal
        onEndReachedThreshold={0.4}
        keyExtractor={item => item._id}
        renderItem={({item}) => <CardProductBuy product={item} />}></FlatList>
    </>
  );
};
