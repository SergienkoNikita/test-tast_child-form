<template>
 <div class="preview form">
   <section class="preview__personal-area">
     <h3 class="form__title">Персональные данные</h3>
     <h3
       v-if="userData.name && userData.age"
       class="preview__personal-data preview__data"
     >
       {{ [userData.name, ageToHuman(userData.age)].join(', ') }}
     </h3>
   </section>

   <section
     v-if="userData.children.length"
     class="preview__children-area"
   >
     <h3 class="form__title">Дети</h3>

     <h3
       v-for="child in userData.children"
       :key="child.id"
       class="preview__child-data preview__data"
     >
       {{ [child.name, ageToHuman(child.age)].join(', ') }}
     </h3>
   </section>
 </div>
</template>

<script>
export default {
  name: 'Preview',

  props: {
    userData: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ageToHuman (age) {
      if (age > 10 && age < 20) {
        return `${age} лет`
      }

      if (age % 10 > 1 && age % 10 < 5) {
        return `${age} года`
      }

      if (age % 10 === 1) {
        return `${age} год`
      }

      return `${age} лет`
    },
  },
}
</script>

<style lang="sass">
.preview
  .form__title
    margin-bottom: 20px

  &__data
    font-weight: 700

  &__children-area
    margin-top: 60px
    width: fit-content

  &__child-data
    padding: 10px 20px
    background-color: #F1F1F1
    border-radius: 5px
    width: fit-content

    & + .preview__child-data
      margin-top: 20px
</style>
