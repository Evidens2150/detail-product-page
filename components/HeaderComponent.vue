<template>
  <div class="header">
    <NuxtImg
      src="images/Logo.png"
      alt="Logo"
      class="header__image"
    />
    <ul class="header__navigation">
      <li class="header__navigation-item header__navigation-item--search">
        <ButtonComponent
            rounded
            @clicked="handleNavigation('search')"
          >
            <SmallSearchIcon/>
          </ButtonComponent>
      </li>
      <li class="header__navigation-item header__navigation-item--favorite">
        <ButtonComponent
            rounded
            @clicked="handleNavigation('favorite')"
          >
            <SmallFavoriteIcon/>
          </ButtonComponent>
      </li>
      <li class="header__navigation-item header__navigation-item--account">
        <ButtonComponent
            rounded
            @clicked="handleNavigation('account')"
          >
            <SmallAccountIcon/>
          </ButtonComponent>
      </li>
      <li class="header__navigation-item header__navigation-item--cart">
        <ButtonComponent
            rounded
            @clicked="handleNavigation('cart')"
          >
            <SmallCartIcon/>
          </ButtonComponent>
      </li>
    </ul>
  </div>
</template>

<script>
import ButtonComponent from "~/components/ButtonComponent.vue";
import SmallSearchIcon from '~/components/icons/SmallSearchIcon.vue';
import SmallFavoriteIcon from '~/components/icons/SmallFavoriteIcon.vue';
import SmallAccountIcon from '~/components/icons/SmallAccountIcon.vue';
import SmallCartIcon from '~/components/icons/SmallCartIcon.vue';
export default {
  name: 'HeaderComponent',
  components: {
    ButtonComponent,
    SmallSearchIcon,
    SmallFavoriteIcon,
    SmallAccountIcon,
    SmallCartIcon,
  },
  methods: {
    handleNavigation(itemName) {
      alert(`Переход к ${itemName}`);
    },
  },
};
</script>

<style lang='scss' scoped>
.header {
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
  padding: 33px 48px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.header__image {
  height: 30px;
  object-fit: contain;
  position: absolute;
  left: 48%;
}

.header__navigation {
  display: flex;
  gap: 16px;
}

.header__navigation-item {
  width: 20px;
}

@media(max-width: 767px) {
  .header {
    padding: 15px 16px;
  }

  .header__image {
    height: 24px;
    left: 44%;
  }

  .header__navigation {
    width: 100%;
    justify-content: flex-start;
  }

  .header__navigation-item {
    &--favorite {
      display: none;
    }

    &--account {
      order: 0;
    }

    &--search {
      order: 1;
    }

    &--cart {
      margin-left: auto;
      order: 2;
    }
  }
}
</style>