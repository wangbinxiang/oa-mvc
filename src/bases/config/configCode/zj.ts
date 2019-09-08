export default {
  AUDIT_PADDING: 2,
  AUDIT_APPROVE: 4,
  AUDIT_REJECT: -4,
  // 是否需要资质认证
  NEED_QUALIFICATION: 2,
  NO_NEED_QUALIFICATION: 0,
  permissionMap: {},

  ROUTER_PERMISSION_MARK: {
    system: {
      categories: 0
    },
    resourceReview: {
      authentications: 0,
      services: 0
    },
    resourceManagement: {
      servicesManagement: 0,
      requirementManagement: 0
    }
  }
}