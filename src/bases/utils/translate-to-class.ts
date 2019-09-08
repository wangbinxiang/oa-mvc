
import { plainToClass } from 'class-transformer'
import { ClassType } from 'class-transformer/ClassTransformer'

export function translatorObjToClass<T>(obj: object, classType: ClassType<T>): T {
  return plainToClass(classType, obj)
}