const path = require('path')
module.exports = {
  rootDir: path.resolve(__dirname, ''),
  collectCoverage: true, // 是否收集测试时的覆盖率信息
  // collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx,vue}'], // 哪些文件需要收集覆盖率信息
  coverageDirectory: '<rootDir>/test/coverage', // 输出覆盖信息文件的目录
  collectCoverageFrom: [
    '<rootDir>/src/modules/hzlh/common/view/*/*.{vue}',
    '<rootDir>/src/pages/common/store/modules/app.ts',
    '<rootDir>/src/pages/common/store/modules/cache.ts',
    '<rootDir>/src/pages/views/**/*.vue',
    '<rootDir>/src/bases/utils/storage.ts',
    '<rootDir>/src/bases/utils/auth.ts',
    '<rootDir>/src/bases/utils/storage-event.ts',
    '<rootDir>/src/bases/system/permission.ts'
  //   "<rootDir>/src/utils/**/*.{js,vue,ts}",
  //   "<rootDir>/src/views/**/*.{js,vue,ts}"
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/pages/views/auth/sign-in.vue',
    '<rootDir>/src/pages/views/tagsview/tags-view.vue',
    '<rootDir>/dist/',
    '<rootDir>/static/',
    '<rootDir>/src/utils/request.ts',
    '<rootDir>/src/utils/aesJsonFormat.ts',
    '<rootDir>/src/validate/',
    '<rootDir>/tests/',
  ], // 统计覆盖信息时需要忽略的文件
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/',
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  }
}
