import { validateConstructor } from '@/bases/utils'
import configPattern from '@/bases/config/config-pattern'
const { _regexp_cell_phone, _regexp_password } = configPattern

const validatorAccount = validateConstructor({
  emptyError: '账户名不能为空',
  regExp: _regexp_cell_phone,
  regExpError: '请输入正确账户名'
})
const validatePassword = validateConstructor({
  emptyError: '密码不能为空',
  regExp: _regexp_password,
  regExpError: '密码为6-30位数字与字母组合'
})

export default {
  cellphone: [{ required: true, trigger: 'change', validator: validatorAccount }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
}
