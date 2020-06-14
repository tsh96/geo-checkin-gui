import { ActionTree } from 'vuex'
import { StoreInterface } from '../index'
import { SelfInfoStateInterface } from './state'

const actions: ActionTree<SelfInfoStateInterface, StoreInterface> = {
  someAction (/* context */) {
    // your code
  }
}

export default actions
