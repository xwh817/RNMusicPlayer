import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SongList from '../component/SongList'

export default class Recommend extends Component {
    render() {
        /* return (<View style={{ flex: 1, lexDirection: 'row', justifyContent: 'center'}}>
            <SongList/>
        </View>); */
        return (<SongList navigation={this.props.navigation}/>);
    }
}