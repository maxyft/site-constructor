import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import ROOT_MODULE from 'src/store/root-module'

import { ComponentOperations } from 'src/types/root.types'

@Component
export default class StoreMixin extends Vue {
  componentOperations = ComponentOperations

  get rootModule() {
    return getModule(ROOT_MODULE)
  }
}
