<template>
  <div id="app">
    <AppHeader @open-login="openAuthModal" />

    <router-view />

    <AuthModal
      v-if="showAuthModal"
      :initial-modal="authModalType"
      @close="handleCloseModal"
      @login="handleLogin"
    />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AuthModal from './components/AuthModal.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    AppHeader,
    AuthModal
  },
  data() {
    return {
      showAuthModal: false,
      authModalType: 'login',
      hasToken: false
    }
  },
  computed: {
    ...mapState(['isAuthenticated', 'token']),
    ...mapGetters(['currentUser'])
  },
  watch: {
    isAuthenticated(newVal) {
      if (newVal) {
        this.showAuthModal = false
      } else if (!this.hasToken && !newVal) {
        setTimeout(() => {
          if (!this.isAuthenticated) {
            this.showAuthModal = true
          }
        }, 1000)
      }
    }
  },
  mounted() {
    this.hasToken = !!localStorage.getItem('token')

    if (this.hasToken) {
      this.fetchCurrentUser()
        .then(() => {
          if (!this.isAuthenticated) {
            setTimeout(() => {
              this.showAuthModal = true
            }, 500)
          }
        })
        .catch(() => {
          this.showAuthModal = true
        })
    } else {
      setTimeout(() => {
        this.showAuthModal = true
      }, 1000)
    }
  },
  methods: {
    ...mapActions(['login', 'logout', 'fetchCurrentUser']),

    async handleLogin(loginData) {
      const result = await this.login(loginData)

      if (result.success) {
        this.showAuthModal = false
        this.hasToken = true
      } else {
        alert(result.error || 'Login failed. Please try again.')
      }
    },

    openAuthModal() {
      this.authModalType = 'login'
      this.showAuthModal = true
    },

    handleCloseModal() {
      this.showAuthModal = false
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'DM Sans', sans-serif;
  background-color: #f8f9fa;
  color: #222;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
