<template>
  <div class="shop-view">
    <AppHeader />
    <main class="main-content">
      <div class="container">
        <span class="product__invest">Invest</span>
        <div class="info__header">
          <div class="info__filter">
            <span class="info__title">Sort by</span>
            <select v-model="sortBy" class="info__select">
              <option value="all">All</option>
              <option value="price">Price</option>
              <option value="size">Size</option>
            </select>
          </div>
          <ButtonComponent
            :icon="FilterIcon"
            icon-position="right"
            iconAlt="Filter"
            variant="outline"
            class="btnFilter"
          >
            Filter
          </ButtonComponent>
          <ButtonComponent
            :icon="MapIcon"
            iconAlt="Map"
            variant="primary"
            class="btnMap"
            @click="MoveToLocations"
          >
            Map
          </ButtonComponent>
        </div>
        <div class="products-grid">
          <div class="products-list">
            <div v-for="product in sortProducts" :key="product.id" class="product-card">
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
                  <ButtonComponent variant="outlineGreen" class="btnInvest">
                    Invest
                  </ButtonComponent>
                  <ButtonComponent variant="Green" class="btnReserve"> Reserve </ButtonComponent>
                </div>
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
import MapIcon from '@/assets/images/marker-02.svg'
import FilterIcon from '@/assets/images/filter-edit.svg'
import ButtonComponent from '@/components/ButtonComponent.vue'
export default {
  name: 'ShopView',
  components: {
    AppHeader,
    ButtonComponent
  },
  data() {
    return {
      products: [],
      loading: false,
      error: null,
      MapIcon: MapIcon,
      FilterIcon: FilterIcon,
      sortBy: 'all'
    }
  },
  computed: {
    sortProducts() {
      if (this.sortBy === 'all') return this.products

      const copy = [...this.products]

      if (this.sortBy === 'price') {
        return copy.sort((a, b) => a.price - b.price)
      }

      if (this.sortBy === 'size') {
        return copy.sort((a, b) => a.discountPercentage - b.discountPercentage)
      }

      return this.products
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
  },
  methods: {
    MoveToLocations() {
      this.$router.push('/locations')
    }
  }
}
</script>

<style scoped>
body {
  background-color: white;
}
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

.btnFilter {
  width: 107px;
  height: 44px;
}

.btnMap {
  width: 133px;
  height: 44px;
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

.product__invest {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 31px;
  display: flex;
  align-items: center;
  display: inline-flex;
  color: #222222;
  padding-bottom: 10px;
  border-bottom: 5px solid rgba(104, 208, 23, 1);
  margin-bottom: 54px;
}

.info__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 50px;
  margin-bottom: 55px;
}

.info__filter {
  display: flex;
  align-items: center;
  gap: 15px;
}

.info__title {
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  color: #353640;
  font-weight: 500;
}

.info__select {
  border: none;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  cursor: pointer;
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

.info__select:focus {
  outline: none;
  border-color: #68d017;
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
