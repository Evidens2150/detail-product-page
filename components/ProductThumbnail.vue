<template>
  <div class="thumbnail" @click="$emit('select')">
    <NuxtImg
      :src="product.image"
      :alt="product.name"
      class="thumbnail__image"
    />
    <div class="thumbnail__description">
      <span class="thumbnail__description-text">
        {{ product.name }}
      </span>
      <PriceBadge
        :price="product.price"
        :discount-price="product.discountPrice"
        small
      />
    </div>
  </div>
</template>

<script>
import PriceBadge from "~/components/PriceBadge.vue";
export default {
  name: 'ProductThumbnail',
  components: {
    PriceBadge,
  },
  props: {
    product: Object,
  },
};
</script>

<style lang='scss' scoped>
.thumbnail {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.thumbnail__image {
  width: 100%;
  object-fit: contain;
}

.thumbnail__description {
  display: flex;
  flex-direction: column;
  padding: 13px 15px 7px;
  gap: 10px;
}

.thumbnail__description-text {
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0;
  text-transform: lowercase;
}

@media(max-width: 1023px) {
  .thumbnail__description-text {
    text-transform: uppercase;
  }

  .thumbnail__description {
    padding: 8px 7px 20px;
    gap: 5px;
  }
}
</style>