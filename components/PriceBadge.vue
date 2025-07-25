<template>
  <p :class="[
      'price',
      {'price--small': small}
    ]"
  >
    {{ currentPrice }}
    <span
      v-if='!!oldPrice'
      class="price__old"
    >
      {{ oldPrice }}
    </span>
  </p>
</template>

<script>
export default {
  name: 'PriceBadge',
  props: {
    price: {
      type: Number,
      default: 0,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentPrice() {
      const currentPriceValue = this.discountPrice || this.price;

      return this.formatPrice(currentPriceValue);
    },
    oldPrice() {
      if (!this.discountPrice) return '';

      return this.formatPrice(this.price);
    }
  },
  methods: {
    formatPrice(priceValue) {
      return `${priceValue} RUB`;
    },
  },
}
</script>

<style lang='scss' scoped>
.price {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  text-transform: uppercase;

  &__old {
    padding-left: 10px;
    color: #828282;
    text-decoration: line-through;
  }

  &--small {
    font-size: 10px;
    line-height: 14px;
  }
}
</style>