import React from 'react';
import {Box, Text,} from 'native-base';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import { calculateWCategory } from '../helpers/Dimension';

export const NoConnected = () => {
  const {w, h} = calculateWCategory();
  return (
    <>
    <Box justifyContent={'center'}
    alignItems={'center'} p={2}>
      <LottieView
        style={{width: w*.50,
        height: h*.40}}
        source={require('../assets/lottie/nointernet.json')}
        autoPlay={true}
        loop={true}
      />
     <Text mt={2} textAlign={'center'} bold fontSize={'2xl'} color={'omega.50'}>
     ¡Sin conexión a internet!
     </Text>
     <Text textAlign={'center'} bold fontSize={'lg'} color={'omega.50'}>
      Por favor verifica tu conexión a internet y vuelve a intentarlo.
     </Text>
  </Box></>
  );
};
