import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isAuthenticated: !!localStorage.getItem('token')
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
    },

    SET_TOKEN(state, { token, refreshToken }) {
      state.token = token
      state.refreshToken = refreshToken || state.refreshToken
      state.isAuthenticated = !!token

      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
      }
    },

    SET_REFRESH_TOKEN(state, refreshToken) {
      state.refreshToken = refreshToken
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
      } else {
        localStorage.removeItem('refreshToken')
      }
    },

    LOGOUT(state) {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
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
        const refreshToken = data.refreshToken

        const userData = { ...data }
        delete userData.accessToken
        delete userData.token
        delete userData.refreshToken

        commit('SET_TOKEN', { token, refreshToken })
        commit('SET_USER', userData)

        return { success: true, data: userData }
      } catch (error) {
        return {
          success: false,
          error: error.message || 'Login failed. Try: emilys / emilyspass'
        }
      }
    },

    async refreshToken({ commit, state }) {
      if (!state.refreshToken) {
        throw new Error('No refresh token available')
      }

      try {
        const response = await fetch('https://dummyjson.com/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refreshToken: state.refreshToken,
            expiresInMins: 30
          })
        })

        if (!response.ok) {
          throw new Error('Token refresh failed')
        }

        const data = await response.json()

        commit('SET_TOKEN', {
          token: data.accessToken,
          refreshToken: data.refreshToken
        })

        return data.accessToken
      } catch (error) {
        commit('LOGOUT')
        throw error
      }
    },

    logout({ commit }) {
      commit('LOGOUT')
    },

    async fetchCurrentUser({ commit, state, dispatch }) {
      if (!state.token) {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
          commit('SET_TOKEN', { token: storedToken })
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
          try {
            const newToken = await dispatch('refreshToken')

            const retryResponse = await fetch('https://dummyjson.com/auth/me', {
              headers: {
                Authorization: `Bearer ${newToken}`
              }
            })

            if (!retryResponse.ok) {
              throw new Error('Failed after refresh')
            }

            const userData = await retryResponse.json()
            commit('SET_USER', userData)
            return userData
          } catch {
            commit('LOGOUT')
            return
          }
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.status}`)
        }

        const userData = await response.json()
        commit('SET_USER', userData)
        return userData
      } catch (error) {
        console.error('Fetch user error:', error)
        return null
      }
    }
  },

  getters: {
    currentUser: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
    token: (state) => state.token,
    refreshToken: (state) => state.refreshToken
  }
})
