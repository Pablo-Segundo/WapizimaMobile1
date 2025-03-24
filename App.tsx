import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation/Navigator';
import {StatusBar, Text, View} from 'react-native';
import {BrandProvider} from './src/context/Brand/BrandContext';
import {BrandState} from './src/context/Brand/BrandState';
import {CategoryState} from './src/context/Category/CategoryState';
import {ProductState} from './src/context/Product/ProductState';
import {NativeBaseProvider} from 'native-base';
import { OfferState } from './src/context/Offer/OfferState';

export const App: React.FC = () => {
  return (
    <>
      <NativeBaseProvider>
        <StatusBar backgroundColor="#E3087E" barStyle="light-content" />

        <NavigationContainer>
        <OfferState>
          <BrandState>
            <ProductState>
              <CategoryState>
                <Navigator />
              </CategoryState>
            </ProductState>
          </BrandState>
          </OfferState>
        </NavigationContainer>
      </NativeBaseProvider>
    </>
  );
};

export default App;
