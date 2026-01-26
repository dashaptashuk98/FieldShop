<template>
  <div id="app">
    <AppHeader @open-login="openAuthModal" />

    <router-view />

    <AuthModal v-if="showAuthModal" :initial-modal="authModalType" @login="handleLogin" />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AuthModal from './components/AuthModal.vue'
import { mapGetters, mapActions } from 'vuex'

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
    ...mapGetters('auth', ['isAuthenticated', 'currentUser'])
  },
  watch: {
    isAuthenticated(newVal) {
      if (!newVal && this.hasToken) {
        this.authModalType = 'login'
        this.showAuthModal = true
        this.hasToken = false
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
    ...mapActions('auth', ['login', 'logout', 'fetchCurrentUser']),

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
    }
  }
}
</script>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
