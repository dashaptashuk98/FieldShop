<template>
  <div class="product-card">
    <img :src="product.thumbnail" :alt="product.title" class="product-image" />
    <div class="product-info">
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-country">UK</p>
      <p class="product-size">
        <span class="product-label">Size: </span>
        <span class="product-value">{{ product.discountPercentage }}</span>
      </p>
      <p class="product-price">
        <span class="product-label">Price: </span>
        <span class="product-value">${{ product.price }}</span>
      </p>
      <div class="button__container">
        <ButtonComponent variant="outlineGreen" class="btnInvest">Invest</ButtonComponent>
        <ButtonComponent variant="Green" class="btnReserve">Reserve</ButtonComponent>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from '@/components/ButtonComponent.vue'

export default {
  name: 'ProductCard',
  components: {
    ButtonComponent
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: column;
}

.product-image {
  width: 100%;
  height: 420px;
  object-fit: cover;
  background: #f5f5f5;
}

.product-info {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
}

.product-size,
.product-price {
  margin: 0;
}

.product-title {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 31px;
  color: rgba(34, 34, 34, 1);
  margin: 0;
}

.product-country {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  color: #9c9c9c;
  margin: 0;
}

.btnInvest {
  width: 133px;
  height: 51px;
}

.btnReserve {
  width: 133px;
  height: 51px;
}

.button__container {
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding-top: 20px;
}

.product-label {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: #9c9c9c;
  margin: 0;
}

.product-value {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: #222222;
  margin: 0;
}

@media (max-width: 1023px) {
  .product-image {
    height: 350px;
  }
  .product-title {
    font-size: 22px;
  }
  .product-country {
    font-size: 18px;
  }
  .product-label,
  .product-value {
    font-size: 18px;
  }
}

@media (max-width: 767px) {
  .product-image {
    height: 300px;
  }
  .product-title {
    font-size: 20px;
  }
  .product-country {
    font-size: 16px;
  }
  .product-label,
  .product-value {
    font-size: 16px;
  }
  .button__container {
    flex-direction: column;
    width: 100%;
  }
  .btnInvest,
  .btnReserve {
    width: 100%;
  }
}
</style>
