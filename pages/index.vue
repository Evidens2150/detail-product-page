<template>
  <div class="container">

    <div class="top-section">
      <ImageSlider
        :name="product.name"
        :images="product.images"
      />

      <div class="info-section">
        <div class="info-section__heading">
          <h1 class="page-heading">{{ product.name }}</h1>
          <ButtonComponent
            class="add-to-favorite-button add-to-favorite-button--mobile"
            @clicked="toggleFavorite"
          >
            <FavoriteIcon/>
          </ButtonComponent>
        </div>
        <PriceBadge
          :price="product.price"
          :discount-price="product.discountPrice"
        />

        <div class="option-group">
          <VariantList
            title="Размеры"
            :option-list="processedSizeOptions"
            bordered
            is-readonly
          />
        </div>

        <div class="option-group info-section__colors">
          <VariantList
            v-model="selectedColor"
            :option-list="colorOptions"
            without-option-title
          >
            <template #title>
              {{ colorSelectorTitle }}
            </template>
          </VariantList>
        </div>

        <div class="buttons">
          <ButtonComponent
            color-type="secondary"
            bordered
            class="add-to-cart-button"
            @clicked="addToCart"
          >
            Добавить в корзину
          </ButtonComponent>
          <ButtonComponent
            bordered
            class="add-to-favorite-button"
            @clicked="toggleFavorite"
          >
            <FavoriteIcon/>
          </ButtonComponent>
        </div>

        <ul class="accordion-list">
          <li class="accordion-list__item">
            <AccordionBlock title="Описание">
              {{ product.description }}
            </AccordionBlock>
          </li>
          <li class="accordion-list__item">
            <AccordionBlock title="Состав и уход">
              {{ product.care }}
            </AccordionBlock>
          </li>
        </ul>
      </div>
    </div>

    <div class="related-products">
      <h2 class="page-heading">Похожие товары</h2>
      <div class="related-products__list">
        <ProductThumbnail
          v-for="item in relatedProducts"
          :key="item.id"
          :product="item"
          @select="selectProduct(item)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductThumbnail from "~/components/ProductThumbnail.vue";
import AccordionBlock from "~/components/AccordionBlock.vue";
import ImageSlider from "~/components/ImageSlider.vue";
import PriceBadge from "~/components/PriceBadge.vue";
import VariantList from "~/components/VariantList.vue";
import ButtonComponent from "~/components/ButtonComponent.vue";
import FavoriteIcon from '~/components/icons/FavoriteIcon.vue';

export default {
  components: {
    ProductThumbnail,
    ImageSlider,
    AccordionBlock,
    PriceBadge,
    VariantList,
    ButtonComponent,
    FavoriteIcon,
  },

  data() {
    return {
      product: {
        name: 'Жакет удлинённый, белый',
        price: 8900,
        discountPrice: 0,
        images: [
          "/images/dress1.png",
          "/images/dress2.png",
          "/images/dress3.png",
        ],
        description: "Легкий и стильный жакет для теплых дней.",
        care: "Рекомендуется ручная стирка при температуре не выше +30°C. Не отбеливать. Гладить при средней температуре.",
      },
      sizeOptions: [
        { label: "XS", value: "XS", count: 2, bySubscribe: false, },
        { label: "S", value: "S", count: 10, bySubscribe: false, },
        { label: "M", value: "M", count: 2, bySubscribe: true, },
      ],
      colorOptions: [
        { label: "Белый", value: "white", background: "#fff", border: '#BDBDBD' },
        { label: "Черный", value: "black", background: "#000" },
        { label: "Бежевый", value: "beige", background: "#f5f5dc" },
      ],
      selectedColor: "white",
      currentImage: "/images/dress1.png",

      relatedProducts: [
        {
          id: 1,
          name: 'ПЛАТЬЕ С V-ОБРАЗНЫМ ВЫРЕЗОМ, БЕЛЫЙ',
          price: 8000,
          discountPrice: 14900,
          image: "/images/dress_related1.png",
        },
        {
          id: 2,
          name: 'ЖАКЕТ ДВУБОРТНЫЙ, СЕРО-ГОЛУБОЙ',
          price: 8900,
          image: "/images/dress_related2.png",
        },
        {
          id: 3,
          name: 'ПЛАТЬЕ МАКСИ С ЯРУСАМИ, БЕЛЫЙ',
          price: 10500,
          image: "/images/dress_related3.png",
        },
        {
          id: 4,
          name: 'КОМБИНЕЗОН СО СТОЙКОЙ, ЧёРНЫЙ',
          price: 9500,
          image: "/images/dress_related4.png",
        },
      ],
    };
  },
  computed: {
    processedSizeOptions() {
      return this.sizeOptions.map(item => {
        const hint = item.bySubscribe
        ? 'подписка'
        : !item.count || item.count < 5
          ? 'мало'
          : ''

        return {
          ...item,
          unavailable: item.bySubscribe,
          hint,
        }
      })
    },
    colorSelectorTitle() {
      const mainText = 'Цвет'

      const selectedColorLabel = this.colorOptions.find(item => item.value === this.selectedColor)?.label?.toLowerCase() || '';

      if (!selectedColorLabel) return mainText;

      return `${mainText}: ${selectedColorLabel}`
    }
  },
  methods: {
    addToCart() {
      alert("Добавлено в корзину");
    },
    toggleFavorite() {
      alert("Добавлено в избранное");
    },
    selectProduct(item) {
      alert(`Выбран товар ${item.name}`);
    },
    handleSelectColor(color) {
      this.selectedColor = color;
    },
  },
};
</script>

<style lang='scss'scoped>
.top-section {
  position: relative;
  left: -28px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 61px;
  justify-content: center;
}

.images-section {
  max-width: 100%;
  flex-shrink: 1;
}

.info-section {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.info-section__heading {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  position: relative;
}

.info-section__colors {
  padding-top: 5px;
}

.option-group{
  margin-top: 30px;
}

.buttons {
  margin-top: 36px;
  display: flex;
  gap: 10px;
  height: 44px;
}

.add-to-cart-button {
  height: 100%;
  max-width: 306px;
}

.add-to-favorite-button {
  height: 100%;
  width: 44px;
  flex-shrink: 0;

  &--mobile {
    display: none;
    position: absolute;
    top: -9px;
    right: -6px;
    height: fit-content;
    width: fit-content;
  }
}

.accordion-list {
  padding-top: 40px;
}

.accordion-list__item {
  border-bottom: 1px solid #E0E0E0;

  &:first-child {
    border-top: 1px solid #E0E0E0;
  }
}

.related-products {
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 31px;
}

.related-products__list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

@media(max-width: 1199px) {
  .top-section {
    position: static;
  }
}

@media(max-width: 1023px) {
  .top-section {
    gap: 31px;
  }

  .accordion-list {
    padding-top: 30px;
  }

  .info-section {
    width: 100%;
    max-width: unset;
    padding: 0 16px;
  }

  .related-products {
    gap: 28px;
    padding: 40px 16px 0;
  }

  .related-products__list {
    grid-template-columns: repeat(2, 1fr);
  }
}


@media(max-width: 767px) {
  .buttons {
    display: none;
  }

  .add-to-favorite-button--mobile {
    display: flex;
  }
}
</style>
