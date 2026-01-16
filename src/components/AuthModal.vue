<template>
  <div class="auth-modal__overlay" v-if="activeModal === 'login'">
    <div class="auth-modal">
      <button class="auth-modal__close" @click="handleClose">×</button>
      <h2 class="auth-modal__title">Login</h2>
      <form class="auth-modal__form" @submit.prevent="handleLoginSubmit">
        <div class="form__group">
          <label for="login-username" class="form__label">Username</label>
          <input
            type="text"
            id="login-username"
            class="form__input"
            :class="{ 'form__input--error': loginErrors.username }"
            v-model="loginData.username"
            placeholder="Enter your username"
            @input="validateLoginField('username')"
            required
          />
          <div v-if="loginErrors.username" class="form__error">{{ loginErrors.username }}</div>
        </div>
        <div class="form__group">
          <label for="login-password" class="form__label">Password</label>
          <input
            type="password"
            id="login-password"
            class="form__input"
            :class="{ 'form__input--error': loginErrors.password }"
            v-model="loginData.password"
            placeholder="Enter your password"
            @input="validateLoginField('password')"
            required
          />
          <div v-if="loginErrors.password" class="form__error">{{ loginErrors.password }}</div>
        </div>
        <button type="submit" class="btn btn--primary btn--block" :disabled="loginLoading">
          <span v-if="!loginLoading">Login to Account</span>
          <span v-else>Logging in...</span>
        </button>
      </form>
      <div class="auth-modal__divider"><span>Or</span></div>
      <button class="btn btn--outline btn--block" @click="switchToRegister">
        Create New Account
      </button>
    </div>
  </div>
  <div class="auth-modal__overlay" v-else-if="activeModal === 'register'">
    <div class="auth-modal">
      <button class="auth-modal__close" @click="handleClose">×</button>
      <h2 class="auth-modal__title">Registration</h2>
      <form class="auth-modal__form" @submit.prevent="handleRegisterSubmit">
        <div class="form__row">
          <div class="form__group">
            <label for="reg-firstName" class="form__label">First Name *</label>
            <input
              type="text"
              id="reg-firstName"
              class="form__input"
              v-model="registerData.firstName"
              placeholder="Emily"
              required
            />
          </div>
          <div class="form__group">
            <label for="reg-lastName" class="form__label">Last Name *</label>
            <input
              type="text"
              id="reg-lastName"
              class="form__input"
              v-model="registerData.lastName"
              placeholder="Johnson"
              required
            />
          </div>
        </div>
        <div class="form__group">
          <label for="reg-username" class="form__label">Username *</label>
          <input
            type="text"
            id="reg-username"
            class="form__input"
            v-model="registerData.username"
            placeholder="emilys"
            required
          />
        </div>
        <div class="form__group">
          <label for="reg-email" class="form__label">Email</label>
          <input
            type="email"
            id="reg-email"
            class="form__input"
            v-model="registerData.email"
            placeholder="emily@example.com"
          />
        </div>
        <div class="form__group">
          <label for="reg-password" class="form__label">Password *</label>
          <input
            type="password"
            id="reg-password"
            class="form__input"
            v-model="registerData.password"
            placeholder="At least 6 characters"
            required
          />
        </div>
        <button type="submit" class="btn btn--primary btn--block" :disabled="registerLoading">
          <span v-if="!registerLoading">Create Account</span>
          <span v-else>Processing...</span>
        </button>
      </form>
      <div class="auth-modal__divider"><span>Already have an account?</span></div>
      <button class="btn btn--outline btn--block" @click="switchToLogin">
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
        const hasEmptyFields = !this.loginData.username.trim() || !this.loginData.password
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
.auth-modal__overlay {
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
.auth-modal {
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 100%;
  max-width: 440px;
  position: relative;
}
.auth-modal__close {
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
.auth-modal__title {
  font-family: 'DM Sans', sans-serif;
  font-size: 28px;
  color: #222;
  margin: 0 0 24px 0;
  text-align: center;
  font-weight: 500;
}
.auth-modal__form {
  margin-bottom: 24px;
}
.auth-modal__divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #999;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
}
.auth-modal__divider::before,
.auth-modal__divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e0e0e0;
}
.auth-modal__divider span {
  padding: 0 16px;
}
.form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}
.form__group {
  margin-bottom: 20px;
}
.form__label {
  display: block;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  margin-bottom: 6px;
}
.form__input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  color: #333;
  box-sizing: border-box;
}
.form__input--error {
  border-color: #ff4444;
  background-color: #fff8f8;
}
.form__error {
  color: #ff4444;
  font-size: 12px;
  margin-top: 4px;
  font-family: 'DM Sans', sans-serif;
}
.btn {
  padding: 14px 24px;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: 2px solid transparent;
  text-align: center;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn--block {
  width: 100%;
  display: block;
}
.btn--primary {
  background-color: rgba(104, 208, 23, 1);
  color: white;
  border-color: rgba(104, 208, 23, 1);
}
.btn--outline {
  background-color: transparent;
  color: rgba(104, 208, 23, 1);
  border-color: rgba(104, 208, 23, 1);
}
@media (max-width: 1023px) {
  .auth-modal {
    padding: 28px;
  }
  .auth-modal__title {
    font-size: 26px;
  }
}
@media (max-width: 767px) {
  .auth-modal {
    padding: 24px;
  }
  .auth-modal__title {
    font-size: 24px;
  }
  .form__row {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .btn {
    padding: 12px 20px;
    font-size: 15px;
  }
}
</style>
