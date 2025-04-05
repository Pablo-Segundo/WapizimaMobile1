import React from 'react'
import { SearchInput } from '../components/SearchInput'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
interface Props extends NativeStackScreenProps<any, any> {
    navigation: NativeStackScreenProps<any, any>['navigation'];
    route: NativeStackScreenProps<any, any>['route'];
}


export const SearchScreen = ({navigation, route}: Props) => {
    return (
        <SearchInput navigation={navigation} route={route} />
    )
}
