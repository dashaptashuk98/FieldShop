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
      width="20"
      height="20"
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
      default: 'left'
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
  min-width: 148px;
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
  background-color: var(--color-primary);
  color: var(--color-background-white);
}

.btn--primary:hover {
  background-color: var(--color-primary-dark);
}

.btn--outline {
  background-color: transparent;
  color: var(--color-text-primary);
  border: 2px solid var(--color-text-primary);
}

.btn--outline:hover {
  background-color: var(--color-background-light-gray);
  transform: translateY(-2px);
}

.btn--green-outline {
  background-color: transparent;
  color: var(--color-text-primary);
  border: 2px solid var(--color-primary-green);
}

.btn--green-text {
  background-color: transparent;
  color: var(--color-primary-green);
  border: none;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .btn {
    min-width: 140px;
    height: 50px;
    padding: 12px 24px;
  }
}
</style>
