# huizhonglianhe-frontend-oa

基于vue.js的2.6.版本编写的WPA应用

[demo live](http://oa.sandbox.unintelli.com)

## 技术栈

vue2.6.6 + vuex + vue-router + Axios + ES2015、6、7、8 + Element-ui + mock.js + typescript + vuex-class + vue-property-decorator

## 测试框架

jest + vue-test-utils

## 开发环境
> MacOS 10.14.2 node10.13.0


## 开发

```
# 克隆项目
git clone https://code.aliyun.com/huizhonglianhe/huizhonglianhe-frontend-oa.git

# 进入项目
cd client

# 安装依赖 && 启动服务
npm i && npm run dev
```

## 发布

```
# 构建生产环境
npm run build:prod
```

## 其他

```
# 测试用例运行
npm run test:unit

# 测试覆盖率
npm run test:coverage

# 代码格式检查
npm run lint
```

## 功能

- [x] 登录 / 注销 -- 完成
- [x] 全局功能
    - [x] 动态主题换肤 -- 完成
    - [x] 动态侧边栏 -- 完成
    - [x] 自适应收缩侧边栏（多级路由嵌套） -- 完成
    - [x] 响应式宽度侧边栏（文字数量自动展开响应宽度） -- 完成
    - [x] 全站数据缓存功能 -- 完成
    - [x] 动态面包屑 -- 完成
    - [x] 快捷导航（标签页） -- 完成
    - [x] Screenfull 全屏预览 -- 完成
- [x] 金融-资源管理 -- 完成
    - [x] 金融产品管理 -- 完成
    - [x] 金融需求管理 -- 完成
    - [x] 订单管理 -- 完成

## 目录结构

```
├── public                                // 静态资源存储，模板文件
│      ├── static                         // 资源文件
│      ├── favicon.ico                    // favicon图标
│      ├── index.html                     // html模板
├── src                                   // 源代码
│    ├── assets                           // 主题 字体等静态资源
│    ├── bases                            // 项目较基础的东西，不怎么修改的
│        ├── config                       // 静态参数等
│        ├── directive                    // 自定义指令
|        ├── event                        // 全局事件
|        ├── filters                      // 过滤器
|        ├── hooks                        // 钩子函数注册
|        ├── style                        // 样式文件
|        ├── lang                         // 国际化
|        ├── utils                        // 公共模块方法
|        ├── interface                    // 接口定义
|        ├── typings                      // ts声明文件
|        ├── style                        // 样式文件
|        ├── system                       // 项目级别逻辑处理
|        ├── validate                     // 参数校验    
│        ...
│    ├── modules                           // 模块组件，可被页面复用             │        ├── common                         // 功能组件（结构与样式分离）
│              ├──view
│              ├──styles
|              ├──index.ts                 // 出口
│         ├── component                    // 页面结构组件   
│              ├──view
│              ├──styles    
│         ├── demo                        
│         ...
│———— ├── pages                            // 页面                  
│         ├── common                       // 页面需要的通用模块 
│             ├── router                   // 路由模块    
│             ├── store                    // vuex管理
│             ├── api                      // 公共api
│             ├── mixin                    // 混入
│             ├── service                  // 基础service类操作                 │ 
│                 ...
│         ├── views                    
│                 ├── auth                  // 登录页（简单页面不区分逻辑层） 
|                     ├── sign-in.vue 
│                 ├── layout                // layout结构页面     
│                     ├── model                     
│                     ├── service                    
│                     ├── layout-page.vue 
│                 ├── jr1                 // 金融产品管理页面  
│                     ├── api             // 页面api
│                     ├── model           // 数据模型
│                     ├── repository      // 接口数据处理               
│                     ├── service         // 页面逻辑处理          
│                     ├── view            // 子页面
│                     ├── index.vue       // 入口  
│                 ├── jr2                 // 金融需求管理页面 
│                     ├── index.vue      
│                 ├── jr3                 // 订单管理页面  
│                     ├── api             // 页面api
│                     ├── model           // 数据模型
│                     ├── repository      // 接口数据处理               
│                     ├── service         // 页面逻辑处理          
│                     ├── view            // 子页面
│                     ├── index.vue       // 入口                 
│               ...
│        
│    ├── shims-tsx.d.js                   // tsx声明文件
│    ├── shims-vue.d.js                   // vue声明文件
├── tests                                 // 测试用例
├── .editorconfig.js                      // 编辑器 配置项
├── .env.development                      // 开发环境变量
├── .env.production                       // 生产环境变量
├── .eslintignore                         // eslint 忽略项
├── eslintrc.js                           // eslint 配置项
├── .gitignore                            // git 忽略项
├── .prettierrc.json                      // prettier配置项
├── babel.config.js                       // babel配置项
├── cypress.json                          // e2e测试配置项
├── jest.config.js                        // jest配置项
├── package-lock.json                     // npm包版本锁定文件
├── package.json                          // package.json
├── postcss.config.json                   // css兼容性后缀配置
├── tsconfig.json                         // ts配置文件
└── vue.config.js                         // 项目配置相关
└── .vscode                               // vscode配置
```

## 浏览器支持

主流浏览器和ie10+

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions
