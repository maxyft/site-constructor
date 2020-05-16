<template>
  <div class="constructor-component-wrapper">
    <div
      class="constructor-component-wrapper__add-btn"
      v-if="componentIndex === componentsLength - 1"
      @click="$emit('add-component')"
    >
      Add
    </div>
    <div class="constructor-component-wrapper__toolbox">
      <div
        v-for="key in operationKeys"
        :key="key"
        class="constructor-component-wrapper__tool"
        :class="{
          'constructor-component-wrapper__tool--disabled': isToolDisabled(key)
        }"
        @click="
          $emit('component-operation', {
            operation: componentOperations[key],
            index: componentIndex
          })
        "
      >
        {{ componentOperations[key] }}
      </div>
    </div>
    <div class="constructor-component-wrapper__component-container">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import CommonMixin from 'src/mixins/common-mixin-component'

@Component
export default class ConstructorComponentWrapper extends mixins(CommonMixin) {
  @Prop(Number)
  componentIndex!: number
  @Prop(Number)
  componentsLength!: number

  get operationKeys() {
    return Object.keys(this.componentOperations)
  }

  isToolDisabled(key: string): boolean {
    const i = this.componentIndex
    const lngth = this.componentsLength
    if ((i === 0 && key === 'up') || (i === lngth - 1 && key === 'down')) {
      return true
    }

    return false
  }
}
</script>

<style lang="scss" scoped>
.constructor-component-wrapper {
  position: relative;
  box-sizing: border-box;
  padding: 1rem;
  border: 1px dashed transparent;
  transition: 0.2s all;
  &:hover {
    border-color: #cccccc;
    .constructor-component-wrapper__add-btn,
    .constructor-component-wrapper__toolbox {
      opacity: 1;
    }
  }
  &__add-btn {
    cursor: pointer;
    font-weight: 600;
    background: black;
    font-size: 0.7rem;
    color: #cccccc;
    position: absolute;
    bottom: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 20px;
    border: 1px solid #afafaf;
    box-sizing: border-box;
    padding: 0.25rem 0.5rem;
    opacity: 0;
    transition: 0.2s opacity;
  }
  &__toolbox {
    position: absolute;
    right: 2.5%;
    top: 5%;
    display: flex;
    justify-content: flex-end;
    border: 1px solid #cccccc;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 0.5rem;
    opacity: 0;
    transition: 0.2s opacity;
    background: #f5f5f5;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  &__tool {
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 600;
    border-right: 1px solid #e9e9e9;
    box-sizing: border-box;
    padding: 0.25rem;
    &--disabled {
      pointer-events: none;
      cursor: default;
      color: #c4c4c4;
    }
  }
}
</style>
