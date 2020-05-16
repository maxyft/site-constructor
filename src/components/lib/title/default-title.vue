<template>
  <div class="default-title-component" ref="component">
    <div
      class="default-title-component__wrapper"
      v-if="!isEdit"
      @click="$emit('begin-edit')"
    >
      <h3>{{ localTitle }}</h3>
      <p>{{ localText }}</p>
    </div>
    <div class="default-title-component__wrapper" v-else>
      <div class="title-input-wrapper">
        <input
          v-model="localTitle"
          class="title-input"
          type="text"
          @change="
            $emit('change-content', {
              componentType: 'title',
              fieldType: 'title',
              content: localTitle
            })
          "
        />
      </div>
      <div class="text-input-wrapper">
        <textarea
          v-model="localText"
          class="text-input"
          type="text"
          @change="
            $emit('change-content', {
              componentType: 'title',
              fieldType: 'text',
              content: localText
            })
          "
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class DefaultTitle extends Vue {
  @Prop(Boolean)
  isEdit!: boolean
  @Prop(String)
  text!: string
  @Prop(String)
  title!: string

  localText: string = this.text || 'Lorem ipsum dolor sit amet'
  localTitle: string = this.title || 'Lorem ipsum dolor sit amet'
}
</script>

<style lang="scss" scoped>
.title-input-wrapper {
  input {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: none;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    text-align: center;
  }
}

.text-input-wrapper {
  textarea {
    font-size: 1.1rem;
    border: none;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    text-align: center;
    width: 100%;
    height: auto;
  }
}
</style>
