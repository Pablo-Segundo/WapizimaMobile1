import { Dimensions } from "react-native";

const calculateValues = (threshold: number, brandAspectRatioValue: number, categoryAspectRatioValue: number) => {
    const { height, width } = Dimensions.get('window');
    const aspectRatio = height / width;
    const columns = aspectRatio > 1.6 ? 2 : 3;
    
  
    return {
      aR: aspectRatio > threshold ? brandAspectRatioValue : categoryAspectRatioValue,
      w: width,
      h: height,
      columns,
    };
  };
  
export const calculateWbrand = () => {
    return calculateValues(1.6, 0.40, 0.28);
};

export const calculateWCategory = () => {
    return calculateValues(1.6, 0.45, 0.313);
};