<template>
  <div id="app">
    <v-header />
    <div class="page-content container">
      <router-view
        @save-person="savePerson($event)"
        :user-data="userData"
      />
    </div>
    <v-footer />
  </div>
</template>

<script>
import VHeader from '@/components/v-header'
import VFooter from '@/components/v-footer'
import router from '@/router'

export default {
  name: 'App',
  components: {
    VHeader,
    VFooter,
  },

  data () {
    return {
      userData: {
        name: '',
        age: '',
        children: [],
      },
    }
  },

  methods: {
    savePerson (data) {
      this.userData = { ...this.userData, ...data }

      router.push('preview')
    },
  },

}
</script>

<style lang="sass">

*
  margin: 0
  padding: 0
  box-sizing: border-box

a
  text-decoration: none
  font-family: Montserrat, sans-serif

li
  list-style-type: none

body
  font-family: Montserrat, sans-serif

p
  font-size: 13px
  line-height: 16px
  color: #000000

h1,
h2,
h3,
h4,
h5,
h6
  font-weight: 500
  color: #111111

input,
label
  font-family: Montserrat, sans-serif
  color: #111111

input[type="text"]
  text-transform: capitalize

.container
  max-width: 1366px
  width: 100%
  margin: 0 auto
.page-content
  min-height: calc(100vh - 152px)

button
  cursor: pointer
  font-family: Montserrat, sans-serif
  padding: 10px 20px
  border-radius: 100px
  outline: none
  &:disabled
    opacity: .3
    cursor: default
  &.btn-solid
    background-color: #01A7FD
    border: none
    color: white
    font-size: 14px
    line-height: 24px
  &.btn-transparent
    color: #01A7FD
    border: 2px solid #01A7FD
    background-color: transparent
</style>
