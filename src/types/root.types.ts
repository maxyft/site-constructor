interface ISideNavGroup {
  name: string
  items: ISideNavGroupItem[]
}

interface ISideNavGroupItem {
  name: string
  component: string
  preview: string
}

interface IPageComponent {
  name: string
  groupName: string
  module?: any
}

enum ComponentOperations {
  up = 'Up',
  down = 'Down',
  del = 'Delete',
  add = 'Duplicate'
}

export { ISideNavGroup, ISideNavGroupItem, IPageComponent, ComponentOperations }
