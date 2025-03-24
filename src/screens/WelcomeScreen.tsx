import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {BrandContext} from '../context/Brand/BrandContext';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import CardBrands from '../components/CardBrands';
import {CategoryContext} from '../context/Category/CategoryContext';
import CategoryCard from '../components/CategoryCard';
import {calculateWbrand} from '../helpers/Dimension';
import {ProductContext} from '../context/Product/ProductContext';
import {ProductsList} from '../components/ProductsList';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const WelcomeScreen = () => {
  const {getBrands, brands} = useContext(BrandContext);
  const {getCategories, categories} = useContext(CategoryContext);
  const {getIndexProducts, products} = useContext(ProductContext);
  const {columns} = calculateWbrand();
  const navigation = useNavigation();
  // console.log('====================================');
  // console.log(categories, 'si hay algo o no?');
  // console.log('====================================');

  useEffect(() => {
    getBrands();
    getCategories();
    getIndexProducts();
  }, []);

  return (
    <>
      <ScrollView>
      <View style={styles.customStack}>
      <View style={styles.headerIcons}>
        {/* Icono de Filtro */}
        <Ionicons
          name="filter-outline"
          size={30}
          color="white"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />

        {/* Logo Centrado */}
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/image/logocompleto.png')}
            resizeMode="contain"
          />
        </View>

        {/* Iconos de Búsqueda y Carrito */}
        <View style={styles.rightIcons}>
          <Ionicons
            name="search-outline"
            size={30}
            color="white"
            onPress={() => navigation.navigate('SearchCart')}
          />
          <Ionicons
            name="cart-outline"
            size={30}
            color="white"
            onPress={() => navigation.navigate('CartScreen')}
          />
        </View>
      </View>
    </View>

        <View>
          <View style={styles.cardContainer}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#E3087E'}}>
              {' '}
              Marcas{' '}
            </Text>
          </View>

          <FlatList
            data={brands}
            horizontal
            keyExtractor={item => item._id}
            renderItem={({item}) => <CardBrands brand={item} />}
          />
        </View>

        <View>
          <View style={styles.cardContainer}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#E3087E'}}>
              {' '}
              Ultimos agregados{' '}
            </Text>
          </View>

          <View style={styles.cardContainer}>
            <ProductsList
              products={products}
              navigation={navigation}
              buscar={false}
            />
          </View>
        </View>

        <View>
          <View style={styles.cardContainer}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#E3087E'}}>
              {' '}
              Categorias{' '}
            </Text>
          </View>

          <FlatList
            data={categories}
            numColumns={columns}
            keyExtractor={item => item._id}
            renderItem={({item}) => <CategoryCard category={item} />}
            contentContainerStyle={{alignItems: 'center'}}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  customStackText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  icon: {
    width: 30,
    height: 30,
    color: 'white',
  },
 
  //--------------------
  customStack: {
    width: '100%',
    height: hp('12%'),
    backgroundColor: '#E3087E',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
  },
  headerIcons: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    // flex: 1,
    alignItems: 'center',
    

  },
  logo: {
    width: wp('40%'),
    height: hp('6%'),
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('4%'),
  },
});

export default WelcomeScreen;
