import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Heading, Icon, Input, Spinner, VStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ProductsList} from './ProductsList';
import { SearchResponse} from '../interfaces/SearchInterface';
import API from '../api/Wapizima';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from '../interfaces/ProductInterfaces';
interface Props extends NativeStackScreenProps<any, any> { }


export const SearchInput = ({navigation, route }: Props) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [search] = useState('');
  

  const loadSearch = async (word: string) => {
    try {
      setLoading(true);
      if (word.length > 1) {
        const { data } = await API.get<SearchResponse>(`/search/products?search=${word}`);
        setProducts(data.results);
      } else {
        setProducts([]);
      }
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false);
      }
  };

  return (
    <>
      <VStack w="100%" space={5} alignSelf="center" mt={4} mb={4}>
        <Input
          placeholder="Buscar producto"
          width="80%"
          borderRadius="4"
          borderColor={'#FF0080'}
          py="3"
          px="1"
          alignSelf={'center'}
          fontSize="14"
          onChangeText={text => {
            setTimeout(()=> {loadSearch(text)}, 250 )
          }}
          InputLeftElement={
            <Icon
              as={Ionicons}
              onPress={() => loadSearch(search)}
              name="search-outline"
              size="md"
              color="black"
            />
          }
        />
      </VStack>
      {loading ? <Spinner size="lg" /> : 
      <ProductsList products={products} navigation={navigation} route={route} buscar={true} />}
    </>
  );
};

