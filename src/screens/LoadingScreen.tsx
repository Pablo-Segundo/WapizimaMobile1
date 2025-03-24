import React from 'react';
import {Box,} from 'native-base';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { Image } from 'react-native';

export const LoadingScreen = () => {
  return (<>
  <Box justifyContent={'center'}
      alignItems={'center'} bg={'white'} h={heightPercentageToDP('100%')} w={widthPercentageToDP('100%')}>

      <Image
        source={require('../assets/lottie/logo.gif')}
        style={{
          width: widthPercentageToDP('100%'),
          height: heightPercentageToDP('50%')
        }} />
    </Box></>
      
  );
};
