import { GetterTree } from 'vuex'
import { StoreInterface } from '../index'
import { SelfInfoStateInterface } from './state'

const getters: GetterTree<SelfInfoStateInterface, StoreInterface> = {
  someAction (/* context */) {
    // your code
  }
}

export default getters
