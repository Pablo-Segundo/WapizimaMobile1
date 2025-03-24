import React, {useContext, useEffect, useState} from 'react';
import {CategoryContext} from '../../context/Category/CategoryContext';
import CategoryCard from '../../components/CategoryCard';
import {Box, Button, FlatList, Text} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Dimensions, Platform} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { NoConnected } from '../../components/NoConnected';



interface Props extends NativeStackScreenProps<any, any> {}

export const CategoriesScreen = ({navigation, route}: Props) => {
  const {getCategories, categories} = useContext(CategoryContext);
  const {height, width} = Dimensions.get('window');
  const [connected, setConected] = useState(true);
  const aspectRatio = height / width;
  var c;
  if (aspectRatio > 1.6) {
    c = 2;
  } else {
    c = 3;
  }
  NetInfo.fetch().then(state => {
    setConected(state.isConnected);
  });
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      {connected === true ? (<Box style={{marginTop: Platform.OS === 'android' ? 30 : Dimensions.get('window').height/8,}} rounded="md" alignSelf="center" w={'100%'}>
        <FlatList
          data={categories}
          numColumns={c}
          keyExtractor={item => item._id}
          renderItem={({item}) => <CategoryCard category={item} navigation={navigation} route={route} />}
        />
      </Box>):(<Box bg={'white'} h={'100%'}>
        <NoConnected />
        <Button w={'60%'} alignSelf={'center'} onPress={() => NetInfo.fetch().then(state => {
          setConected(state.isConnected);
        })}>
          <Text color={'white'} bold fontSize={'lg'}>
            Volver a cargar
          </Text>

        </Button>
      </Box>) } 
    </>
  );
};
