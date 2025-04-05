import React, { useEffect, useRef, useState, useContext, useLayoutEffect } from 'react';
import {
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import API from '../api/Wapizima';
import { CategoriesResponse, Category } from '../interfaces/CategoryInterfaces';
import { Loading } from '../components/Loading';
import { Box, Heading, HStack, Spinner, Text } from 'native-base';
import { PaginationdResponse } from '../interfaces/ResponsePaginationInterfaces';
 import { CardProductBuy } from '../components/CardProductBuy';
import { CategorySubBox } from '../components/Category&SubBox';
import { Product } from '../interfaces/ProductInterfaces';


interface Props extends NativeStackScreenProps<any, any> { }

 export const BrandScreen = ({ route, navigation }: Props) => {

  const brand = route.params!;
  const [categories, setCategories]= useState<Category[]>();
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingP, setLoadingP] = useState(false);
  const [LoadingSpinner, setLoadinSpinner] = useState(false);
  const [pageLimit, setPageLimit] = useState<boolean | undefined>(undefined)
  const [page, setPage] = useState(1);


 
  const zeroArray = async (item: any) => {
    products.splice(0, products.length)
   await getProductsByCategory(item._id, brand._id)
  };

  const getProductsByCategory = async (category: string, brandId: any) => {
    
    try {
      setLoadinSpinner(true)
      const { data } = await API.get<PaginationdResponse>(
        `/products/category-brand-pagination/${category}/${brandId}?limit=5&page=` + page,
      )
      setProducts([...products, ...data.products]);
      setPageLimit(data.hasNextPage);
      setLoadinSpinner(false)
    } catch (error: any) {
      console.log(error.response.data, 'getProductsByCategory Error');
      setLoadinSpinner(false)
    } 
  };

  const fetchMoreData = () => {
    setPage(page + 1)
  }

  useLayoutEffect(() => {
    let isMounted = true;
    const getCategoryByBrand= async () => {
      try {
        const { data } = await API.get<CategoriesResponse>(
          `/categories/brand/${brand._id}?`,
        );
        if (isMounted) {
          setCategories(data.categories);
          const initialCategoryId = data.categories[0]._id;
          setCategory(initialCategoryId);
  
            if (isMounted) {
              getProductsByCategory(initialCategoryId, brand._id);
            }
        }
      } catch (error : any) {
        console.log(error.response?.data || error.message, 'Error');
      }
    };
    getCategoryByBrand();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    getProductsByCategory(category, brand._id);
  }, [page])

  useEffect(() => {
    navigation.setOptions({
      title: brand.name,
    });
  }, [categories])

  if (!categories) {
    return <Loading />;
  }

  const renderFooter = () => {
    return (
      LoadingSpinner === true ? (<HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Cargando
        </Heading>
      </HStack>) : (<></>)
    );
  }
  return (

    <>
      <Box m={1}>
        <FlatList
          data={categories}
          horizontal={true}
          nestedScrollEnabled
          scrollEnabled
          keyExtractor={item => item._id}
          renderItem={({ item }) =>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setCategory(item._id);
                zeroArray(item);
                setPage(1);
              }}
            >
              <CategorySubBox
                isSelected={category === item._id}
                name={item.name}
              />
            </TouchableOpacity>} />
      </Box>
        <Box mb={'24'}>
          <FlatList
            data={products}
            numColumns={1}
            onEndReachedThreshold={0.1}
            initialNumToRender={7}
            keyExtractor={(item,index) => index}
            onEndReached={pageLimit && (fetchMoreData)}
            ListFooterComponent={renderFooter}
            renderItem={({ item }) => <CardProductBuy product={item} navigation={navigation} route={undefined} />}></FlatList>
        </Box>
    </>
  );
};

