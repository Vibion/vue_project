import { login as loginApi } from '@/api/login'
import router from '@/router'
import {setTokenTime} from '@/utils/auth'

export default {
    namespaced: true,
    state: () => ({
        // 先取token
        token: localStorage.getItem('token') || '',
        // 点击hamburgur列表会进行伸缩
        sideType: true
    }),
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem('token', token)
        },
        changeSide(state){
            state.sideType = !state.sideType
        }
    },
    actions: {
        login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginApi(userInfo)
                    .then(res => {
                        commit('setToken', res.token)
                        setTokenTime()
                        resolve()
                        router.replace('/')
                    }).catch(err => {
                        reject(err)
                    })
            })
        },

        logout({ commit }) {
            commit('setToken', '')
            localStorage.clear()
            router.replace('/login')
        }
    }
}