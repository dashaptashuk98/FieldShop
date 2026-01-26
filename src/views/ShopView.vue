<template>
  <div class="shop">
    <main class="shop__main">
      <div class="shop__container">
        <span class="shop__title">Invest</span>
        <div class="shop__header">
          <div class="shop__filter">
            <span class="shop__filter-title">Sort by</span>
            <select id="sortShop" v-model="sortBy" class="shop__select" @change="updateSort">
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
import { mapGetters, mapActions } from 'vuex'
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
      MapIcon,
      FilterIcon
    }
  },
  computed: {
    sortBy: {
      get() {
        return this.$store.state.products.sortBy
      },
      set(value) {
        this.$store.commit('products/SET_SORT_BY', value)
      }
    },
    ...mapGetters('products', ['sortProducts'])
  },
  async created() {
    await this.fetchProducts()
  },
  methods: {
    ...mapActions('products', ['fetchProducts']),

    updateSort(event) {
      this.sortBy = event.target.value
    },

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
  color: var(--color-text-primary);
  padding-bottom: 10px;
  border-bottom: 5px solid var(--color-primary-green);
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
  color: var(--color-text-secondary);
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
