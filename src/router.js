import React, {PureComponent} from 'react'
import colors from './configs/Colors'
import {BackHandler, Animated, Easing} from 'react-native'
import {
    StackNavigator,
    TabNavigator,
    TabBarBottom,
    addNavigationHelpers,
    NavigationActions,
} from 'react-navigation'
import {connect} from 'react-redux'
import {Icon} from 'react-native-elements';
import community from './pages/community';
import home from './pages/home';
import features from './pages/features';
import user from './pages/user';
import allFeature from './pages/allFeatures';
import login from './pages/login';

const HomeNavigator = TabNavigator(
    {
        '主页': {
            screen: home,
            navigationOptions: {
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name={'home'}
                        size={25}
                        type={'font-awesome'}
                        color={tintColor}
                    />
                ),
            }
        },
        '控制台': {
            screen: features,
            navigationOptions: {
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name={'computer'}
                        size={25}
                        color={tintColor}
                    />
                ),
            }
        },
        '社区': {
            screen: community,
            navigationOptions: {
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name={'users'}
                        size={25}
                        type={'font-awesome'}
                        color={tintColor}
                    />
                ),
            }
        },
        '用户': {
            screen: user,
            navigationOptions: {
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name={'user'}
                        size={25}
                        type={'font-awesome'}
                        color={tintColor}
                    />
                ),
            }
        },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        lazyLoad: true,
        activeBackgroundColor: colors.appsecondary2,
        activeTintColor: colors.appsecondary2,
        tabBarOptions: {
            labelStyle: {
                fontSize: 12,
            },
        },
    }
);

const AppNavigator = StackNavigator(
    {
        HomeNavigator: {screen: HomeNavigator},
        login: {screen: login},
        allFeature: {screen: allFeature}
    },
    {
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const {layout, position, scene} = sceneProps
                const {index} = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return {opacity, transform: [{translateY}]}
            },
        }),
    }
);

function getCurrentScreen(navigationState) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    if (route.routes) {
        return getCurrentScreen(route)
    }
    return route.routeName
}

@connect(({ router}) => ({ router}))
class Router extends PureComponent {
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }

    backHandle = () => {
        const currentScreen = getCurrentScreen(this.props.router)
        if (currentScreen === 'Login') {
            return true
        }
        if (currentScreen !== 'Home') {
            this.props.dispatch(NavigationActions.back())
            return true
        }
        return false
    };

    render() {
        const {dispatch,router} = this.props
        const navigation = addNavigationHelpers({dispatch, state: router})
        return <AppNavigator navigation={navigation}/>
    }
}

export function routerReducer(state, action = {}) {
    return AppNavigator.router.getStateForAction(action, state)
}

export default Router
