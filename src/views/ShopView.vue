<template>
  <div class="shop-view">
    <AppHeader />
    <main class="main-content">
      <div class="container">
        <div class="products-grid">
          <div class="products-list">
            <div v-for="product in products" :key="product.id" class="product-card">
              <img :src="product.thumbnail" :alt="product.title" class="product-image" />
              <div class="product-info">
                <h3 class="product-title">{{ product.title }}</h3>
                <p class="product-country">UK</p>
                <p class="product-size">Size: {{ product.discountPercentage }}</p>
                <p class="product-price">Price: {{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'

export default {
  name: 'ShopView',
  components: {
    AppHeader
  },
  data() {
    return {
      products: [],
      loading: false,
      error: null
    }
  },
  async created() {
    try {
      const response = await fetch('https://dummyjson.com/products')
      const data = await response.json()
      this.products = data.products
    } catch (error) {
      console.error('Error fetching data:', error)
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

.shop-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 40px 0;
}

.products-grid {
  width: 100%;
}

.products-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: white;
}

.product-image {
  width: 100%;
  height: 420px;
  object-fit: cover;
  background: #f5f5f5;
}

.product-info {
  padding: 20px;
}

.product-title {
  font-family: 'DM Serif Text', serif;
  font-size: 20px;
  color: #353640;
  margin: 0 0 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  font-family: 'DM Sans', sans-serif;
  font-size: 24px;
}

@media (max-width: 1200px) {
  .container {
    padding: 0 50px;
  }

  .products-list {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 25px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }

  .shop-title {
    font-size: 36px;
    line-height: 48px;
  }

  .products-list {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  .product-image {
    height: 180px;
  }
}

@media (max-width: 480px) {
  .products-list {
    grid-template-columns: 1fr;
  }

  .product-card {
    max-width: 100%;
  }
}
</style>
