<template>
  <div class="card">
    <div class="card__image-wrapper">
      <img :src="image" :alt="altText" class="card__image" />
    </div>
    <div class="card__content">
      <p class="card__text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    image: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      default: 'Card image'
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  position: relative;
  width: 100%;
  height: 370px;
  border-radius: 20px;
  overflow: hidden;
}

.card__image-wrapper {
  width: 100%;
  height: 100%;
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__content {
  position: absolute;
  bottom: 15px;
  left: 20px;
  right: 20px;
}

.card__text {
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

@media (max-width: 1023px) {
  .card {
    height: 300px;
  }
  .card__text {
    font-size: 16px;
    line-height: 22px;
  }
}

@media (max-width: 767px) {
  .card {
    height: 250px;
  }
  .card__content {
    left: 15px;
    right: 15px;
  }
  .card__text {
    font-size: 14px;
    line-height: 20px;
    padding: 10px 12px;
  }
}
</style>
