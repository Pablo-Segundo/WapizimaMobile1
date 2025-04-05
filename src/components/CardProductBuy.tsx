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
    <View style={styles.card}>

      <View style={styles.nameContainer}>
        <Text style={styles.productName}>{product.name}</Text>
      </View>

   
      <View style={styles.contentContainer}>
        {/* Imagen */}
        <Image
          style={styles.image}
          source={{
            uri: product.multimedia[0]?.images['750x750'],
            cache: 'force-cache',
          }}
        />

        {/* Contenedor de información */}
        <View style={styles.infoContainer}>
          <Text style={styles.productDetails}>
            <Text style={styles.bold}>Precio:</Text> ${product.price}
          </Text>
          <Text style={styles.productDetails}>
            <Text style={styles.bold}>Cantidad:</Text> {product.quantity}
          </Text>
          <Text style={styles.productDetails}>
            <Text style={styles.bold}>SKU:</Text> {product.sku}
          </Text>

          {/* Botón para agregar al carrito */}
          <AddToCart product={product} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 370,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginHorizontal: 10,
    paddingTop: 40,
  },
  nameContainer: {
    position: 'absolute',
    top: 10,
    left: 12,
    right: 12,
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
    resizeMode: 'contain',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productDetails: {
    fontSize: 14,
    color: '#E3087E',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
    color: '#222',
    
  },
});

export default CardProductBuy;
