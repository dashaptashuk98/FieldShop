const state = {
  fields: [],
  filteredFields: [],
  searchText: ''
}

const mutations = {
  SET_FIELDS(state, fields) {
    state.fields = fields
    state.filteredFields = [...fields]
  },
  SET_FILTERED_FIELDS(state, filteredFields) {
    state.filteredFields = filteredFields
  },
  SET_SEARCH_TEXT(state, searchText) {
    state.searchText = searchText
  }
}

const actions = {
  async fetchLocations({ commit }) {
    try {
      const response = await fetch('https://dummyjson.com/products')
      const data = await response.json()
      commit('SET_FIELDS', data.products)
      return data.products
    } catch (error) {
      console.error('Error fetching locations:', error)
      throw error
    }
  },

  searchFields({ commit, state }, searchText) {
    commit('SET_SEARCH_TEXT', searchText)

    if (!searchText.trim()) {
      commit('SET_FILTERED_FIELDS', [...state.fields])
      return
    }

    const query = searchText.toLowerCase().trim()
    const filtered = state.fields.filter((field) => field.title.toLowerCase().includes(query))

    commit('SET_FILTERED_FIELDS', filtered)
  },

  clearSearch({ commit, state }) {
    commit('SET_SEARCH_TEXT', '')
    commit('SET_FILTERED_FIELDS', [...state.fields])
  }
}

const getters = {
  filteredFields: (state) => state.filteredFields,
  searchText: (state) => state.searchText
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
