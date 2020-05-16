import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import store from 'src/store'

import {
  ISideNavGroup,
  IPageComponent,
  ComponentOperations
} from 'src/types/root.types'

const componentOperations = ComponentOperations

@Module({ dynamic: true, store, name: 'ROOT_MODULE', namespaced: true })
export default class extends VuexModule {
  private _sideNavGroups: ISideNavGroup[] = [
    {
      name: 'Text block',
      items: [
        {
          name: 'Default text block',
          component: 'Default Text Block',
          preview: ''
        }
      ]
    },
    {
      name: 'Title',
      items: [
        {
          name: 'Default title',
          component: 'Default Title',
          preview: ''
        }
      ]
    }
  ]
  private _activeSideNavGroup: ISideNavGroup = null
  private _activePageComponents: IPageComponent[] = []
  private _activeEditablePageComponentIndex: number = null

  get sideNavGroups() {
    return this._sideNavGroups
  }

  get activeSideNavGroup(): ISideNavGroup {
    return this._activeSideNavGroup
  }

  get activePageComponents(): IPageComponent[] {
    return this._activePageComponents
  }

  get activeEditablePageComponentIndex(): number {
    return this._activeEditablePageComponentIndex
  }

  @Mutation
  selectActiveEditableComponent(index: number) {
    this._activeEditablePageComponentIndex = index
  }

  @Mutation
  selectActiveNavGroup(group: ISideNavGroup) {
    this._activeSideNavGroup = group
  }

  @Mutation
  addComponentToPage(component: IPageComponent) {
    this._activePageComponents.push(component)
  }

  @Mutation
  removeComponentFromPage(index: number) {
    this._activePageComponents.splice(index, 1)
  }

  @Mutation
  movePageComponent({
    operation,
    index
  }: {
    operation: ComponentOperations
    index: number
  }) {
    let newIndex: number = null
    if (operation === componentOperations.up) {
      newIndex = Number(index) - 1
    } else if (operation === componentOperations.down) {
      newIndex = Number(index) + 1
    }

    const components = [...this._activePageComponents]
    const targetComponent: IPageComponent = {
      ...this._activePageComponents[index]
    }
    const tempComponent: IPageComponent = {
      ...this._activePageComponents[newIndex]
    }

    components[newIndex] = { ...targetComponent }
    components[index] = { ...tempComponent }

    this._activePageComponents = [...components]
  }

  //@Action
  //actionName({ arg }: { arg: type }): Promise<T> {
  //  Promise.resolve()
  //}
}
