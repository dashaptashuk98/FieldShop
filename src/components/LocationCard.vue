<template>
  <li class="location-card">
    <div class="location-card__wrapper">
      <img :src="field.thumbnail" :alt="field.title" class="location-card__image" />
      <div class="location-card__footer">
        <div class="location-card__info">
          <span class="location-card__title">{{ field.title }}</span>
          <span class="location-card__description">Germany</span>
        </div>
        <ButtonComponent variant="outlineGreen" class="location-card__btn">Shop</ButtonComponent>
      </div>
    </div>
  </li>
</template>

<script>
import ButtonComponent from '@/components/ButtonComponent.vue'

export default {
  name: 'LocationCard',
  components: {
    ButtonComponent
  },
  props: {
    field: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.location-card {
  width: 100%;
  margin: 0;
  flex: 0 0 auto;
}

.location-card__wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.location-card__image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin: 20px 0;
}

.location-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.location-card__info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.location-card__title {
  font-family: 'DM Serif Text', serif;
  font-size: 24px;
  color: #353640;
  font-weight: 400;
}

.location-card__description {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  color: #9c9c9c;
}

.location-card__btn {
  width: 133px;
  height: 51px;
}

@media (max-width: 1023px) {
  .location-card__image {
    height: 350px;
  }
  .location-card__title {
    font-size: 22px;
  }
  .location-card__description {
    font-size: 18px;
  }
}

@media (max-width: 767px) {
  .location-card__image {
    height: 300px;
  }
  .location-card__footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  .location-card__btn {
    width: 100%;
  }
  .location-card__title {
    font-size: 20px;
  }
  .location-card__description {
    font-size: 16px;
  }
}
</style>
