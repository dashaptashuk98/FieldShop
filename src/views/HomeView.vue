<!-- src/views/HomeView.vue -->
<script>
import ButtonComponent from '@/components/ButtonComponent.vue'
import FeatureCard from '@/components/FeatureCart.vue'
import cabageImage from '@/assets/images/cabage.jpg'
import tomatoImage from '@/assets/images/tomato.jpg'
import growthImage from '@/assets/images/growth.jpg'
export default {
  name: 'HomeView',
  components: {
    ButtonComponent,
    FeatureCard
  },
  data() {
    return {
      features: [
        {
          id: 1,
          image: cabageImage,
          alt: 'Cabbage farm',
          text: 'Rent your own piece of farmland <br />and watch your vegetables grow.'
        },
        {
          id: 2,
          image: tomatoImage,
          alt: 'Tomato farm',
          text: 'Enjoy, year after year, the wonders of nature with your rented vegetable farmland<br />(60 sqm / 30 sqm).'
        },
        {
          id: 3,
          image: growthImage,
          alt: 'Plant growth',
          text: 'Grow your own piece of land, from planting seeds in the lush soil to harvesting your own vegetables.'
        }
      ]
    }
  },
  methods: {
    handleStartClick() {
      this.$router.push('/locations')
    }
  }
}
</script>

<template>
  <div class="home-page">
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
              <span class="cart__count">0</span>
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
    <main class="main-content">
      <div class="container">
        <section class="hero">
          <h1 class="hero__title">
            Rent your own field, invest in farming, and grow your own vegetables
          </h1>
          <ButtonComponent @click="handleStartClick">Let's start</ButtonComponent>
        </section>
        <section class="features">
          <ul class="features__list">
            <li v-for="feature in features" :key="feature.id" class="features__item">
              <FeatureCard :image="feature.image" :alt-text="feature.alt" :text="feature.text" />
            </li>
          </ul>
        </section>
      </div>
    </main>
  </div>
</template>

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
  margin-bottom: 116px;
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

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  margin-bottom: 150px;
  text-align: center;
}

.hero__title {
  max-width: 1076px;
  margin: 0;
  font:
    400 64px/88px 'DM Serif Text',
    serif;
  color: #353640;
}

.features__list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 35px;
  justify-content: space-between;
}

.features__item {
  flex: 1;
  min-width: 350px;
  max-width: 550px;
}

/* Адаптивность HomeView */
@media (max-width: 1440px) {
  .container {
    padding: 0 50px;
  }

  .hero__title {
    font-size: 48px;
    line-height: 64px;
    max-width: 800px;
  }

  .features__item {
    min-width: 300px;
  }
}

@media (max-width: 1024px) {
  .container {
    padding: 0 30px;
  }

  .header__nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-bottom: 60px;
  }

  .nav-menu__list {
    gap: 20px;
  }

  .nav-menu__link {
    font-size: 18px;
  }

  .hero__title {
    font-size: 36px;
    line-height: 48px;
    max-width: 600px;
  }

  .features__list {
    flex-wrap: wrap;
    justify-content: center;
  }

  .features__item {
    flex: 0 0 calc(50% - 18px);
    min-width: 280px;
    max-width: 450px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }

  .header__nav {
    flex-direction: column;
    gap: 15px;
    padding: 20px 0;
  }

  .nav-menu__list {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .hero {
    gap: 40px;
    margin-bottom: 80px;
  }

  .hero__title {
    font-size: 28px;
    line-height: 38px;
  }

  .features__list {
    flex-direction: column;
    align-items: center;
  }

  .features__item {
    flex: 0 0 100%;
    min-width: 100%;
    max-width: 550px;
  }
}

@media (max-width: 480px) {
  .hero__title {
    font-size: 24px;
    line-height: 32px;
  }
}
</style>
