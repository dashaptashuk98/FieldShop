<!-- src/components/common/Button.vue -->
<template>
  <button
    :class="['btn', `btn--${variant}`]"
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
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
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.btn {
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

.btn--primary {
  background-color: #68d017;
  color: #ffffff;
}

.btn--primary:hover {
  background-color: #5abc15;
  transform: translateY(-2px);
}

.btn--outline {
  background-color: transparent;
  color: #000000;
  border: 2px solid #000000;
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
