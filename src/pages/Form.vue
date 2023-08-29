<template>
<div class="form">
  <section class="form__personal-area">
    <h3 class="form__title">Персональные данные</h3>

    <v-input
      type="text"
      v-model="personData.name.value"
      :class="['form__field', personData.name.valid ? '' : 'invalid']"
      :class-name="'form__input'"
      :label="'Имя'"
      @blur="validateName(personData.name)"
    >
      <template
        v-if="!personData.name.valid"
        #error
      >
        <span class="form__field-error">
          {{ personData.name.value.length ? 'Имя должно содержать буквы' : 'Поле обязательно к заполнению' }}
        </span>
      </template>
    </v-input>

    <v-input
      type="number"
      v-model.number="personData.age.value"
      :class="['form__field', personData.age.valid ? '' : 'invalid']"
      :class-name="'form__input'"
      :label="'Возраст'"
      @blur="validateAge(personData.age)"
    >
      <template
        v-if="!personData.age.valid"
        #error
      >
        <span class="form__field-error">
          {{ !!personData.age.value ? 'Возраст не может быть больше 100' : 'Поле обязательно к заполнению' }}
        </span>
      </template>
    </v-input>
  </section>
  <section class="form__children-area">
    <div
      :class="['form__block-flex', canAddChildren ? 'form__block-flex_reverse' : '']"
    >
      <button
        v-if="canAddChildren"
        class="btn-transparent form__add-child"
        type="button"
        @click="addChild()"
      >
        Добавить ребенка
      </button>

      <h3 class="form__title">
        Дети (макс. 5)
      </h3>
    </div>

    <div
      v-for="child in personChildren"
      :key="child.id"
      class="form__block-flex"
    >
      <v-input
        type="text"
        v-model="child.name.value"
        :class="['form__field', child.name.valid ? '' : 'invalid']"
        :class-name="'form__input'"
        :label="'Имя'"
        @blur="validateName(child.name)"
      >
        <template
          v-if="!child.name.valid"
          #error>
        <span class="form__field-error">
          {{ child.name.value.length ? 'Имя должно содержать буквы' : 'Поле обязательно к заполнению' }}
        </span>
        </template>
      </v-input>

      <v-input
        type="number"
        v-model.number="child.age.value"
        :class="['form__field', child.age.valid ? '' : 'invalid']"
        :class-name="'form__input'"
        :label="'Возраст'"
        @blur="validateAge(child.age)"
      >
        <template
          v-if="!child.age.valid"
          #error
        >
        <span class="form__field-error">
          {{ child.age.value.length ? 'Имя должно содержать буквы' : 'Поле обязательно к заполнению' }}
        </span>
        </template>
      </v-input>

      <p
        class="form__delete-btn"
        @click="removeChild(child.id)"
      >
        Удалить
      </p>
    </div>
  </section>

  <button
    class="btn-solid form__submit"
    type="button"
    @click="submit"
  >
    Сохранить
  </button>
</div>
</template>

<script>
import VInput from '@/components/v-input'
import { userDataAdapter } from '@/components/consts'

export default {
  name: 'Form',

  components: {
    VInput,
  },

  props: {
    userData: {
      type: Object,
      required: true,
    },
  },

  data () {
    return {
      personData: {
        name: {
          value: '',
          valid: true,
        },
        age: {
          value: '',
          valid: true,
        },
      },

      personChildren: [],
    }
  },

  computed: {
    canAddChildren () {
      return this.personChildren.length < 5
    },
  },

  methods: {
    addChild () {
      const child = {
        id: this.generateId(),
        name: {
          value: '',
          valid: true,
        },
        age: {
          value: '',
          valid: true,
        },
      }
      this.personChildren.push(child)
    },

    removeChild (childId) {
      const index = this.personChildren.findIndex((child) => child.id === childId)

      if (index < 0) {
        return
      }

      this.personChildren.splice(index, 1)
    },

    generateId () {
      const now = new Date()

      return now.getMilliseconds()
    },

    submit () {
      if (this.validateForm()) {
        this.$emit('save-person', userDataAdapter.toClient({ ...this.personData, children: this.personChildren }))
      }
    },

    validateName (name) {
      name.valid = /[а-яёА-ЯЁa-zA-Z ]/g.test(name.value)
    },

    validateAge (age) {
      age.valid = !!age.value && age.value < 100
    },

    validateForm () {
      this.validateName(this.personData.name)
      this.validateAge(this.personData.age)
      let result = this.personData.name.valid && this.personData.age.valid

      this.personChildren.forEach((child) => {
        this.validateName(child.name)
        this.validateAge(child.age)
        result = child.name.valid && child.age.valid ? result : false
      })

      return result
    },
  },

  mounted () {
    const { personData, personChildren } = userDataAdapter.toForm(this.userData)

    this.personData = personData
    this.personChildren = personChildren
  },
}
</script>

<style lang="sass">
.form
  padding-top: 30px
  max-width: 616px
  margin: 0 auto

  &__title
    font-size: 16px
    line-height: 24px
    align-self: center

  &__input
    border: 1px solid #F1F1F1
    border-radius: 4px
    padding: 26px 16px 6px
    &:focus
      outline: none
      border: 1px solid #01A7FD
    & + .form__input
      margin-top: 10px

  &__field
    flex: 1 0
    & + .form__field
      margin-top: 10px
    &.invalid
      .form__input
        border: 1px solid red

  &__personal-area
    margin-bottom: 30px
    .form__title
      margin-bottom: 20px

  &__block-flex
    display: flex
    align-items: flex-start
    justify-content: space-between
    &_reverse
      flex-direction: row-reverse
    .form__field
      margin-top: 0
      margin-right: 18px
    & + &
      margin-top: 10px

  &__submit
    margin-top: 30px

  &__delete-btn
    font-size: 14px
    line-height: 24px
    color: #01A7FD
    cursor: pointer
    align-self: center

  &__add-child
    position: relative
    padding-left: 44px
    &:before
      content: '+'
      font-size: 28px
      line-height: 0
      font-weight: 600
      position: absolute
      top: 19px
      left: 24px

  &__field-error
    color: red
    font-size: 13px
    padding-left: 10px
</style>
