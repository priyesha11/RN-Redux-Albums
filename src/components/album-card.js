import React from 'react';
import {
    StyleSheet, View, Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../styles/colors';
import fontSize from '../styles/font-size';

// Album card to show in app
const AlbumCard = (props) => {
    return (
        <View style={[styles.root, colors.background.white]}>
            <View style={styles.detail}>
                <Text style={[fontSize.f16]}>{props.id}</Text>
                <Text style={[fontSize.f16]}>{props.title}</Text>
            </View>
            <View style={styles.arrow}>
                <TouchableOpacity onPress={() => {
                    props.navigateToPhotos(props.id);
                }}>
                    <Icon name={'arrow-forward'} size={20} />
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
        padding: 10,
        flexDirection: 'row',
        position: 'relative'
    },
    detail: {
        paddingRight: 20
    },
    arrow: {
        position: 'absolute',
        right: 10,
        top: '50%'
    }
});

export default AlbumCard;
