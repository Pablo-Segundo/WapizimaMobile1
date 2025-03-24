import React from 'react';
import {Box, Text,} from 'native-base';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

export const MaintainmentScreen = () => {
  return (<>
  <Box justifyContent={'center'}
      alignItems={'center'} bg={'white'} h={heightPercentageToDP('100%')} w={widthPercentageToDP('100%')}>
        <LottieView
          style={{width: widthPercentageToDP('50%'),
          height: heightPercentageToDP('50%')}}
          source={require('../assets/lottie/mant.json')}
          autoPlay={true}
          loop={true}
        />
       <Text mt={-10} textAlign={'center'} bold fontSize={'2xl'} color={'omega.50'}>
       ¡Lamentamos las molestias!
       </Text>
       <Text textAlign={'center'} bold fontSize={'lg'} color={'omega.50'}>
        Este espacio se encuentra en mantenimiento.
       </Text>
       <Text textAlign={'center'} bold fontSize={'lg'} color={'omega.50'}>
       Pronto estara disponible nuevamente.
       </Text>
    </Box></>
  );
};