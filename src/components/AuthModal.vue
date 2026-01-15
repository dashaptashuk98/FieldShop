<template>
  <div class="modal-overlay" v-if="activeModal === 'login'">
    <div class="modal">
      <button class="modal-close" @click="handleClose">×</button>
      <h2 class="modal-title">Login</h2>

      <form class="modal-form" @submit.prevent="handleLoginSubmit">
        <div class="form-group">
          <label for="login-username" class="form-label">Username</label>
          <input
            type="text"
            id="login-username"
            class="form-input"
            :class="{ 'input-error': loginErrors.username }"
            v-model="loginData.username"
            placeholder="Enter your username"
            @input="validateLoginField('username')"
            required
          />
          <div v-if="loginErrors.username" class="error-message">
            {{ loginErrors.username }}
          </div>
        </div>

        <div class="form-group">
          <label for="login-password" class="form-label">Password</label>
          <input
            type="password"
            id="login-password"
            class="form-input"
            :class="{ 'input-error': loginErrors.password }"
            v-model="loginData.password"
            placeholder="Enter your password"
            @input="validateLoginField('password')"
            required
          />
          <div v-if="loginErrors.password" class="error-message">
            {{ loginErrors.password }}
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-block" :disabled="loginLoading">
          <span v-if="!loginLoading">Login to Account</span>
          <span v-else>Logging in...</span>
        </button>
      </form>

      <div class="modal-divider">
        <span>Or</span>
      </div>

      <button class="btn btn-outline btn-block" @click="switchToRegister">
        Create New Account
      </button>
    </div>
  </div>

  <!-- Форма регистрации -->
  <div class="modal-overlay" v-else-if="activeModal === 'register'">
    <div class="modal">
      <button class="modal-close" @click="handleClose">×</button>
      <h2 class="modal-title">Registration</h2>

      <form class="modal-form" @submit.prevent="handleRegisterSubmit">
        <div class="form-row">
          <div class="form-group">
            <label for="reg-firstName" class="form-label">First Name *</label>
            <input
              type="text"
              id="reg-firstName"
              class="form-input"
              v-model="registerData.firstName"
              placeholder="Emily"
              required
            />
          </div>

          <div class="form-group">
            <label for="reg-lastName" class="form-label">Last Name *</label>
            <input
              type="text"
              id="reg-lastName"
              class="form-input"
              v-model="registerData.lastName"
              placeholder="Johnson"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="reg-username" class="form-label">Username *</label>
          <input
            type="text"
            id="reg-username"
            class="form-input"
            v-model="registerData.username"
            placeholder="emilys"
            required
          />
        </div>

        <div class="form-group">
          <label for="reg-email" class="form-label">Email</label>
          <input
            type="email"
            id="reg-email"
            class="form-input"
            v-model="registerData.email"
            placeholder="emily@example.com"
          />
        </div>

        <div class="form-group">
          <label for="reg-password" class="form-label">Password *</label>
          <input
            type="password"
            id="reg-password"
            class="form-input"
            v-model="registerData.password"
            placeholder="At least 6 characters"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary btn-block" :disabled="registerLoading">
          <span v-if="!registerLoading">Create Account</span>
          <span v-else>Processing...</span>
        </button>
      </form>

      <div class="modal-divider">
        <span>Already have an account?</span>
      </div>

      <button class="btn btn-outline btn-block" @click="switchToLogin">
        Login to Existing Account
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthModal',
  props: {
    initialModal: {
      type: String,
      default: 'login'
    }
  },
  data() {
    return {
      activeModal: this.initialModal,
      loginLoading: false,
      registerLoading: false,
      loginData: {
        username: '',
        password: ''
      },
      registerData: {
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: ''
      },
      loginErrors: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    validateLoginField(field) {
      const value = this.loginData[field]

      if (field === 'username') {
        if (!value.trim()) {
          this.loginErrors.username = 'Username is required'
        } else {
          this.loginErrors.username = ''
        }
      }

      if (field === 'password') {
        if (!value) {
          this.loginErrors.password = 'Password is required'
        } else if (value.length < 3) {
          this.loginErrors.password = 'Password must be at least 3 characters'
        } else {
          this.loginErrors.password = ''
        }
      }
    },

    validateLoginForm() {
      let isValid = true

      // Валидация имени пользователя
      if (!this.loginData.username.trim()) {
        this.loginErrors.username = 'Username is required'
        isValid = false
      } else {
        this.loginErrors.username = ''
      }

      if (!this.loginData.password) {
        this.loginErrors.password = 'Password is required'
        isValid = false
      } else if (this.loginData.password.length < 3) {
        this.loginErrors.password = 'Password must be at least 3 characters'
        isValid = false
      } else {
        this.loginErrors.password = ''
      }

      return isValid
    },

    handleLoginSubmit() {
      if (!this.validateLoginForm()) {
        return
      }

      this.loginLoading = true

      this.$emit('login', {
        username: this.loginData.username,
        password: this.loginData.password
      })

      setTimeout(() => {
        this.loginLoading = false
      }, 3000)
    },

    switchToRegister() {
      this.activeModal = 'register'
      // Сбрасываем ошибки входа при переключении
      this.loginErrors = { username: '', password: '' }
    },

    switchToLogin() {
      this.activeModal = 'login'
    },

    handleClose() {
      if (this.activeModal === 'login') {
        const hasErrors = this.loginErrors.username || this.loginErrors.password

        if (hasErrors) {
          return
        }

        const hasEmptyFields = !this.loginData.username.trim() || !this.loginData.passwor

        if (hasEmptyFields) {
          this.validateLoginForm()
          return
        }
      }

      this.$emit('close')
    }
  },
  emits: ['close', 'login']
}
</script>

