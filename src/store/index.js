import { createStore } from 'vuex'
import authModule from './modules/auth'
import productsModule from './modules/products'
import locationsModule from './modules/locations'

export default createStore({
  modules: {
    auth: authModule,
    products: productsModule,
    locations: locationsModule
  }
})
