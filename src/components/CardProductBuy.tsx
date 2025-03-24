import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Product} from '../interfaces/ProductInterfaces';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AddToCart} from './AddToCart';

interface Props extends NativeStackScreenProps<any, any> {
  product: Product;
}

export const CardProductBuy = ({product}: Props) => {
  return (
    <>
      <View style={styles.card}>
        <View>
          <Text style={styles.productName}>{product.name}</Text>

          <Image
            style={styles.image}
            source={{
              uri: product.multimedia[0]?.images['750x750'],
              cache: 'force-cache',
            }}
          />
        </View>
        {/* <View style={styles.infoContainer}>
          <Text style={styles.productDetails}>💰 Precio: ${product.price}</Text>
          <Text style={styles.productDetails}>
            📦 Cantidad: {product.quantity}
          </Text>
          <Text style={styles.productDetails}>🔖 SKU: {product.sku}</Text>
          <AddToCart product={product} />
        </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  image: {
    width: 130,
    height: 120,
    borderRadius: 8,
    resizeMode: 'contain',
    marginRight: 12,
  },
  infoContainer: {
    // flex: 1,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  productDetails: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
});

export default CardProductBuy;
