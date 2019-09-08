import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './type'
import  { app }  from './modules/app'
import { cache } from './modules/cache'
import { tagsView } from './modules/tags-view'
import { permission } from './modules/permission'
import { user } from './modules/user'

Vue.use(Vuex)


const store: StoreOptions<RootState> = {
  modules: {
    app,
    cache,
    tagsView,
    permission,
    user
  },

}


export default new Vuex.Store<RootState>(store)
