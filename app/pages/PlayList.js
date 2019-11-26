import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import MusicApi from '../dao/MusicApi'
import SongUtil from '../model/SongUtil'

var mount;

export default class PlayList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
        }
    }


    loadData() {
        this.setState({ isLoading: true });

        MusicApi.getPlayList("流行").then(items => {
            if (mount) {
                this.setState({
                    isLoading: false,
                    data: items,
                });
            }
        }).catch(error => console.error(error));;

    }


    // 页面加载完成之后，获取数据。
    componentDidMount() {
        mount = true;
        this.loadData();
    }

    componentWillUnmount() {
        mount = false;
    }

    render() {
        if (this.isLoading) {
            return <ActivityIndicator
                size={'large'}
                color={'green'}
                animating={true}
            />
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={this.getItemView}
                    //renderItem={(itemData) => this.getItemView(itemData.item)}
                    ItemSeparatorComponent={this.getSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    //keyExtractor={(item) => item.id.toString()}
                    //onPressItem={(index) => alert('item ' + index + 'pressed')}
                    //refreshing={this.state.isLoading}
                />
            </View>
        );
    }


    getItemView = ({ item }) => {
        var imageWidth = screen.width - 20;
        return (
            <TouchableOpacity onPress={() => { console.log(item.name); }}>
                <View style={styles.item}>
                    <Image
                        source={{ uri: `${item.coverImgUrl}?param=400y200` }}
                        style={{ width: imageWidth, height: imageWidth * 0.5 }}
                    />
                    <View style={styles.layoutText}>
                        <Text style={styles.itemTitle}>{item['name']}</Text>
                    </View>
                </View>

            </TouchableOpacity>

        );
    }


    getSeparator = () => {
        return (<View style={styles.separator} />);
    }

}


const screen = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#eeeeee",
        justifyContent: 'space-around',   // 子元素沿主轴的对齐方式
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        //borderRadius: 4,    // 圆角
        shadowColor: 'grey',   // 添加阴影效果
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,  // android端要加上这个属性，不然阴影不出来
    },
    layoutText: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',   // 子元素沿主轴的对齐方式
        margin: 10,
    },
    itemTitle: {
        fontSize: 14,
    },
    separator: {
        width: screen.width - 20,
        height: 1,
        alignSelf: 'center',
        backgroundColor: '#eeeeee',
        borderStyle: 'dotted'
    },
})
