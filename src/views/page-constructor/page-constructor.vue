<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import PageConstructorImplementation from './page-constructor'

@Component
export default class PageConstructor extends PageConstructorImplementation {}
</script>

<template>
  <div ref="mainPage">
    <transition name="side-nav">
      <side-nav
        v-show="isShowSideNav"
        @add-component-to-page="addComponentToPage"
        @close="isShowSideNav = false"
      />
    </transition>
    <div
      class="show-menu-btn"
      v-if="!pageComponents || !pageComponents.length"
      @click="isShowSideNav = !isShowSideNav"
    >
      Show menu
    </div>
    <div class="page-constructor">
      <div
        class="page-constructor__container"
        v-for="(component, index) in pageComponents"
        :key="`${component.name}-${index}`"
      >
        <component-wrapper
          :componentIndex="index"
          :componentsLength="pageComponents.length"
          @component-operation="onComponentOperation"
          @add-component="isShowSideNav = true"
        >
          <component
            :is="component.module"
            :isEdit="editableComponent === index"
            @begin-edit="onBeginEdit(index)"
          />
        </component-wrapper>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.show-menu-btn {
  cursor: pointer;
}
</style>
