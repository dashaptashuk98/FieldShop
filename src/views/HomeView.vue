<script>
import ButtonComponent from '@/components/ButtonComponent.vue'
import cabageImage from '@/assets/images/cabage.jpg'
import tomatoImage from '@/assets/images/tomato.jpg'
import growthImage from '@/assets/images/growth.jpg'
import CardComponent from '@/components/CardComponent.vue'

export default {
  name: 'HomeView',
  components: {
    ButtonComponent,
    CardComponent
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
  <div class="home">
    <main class="home__main">
      <div class="home__container">
        <section class="hero">
          <h1 class="hero__title">
            Rent your own field, invest in farming, and grow your own vegetables
          </h1>
          <ButtonComponent @click="handleStartClick">Let's start</ButtonComponent>
        </section>
        <section class="features">
          <ul class="features__list">
            <li v-for="feature in features" :key="feature.id" class="features__item">
              <CardComponent :image="feature.image" :alt-text="feature.alt" :text="feature.text" />
            </li>
          </ul>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home__container {
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  padding: 0 100px;
  box-sizing: border-box;
}

.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.home__main {
  flex: 1;
  padding: 60px 0;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  margin-bottom: 100px;
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 35px;
}

.features__item {
  width: 100%;
}

@media (max-width: 1023px) {
  .home__container {
    padding: 0 50px;
  }
  .hero__title {
    font-size: 48px;
    line-height: 64px;
    max-width: 800px;
  }
  .features__list {
    grid-template-columns: auto;
    gap: 30px;
  }
}

@media (max-width: 767px) {
  .home__container {
    padding: 0 20px;
  }
  .home__main {
    padding: 40px 0;
  }
  .hero {
    gap: 40px;
    margin-bottom: 60px;
  }
  .hero__title {
    font-size: 32px;
    line-height: 42px;
  }
}
</style>
