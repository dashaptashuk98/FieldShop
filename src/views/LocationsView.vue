<template>
  <div class="locations">
    <main class="locations__main">
      <div class="locations__container">
        <section class="locations__header">
          <h1 class="locations__title">Locations</h1>
          <div class="locations__search">
            <img class="locations__search-icon" src="@/assets/images/search.svg" alt="Search" />
            <input
              v-model="searchText"
              type="text"
              class="locations__search-input"
              placeholder="Search by title"
            />
            <ButtonComponent class="locations__search-btn" variant="primary">
              Search
            </ButtonComponent>
          </div>
        </section>
        <section class="locations__content">
          <div class="locations__grid">
            <div class="locations__list-section">
              <div class="locations__controls">
                <div class="locations__filter">
                  <span class="locations__filter-title">Sort by</span>
                  <select class="locations__select">
                    <option value="all">All</option>
                    <option value="price">Price</option>
                    <option value="size">Size</option>
                  </select>
                </div>
                <ButtonComponent
                  :icon="FilterIcon"
                  iconAlt="Filter"
                  variant="outline"
                  class="locations__btn-filter"
                >
                  Filter
                </ButtonComponent>
                <div v-if="filteredFields.length === 0 && searchText" class="locations__no-results">
                  No results for "{{ searchText }}"
                </div>
              </div>
              <div class="locations__list-container">
                <ul class="locations__list">
                  <LocationCard v-for="field in filteredFields" :key="field.id" :field="field" />
                </ul>
              </div>
            </div>
            <div class="locations__map">
              <SimpleMap />
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import ButtonComponent from '@/components/ButtonComponent.vue'
import SimpleMap from '@/components/MapComponent.vue'
import LocationCard from '@/components/LocationCard.vue'
import FilterIcon from '@/assets/images/filter-edit.svg'

export default {
  name: 'LocationsView',
  components: {
    ButtonComponent,
    SimpleMap,
    LocationCard
  },
  data() {
    return {
      FilterIcon: FilterIcon,
      fields: [],
      searchText: ''
    }
  },
  computed: {
    filteredFields() {
      if (!this.searchText) {
        return this.fields
      }
      const query = this.searchText.toLowerCase()
      return this.fields.filter((field) => field.title.toLowerCase().startsWith(query))
    }
  },
  async created() {
    try {
      const response = await fetch('https://dummyjson.com/products')
      const data = await response.json()
      this.fields = data.products
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}
</script>

<style scoped>
.locations__container {
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  padding: 0 100px;
  box-sizing: border-box;
}

.locations {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.locations__main {
  flex: 1;
  padding: 60px 0;
}

.locations__header {
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
}

.locations__title {
  max-width: 1076px;
  margin: 0;
  font:
    400 64px/88px 'DM Serif Text',
    serif;
  color: #353640;
  text-align: center;
}

.locations__search {
  position: relative;
  width: 100%;
  max-width: 900px;
}

.locations__search-icon {
  position: absolute;
  left: 25px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  z-index: 2;
}

.locations__search-input {
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
}

.locations__search-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  height: 51px;
  width: 140px;
  border-radius: 12px;
}

.locations__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  height: calc(100vh - 300px);
  min-height: 600px;
}

.locations__list-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.locations__controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-shrink: 0;
}

.locations__no-results {
  text-align: center;
  padding: 20px;
  color: #666;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
}

.locations__list-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;
  max-height: calc(400px + 20px + 20px + 51px + 20px);
}

.locations__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 21px;
}

.locations__btn-filter {
  width: 105px;
  height: 48px;
}

.locations__filter {
  display: flex;
  align-items: center;
  gap: 15px;
}

.locations__filter-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  color: #353640;
  font-weight: 500;
}

.locations__select {
  border: none;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #000;
  cursor: pointer;
}

.locations__list-container::-webkit-scrollbar {
  width: 8px;
}

.locations__list-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.locations__list-container::-webkit-scrollbar-thumb {
  background: #68d017;
  border-radius: 4px;
}

.locations__list-container::-webkit-scrollbar-thumb:hover {
  background: #5abc15;
}

@media (max-width: 1023px) {
  .locations__container {
    padding: 0 50px;
  }
  .locations__title {
    font-size: 48px;
    line-height: 64px;
  }
  .locations__grid {
    grid-template-columns: 1fr;
    gap: 40px;
    height: auto;
    min-height: auto;
  }
  .locations__list-container {
    max-height: 500px;
  }
}

@media (max-width: 767px) {
  .locations__container {
    padding: 0 20px;
  }
  .locations__main {
    padding: 40px 0;
  }
  .locations__header {
    gap: 30px;
    margin-bottom: 40px;
  }
  .locations__title {
    font-size: 32px;
    line-height: 42px;
  }
  .locations__search-input {
    height: 60px;
    padding-left: 50px;
    padding-right: 130px;
    font-size: 16px;
  }
  .locations__search-icon {
    left: 15px;
    width: 20px;
    height: 20px;
  }
  .locations__search-btn {
    height: 46px;
    width: 110px;
    right: 7px;
  }
  .locations__controls {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  .locations__filter {
    justify-content: space-between;
  }
  .locations__list-container {
    max-height: 400px;
  }
}
</style>
