<template>
  <div
    class="accordion"
    :class="[
        'accordion',
        {'accordion--open': isOpen}
      ]"
  >
    <button class="accordion__header-button" @click="toggle">
      <span>{{ title }}</span>
      <PlusIcon class="accordion__icon"/>
    </button>
    <div class="accordion__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import PlusIcon from '~/components/icons/PlusIcon.vue';

export default {
  name: 'AccordionBlock',
  components: {
    PlusIcon,
  },
  props: {
    title: {
      typee: String,
      default: '',
    },
    defaultOpen: {
      typee: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: this.defaultOpen || false,
    };
  },
  
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  }
};
</script>

<style lang='scss' scoped>
.accordion {
  padding: 15px 8.5px 6px 0;
  color: #333333;
}

.accordion__header-button {
  width: 100%;
  display: flex;
  padding: 0 0 6px 0;
  justify-content: space-between;
  border: none;
  background-color: unset;
  text-transform: uppercase;
  cursor:pointer;
  color: inherit;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0;
}

.accordion__body {
  padding: 0 5px;
  max-height: 0;
  color: inherit;
  overflow: hidden;
  transition: all .2s linear;
}

.accordion__icon {
  transition: all .2s linear;
}

.accordion--open {
  .accordion__body {
    max-height: 200px;
  }

  .accordion__icon {
    transform: rotate(45deg);
  }
}
</style>