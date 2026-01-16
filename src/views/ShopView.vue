<template>
  <div class="shop">
    <main class="shop__main">
      <div class="shop__container">
        <span class="shop__title">Invest</span>
        <div class="shop__header">
          <div class="shop__filter">
            <span class="shop__filter-title">Sort by</span>
            <select v-model="sortBy" class="shop__select">
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
            class="shop__btn-filter"
          >
            Filter
          </ButtonComponent>
          <ButtonComponent
            :icon="MapIcon"
            iconAlt="Map"
            variant="primary"
            class="shop__btn-map"
            @click="moveToLocations"
          >
            Map
          </ButtonComponent>
        </div>
        <div class="shop__grid">
          <div class="shop__products">
            <ProductCard v-for="product in sortProducts" :key="product.id" :product="product" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import MapIcon from '@/assets/images/marker-02.svg'
import FilterIcon from '@/assets/images/filter-edit.svg'
import ButtonComponent from '@/components/ButtonComponent.vue'
import ProductCard from '@/components/ProductCard.vue'

export default {
  name: 'ShopView',
  components: {
    ButtonComponent,
    ProductCard
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
    moveToLocations() {
      this.$router.push('/locations')
    }
  }
}
</script>

<style scoped>
.shop__container {
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  padding: 0 100px;
  box-sizing: border-box;
}

.shop {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.shop__main {
  flex: 1;
  padding: 40px 0;
}

.shop__grid {
  width: 100%;
}

.shop__products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
}

.shop__btn-filter {
  width: 107px;
  height: 44px;
}

.shop__btn-map {
  width: 133px;
  height: 44px;
}

.shop__title {
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

.shop__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 50px;
  margin-bottom: 55px;
}

.shop__filter {
  display: flex;
  align-items: center;
  gap: 15px;
}

.shop__filter-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  color: #353640;
  font-weight: 500;
}

.shop__select {
  border: none;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  cursor: pointer;
}

@media (max-width: 1023px) {
  .shop__container {
    padding: 0 50px;
  }
  .shop__products {
    grid-template-columns: 1fr 1fr;
    gap: 25px;
  }
}

@media (max-width: 767px) {
  .shop__container {
    padding: 0 20px;
  }
  .shop__header {
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;
  }
  .shop__products {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
