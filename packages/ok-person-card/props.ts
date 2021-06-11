/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-04-08 11:33:25
 * @LastEditors: 付静
 * @LastEditTime: 2021-06-08 15:56:08
 * @FilePath: /packages/ok-person-card/props.ts
 */
const props = {
  // tenantKey表示外部租户账号，若传入有值则默认为外部账号
  personInfo: {
    type: [Object, String],
    default() {
      return {}
    },
  },
  // 国际化，支持zh/en/ja
  i18n: {
    type: String,
    // false
    default: 'zh',
  },
  // 卡片出现位置
  placement: {
    type: String,
    // right
    default: 'right',
  },
  // 是否将弹窗放置到body层
  transfer: {
    type: Boolean,
    // false
    default: false,
  },
  // 是否显示上级信息
  showLeader: {
    type: Boolean,
    default: true,
  },
  // 是否显示部门
  showTeam: {
    type: Boolean,
    default: true,
  },
  hideLark: {
    type: Boolean,
    default: false,
  },
  avatarSize: {
    type: String,
    default: 'small',
  },
  toOpenId: {
    type: String,
  },
  isAwaken: {
    type: Boolean,
  },
  deptList: {
    type: Array,
    default: () => {
      return [
        {
          deleted: '0',
          department_en_name: null,
          department_name: '测试部',
          dept_id: '17',
          dept_id_path: '1@13@17',
          dept_name_path: '北京百特云享科技有限公司@产品中心@测试部',
          emp_sort: null,
          employee_id: 'MaFeiXiang',
          leader_flag: '1',
          main_dept_flag: '1',
        },
        {
          deleted: '0',
          department_en_name: '',
          department_name: '产品中心测试部子部门',
          dept_id: '17_1',
          dept_id_path: '1@13@17@17_1',
          dept_name_path:
            '北京百特云享科技有限公司@产品中心@测试部@产品中心测试部子部门',
          emp_sort: null,
          employee_id: 'MaFeiXiang',
          leader_flag: '0',
          main_dept_flag: '0',
        },
      ]
    },
  },
  statusType: {
    type: String,
  },
  visible: {
    type: Boolean,
  },
}

export default props
