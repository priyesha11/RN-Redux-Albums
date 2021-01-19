import React from 'react';
import {
    View, Text, StyleSheet
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Albums from '../screens/albums';
import WishList from '../screens/wishlist';

const Tab = createBottomTabNavigator();

// Tabs to be shown in the app
const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Albums') {
                        iconName = 'list';
                    } else if (route.name === 'Wishlist') {
                        // If active show filled heart
                        iconName = focused ? 'heart' : 'heart-outline';
                    }

                    // Custom tab view
                    return <View style={styles.tabStyle}>
                        <Icon name={iconName} size={size} color={color} />
                        <Text>{route.name}</Text>
                    </View>;
                }
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                showLabel: false
            }}
        >
            <Tab.Screen name="Albums" component={Albums} />
            <Tab.Screen name="Wishlist" component={WishList} />
        </Tab.Navigator>
    )
}

export default TabNavigation;

const styles = StyleSheet.create({
    tabStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});