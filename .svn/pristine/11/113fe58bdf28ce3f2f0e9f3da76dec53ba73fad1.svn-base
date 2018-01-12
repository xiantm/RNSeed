import React, {Component} from 'react';
import {connect} from 'react-redux';
import colors from '../configs/Colors'
import { createAction, NavigationActions } from '../utils'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {
    Header,
    Button,
    FormLabel,
    FormInput,
    FormValidationMessage,} from 'react-native-elements';
import BackIcon from '../components/BackIcon';

@connect(({ common }) => ({ ...common }))
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            status: true,
        };
        this._submit = this._submit.bind(this);
    }
   componentWillReceiveProps(nextProps){
        // console.log(nextProps.common.user);
       if(nextProps.isLoginIn){
            nextProps.navigation.goBack();
       }
   }

    _submit(){
        const {dispatch} = this.props;
        const {username:name,password}=this.state;
        if(name === '' && password === ''){
            this.setState({status:false});
            return;
        }
        const user = {username:name, password:password};
        dispatch(createAction('common/login')(user));
    }

    render(){
        return(
            <View>
                <Header
                    statusBarProps={{barStyle: 'light-content', backgroundColor: colors.appprimary}}
                    backgroundColor={colors.appprimary}
                    leftComponent={<BackIcon navigation={this.props.navigation}/>}
                    centerComponent={{text: '账户登录', style: {fontSize: 22, color: '#fff'}}}
                />
                <View style={{
                    marginTop: 78,
                    flexDirection: "column",
                }}>
                    <View style={{
                        flexDirection: "row",
                        backgroundColor: '#fff'
                    }}>
                        <FormLabel
                            containerStyle={{width:120}}
                            labelStyle={{fontSize:18}}>账户</FormLabel>
                        <FormInput
                            inputStyle={{fontSize:18}}
                            placeholder="用户名"
                            onChangeText={(name)=>{
                                this.setState({username:name});
                            }}
                            placeholderTextColor="grey"
                            underlineColorAndroid='transparent'/>
                    </View>
                    <View style={{
                        marginTop: 1,
                        flexDirection: "row",
                        backgroundColor: '#fff'
                    }}>
                        <FormLabel
                            containerStyle={{width:120}}
                            labelStyle={{fontSize:18}}>登录密码</FormLabel>
                        <FormInput
                            inputStyle={{fontSize:18}}
                            placeholder="请输入密码"
                            onChangeText={(password)=>{
                                this.setState({password:password});
                            }}
                            placeholderTextColor="grey"
                            underlineColorAndroid='transparent'
                            secureTextEntry={true}
                        />
                    </View>
                    <FormValidationMessage containerStyle={{marginTop:1}}>
                        {this.state.status ? '' : '账户和密码不能为空！'}
                    </FormValidationMessage>
                    <View style={{marginTop:10}}>
                        <TouchableOpacity >
                            <Text style={{fontSize: 16, marginLeft:300}}>忘记密码？</Text>
                        </TouchableOpacity>
                    </View>
                    <Button
                        title="登录"
                        textStyle={{fontSize:20, color: '#fff'}}
                        backgroundColor={colors.appsecondary2}
                        containerViewStyle={{marginTop:10}}
                        onPress={()=>this._submit()}
                    />


                </View>

            </View>
        )
    }
}
