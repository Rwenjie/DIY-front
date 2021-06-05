import {
    INIT_FRIEDNS,
    INIT_CURRENT_USER, INIT_IS_DOT
} from "../mutations-type";
import Vue from 'vue'
import { Notification } from 'element-ui';
import store from "../store";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { getChatFriends } from "../../network/chat";

const now = new Date();
const state = {
    sessions:{},
    currentUser: null,
    chatFriends: [],
    currentSession: null,
    filterKey:'',
    stomp: null,
    isDot: {},
};
//mutations 的目的 修改stats中的状态
//mutations 的操作尽可能的单一
//我们可以吧
const mutations = {
    changeCurrentSession (state, currentSession) {
        state.currentSession = currentSession;
        Vue.set(state.isDot, state.currentUser.username + '#' + state.currentSession.username, false);
    },
    addMessage (state, msg) {
        let mss = state.sessions[state.currentUser.username + "#" + msg.to];
        if (!mss) {
            Vue.set(state.sessions, state.currentUser.username + "#" + msg.to, [])
            //state.sessions[state.currentSession.username + "#" + msg.to] = [];
        }
        state.sessions[state.currentUser.username + "#" + msg.to].push({
            content: msg.content,
            date: new Date(),
            self: !msg.notSelf
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
        state.chatFriends = data;
    },
    [INIT_CURRENT_USER] (state, user) {
        state.currentUser = user;

    },
    [INIT_IS_DOT] (state, item) {
        Vue.set(state.isDot, state.currentUser.username + '#' +item.username, false);
    }

};

//this.$store.dispatch("addCart", product);
const  actions = {

    connect(context) {
        console.log("connect");
        context.state.stomp = Stomp.over(new SockJS('/ws/ep'));
        let token = window.sessionStorage.getItem('tokenStr');
        context.state.stomp.connect({'Auth-Token': token}, success => {
            context.state.stomp.subscribe('/user/queue/chat', msg => {
                let receiveMsg = JSON.parse(msg.body);
                //右下角弹框
                if (!context.state.currentSession || receiveMsg.from != context.state.currentSession.username) {
                    Notification.info({
                        title: '['+receiveMsg.fromNickName+']' + "发来一条消息",
                        message: receiveMsg.content.length > 10 ? receiveMsg.content.substr(0, 10) : receiveMsg.content,
                        position: 'bottom-left'
                    });
                    Vue.set(context.state.isDot, context.state.currentUser.username + '#' +receiveMsg.from, true);
                }
                receiveMsg.notSelf = true;
                receiveMsg.to = receiveMsg.from;
                context.commit('addMessage', receiveMsg);
            })
        }, error => {

        })
    },
    initChatData (context) {
        getChatFriends().then( res => {
            if (res.data != null) {
                context.commit(INIT_FRIEDNS, res.data);
                res.data.forEach( (item) => {
                    context.commit(INIT_IS_DOT, item);
                })

            }
        })
    }
};


const getters = {
    sessions(state) {
        return state.sessions;
    },
    currentSession(state) {
        return state.currentSession;
    },
    chatFriends(state) {
        return state.chatFriends;
    },
    currentUser(state) {
        return state.currentUser;
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