<style scoped>
.input-error {
  border-color: #ff4444 !important;
  background-color: #fff8f8 !important;
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.1) !important;
}

.error-message {
  color: #ff4444;
  font-size: 12px;
  margin-top: 4px;
  font-family: 'DM Sans', sans-serif;
}

.registration-notice {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #856404;
}

.registration-notice p {
  margin: 4px 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 100%;
  max-width: 440px;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: modalSlide 0.3s ease;
}

@keyframes modalSlide {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  color: #999;
  padding: 4px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: #f5f5f5;
  color: #333;
}

.modal-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 28px;
  color: #222;
  margin: 0 0 24px 0;
  text-align: center;
  font-weight: 500;
}

.modal-form {
  margin-bottom: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  color: #333;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: rgba(104, 208, 23, 1);
  box-shadow: 0 0 0 3px rgba(104, 208, 23, 0.1);
}

.form-input::placeholder {
  color: #999;
  font-family: 'DM Sans', sans-serif;
}

.btn {
  padding: 14px 24px;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  text-align: center;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-block {
  width: 100%;
  display: block;
}

.btn-primary {
  background-color: rgba(104, 208, 23, 1);
  color: white;
  border-color: rgba(104, 208, 23, 1);
}

.btn-primary:hover:not(:disabled) {
  background-color: rgba(90, 188, 21, 1);
  border-color: rgba(90, 188, 21, 1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(104, 208, 23, 0.2);
}

.btn-outline {
  background-color: transparent;
  color: rgba(104, 208, 23, 1);
  border-color: rgba(104, 208, 23, 1);
}

.btn-outline:hover {
  background-color: rgba(104, 208, 23, 0.05);
  transform: translateY(-1px);
}

.modal-divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #999;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
}

.modal-divider::before,
.modal-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e0e0e0;
}

.modal-divider span {
  padding: 0 16px;
}

@media (max-width: 576px) {
  .modal {
    padding: 24px;
  }

  .modal-title {
    font-size: 24px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .btn {
    padding: 12px 20px;
    font-size: 15px;
  }
}
</style>
