<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map-container"></div>
    <div class="minimal-controls">
      <button @click="zoomIn" class="map-btn" title="Zoom in">+</button>
      <button @click="zoomOut" class="map-btn" title="Zoom out">-</button>
      <button @click="locateGermany" class="map-btn" title="Germany">🇩🇪</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleMap',
  data() {
    return {
      map: null,
      zoom: 6,
      center: [51.1657, 10.4515]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap()
    })
  },
  methods: {
    async initMap() {
      try {
        const L = await import('leaflet')
        await import('leaflet/dist/leaflet.css')

        this.map = L.map(this.$refs.mapContainer).setView(this.center, this.zoom)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap',
          maxZoom: 19,
          minZoom: 3
        }).addTo(this.map)

        L.control
          .zoom({
            position: 'topright'
          })
          .addTo(this.map)

        L.marker(this.center).addTo(this.map).bindPopup('Germany Center').openPopup()
      } catch (error) {
        console.error('Error loading map:', error)
        this.showFallback()
      }
    },

    zoomIn() {
      if (this.map) {
        this.map.zoomIn()
      }
    },

    zoomOut() {
      if (this.map) {
        this.map.zoomOut()
      }
    },

    locateGermany() {
      if (this.map) {
        this.map.setView(this.center, 6)
      }
    },

    showFallback() {
      this.$refs.mapContainer.innerHTML = `
        <div class="fallback-map">
          <h3> Germany</h3>
          <p>Interactive map</p>
        </div>
      `
    }
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove()
      this.map = null
    }
  }
}
</script>

<style scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  max-width: 794px;
  height: 678px;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* Добавь адаптивность */
@media (max-width: 768px) {
  .map-wrapper {
    height: 500px;
  }
}

@media (max-width: 480px) {
  .map-wrapper {
    height: 400px;
  }
}

.map-container {
  width: 100%;
  height: 100%;
  background: #f8f9fa;
}

.minimal-controls {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 1000;
}

.map-btn {
  width: 40px;
  height: 40px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-btn:hover {
  background: #f5f5f5;
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

.map-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.fallback-map {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.fallback-map h3 {
  margin: 0 0 10px 0;
  font-size: 24px;
}

.fallback-map p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

:deep(.leaflet-control-zoom) {
  border: none !important;
  margin-top: 70px !important;
  margin-right: 20px !important;
}

:deep(.leaflet-control-zoom a) {
  background: white !important;
  border: 1px solid #ddd !important;
  color: #333 !important;
  border-radius: 4px !important;
  width: 34px !important;
  height: 34px !important;
  line-height: 30px !important;
  margin-bottom: 4px !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}

:deep(.leaflet-control-zoom a:hover) {
  background: #f5f5f5 !important;
}
</style>
