import { curry } from 'lodash'

export function buildModuleHandler(moduleName: string, handlerName: string): string {
  return moduleName + '/' + handlerName
}

export const buildModuleHandlerCurried = curry(buildModuleHandler)