import React, {Component} from 'react';
import colors from '../configs/Colors';
import {connect} from 'react-redux';
import {request} from '../utils/RequestUtil';
import { createAction} from '../utils'
// import {selectFeature} from '../actions/featureAction';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import {
    Button,
    Icon,
    Avatar,
    Divider,
    Header,//header通过源码可知是绝对布局,高度70,使用该控件需要将下面的布局下移70
} from 'react-native-elements';

const titleFontSize = 22;
const {width, height} = Dimensions.get('window');
const gridWidth = (width / 4 );
const iconSize = 32;//icon图标大小
@connect(({feature, common}) => ({ ...common,...feature }))
export default class Console extends Component {
    constructor(props) { //构造方法里找到错误的位置?
        super(props);
        this._removeFeature = this._removeFeature.bind(this);
        this._editClick = this._editClick.bind(this);
        this.state = {
            editFeature: false,
        };
    }

    _removeFeature(index) {
        let array = this.props.product;
        array.splice(index, 1);
        this.props.dispatch(createAction('common/featureSelect')([...array]));
        
    }

    _editClick() {
        let array = this.props.product;
        if (this.state.editFeature) {//编辑完成,提交到服务器
            this.props.dispatch(createAction('common/featureSelect')([...array]));
            let product = '';
            array.forEach(item => product += item.id + ',');
            if (product) product = product.slice(0, -1);
            request('/user', 'put', JSON.stringify({...this.props.user, product}))
                .then((rep) => {
                    console.log(rep)
                }, (error) => {
                    console.log('error', error)
                });
        }
        this.setState({editFeature: !this.state.editFeature});
    }

    render() {
        const isLoginIn = this.props.isLoginIn;
        const showEdit = isLoginIn ? 'flex' : 'none';
        let features = [];
        if (isLoginIn) {
            if (this.state.editFeature) {
                features = this.props.product;
            } else {
                const haveData = this.props.product && this.props.product.length > 0;
                features = haveData ? [...this.props.product, '添加'] : ['添加'];
            }
        } else features = this.props.allData;

        return (
            <View>
                <Header
                    statusBarProps={{barStyle: 'light-content', backgroundColor: colors.appprimary}}
                    backgroundColor={colors.appprimary}
                    centerComponent={{text: '控制台', style: {fontSize: titleFontSize, color: '#fff'}}}
                />
                <View style={{
                    marginTop: 78,
                    paddingLeft: 8,
                    paddingRight: 8,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Text style={styles.labelText}>我的功能</Text>
                    <TouchableOpacity style={{display: showEdit}} onPress={this._editClick}>
                        <Text style={[{color: colors.appsecondary2}, styles.labelText]}>
                            {this.state.editFeature ? "完成" : "编辑"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{backgroundColor: 'transparent',}} //发现这里必须设置背景才能显示Avatar控件
                    data={features}
                    numColumns={4}
                    keyExtractor={ (item, index) => index}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }

    _renderItem = ({item, index}) => {
        const {navigate} = this.props.navigation;
        if (this.state.editFeature) { //编辑状态
            return (
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch}>
                        <Icon name={item.iconName} type={item.iconType} color={item.iconColor} size={iconSize}/>
                        <Text style={{fontSize: 18}}>{item.name}</Text>
                    </TouchableOpacity>
                    <Avatar
                        rounded
                        width={24}
                        height={24}
                        activeOpacity={0.7}
                        icon={{name: 'minus', type: 'entypo', reverse: true}}
                        containerStyle={styles.deleteFeature}
                        onPress={() => {
                            this._removeFeature(index);
                        }}/>
                </View>
            );
        } else {
            if (this.props.isLoginIn) {//登录状态
                return (
                    <View style={styles.item}>
                        {
                            index === this.props.product.length ?
                                <TouchableOpacity style={styles.itemTouch} onPress={() => {
                                    navigate('allFeature')
                                }}>
                                    <Icon name="plus" type="entypo" color={colors.default} size={iconSize}/>
                                    <Text style={{fontSize: 18}}>添加</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.itemTouch}>
                                    <Icon name={item.iconName} type={item.iconType} color={item.iconColor}
                                          size={iconSize}/>
                                    <Text style={{fontSize: 18}}>{item.name}</Text>
                                </TouchableOpacity>
                        }
                    </View>
                );
            } else { //未登录状态
                const {navigate} = this.props.navigation;
                return (
                    <View style={styles.item}>
                        <TouchableOpacity style={styles.itemTouch} onPress={() => navigate('login')}>
                            <Icon name={item.iconName} type={item.iconType} color={item.iconColor}
                                  size={iconSize}/>
                            <Text style={{fontSize: 18}}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                );
            }
        }
    }
}

const styles = StyleSheet.create({
    item: {
        width: gridWidth,
        height: gridWidth,
        padding: 0.7,
    },
    itemTouch: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    deleteFeature: {
        position: 'absolute',
        top: 4,
        right: 4,
    },
    labelText: {
        fontSize: 16,
    }

});
