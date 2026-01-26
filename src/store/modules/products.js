const state = {
  products: [],
  sortBy: 'all'
}

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_SORT_BY(state, sortBy) {
    state.sortBy = sortBy
  }
}

const actions = {
  async fetchProducts({ commit }) {
    try {
      const response = await fetch('https://dummyjson.com/products')
      const data = await response.json()
      commit('SET_PRODUCTS', data.products)
      return data.products
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  setSortBy({ commit }, sortBy) {
    commit('SET_SORT_BY', sortBy)
  }
}

const getters = {
  sortProducts: (state) => {
    if (state.sortBy === 'all') return state.products

    const copy = [...state.products]

    if (state.sortBy === 'price') {
      return copy.sort((a, b) => a.price - b.price)
    }

    if (state.sortBy === 'size') {
      return copy.sort((a, b) => a.discountPercentage - b.discountPercentage)
    }

    return state.products
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
