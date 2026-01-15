<!-- src/views/LocationsView.vue -->
<template>
  <div class="lovations-page">
    <AppHeader />
    <main class="main-content">
      <div class="container">
        <section class="locations">
          <h1 class="locations__title">Locations</h1>
          <div class="form__search">
            <img class="header__center-img" src="@/assets/images/search.svg" alt="Поиск" />
            <input
              type="text"
              class="header__center-search"
              placeholder="Search by city, country, village places"
            />
            <ButtonComponent class="search-clear" variant="primary"> Search </ButtonComponent>
          </div>
        </section>
        <section class="info">
          <div class="info__inner">
            <div class="info__spec">
              <div class="info__header">
                <div class="info__filter">
                  <span class="info__title">Sort by</span>
                  <select class="info__select" id="info__select">
                    <option value="value1">All</option>
                    <option value="value2">Price</option>
                    <option value="value3">Size</option>
                  </select>
                </div>
                <ButtonComponent
                  :icon="FilterIcon"
                  iconAlt="Filter"
                  variant="outline"
                  class="btnFilter"
                >
                  Filter
                </ButtonComponent>
              </div>
              <div class="info__list-container">
                <ul class="info__list">
                  <FieldCard v-for="field in fields" :key="field.id" :field="field" />
                </ul>
              </div>
            </div>

            <SimpleMap />
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import SimpleMap from '@/components/MapComponent.vue'
import FieldCard from '@/components/FieldCard.vue'
import FilterIcon from '@/assets/images/filter-edit.svg'

export default {
  name: 'LocationsView',
  components: {
    AppHeader,
    ButtonComponent,
    SimpleMap,
    FieldCard
  },
  data() {
    return {
      FilterIcon: FilterIcon,
      fields: []
    }
  },
  async created() {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=5')
      const data = await response.json()
      this.fields = data.products
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

.locations {
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  justify-content: center;
}

.locations__title {
  max-width: 1076px;
  margin: 0;
  font:
    400 64px/88px 'DM Serif Text',
    serif;
  color: #353640;
}

.form__search {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin-bottom: 60px;
}

.header__center-img {
  position: absolute;
  left: 25px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  z-index: 2;
}

.header__center-search {
  width: 100%;
  max-width: 900px;
  height: 71px;
  padding: 10px 160px 10px 65px;
  border-radius: 18px;
  background-color: rgba(234, 234, 234, 1);
  border: 2px solid transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  color: #353640;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.header__center-search:focus {
  outline: none;
  border-color: #68d017;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(104, 208, 23, 0.1);
}

.header__center-search::placeholder {
  color: #999;
  font-size: 18px;
}

.search-clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  height: 51px !important;
  width: 140px !important;
  border-radius: 12px !important;
  margin: 0 !important;
}

.info__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  justify-content: space-between;
}

.info__spec {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
}

.info__list-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;
  max-height: calc(400px + 20px + 20px + 51px + 20px);
}

.info__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 21px;
}

.info__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.btnFilter {
  width: 105px;
  height: 48px;
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
  font-size: 20px;
  font-weight: 500;
  color: #000;
  cursor: pointer;
}

.info__select:focus {
  outline: none;
  border-color: #68d017;
}

.info__list-container::-webkit-scrollbar {
  width: 8px;
}

.info__list-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.info__list-container::-webkit-scrollbar-thumb {
  background: #68d017;
  border-radius: 4px;
}

.info__list-container::-webkit-scrollbar-thumb:hover {
  background: #5abc15;
}

@media (max-width: 1200px) {
  .container {
    padding: 0 50px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }

  .locations__title {
    font-size: 36px;
    line-height: 48px;
  }

  .header__center-search {
    height: 60px;
    padding-left: 50px;
    padding-right: 130px;
    font-size: 16px;
  }

  .header__center-img {
    left: 15px;
    width: 20px;
    height: 20px;
  }

  .search-clear {
    height: 46px !important;
    width: 110px !important;
    font-size: 16px !important;
    right: 7px;
  }

  .info__header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }

  .info__filter {
    justify-content: space-between;
  }

  .info__inner {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .locations__title {
    font-size: 28px;
    line-height: 38px;
  }

  .header__center-search {
    height: 50px;
    padding-left: 45px;
    padding-right: 100px;
    font-size: 14px;
  }

  .search-clear {
    height: 40px;
    width: 85px;
    font-size: 14px;
    right: 5px;
    border-radius: 8px;
  }

  .header__center-search::placeholder {
    font-size: 14px;
  }
}
</style>
