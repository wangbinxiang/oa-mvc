export default {
  AUDIT_PADDING: 2,
  AUDIT_APPROVE: 4,
  AUDIT_REJECT: -4,
  permissionMap: {},

  ROUTER_PERMISSION_MARK: {
    resourceReview: {
      identifyPersonal: 0,
      identifyCompany: 0
    },
    resourceManagement: {
      policy: 0,
      policyAnalyzing: 0,
    },
    capitalManagement: {
      cashOutApply: 0,
      trandeRecord: 0
    }
  }
}