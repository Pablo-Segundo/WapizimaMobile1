import React from 'react';
import { Box, Text} from 'native-base';
export const CategorySubBox = ({ isSelected, name }:any) => {
     const backgroundColor = isSelected ? 'white' : '#E3087E';
    const textColor = isSelected ? '#E3087E' : 'white';
  return (
     <Box
        alignSelf={'center'}
        alignItems={'center'}
        p={1}
        height={10}
        backgroundColor={backgroundColor}
        flexDirection="row"
        shadow={3}
        ml={2}
        borderRadius={10}
        mb={2}
      >
        <Text
          fontSize="14"
          bold
          ml={1}
          textAlign={'justify'}
          color={textColor}
        >
          {name}
        </Text>
      </Box>
  );
};
