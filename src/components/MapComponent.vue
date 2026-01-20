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
      center: [51.1657, 10.4515],
      isMounted: false
    }
  },

  mounted() {
    this.isMounted = true
    this.initMap()
  },

  methods: {
    async initMap() {
      try {
        const L = await import('leaflet')
        await import('leaflet/dist/leaflet.css')
        if (!this.isMounted || !this.$refs.mapContainer) return
        this.map = L.map(this.$refs.mapContainer, {
          zoomControl: false,
          fadeAnimation: false,
          zoomAnimation: false,
          markerZoomAnimation: false,
          transform3DLimit: 1,
          bounceAtZoomLimits: false
        }).setView(this.center, this.zoom)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap',
          maxZoom: 19,
          minZoom: 3
        }).addTo(this.map)
        this.disableLeafletAnimations()
      } catch (error) {
        console.error('Error loading map:', error)
      }
    },

    disableLeafletAnimations() {
      if (!this.map) return
      this.map._animateZoom = function () {}
      this.map._animatePan = function () {}

      const originalSetView = this.map.setView
      this.map.setView = function (center, zoom, options) {
        return originalSetView.call(this, center, zoom, {
          animate: false,
          ...options
        })
      }

      const originalFlyTo = this.map.flyTo
      if (originalFlyTo) {
        this.map.flyTo = function (target, options) {
          return originalSetView.call(
            this,
            target.center || target,
            target.zoom || this.getZoom(),
            {
              animate: false,
              ...options
            }
          )
        }
      }
    },

    zoomIn() {
      if (this.map) {
        this.map.setZoom(this.map.getZoom() + 1, { animate: false })
      }
    },

    zoomOut() {
      if (this.map) {
        this.map.setZoom(this.map.getZoom() - 1, { animate: false })
      }
    },

    locateGermany() {
      if (this.map) {
        this.map.setView(this.center, 6, { animate: false })
      }
    }
  },

  beforeUnmount() {
    this.isMounted = false

    if (this.map) {
      try {
        if (this.map._stop) this.map._stop()
        this.map.eachLayer((layer) => {
          if (layer.remove) {
            try {
              layer.remove()
            } catch (error) {
              console.warn('Failed to remove layer:', error)
            }
          }
        })
        this.map.remove()
        this.map = null
        if (this.$refs.mapContainer) {
          this.$refs.mapContainer.innerHTML = ''
        }
      } catch (error) {
        console.warn('Error during map cleanup:', error)
      }
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

@media (max-width: 768px) {
  .map-wrapper {
    height: 500px;
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
</style>
