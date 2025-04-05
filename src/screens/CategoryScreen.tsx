import React, { useEffect, useLayoutEffect, useState } from 'react';
import {TouchableOpacity,FlatList,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import API from '../api/Wapizima';
import { Loading } from '../components/Loading';
import { Box, Heading, HStack, Spinner} from 'native-base';
// import { CategoryResponse,Subcategory,} from '../../interfaces/CategoryInterfaces';
import CardProductBuy from '../components/CardProductBuy';
import { CategorySubBox } from '../components/Category&SubBox';
import { Product } from '../interfaces/ProductInterfaces';



interface Props extends NativeStackScreenProps<any, any> { }
export const CategoryScreen = ({ route, navigation }: Props) => {
  const {id, _id, name, subcategory_id} = route.params!;
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [subcategory, setSubcategory] = useState();
  const [LoadingSpinner, setLoadinSpinner] = useState();
  const [pageLimit,setPageLimit] = useState()
  const [page, setPage] = useState(1);

  const [loadingP, setLoadingP] = useState(false);

  const zeroArray = async (item: any) => {
    products.length = 0;
    await getProductsBySubcategory(item._id);
  };
  
  const getProductsBySubcategory = async (subcategory: string) => {
    try {
      const { data } = await API.get(
        `/products/subcategories-paginated/${subcategory}?limit=5&page=${page}`
      );
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setPageLimit(data.hasNextPage);
      setLoadingP(false);
    } catch (error: any) {
      console.log(error.response?.data || 'getProductsByCategory Error');
    } 
  };
  
  const fetchMoreData = () => {
    setPage(page + 1)
  }

  useLayoutEffect(() => {
    let isMounted = true;
    setLoadingP(true);
    const getProducts = async () => {
      try {
        const { data } = await API.get<CategoryResponse>(
          `/subcategories/category/${_id || id}`
        );
        if (isMounted) {
          setSubcategories(data.subcategories);
          const defaultSubcategoryId = subcategory_id || data.subcategories[0]._id;
          setSubcategory(defaultSubcategoryId);
          await getProductsBySubcategory(defaultSubcategoryId);
        }
        setLoadingP(false);
      } catch (error: any) {
        console.log(error);
      }
    };
    getProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    getProductsBySubcategory(subcategory);
  }, [page])

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [subcategories])

  if (!subcategories) {
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
      <Box m={2}>
        <FlatList
          data={subcategories}
          horizontal={true}
          nestedScrollEnabled
          scrollEnabled
          keyExtractor={item => item._id}
          renderItem={({ item }) =>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                 setSubcategory(item._id), zeroArray(item), setPage(1), setLoadingP(true)
              }}>
              <CategorySubBox
                isSelected={subcategory === item._id}
                name={item.name}
              />
            </TouchableOpacity>} />
      </Box>
      {loadingP === true ? (<Loading />
      ) : (
        <Box mb={'24'}>
          <FlatList
            data={products}
            numColumns={1}
            onEndReachedThreshold={0.1}
            keyExtractor={item => item._id}
            onEndReached={pageLimit === true &&(fetchMoreData)}
            ListFooterComponent={renderFooter}
            renderItem={({ item }) => <CardProductBuy product={item} navigation={navigation} route={route} />}></FlatList>
        </Box>
      )}
    </>


  )
};

