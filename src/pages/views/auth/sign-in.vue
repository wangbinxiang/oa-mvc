<template>
  <div class="login-container">
    <el-form
      ref="form"
      :model="form"
      auto-complete="on"
      status-icon
      class="login-form"
      center
      :rules="rules"
    >
      <h1 class="title">
        {{ $t('hzlh.auth.signIn.title') }}
      </h1>
      <el-form-item prop="cellphone">
        <div class="item-content">
          <span class="iconfont icon-sign-user" />
          <el-input
            v-model="form.cellphone"
            :maxlength="11"
            :placeholder="$t('hzlh.auth.signIn.account')"
            type="tel"
            auto-complete="off"
          />
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <div class="item-content">
          <span class="iconfont icon-sign-pwd" />
          <el-input
            v-model="form.password"
            :placeholder="$t('hzlh.auth.signIn.password')"
            :type="pType"
            auto-complete="new-password"
            @keyup.enter.native="formSubmit"
          />
          <i
            :class="showIcon"
            class="show-pwd iconfont"
            @click="showPwd"
          />
        </div>
      </el-form-item>
      <el-form-item style="margin-bottom: 0;">
        <el-button
          :loading="listLoading"
          type="primary"
          @click.native.prevent="formSubmit"
        >
          {{ $t('hzlh.auth.signIn.signIn') }}
        </el-button>
      </el-form-item>
      <el-form-item style="margin-bottom: 0; margin-top: 10px;">
        <slot name="registerUse" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { namespace } from 'vuex-class'
const userModule = namespace('user')
const permissionModule = namespace('permission')

import { signIn, getAdmin } from '@/pages/common/api/auth'

import configPrompt from '@/bases/config/configPrompt'
const { SU_SIGN_IN } = configPrompt

import { ISignIn } from '@/bases/interface/hzlh/api/auth'

import { login } from '@/bases/utils/auth'

import rules from '@/bases/validate/auth/signIn'

@Component
export default class SignIn extends Vue {
  @userModule.Action public GetUserInfo!: () => Promise<any>
  @permissionModule.Action public GetPermission!: () => Promise<any>
  @permissionModule.Action public GenerateRoutes!: (
    _permission: any
  ) => Promise<any>
  private listLoading: boolean = false
  private pType: string = 'password'
  private showIcon: string = 'icon-hide-pwd'
  private rules: object = rules
  private form: ISignIn = {
    cellphone: '18800000000',
    password: 'PXpassword0000'
  }
  private openLoading(): void {
    this.listLoading = true
  }
  private closeLoading(): void {
    this.listLoading = false
  }
  private refs(ref: string, unitCb?: () => void): any {
    unitCb && unitCb()
    return this.$refs[ref]
  }
  private showPwd(): void {
    if (this.pType === 'password') {
      this.pType = 'text'
      this.showIcon = 'icon-show-pwd'
    } else {
      this.pType = 'password'
      this.showIcon = 'icon-hide-pwd'
    }
  }
  private formSubmit(): void {
    this.refs('form').validate(this.validateCb)
  }
  private async validateCb(vaild: boolean) {
    if (vaild) {
      this.openLoading()
      try {
        let res = await signIn(this.form)
        this.$message({
          message: SU_SIGN_IN,
          type: 'success'
        })
        login(res.data.token) // 登陆成功session存储
        this.validateLognin()
        this.closeLoading()

        getAdmin()
      } catch (error) {
        this.closeLoading()
      }
    }
  }
  private async validateLognin() {
    try {
      await this.GetUserInfo()
      this.$router.push({ path: '/' })

    } catch (error) {
      if (this.$route.path !== '/signIn') {
        this.$router.push({ path: '/signIn' })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import '~@/bases/styles/mixin';
$bg: #2d3a4b;
$light_gray: #eee;
.login-container {
  .el-input {
    display: inline-block;
    width: 85%;
    .el-input__inner {
      background-color: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 10px;
      color: $light_gray;
    }
  }
  .el-button {
    width: 90%;
    height: 37px;
    border-color: rgba(6, 202, 158, 0.6);
    background-color: rgba(6, 202, 158, 0.2);
    border: none;
    color: #fff;
    &:hover {
      background-color: rgba(6, 202, 158, 0.6);
    }
    &:visited {
      border: none;
    }
    @include transition(all, 0.3s, ease);
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/bases/styles/mixin';
.login-container {
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  padding: 35px 25px 25px;
  width: 400px;
  background-color: rgba(16, 32, 66, 0.4);
  border-radius: 6px;
  $an1: (
    transform: translateY(-20%),
    opacity: 0
  );
  $an2: (
    transform: translateY(0),
    opacity: 1
  );
  $demo: (
    0%: $an1,
    100%: $an2
  );
  @include keyframes(guideac, $demo);
  @include animation(guideac 0.8s linear);
  .login-form {
    text-align: center;
    .title {
      margin-bottom: 1.2em;
      color: #fff;
      font-size: 1.4em;
    }
    .item-content {
      position: relative;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 5px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.1);
      text-align: left;
      .show-pwd {
        position: absolute;
        right: 0;
        top: 0;
        width: 43px;
        height: 43px;
        line-height: 43px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
@media (max-width: 414px) {
  .login-container {
    padding-top: 0;
    max-width: 85%;
    background-color: transparent;
  }
}
</style>

