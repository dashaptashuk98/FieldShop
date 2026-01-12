<!-- src/views/HomeView.vue -->
<script>
import AppHeader from '@/components/AppHeader.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import FeatureCard from '@/components/FeatureCart.vue'
import cabageImage from '@/assets/images/cabage.jpg'
import tomatoImage from '@/assets/images/tomato.jpg'
import growthImage from '@/assets/images/growth.jpg'
import searchIcon from '@/assets/images/growth.jpg'

export default {
  name: 'HomeView',
  components: {
    AppHeader,
    ButtonComponent,
    FeatureCard
  },
  data() {
    return {
      searchIcon: searchIcon,
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
    <AppHeader />
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
