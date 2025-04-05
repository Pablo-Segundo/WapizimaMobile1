import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { Category } from '../interfaces/CategoryInterfaces';

interface Props extends NativeStackScreenProps<any, any> 
{ 
  category: Category;
}

export const CategoryCard = ({category,navigation, route}: Props) => {
  return (
    <View style={styles.cardContainer}>
        <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('Categoria',category )
        }>
      <ImageBackground
        source={{ uri: category.imagesMobile['400x400'], cache: 'force-cache' }}
        style={styles.imageBackground}
        imageStyle={styles.imageBorder}
        resizeMode="cover"
      >
        
        <View style={styles.overlay} />

        <View style={styles.textContainer}>
          <Text style={styles.categoryText}>{category.name}</Text>
        </View>
      </ImageBackground>
      </TouchableOpacity>
    </View>
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
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBorder: {
    borderRadius: 15, 
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1, // 📌 Esto asegura que el texto esté bien centrado
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoryCard;