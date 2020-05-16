<template>
  <div class="side-nav-component">
    <div class="side-nav-component__btn-group">
      <div class="side-nav-component__btn" @click="$emit('close')">Close</div>
    </div>
    <div
      class="side-nav-component__group"
      v-for="group in navGroups"
      :key="group.name"
      @click="onSelectNavGroup(group)"
    >
      <div>{{ group.name }}</div>
    </div>
    <div v-if="activeNavGroup" class="side-nav-component__group-items">
      <div
        class="side-nav-component__group-item"
        v-for="item in activeNavGroup.items"
        :key="item.name"
        @click="onSelectNavItem(item)"
      >
        <div class="group-item-preview">
          <img :src="item.preview" />
        </div>
        <div class="group-item-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import {
  ISideNavGroup,
  ISideNavGroupItem,
  IPageComponent
} from 'src/types/root.types'
import CommonMixin from 'src/mixins/common-mixin-component'

@Component
export default class SideNav extends mixins(CommonMixin) {
  get navGroups(): ISideNavGroup[] {
    return this.rootModule.sideNavGroups
  }

  get activeNavGroup(): ISideNavGroup {
    return this.rootModule.activeSideNavGroup
  }

  onSelectNavGroup(group: ISideNavGroup) {
    this.rootModule.selectActiveNavGroup(group)
  }

  onSelectNavItem(item: ISideNavGroupItem) {
    const pageComponent: IPageComponent = {
      name: item.component,
      groupName: this.activeNavGroup.name
    }
    this.$emit('add-component-to-page', pageComponent)
  }
}
</script>

<style lang="scss" scoped>
.side-nav-component {
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 30vw;
  height: 100vh;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  z-index: 2;
  background: #f3f3f3;
  &__btn-group {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }
  &__btn {
    cursor: pointer;
    font-size: 0.9rem;
  }
  &__group {
    font-size: 1.05rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    cursor: pointer;
  }

  &__group-items {
    position: absolute;
    left: calc(100% + 1px);
    top: 0;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    background: #f8f8f8;
  }

  &__group-item {
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
    min-width: 175px;
    min-height: 175px;
    .group-item-preview {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: rgba(0, 0, 0, 0.05);
    }
    .group-item-name {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 0.1rem;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.1);
      color: #1a1a1a;
      font-size: 0.85rem;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
