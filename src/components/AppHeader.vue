<template>
  <header class="header">
    <div class="container">
      <nav class="header__nav">
        <div class="nav">
          <ul class="nav__list">
            <li class="nav__item">
              <router-link to="/" exact-active-class="nav__link--active" class="nav__link"
                >Home</router-link
              >
            </li>
            <li class="nav__item">
              <router-link to="/locations" active-class="nav__link--active" class="nav__link"
                >Locations</router-link
              >
            </li>
            <li class="nav__item">
              <router-link to="/" class="nav__link">Contacts</router-link>
            </li>
            <li class="nav__item">
              <router-link to="/shop" active-class="nav__link--active" class="nav__link"
                >Shop</router-link
              >
            </li>
            <li class="nav__item">
              <router-link to="/" class="nav__link">Wallet</router-link>
            </li>
          </ul>
        </div>

        <div class="header__user-actions">
          <div class="cart">
            <img class="cart__icon" src="@/assets/images/Icon.svg" alt="Shopping cart" />
            <span class="cart__count">{{ cartCount }}</span>
          </div>

          <div class="user-profile" v-if="isAuthenticated && currentUser">
            <div class="user-profile__info">
              <div class="user-profile__avatar">
                <img
                  v-if="currentUser.image"
                  :src="currentUser.image"
                  :alt="currentUser.firstName"
                  class="user-profile__avatar-image"
                />
                <img
                  v-else
                  src="@/assets/images/user.svg"
                  :alt="currentUser.firstName"
                  class="user-profile__avatar-image"
                />
              </div>
              <div class="user-profile__details">
                <span class="user-profile__name">{{
                  currentUser.firstName || currentUser.username
                }}</span>
              </div>
            </div>
            <button class="user-profile__logout" @click="handleLogout" title="Logout">
              <img
                src="@/assets/images/login-svgrepo-com.svg"
                alt="Logout"
                class="user-profile__logout-icon"
              />
            </button>
          </div>

          <div class="auth" v-else @click="openLoginModal">
            <img src="@/assets/images/user.svg" alt="Login" class="auth__icon" />
            <span class="auth__text">Login</span>
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

.nav__list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 40px;
}

.nav__link {
  position: relative;
  text-decoration: none;
  font:
    400 24px/31px 'DM Sans',
    sans-serif;
  color: #222;
  opacity: 0.5;
  padding-bottom: 10px;
}

.nav__link:hover {
  opacity: 1;
}

.nav__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 5px;
  background: #68d017;
  border-radius: 4px 4px 0 0;
  transform: translateX(-50%);
}

.nav__link--active {
  opacity: 1;
}

.nav__link--active::after {
  width: 100%;
  opacity: 1;
}

.header__user-actions {
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

.user-profile__info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-profile__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background: #68d017;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-profile__avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-profile__details {
  display: flex;
  flex-direction: column;
}

.user-profile__name {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #222;
  white-space: nowrap;
}

.user-profile__logout {
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

.user-profile__logout-icon {
  width: 18px;
  height: 18px;
}

.auth {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 20px;
  background: rgba(104, 208, 23, 0.1);
  border: 1px solid rgba(104, 208, 23, 0.2);
}

.auth__icon {
  width: 20px;
  height: 20px;
}

.auth__text {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #222;
  font-weight: 500;
}

@media (max-width: 1023px) {
  .header__nav {
    flex-wrap: wrap;
    gap: 20px;
  }

  .nav__list {
    gap: 20px;
  }

  .nav__link {
    font-size: 18px;
  }

  .header__user-actions {
    gap: 20px;
  }
}

@media (max-width: 767px) {
  .header {
    padding: 20px 0;
  }

  .header__nav {
    gap: 15px;
    justify-content: center;
  }

  .nav__list {
    align-items: center;
    gap: 10px;
  }

  .nav__link {
    font-size: 16px;
  }

  .user-profile {
    padding: 6px 12px;
    gap: 10px;
  }

  .user-profile__name {
    font-size: 12px;
  }

  .auth {
    padding: 6px 12px;
  }

  .auth__text {
    font-size: 12px;
  }
}
</style>
