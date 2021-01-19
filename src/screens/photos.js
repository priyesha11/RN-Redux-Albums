import React from 'react';
import {
    FlatList,
    StyleSheet,
    TextInput,
    View, Text
} from 'react-native';
import { connect } from 'react-redux';

import { fetchPhotoList, filterPhotosList, updateList } from '../redux/actions/photos-actions';
import PhotoCard from '../components/photo-card';
import Loader from '../components/loader';
import colors from '../styles/colors';
import fontSize from '../styles/font-size';
import { storeInWishList } from '../redux/actions/wishlist-actions';

class Photos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            refreshing: false,
            albumId: ''
        }
    }

    componentDidMount() {
        // Get parameter data from route
        var albumId = this.props.route.params.albumId;
        this.setState({isLoading: true, albumId});
        // Fetch the list
        this.props.getList(albumId).then(() => {
            this.setState({ isLoading: false });
        });
    }

    handleRefresh = () => {
        // Show refresh icon
        this.setState({ refreshing: true });
        // Fetch the list
        this.props.getList(this.state.albumId).then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        return (
            <View style={[styles.root, colors.background.white]}>
                {/* Show full screen loader */}
                <Loader
                    isVisible={this.state.isLoading}
                    hideLoader={() => { this.setState({ isLoading: false }) }}
                />
                <TextInput
                    placeholder="Search by title" style={[styles.input, fontSize.f16]}
                    onChangeText={(value) => {
                        this.props.filterPhotosList(value);
                    }}
                />
                {this.props.photosList.length > 0 ?
                    // If records are available show list
                    <FlatList
                        contentContainerStyle={{ paddingVertical: 10 }}
                        data={this.props.photosList}
                        keyExtractor={item => item.id.toString()}
                        refreshing={this.state.refreshing}
                        onRefresh={() => { this.handleRefresh() }}
                        renderItem={({ item, index }) =>
                            <PhotoCard title={item.title} url={item.url} isWishListed={item.isWishListed} updateWishList={() => {
                                // Store item in wishlist
                                this.props.storeInWishList({ ...item });
                                // Update wishlisted status
                                this.props.toggleWishList(index);
                            }} />
                        }
                    /> :
                    // If records are not available show no records message
                    <Text style={[fontSize.f16, styles.noList]}>No photos available</Text>
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
    photosList: state.photosData.photos
});

// Map action as props
const mapActionsToProps = {
    getList: fetchPhotoList,
    toggleWishList: updateList,
    storeInWishList,
    filterPhotosList
};

// connect redux with screen
export default connect(mapStateToProps, mapActionsToProps)(Photos);
