<template>
  <div class="variants">
    <h3 class="variants__heading">
      <slot name="title">
        {{ title }}
      </slot>
    </h3>
    <ul
      :class="[
        'variants__list',
        { 'variants__list--shrinked': withoutOptionTitle},
      ]"
    >
      <li
        v-for="(option, optionIndex) in optionList"
        :key="optionIndex"
        :class="[
          'variants__item',
          { 'variants__item--readonly': isReadonly},
          { 'variants__item--active': checkSelected(option.value)},
          { 'variants__item--unavailable': option.unavailable},
        ]"
      >
        <label
          :class="[
            'variants__radio',
            { 'variants__radio--filled': !withoutOptionTitle},
            { 'variants__radio--bordered': bordered},
          ]"
          :style="getVariantItemStyles(option)"
          @click.prevent="select(option.value)"
        >
          <input
            type="radio"
            :value="value"
            class="variants__radio-input"
          />
            <span
              v-if="!withoutOptionTitle"
              class="variants__radio-label"
            >
              {{ option.label }}
            </span>
        </label>

        <span
          v-if="option.hint"
          class="variants__hint"
        >
          {{ option.hint }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VariantList',
  props: {
    title: {
      type: String,
      default: '',
    },
    optionList: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    withoutOptionTitle: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    checkSelected(optionValue) {
      return this.value === optionValue;
    },
    getVariantItemStyles(option) {
      const currentStyleList = [];

      if (!!option.background) {
        currentStyleList.push(`background-color: ${option.background};`)
      }

      if (!!option.border) {
        currentStyleList.push(`border: 1px solid ${option.border};`)
      }

      if (!this.isReadonly && !option.unavailable) {
        currentStyleList.push('cursor: pointer;')
      }

      return currentStyleList.join(' ');
    },
    select(optionValue) {
      if (this.isReadonly || this.checkSelected(optionValue)) return;

      this.$emit('input', optionValue);
    },
  },
};
</script>

<style lang='scss' scoped>
.variants {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.variants__heading {
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0;
  color: #4F4F4F;
}

.variants__list {
  display: flex;
  gap: 14px;

  &--shrinked {
    gap: 10px;
  }
}

.variants__item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 3px 3px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.5px;
    background-color: transparent;
    transition: all .2s linear;
  }

  &--readonly {
    padding: 0;
  }

  &--active::after {
    background-color: #4F4F4F;
  }

  &--unavailable {
    opacity: .5;
  }
}

.variants__radio {
  display: flex;
  align-items: center;
  justify-content: center;
  
  min-height: 27px;
  min-width: 28px;
  border: 1px solid transparent;
  transition: all .2s linear;

  &--filled {
    min-width: 65px;
    min-height: 31px;
  }

  &--bordered {
    border-color: #333333;
  }
}
.variants__radio-input {
  display: none;
} 

.variants__radio-label {
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  text-transform: uppercase;
}

.variants__hint {
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0;
  text-align: center;
}
</style>