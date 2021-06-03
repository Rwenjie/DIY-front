import {
    INIT_FRIEDNS
} from "../mutations-type";

import store from "../store";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import {getSessionUser} from "../../network/chat";

const now = new Date();
const state = {
    sessions:{},
    currentUser: {},
    currentSession: null,
    filterKey:'',
    stomp: null
};
//mutations 的目的 修改stats中的状态
//mutations 的操作尽可能的单一
//我们可以吧
const mutations = {
    changeCurrentSession (state, currentSession) {
        state.currentSession = currentSession;
    },
    addMessage (state, msg) {
        state.sessions[state.currentSession-1].messages.push({
            content:msg,
            date: new Date(),
            self:true
        })
    },
    INIT_DATA (state) {
        //浏览器本地历史聊天记录
        /*let data = localStorage.getItem('vue-chat-session');
        //console.log(data)
        if (data) {
            state.sessions = JSON.parse(data);
        }*/
    },
    [INIT_FRIEDNS] ( state, data ) {
        state.friends = data;
    },

};

//this.$store.dispatch("addCart", product);
const  actions = {

    connect(context) {
        console.log("connect");
        context.state.stomp = Stomp.over(new SockJS('/ws/ep'));
        let token = window.sessionStorage.getItem('tokenStr');
        context.state.stomp.connect({'Auth-Token': token}, success => {
            context.state.stomp.subscribe('/user/queue/chat', msg => {
                console.log("msg");
                console.log(msg);
                let receiveMsg = JSON.parse(msg.body);
                receiveMsg.notSelf = true;
                receiveMsg.to = receiveMsg.from;
                context.commit('addMessage', receiveMsg);
            })
        }, error => {

        })
    },
    initData (context) {
        getSessionUser().then( res => {
            if (res.data) {
                context.commit('INIT_FRIEDNS', res.data)
            }
        })
    }
};


const getters = {
    sessions(state) {
        return state.sessions;
    },
    currentSessionId(state) {
        return state.currentSessionId;
    }
};

const chat = {
    state,
    mutations,
    actions,
    getters,
}
export default {
    state,
    mutations,
    actions,
    getters
};
/*chat.watch(function (store) {
    return state.chat.sessions

},function (val) {

    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
},{
    deep:true/!*这个貌似是开启watch监测的判断,官方说明也比较模糊*!/
});*/



