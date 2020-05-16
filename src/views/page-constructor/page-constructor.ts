import Component, { mixins } from 'vue-class-component'
import CommonMixin from 'src/mixins/common-mixin-component'

import { IPageComponent } from 'src/types/root.types'
import { getInternalNamedComponent } from 'src/common/normallizeComponentName'

import ComponentWrapper from 'src/components/lib/wrapper.vue'
import SideNav from 'src/components/side-nav/side-nav.vue'

@Component({
  components: {
    ComponentWrapper,
    SideNav
  }
})
export default class PageConstructorImplementation extends mixins(CommonMixin) {
  isShowSideNav: boolean = false

  get pageComponents() {
    return this.rootModule.activePageComponents
  }

  get editableComponent(): number {
    return this.rootModule.activeEditablePageComponentIndex
  }

  async addComponentToPage(component: IPageComponent) {
    const _component = getInternalNamedComponent(component)
    const module = async () =>
      import(
        `src/components/lib/${_component.groupName}/${_component.name}.vue`
      )

    this.rootModule.addComponentToPage({
      ..._component,
      module: await module
    })
  }

  onComponentOperation({
    operation,
    index
  }: {
    operation: string
    index: number
  }) {
    switch (operation) {
      case this.componentOperations.add:
        const component = { ...this.rootModule.activePageComponents[index] }
        this.rootModule.addComponentToPage({ ...component })
        break
      case this.componentOperations.del:
        this.rootModule.removeComponentFromPage(index)
        break
      case this.componentOperations.up:
        this.rootModule.movePageComponent({ operation, index })
        break
      case this.componentOperations.down:
        this.rootModule.movePageComponent({ operation, index })
        break
    }
  }

  onBeginEdit(index: number) {
    this.rootModule.selectActiveEditableComponent(index)
  }
}
