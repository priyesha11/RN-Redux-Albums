import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigation from './tab-navigation';
import Photos from '../screens/photos';

const Stack = createStackNavigator();

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={TabNavigation} options={{headerShown: false}}/>
                <Stack.Screen name="Photos" component={Photos}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation;