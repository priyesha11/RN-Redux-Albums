import React from 'react';
import {
    StyleSheet, View, Text, Image, Dimensions
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../styles/colors';
import fontSize from '../styles/font-size';

// Photo card to show in app
const PhotoCard = (props) => {
    return (
        <View style={[styles.root, colors.background.white]}>
            <View style={styles.detail}>
                <Image source={{uri: props.url}} style={styles.image}/>
                <Text style={[fontSize.f16]}>{props.title}</Text>
            </View>
            <View style={styles.heart}>
                <TouchableOpacity onPress={() => {
                    props.updateWishList();
                }}>
                    <Icon name={props.isWishListed ? 'heart' : 'heart-outline'} size={20} color={'tomato'}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        marginTop: 15,
        elevation: 3,
        borderRadius: 6,
        flexDirection: 'row',
        position: 'relative'
    },
    image: {
        // Get full width available in screen, remove screen padding
        width: Dimensions.get('window').width - 20,
        height: 150,
        resizeMode: 'cover'
    },
    detail: {
        padding: 10
    },
    heart: {
        position: 'absolute',
        right: 10,
        top: 20
    }
});

export default PhotoCard;
