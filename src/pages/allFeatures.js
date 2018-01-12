import React, {Component} from 'react';
import {connect} from 'react-redux';
import colors from '../configs/Colors';
import {request} from '../utils/RequestUtil';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import {
    Icon,
    Avatar,
    Divider,
    Header,//header通过源码可知是绝对布局,高度70,使用该控件需要将下面的布局下移70
} from 'react-native-elements';
import BackIcon from '../components/BackIcon';
import {createAction} from "../utils/index";

const titleFontSize = 22;
const iconSize = 32;
const {width, height} = Dimensions.get('window');
const gridWidth = (width / 4 );

class Group extends Component {

    constructor(props) {
        super(props);
        this._renderItem=this._renderItem.bind(this);
    }

    render() {
        let {needDivider} = this.props;
        return (
            <View>
                <View style={{justifyContent:'flex-end', height: 32, backgroundColor: '#fff'}}>
                    <Text style={{marginLeft:8}}>{this.props.type}</Text>
                </View>
                <Divider style={{height:0.5}}/>
                <FlatList
                    style={{backgroundColor: 'transparent',}} /*发现这里必须设置背景才能显示Avatar控件 */
                    data={this.props.data}
                    numColumns={4}
                    keyExtractor={ (item, index) => item.id}
                    renderItem={this._renderItem}
                />
                {
                    needDivider ?
                        <Divider style={{height: 16, backgroundColor: 'transparent'}}/>
                        :
                        <View/>
                }
            </View>
        );
    }

    _renderItem({item}) {
        let {itemClick} = this.props;
        let selectedData = this.props.selectedData;
        let selected = false;
        selectedData.forEach(obj => (item.id == obj.id) && (selected = true));
        let checkColor = '#ddd';
        if (selected) checkColor = colors.success;
        return (
            <View style={styles.item}>
                <TouchableOpacity style={styles.itemTouch} onPress={() => itemClick(item, !selected)}>
                    <Icon name={item.iconName} type={item.iconType} color={item.iconColor} size={iconSize}/>
                    <Text style={{fontSize: 18}}>{item.name}</Text>
                    <Avatar
                        width={24}
                        height={24}
                        rounded
                        activeOpacity={0.7}
                        overlayContainerStyle={{backgroundColor: checkColor}}
                        icon={{name: 'check', reverse: true}}
                        containerStyle={{position: 'absolute', top: 8, right: 8,}}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
@connect(({feature, common}) => ({ ...common,...feature }))
export default class AllFeature extends Component {

    constructor(props) {
        super(props);
        this.divideGroups=this.divideGroups.bind(this);
        this._editComplete=this._editComplete.bind(this);
        this._itemClick = this._itemClick.bind(this);

        let types = this.divideGroups();
        let selectedData;
        props.product? selectedData = [...props.product]:selectedData =[];
        this.state = {
            types,
            selectedData
        };
    }

    divideGroups() { //整理数据分组信息
        let array = [...this.props.allData];
        let map = {};
        array.forEach((obj) => {
            let type = obj.type;
            if (map[type]) map[type].push(obj);
            else map[type] = [obj];
        });
        let res = [];
        for (prop in map) res.push(map[prop]);
        return res;
    }

    _itemClick(item, selected) {
        let selectedData = this.state.selectedData;
        if (selected) {
            selectedData.push(item);
            selectedData.sort((a, b) => a.id - b.id);
        }else {
            let pos = selectedData.indexOf(item);
            selectedData.splice(pos, 1);
        }
        this.setState({selectedData})
    }

    _editComplete(){
        const {navigation}=this.props;
        this.props.dispatch(createAction('common/featureSelect')([...this.state.selectedData]));
        let product = '';
        this.state.selectedData.forEach(item => product += item.id + ',');
        if (product) product=product.slice(0,-1);
        request('/user','put',JSON.stringify({...this.props.user,product}))
            .then((rep)=>{console.log(rep)},(error)=>{console.log('error',error)});
        navigation.goBack();
    }

    render() {

        const {selectedData} = this.state;
        const typesLength = this.state.types.length;
        return (
            <View >
                <Header
                    statusBarProps={{barStyle: 'light-content', backgroundColor: colors.appprimary}}
                    backgroundColor={colors.appprimary}
                    leftComponent={<BackIcon navigation={this.props.navigation}/>}
                    centerComponent={{text: '所有功能', style: {fontSize: titleFontSize, color: '#fff'}}}
                    rightComponent={
                        <TouchableOpacity  onPress={this._editComplete}>
                            <Text style={{color:'#fff',fontSize:18}}>完成</Text>
                        </TouchableOpacity>
                    }
                />
                <Divider style={{marginTop: 70,}}/>
                {
                    this.state.types.map((item, index) =>
                    <Group
                        key={index}
                        itemClick={this._itemClick}
                        needDivider={!(typesLength == index)}
                        data={item}
                        type={item[0].type}
                        selectedData={selectedData}/>)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemTouch: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    item: {
        width: gridWidth,
        height: gridWidth,
        padding: 0.7,
    },
});

