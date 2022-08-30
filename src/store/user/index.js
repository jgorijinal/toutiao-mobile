import { login } from '@/api/user'
import storage from '@/utils/storage'

const key = 'TOUTIAO_USER'
const state = {
  // user: null
  user: storage.getItem(key)
}
const mutations = {
  changeUser (state, user) {
    state.user = user

    storage.setItem(key, user) // 本地存储
  },
  removeUser (state) {
    state.user = null // 清空数据

    storage.removeItem(key) // 删除本地存储
  }
}
const actions = {
  async loginAction (context, data) {
    const res = await login(data)

    context.commit('changeUser', res.data)
  },
  logoutAction (context) {
    context.commit('removeUser')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
