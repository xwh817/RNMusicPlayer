import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Recommend extends Component {
    render() {
        return (<View style={{ flex: 1, lexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{ alignSelf: 'center' }}>推荐</Text>
        </View>);
    }
}