import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { connect } from 'react-redux';

import PhotoCard from '../components/photo-card';
import { getWishList, storeInWishList } from '../redux/actions/wishlist-actions';
import colors from '../styles/colors';
import fontSize from '../styles/font-size';

class WishList extends React.Component {

    componentDidMount() {
        // Fetch the list
        this.props.getList();
    }

    render() {
        return (
            <View style={[styles.root, colors.background.white]}>
                <Text style={[fontSize.f20]}>Wishlist</Text>

                {this.props.wishList.length > 0 ?
                    // If records are available show list
                    <FlatList
                        contentContainerStyle={{ paddingVertical: 10 }}
                        data={this.props.wishList}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) =>
                            <PhotoCard title={item.title} url={item.url} isWishListed={item.isWishListed} updateWishList={() => {
                                this.props.storeInWishList({ ...item });
                            }} />
                        }
                    /> :
                    // If records are not available show no records message
                    <Text style={[fontSize.f16, styles.noList]}>No photos in Wishlist</Text>
                }
            </View>
        )
    }
}

// Local style goes here
const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 10
    },
    input: {
        borderBottomWidth: 1
    },
    noList: {
        textAlign: 'center',
        paddingTop: 50
    }
});

// Map store data to props
const mapStateToProps = (state) => ({
    wishList: state.wishlistData.wishList
});

// Map action as props
const mapActionsToProps = {
    getList: getWishList,
    storeInWishList
};

// connect redux with screen
export default connect(mapStateToProps, mapActionsToProps)(WishList);
