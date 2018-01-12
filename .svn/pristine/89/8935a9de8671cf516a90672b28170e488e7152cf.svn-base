import React from 'react'
import {AsyncStorage} from 'react-native';

import {createLogger} from 'redux-logger'
import {persistStore, autoRehydrate} from 'redux-persist';

import dva from './utils/dva'
import Router from './router'
import routerModel from './models/router'
import commonModel from './models/common'
import featureModel from './models/feature'
import {createAction} from "./utils/index";

const app = dva({
    // initialState: {},
    extraEnhancers: [autoRehydrate()], //添加store持久化
    onAction: createLogger({}), //添加redux日志中间件
    models: [commonModel, featureModel, routerModel],
    onError(e) {
        console.log('onError', e)
    },
});
const persistConfig = {
    storage: AsyncStorage,
    whitelist: ['common', 'feature'],
};
//获取本地持久化数据后,获取服务器初始化数据
persistStore(app._store, persistConfig, () => {
    const state = app._store.getState();
    let id = 0;
    if (state.common.isLoginIn) id = state.common.user.id;
    app._store.dispatch(createAction('common/getInitInfo')(id));
});
const App = app.start(<Router/>);

export default App
