import React, {Component} from 'react';
import { createAction, NavigationActions } from '../utils'
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
} from 'react-native';
import colors from '../configs/Colors'
import {
    Avatar,
    Button,
    List,
    ListItem
} from 'react-native-elements';
import {connect} from 'react-redux';

const list = [
    {
        title: '订单管理',
        icon: 'assignment',
    },
    {
        title: '费用中心',
        icon: 'attach-money',
    }
];


@connect(({ common }) => ({ ...common }))
export default class User extends Component {
    constructor(props) {
        super(props);
        this._exit = this._exit.bind(this);
    }

    _exit() {
        const {dispatch} = this.props;
        dispatch(createAction('common/loginOut')());
    }

    render() {
        const {navigate} = this.props.navigation;
        let {user,isLoginIn }= this.props;
        let name='姓';
        if (user.username) name=user.username.substring(0, 1);
        return (
            <View>
                <StatusBar barStyle={'light-content'} backgroundColor={colors.appprimary}/>
                <View style={styles.headerStyle}>
                    {isLoginIn ? (
                        <Avatar
                            large
                            rounded
                            title={name}
                            activeOpacity={0.7}
                            overlayContainerStyle={{backgroundColor: colors.default}}
                            containerStyle={{marginTop: 40, marginLeft: 21}}
                        />
                    ) : (
                        <Avatar
                            large
                            rounded
                            icon={{name: 'user', type: 'entypo'}}
                            activeOpacity={0.7}
                            overlayContainerStyle={{backgroundColor: colors.default}}
                            containerStyle={{marginTop: 40, marginLeft: 21}}
                        />
                    )}

                    <Text style={styles.textStyle}>
                        {isLoginIn ? "您好，" + user.username : 'Hi，您未登录'}
                    </Text>
                    {isLoginIn ? (
                        <Button title="退出"
                                textStyle={{color: colors.appsecondary2, fontSize: 12}}
                                containerViewStyle={{marginTop: 67, marginLeft: 15}}
                                backgroundColor={colors.appprimary}
                                buttonStyle={{width: 80, height: 15, borderWidth: 1, borderColor: colors.appsecondary2}}
                                onPress={this._exit}
                        />
                    ) : (
                        <Button title="登录/注册"
                                textStyle={{color: colors.appsecondary2, fontSize: 12}}
                                containerViewStyle={{marginTop: 67, marginLeft: 15}}
                                backgroundColor={colors.appprimary}
                                buttonStyle={{width: 80, height: 15, borderWidth: 1, borderColor: colors.appsecondary2}}
                                onPress={() => navigate('login')}
                        />
                    )}

                </View>
                <List containerStyle={{marginTop: 0}}>
                    {
                        list.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{name: item.icon}}
                            />
                        ))
                    }
                </List>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: colors.appprimary,
        height: 150,
        flexDirection: "row",
    },
    textStyle: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 20,
        marginTop: 68,
    }
});
