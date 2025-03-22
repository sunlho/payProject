import { Interface, BaseClass, Property, CodeGenerator } from "pont-engine"

export default class MyGenerator extends CodeGenerator {
  getInterfaceContentInDeclaration(inter: Interface) {
    return ``
  }

  getBaseClassInDeclaration(base: BaseClass) {
    const originProps = base.properties

    base.properties = base.properties.map((prop) => {
      return new Property({
        ...prop
      })
    })

    const result = super.getBaseClassInDeclaration(base)
    base.properties = originProps

    return result
  }

  getCommonDeclaration() {
    return ``
  }
}
