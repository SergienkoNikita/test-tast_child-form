<template>
<div class="v-input">
  <input
    v-bind="$attrs"
    :class="className"
    @input="$emit('input', $event.target.value)"
    @blur="$emit('blur')"
    required
  />
  <label>{{ label }}</label>
  <slot name="error" />
</div>
</template>

<script>
export default {
  name: 'VInput',

  inheritAttrs: false,

  props: {
    label: {
      type: String,
      required: true,
    },

    className: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="sass">
.v-input
  position: relative

  input
    width: 100%
    height: 100%
    font-size: 14px
    line-height: 24px
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button
      display: none
    &:valid + label,
    &:focus + label
      top: 6px
      font-size: 13px

  label
    position: absolute
    left: 16px
    top: 16px
    color: rgba(17, 17, 17, 0.48)
    font-size: 16px
    line-height: 24px
    transition: all .2s linear
    z-index: 0

  &.invalid label
    top: 6px
    font-size: 13px
    color: red
</style>
