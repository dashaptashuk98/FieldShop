<template>
  <header class="header">
    <div class="container">
      <nav class="header__nav">
        <div class="nav-menu">
          <ul class="nav-menu__list">
            <li class="nav-menu__item">
              <router-link to="/" exact-active-class="active" class="nav-menu__link"
                >Home</router-link
              >
            </li>
            <li class="nav-menu__item">
              <router-link to="/locations" active-class="active" class="nav-menu__link"
                >Locations</router-link
              >
            </li>
            <li class="nav-menu__item">
              <router-link to="/" class="nav-menu__link">Contacts</router-link>
            </li>
            <li class="nav-menu__item">
              <router-link to="/shop" active-class="active" class="nav-menu__link"
                >Shop</router-link
              >
            </li>
            <li class="nav-menu__item">
              <router-link to="/" class="nav-menu__link">Wallet</router-link>
            </li>
          </ul>
        </div>

        <div class="user-actions">
          <div class="cart">
            <img class="cart__icon" src="@/assets/images/Icon.svg" alt="Shopping cart" />
            <span class="cart__count">{{ cartCount }}</span>
          </div>

          <div class="user-profile" v-if="isAuthenticated && currentUser">
            <div class="user-info-compact">
              <div class="user-avatar">
                <img
                  v-if="currentUser.image"
                  :src="currentUser.image"
                  :alt="currentUser.firstName"
                  class="user-avatar__image"
                />
                <img
                  v-else
                  src="@/assets/images/user.svg"
                  :alt="currentUser.firstName"
                  class="user-avatar__image"
                />
              </div>
              <div class="user-details">
                <span class="user-name">{{ currentUser.firstName || currentUser.username }}</span>
              </div>
            </div>
            <button class="logout-btn-header" @click="handleLogout" title="Logout">
              <img src="@/assets/images/login-svgrepo-com.svg" alt="Logout" class="logout-icon" />
            </button>
          </div>

          <div class="login-icon" v-else @click="openLoginModal">
            <img src="@/assets/images/user.svg" alt="Login" class="login-icon__image" />
            <span class="login-text">Login</span>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppHeader',

  data() {
    return {
      cartCount: 0
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser'])
  },

  methods: {
    ...mapActions(['logout']),

    handleLogout() {
      if (confirm('Are you sure you want to logout?')) {
        this.logout()

        this.$router.push('/')
      }
    },

    openLoginModal() {
      this.$emit('open-login')
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  padding: 0 100px;
  box-sizing: border-box;
}

.header {
  padding: 35px 0;
}

.header__nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
}

.nav-menu__list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 40px;
}

.nav-menu__link {
  position: relative;
  text-decoration: none;
  font:
    400 24px/31px 'DM Sans',
    sans-serif;
  color: #222;
  opacity: 0.5;
  padding-bottom: 10px;
  transition: opacity 0.3s ease;
}

.nav-menu__link:hover {
  opacity: 1;
}

.nav-menu__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 5px;
  background: #68d017;
  border-radius: 4px 4px 0 0;
  transform: translateX(-50%);
  transition: width 0.3s ease;
}
.nav-menu__link.active {
  opacity: 1;
}
.nav-menu__link.active::after {
  width: 100%;
  opacity: 1;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 40px;
}

.cart {
  position: relative;
  display: flex;
  align-items: center;
}

.cart__count {
  position: absolute;
  top: -3px;
  left: 16px;
  width: 20px;
  height: 20px;
  background: #9be198;
  border: 2px solid #fff;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info-compact {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background: #68d017;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-avatar__placeholder {
  color: white;
  font-weight: bold;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #222;
  white-space: nowrap;
}

.logout-btn-header {
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.logout-btn-header:hover {
  background: rgba(255, 68, 68, 0.1);
}

.logout-icon {
  width: 18px;
  height: 18px;
}

.login-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 20px;
  background: rgba(104, 208, 23, 0.1);
  border: 1px solid rgba(104, 208, 23, 0.2);
  transition: all 0.2s ease;
}

.login-icon:hover {
  background: rgba(104, 208, 23, 0.2);
}

.login-icon__image {
  width: 20px;
  height: 20px;
}

.login-text {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #222;
  font-weight: 500;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .header__nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .nav-menu__list {
    gap: 20px;
  }

  .nav-menu__link {
    font-size: 18px;
  }

  .user-actions {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 20px 0;
  }

  .header__nav {
    flex-direction: column;
    gap: 15px;
  }

  .nav-menu__list {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .user-profile {
    padding: 6px 12px;
    gap: 10px;
  }

  .user-name {
    font-size: 12px;
  }

  .login-icon {
    padding: 6px 12px;
  }

  .login-text {
    font-size: 12px;
  }
}

/* Темная тема */
@media (prefers-color-scheme: dark) {
  .nav-menu__link {
    color: #fff;
  }

  .user-name {
    color: #fff;
  }

  .login-text {
    color: #fff;
  }

  .user-avatar__placeholder {
    color: #fff;
  }
}
</style>
