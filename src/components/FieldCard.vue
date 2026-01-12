<template>
  <li class="info__item">
    <div class="info__wrapp">
      <img :src="field.thumbnail" :alt="field.title" class="info__img" />
      <div class="info__footer">
        <div class="info__descr">
          <span class="info__name">{{ field.title }}</span>
          <span class="info__des">Germany</span>
        </div>
        <ButtonComponent variant="outlineGreen" class="btnShop">Shop</ButtonComponent>
      </div>
    </div>
  </li>
</template>

<script>
import ButtonComponent from '@/components/ButtonComponent.vue'

export default {
  name: 'FieldCard',
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
.info__item {
  width: 100%;
  margin: 0;
  flex: 0 0 auto;
}

.info__wrapp {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.info__img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin: 20px 0;
}

.info__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.info__descr {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info__name {
  font-family: 'DM Serif Text', serif;
  font-size: 24px;
  color: #353640;
  font-weight: 400;
}

.info__des {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  color: #9c9c9c;
}

.btnShop {
  width: 133px;
  height: 51px;
}
</style>
