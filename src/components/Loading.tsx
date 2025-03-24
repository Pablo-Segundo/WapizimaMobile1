import React from 'react';
import { HStack, Heading, Center} from 'native-base';
import LottieView from 'lottie-react-native';
import { calculateWCategory } from '../helpers/Dimension';

export const Loading = () => {
  const {w, h} = calculateWCategory();
  return (
    <Center flex={1} px="3">
      <HStack space={4} alignItems="center">
      <LottieView
          style={{width: w*.30,
          height:h*.30}}
          source={require('../assets/lottie/loading.json')}
          autoPlay={true}
          loop={true}
        />
        <Heading color="primary.500" fontSize="lg">
          Cargando
        </Heading>
      </HStack>
    </Center>
  );
};
