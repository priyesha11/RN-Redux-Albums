import React from 'react';
import {
    StyleSheet, View, Text, FlatList
} from 'react-native';
import { connect } from 'react-redux';

import AlbumCard from '../components/album-card';
import Loader from '../components/loader';
import { fetchAlbumList } from '../redux/actions/album-actions';

import colors from '../styles/colors';
import fontSize from '../styles/font-size';

class Albums extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            refreshing: false
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        // Fetch the list
        this.props.getList().then((res) => {
            this.setState({ isLoading: false });
        });
    }

    handleRefresh = () => {
        // Show refresh icon
        this.setState({ refreshing: true });
        // Fetch the list
        this.props.getList().then(() => {
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
                <Text style={[fontSize.f20]}>Albums</Text>
                {this.props.albumsList.length > 0 ?
                    // If records are available show list
                    <FlatList
                        contentContainerStyle={{ paddingVertical: 10 }}
                        data={this.props.albumsList}
                        keyExtractor={item => item.id.toString()}
                        refreshing={this.state.refreshing}
                        onRefresh={() => { this.handleRefresh() }}
                        renderItem={({ item }) =>
                            <AlbumCard id={item.id} title={item.title} navigateToPhotos={(id) => {
                                this.props.navigation.navigate('Photos', { albumId: id });
                            }} />
                        }
                    /> :
                    // If records are not available show no records message
                    <Text style={[fontSize.f16, styles.noList]}>No photos available</Text>
                }
            </View>
        );
    }
};

// Local style goes here
const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 10
    }
});

// Map store data to props
const mapStateToProps = (state) => ({
    albumsList: state.albumData.albums
});

// Map action as props
const mapActionsToProps = {
    getList: fetchAlbumList
};

// connect redux with screen
export default connect(mapStateToProps, mapActionsToProps)(Albums);
