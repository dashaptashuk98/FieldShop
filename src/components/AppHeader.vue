<template>
  <header class="header">
    <div class="container">
      <nav class="header__nav">
        <div class="nav-menu">
          <ul class="nav-menu__list">
            <li class="nav-menu__item">
              <router-link to="/" class="nav-menu__link">Home</router-link>
            </li>
            <li class="nav-menu__item">
              <router-link to="/locations" class="nav-menu__link">Locations</router-link>
            </li>
            <li class="nav-menu__item">
              <router-link to="/contacts" class="nav-menu__link">Contacts</router-link>
            </li>
            <li class="nav-menu__item">
              <router-link to="/shop" class="nav-menu__link">Shop</router-link>
            </li>
            <li class="nav-menu__item">
              <router-link to="/wallet" class="nav-menu__link">Wallet</router-link>
            </li>
          </ul>
        </div>
        <div class="user-actions">
          <div class="cart">
            <img class="cart__icon" src="@/assets/images/Icon.svg" alt="Shopping cart" />
            <span class="cart__count">{{ cartCount }}</span>
          </div>
          <div class="user-profile">
            <div class="user-avatar">
              <img
                src="@/assets/images/6786bf8ee56da6f5759fbc498844a60864be656a.jpg"
                alt="User avatar"
                class="user-avatar__image"
              />
            </div>
            <img class="user-profile__dropdown" src="@/assets/images/Vector.svg" alt="Menu" />
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      cartCount: 0
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

.nav-menu__link:hover::after,
.nav-menu__link.active::after {
  width: 100%;
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
  gap: 10px;
}

.user-avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

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
}
</style>
