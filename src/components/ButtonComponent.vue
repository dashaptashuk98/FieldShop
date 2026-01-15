<template>
  <button
    :class="['btn', `btn--${variant}`]"
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <img
      v-if="icon"
      :src="icon"
      :alt="iconAlt"
      :class="['btn__icon', `btn__icon--${iconPosition}`]"
    />

    <span class="btn__text">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    variant: {
      type: String,
      default: 'primary'
    },
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'right'].includes(value)
    },
    iconAlt: {
      type: String,
      default: 'icon'
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px 30px;
  width: 148px;
  height: 57px;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
}

.btn__icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.btn__icon--left {
  order: 1;
}

.btn__icon--right {
  order: 3;
}

.btn__text {
  order: 2;
}

.btn--primary {
  background-color: #68d017;
  color: #ffffff;
}

.btn--primary:hover {
  background-color: #5abc15;
}

.btn--outline {
  background-color: transparent;
  color: #000000;
  border: 2px solid #000000;
}

.btn--outlineGreen {
  background-color: transparent;
  color: #000000;
  border: 2px solid rgba(104, 208, 23, 1);
}

.btn--Green {
  background-color: transparent;
  color: rgba(104, 208, 23, 1);
  border: none;
}

.btn--outline:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .btn {
    width: 140px;
    height: 50px;
    padding: 12px 24px;
  }
}

@media (max-width: 480px) {
  .btn {
    width: 120px;
    height: 45px;
    padding: 10px 20px;
    font-size: 16px;
  }
}
</style>
