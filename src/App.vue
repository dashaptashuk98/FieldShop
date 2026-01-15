<template>
  <div id="app">
    <router-view />

    <!-- <AuthModal
      v-if="showAuthModal"
      :initial-modal="authModalType"
      @close="closeAuthModal"
      @login="handleLogin"
      @register="handleRegister"
    /> -->
  </div>
</template>

<script>
// import AuthModal from './components/AuthModal.vue'

export default {
  name: 'App',
  components: {
    // AuthModal
  },
  data() {
    return {
      showAuthModal: false,
      authModalType: 'login',
      hasSeenModal: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.showAuthModalOnLoad()
    }, 1000)
  },
  methods: {
    showAuthModalOnLoad() {
      // Проверяем, не показывали ли уже модалку
      if (this.hasSeenModal) return

      // Можно добавить проверку, авторизован ли пользователь
      const isLoggedIn = localStorage.getItem('isLoggedIn') || false

      if (!isLoggedIn) {
        this.showAuthModal = true
        this.authModalType = 'login'
        this.hasSeenModal = true

        // Сохраняем в sessionStorage, чтобы не показывать повторно
        sessionStorage.setItem('authModalShown', 'true')
      }
    },
    closeAuthModal() {
      this.showAuthModal = true
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
