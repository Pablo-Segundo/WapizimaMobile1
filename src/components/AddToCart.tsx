import React, { useContext } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useToast } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { CartContext } from '../context/Cart/CartContext';
import { Product } from '../interfaces/ProductInterfaces';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const { addToCart } = useContext(CartContext);
  const toast = useToast();
  
  const { control, handleSubmit } = useForm({
    defaultValues: {
      quantity: '',
    },
  });

  const onSubmit = ({ quantity }: any) => {
    const stockDisponible = product.quantity >= quantity;
    let message = stockDisponible ? 'Producto agregado' : 'Stock insuficiente';

    if (product.product_type === '2') {
      message += ', Nota: No disponible para envío internacional';
    }

    toast.show({
      title: message,
      duration: stockDisponible ? 2000 : 3000,
      placement: 'top',
    });

    if (stockDisponible) {
      addToCart(product, quantity);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            placeholder="1"
            keyboardType="number-pad"
          />
        )}
        name="quantity"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Ionicons name="cart-outline" size={27} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#E3087E', 
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddToCart;
