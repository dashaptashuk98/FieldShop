import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token')
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_TOKEN(state, token) {
      state.token = token
      state.isAuthenticated = !!token

      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    },
    LOGOUT(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    }
  },

  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Login failed')
        }

        const data = await response.json()
        const token = data.accessToken || data.token

        if (!token) {
          commit('SET_USER', data)
          return { success: true, data }
        }

        const userData = { ...data }

        delete userData.accessToken
        delete userData.token

        commit('SET_TOKEN', token)
        commit('SET_USER', userData)

        return { success: true, data: userData }
      } catch (error) {
        return {
          success: false,
          error: error.message || 'Login failed. Try: emilys / emilyspass'
        }
      }
    },

    logout({ commit }) {
      commit('LOGOUT')
    },

    async fetchCurrentUser({ commit, state }) {
      if (!state.token) {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
          commit('SET_TOKEN', storedToken)
        } else {
          return
        }
      }

      try {
        const response = await fetch('https://dummyjson.com/auth/me', {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        })

        if (response.status === 401 || response.status === 403) {
          commit('LOGOUT')
          return
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.status}`)
        }

        const userData = await response.json()
        commit('SET_USER', userData)
      } catch {
        // Игнорируем ошибки сети
      }
    }
  },

  getters: {
    currentUser: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
    token: (state) => state.token
  }
})
