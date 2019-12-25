import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const shopNum = {
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count = state.count + 1;
        },
        addShow(state) {
            state.count = state.count - 1;
        },
        deleShow(state, num) {
            state.count = num;
        }
    }
}

export default shopNum;