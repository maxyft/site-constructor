<template>
  <div class="default-text-component" ref="component">
    <div
      class="default-text-component__wrapper"
      v-if="!isEdit"
      @click="$emit('begin-edit')"
    >
      <p>{{ localText }}</p>
    </div>
    <div class="default-text-component__wrapper" v-else>
      <div class="text-input-wrapper">
        <textarea
          v-model="localText"
          class="text-input"
          type="text"
          @change="
            $emit('change-content', {
              componentType: 'text',
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
export default class DefaultTextBlock extends Vue {
  @Prop(Boolean)
  isEdit!: boolean
  @Prop(String)
  text!: string

  localText: string =
    this.text ||
    'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet'
}
</script>

<style lang="scss" scoped>
.default-text-component {
  padding: 3rem 0;
  &__wrapper {
    p {
      font-style: italic;
      font-size: 0.95rem;
      font-weight: 400;
      color: #252525;
    }
  }
}

.text-input-wrapper {
  textarea {
    padding: 0;
    border: none;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    text-align: center;
    width: 100%;
    height: auto;
    font-style: italic;
    font-size: 1.1rem;
    font-weight: 400;
    color: #252525;
  }
}
</style>
