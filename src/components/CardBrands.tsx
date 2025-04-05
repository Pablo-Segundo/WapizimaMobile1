import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

const CardBrands = ({ brand, onPress , navigation}: any) => {
  return (
     <TouchableOpacity  onPress={() => navigation.navigate('Marca', brand)}>
     <View style={styles.cardContainer}>
     
      <ImageBackground
        style={styles.image}
        source={{ uri: brand.images['400x400'], cache: 'force-cache' }}
        resizeMode="cover"
      >
        {/* <View style={styles.overlay}>
          <Text style={styles.text}>{brand.name}</Text>
        </View> */}
      </ImageBackground>
     
    </View>
     </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 180, 
    height: 180, 
    marginTop:10,
    marginHorizontal: 10, 
    borderRadius: 15, 
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    paddingVertical: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CardBrands;
