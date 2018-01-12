export default {
    namespace: 'feature',
    state: {
        allData:[], //所有功能
    },
    reducers: {
        updateFeatureState(state, { payload : allData }) {
            return { ...state, allData }
        },
    },
    effects: {

    },
    subscriptions: {

    },
}
