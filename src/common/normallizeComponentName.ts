import { IPageComponent } from 'src/types/root.types'

export function convertToInternal(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .join('-')
}

export function convertToExternal(name: string): string {
  return name
    .split('-')
    .map((word) => {
      return `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`
    })
    .join(' ')
}

export function getInternalNamedComponent(
  component: IPageComponent
): IPageComponent {
  return {
    name: convertToInternal(component.name),
    groupName: convertToInternal(component.groupName)
  }
}

export function getExternalNamedComponent(
  component: IPageComponent
): IPageComponent {
  return {
    name: convertToExternal(component.name),
    groupName: convertToExternal(component.groupName)
  }
}
