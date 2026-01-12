<template>
  <div class="feature-card">
    <div class="feature-card__image-wrapper">
      <img :src="image" :alt="altText" class="feature-card__image" />
    </div>
    <div class="feature-card__content">
      <p class="feature-card__text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureCard',
  props: {
    image: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      default: 'Feature image'
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.feature-card {
  position: relative;
  width: 100%;
  height: 370px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card__image-wrapper {
  width: 100%;
  height: 100%;
}

.feature-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-card__image {
  transform: scale(1.05);
}

.feature-card__content {
  position: absolute;
  bottom: 15px;
  left: 20px;
  right: 20px;
}

.feature-card__text {
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #dcdcdc;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  color: #353640;
  text-align: center;
  backdrop-filter: blur(5px);
  margin: 0;
}

@media (max-width: 1440px) {
  .feature-card {
    height: 320px;
  }

  .feature-card__text {
    font-size: 16px;
    line-height: 22px;
  }
}

@media (max-width: 1024px) {
  .feature-card {
    height: 280px;
  }

  .feature-card__content {
    left: 15px;
    right: 15px;
  }
}

@media (max-width: 768px) {
  .feature-card {
    height: 250px;
  }

  .feature-card__text {
    font-size: 14px;
    line-height: 20px;
    padding: 10px 12px;
  }
}

@media (max-width: 480px) {
  .feature-card {
    height: 220px;
  }
}
</style>
