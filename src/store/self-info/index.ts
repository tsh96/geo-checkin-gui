import { Module } from 'vuex'
import { StoreInterface } from '../index'
import state, { SelfInfoStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const selfInfo: Module<SelfInfoStateInterface, StoreInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default selfInfo
