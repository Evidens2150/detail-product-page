<template>
  <button
    :class="[
      'button',
      currentClassList,
      colorType ? `button--${colorType}` : false
    ]"
    :disabled="disabled"
    @click="$emit('clicked')"
  >
    <!-- <div class="button__content"> -->
      <slot></slot>
    <!-- </div> -->
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    colorType: {
      type: String,
      default: 'primary', // primary, secondary, custom
    },
  },
  computed: {
    currentClassList() {
      return {
        'button--bordered': this.bordered,
        'button--rounded': this.rounded,
      };
    },
  },
}
</script>

<style lang='scss' scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 20px;
  min-height: 20px;
  padding: 0;
  border: none;
  background-color: unset;
  cursor: pointer;
  opacity: 1;

  font-weight: 400;
  font-size: 11px;
  line-height: 15px;
  letter-spacing: 0;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;


  transition: all .2s linear;

  &--bordered {
    border: 1px solid black;

    &:hover,
    &:focus {
      border-color: #4F4F4F;
    }
  }

  &--rounded {
    border-radius: 100%;
  }

  &--custom {

    &:not(:disabled):hover,
    &:not(:disabled):focus {
      opacity: .7;
    }
  }

  &--primary {
    background-color: white;
    color: black;

    &:not(:disabled):hover,
    &:not(:disabled):focus {
      background-color: black;
      color: white;
    }
  }

  &--secondary {
    background-color: black;
    color: white;

    &:not(:disabled):hover,
    &:not(:disabled):focus {
      background-color: white;
      color: black;
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: .4;
  }
}
</style>