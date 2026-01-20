<template>
  <div class="product-card">
    <img
      :src="product.thumbnail"
      :alt="product.title"
      class="product-image"
      width="400"
      height="420"
    />
    <div class="product-info">
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-country">UK</p>
      <p class="product-size">
        <span class="product-label">Size: </span>
        <span class="product-value">{{ product.discountPercentage }}</span>
        <span class="product-size-images">
          <img
            v-for="n in sizeImagesCount"
            :key="n"
            src="@/assets/images/grass.png"
            alt="Size unit"
            class="size-image"
            width="25"
            height="25"
          />
        </span>
      </p>
      <p class="product-price">
        <span class="product-label">Price: </span>
        <span class="product-value">${{ product.price }}</span>
      </p>
      <div class="button__container">
        <ButtonComponent variant="green-outline" class="btnInvest">Invest</ButtonComponent>
        <ButtonComponent variant="green-text" class="btnReserve">Reserve</ButtonComponent>
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
  computed: {
    sizeImagesCount() {
      const size = String(this.product.discountPercentage)
      if (size >= 10) {
        const firstDigit = parseInt(size[0])
        return firstDigit
      } else return 0
    }
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
  border: 1px solid var(--color-border-light);
  border-radius: 12px;
  overflow: hidden;
  background: var(--color-background-white);
  display: flex;
  flex-direction: column;
}

.product-image {
  width: 100%;
  height: 420px;
  object-fit: cover;
  background: var(--color-background-light-gray);
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
  display: flex;
  gap: 5px;
}

.product-size-images {
  display: flex;
  gap: 5px;
  align-items: center;
}

.size-image {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.product-title {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 31px;
  color: var(--color-text-primary);
  margin: 0;
}

.product-country {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  color: var(--color-text-gray);
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
  color: var(--color-text-gray);
  margin: 0;
}

.product-value {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: var(--color-text-primary);
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
