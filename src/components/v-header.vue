<template>
  <header class="header">
    <div class="container">
      <div class="header__content">
        <router-link
          class="header__logo"
          to="/"
        >
          <img
            class="header__logo-img"
            :src="require('@/assets/img/logo.png')"
            alt="logo"
          >
        </router-link>

        <nav>
          <ul class="header__nav">
            <li class="header__nav-li">
              <router-link
                class="header__nav-link"
                :exact-active-class="'header__nav-link_active'"
                to="/"
              >
                Форма
              </router-link>
            </li>
            <li class="header__nav-li">
              <router-link
                class="header__nav-link"
                :exact-active-class="'header__nav-link_active'"
                to="/preview"
              >
                Превью
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'VHeader',
}
</script>

<style lang="sass">
.header
  box-shadow: 0 1px 0 rgba(17, 17, 17, 0.1)

  &__content
    padding: 24px 95px
    text-align: center

  &__logo
    float: left

  &__nav
    display: flex
    justify-content: center

  &__nav-li + .header__nav-li
    margin-left: 25px

  &__nav-link
    font-size: 14px
    line-height: 24px
    color: rgba(17, 17, 17, 0.48)
    transition: opacity .2s ease-in
    &:hover,
    &:active
      opacity: .4

    &_active
      color: rgba(17, 17, 17, 0.73)
      &:hover
        opacity: 1
</style>
