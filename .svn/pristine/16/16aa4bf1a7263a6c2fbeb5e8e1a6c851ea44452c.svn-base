import {createAction} from '../utils'
import {Toast} from 'antd-mobile'
import {request} from "../utils/RequestUtil"

export default {
    namespace: 'common',
    state: {
        isLoginIn: false,
        user: {isLoginIn: false},
        permission: [],
        product: [],
    },
    reducers: {
        receiveInfo(state, {payload}) {
            let {user, allFeature} = payload;
            if (!user) return {...state, user: {}, product: [], isLoginIn: false};
            if (!user.product) {
                return {...state, user: {...user}, product: [], isLoginIn: true};
            } else {
                let product = [];
                allFeature.forEach(item => user.product.indexOf(item.id) != -1 && product.push(item));
                return {...state, user: {...user}, product, isLoginIn: true};
            }
        },
        loginOut(state) {
            return {...state, user: {}, isLoginIn: false};
        },
        featureSelect(state, {payload:selectedData}) {
            let product = [];
            if (selectedData && selectedData.length > 0) product = selectedData;
            return {...state, product};
        }

    },
    effects: {
        *getInitInfo({payload: id}, {call, put}) {
            try {
                const data = yield call(request, "/user/initInfo?id=" + id);
                yield put(createAction("receiveInfo")(data)); //设置所有功能页面信息
                yield put(createAction("feature/updateFeatureState")(data.allFeature)); //设置所有功能页面信息
            } catch (error) {
                Toast.fail('设备未连接网络');
            }
        },
        *login({payload: user}, {call, put}) {
            try {
                const data = yield call(request, '/user?username=' + user.username + '&password=' + user.password);
                yield put(createAction("feature/updateFeatureState")(data.allFeature)); //设置所有功能页面信息
                yield put(createAction("receiveInfo")(data)); //设置所有功能页面信息
                if (!data.user) Toast.info("用户名或密码不正确");
            } catch (error) {
                console.log(error);
                Toast.fail('设备未连接网络');
            }
        }

    }
}
