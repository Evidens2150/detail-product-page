<template>
  <div class="slider">
    <div
      class="thumbnails"
      :class="{ 'thumbnails--pagination': isPagination }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="'thumb-' + index"
        class="thumbnail"
        :class="{ 'thumbnail--active': index === activeIndex }"
        @click="goToSlide(index)"
      >
        <NuxtImg
          v-if="!isPagination"
          :src="slide.src"
          :alt="slide.alt"
          class="thumbnail-image"
        />
      </div>
    </div>

    <div class="slider__gallery">
      <swiper
        ref="mainSwiper"
        :options="swiperOptions"
        :pagination="{dynamicBullets: true, clickable: true}"
        @slideChange="handleSlideChange"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="'slide-' + index">
          <NuxtImg
            :src="slide.src"
            :alt="slide.alt"
            class="slider__image"
          />
        </swiper-slide>
      </swiper>
      <ButtonComponent
        colorType="custom"
        rounded
        :disabled="isBeginning"
        class="slider__navigation-button slider__navigation-button--prev"
        @clicked="goPrev"
      >
        <ArrowIcon class="slider__navigation-button-icon-rotated"/>
      </ButtonComponent>
      <ButtonComponent
        colorType="custom"
        rounded
        :disabled="isEnd"
        class="slider__navigation-button slider__navigation-button--next"
        @clicked="goNext"
      >
        <ArrowIcon/>
      </ButtonComponent>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import ButtonComponent from "~/components/ButtonComponent.vue";
import ArrowIcon from '~/components/icons/ArrowIcon.vue';

export default {
  name: 'ImageSlider',
  components: {
    Swiper,
    SwiperSlide,
    ButtonComponent,
    ArrowIcon,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: 0,
      isPagination: false,
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    }
  },
  computed: {
    isBeginning() {
      return this.activeIndex === 0;
    },
    isEnd() {
      return this.activeIndex === this.images.length - 1;
    },
    slides() {
      const baseSlideName = this.name || 'Изображение товара';

      return this.images.map((item, index) => ({
        src: item,
        alt: `${baseSlideName} - ${index}`
      }));
    },
  },
  mounted() {
    this.checkWindowWidth();
    window.addEventListener('resize', this.checkWindowWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkWindowWidth);
  },
  methods: {
    checkWindowWidth() {
      this.isPagination = window.innerWidth <= 768;
    },
    getSwiperCore() {
      if (!this.$refs.mainSwiper?.$el?.swiper) return null;

      return this.$refs.mainSwiper.$el.swiper;
    },
    goToSlide(index) {
      const swiperCore = this.getSwiperCore();
      if (!swiperCore) return;
      swiperCore.slideTo(index);
    },
    handleSlideChange() {
      const swiperCore = this.getSwiperCore();
      if (!swiperCore) return;
      this.activeIndex = swiperCore.realIndex;
    },
    goPrev() {
      const swiperCore = this.getSwiperCore();
      if (!swiperCore) return;
      swiperCore.slidePrev();
    },
    goNext() {
      const swiperCore = this.getSwiperCore();
      if (!swiperCore) return;
      swiperCore.slideNext();
    },
  },
}
</script>

<style lang='scss' scoped>
.slider {
  position: relative;
  display: flex;
  width: fit-content;
  max-width: 100%;
  align-items: flex-start;
}

.thumbnails {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-right: 30px;

  &--pagination {
    flex-direction: row;
    gap: 6px;
    margin-right: 0;
    padding: 5px 6px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 12px;
    z-index: 2;
  }
}

.thumbnail {
  width: 70px;
  max-height: 87.84px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;

  transition: all .2s linear;

  &--active {
    opacity: .5;
  }
}

.thumbnails--pagination .thumbnail {
  width: 7px;
  height: 7px;
  background-color: white;
  border-radius: 100%;

  &--active {
    opacity: .4;
  }
}

.thumbnail-image {
  width: 100%;
  object-fit: contain;
}

.slider__gallery {
  position: relative;
  max-width: 518px;
  width: 100%;
}

.slider__image {
  width: 100%;
  object-fit: cover;
}

.button.slider__navigation-button {
  position: absolute;
  top: 50%;
  width: 32px;
  height: 32px;
  transform: translateY(-25%);
  background-color: rgba(white, .4);
  color: black;
  cursor: pointer;
  z-index: 1;
}

.slider__navigation-button--prev {
  left: 16px;
}

.slider__navigation-button--next {
  right: 16px;
}

.slider__navigation-button-icon-rotated {
  transform: rotate(180deg)
}

@media(max-width: 767px) {
  .swiper-slide {
    height: 617px;
    display: flex;
    justify-content: center;
  }

  .button.slider__navigation-button {
    transform: translateY(-50%);
  }
}
</style>