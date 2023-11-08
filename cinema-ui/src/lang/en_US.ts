export default {
  // Routing Internationalization
  route: {
    dashboard: 'Dashboard',
    document: 'Document'
  },
  // Login Page Internationalization
  login: {
    username: 'Username',
    password: 'Password',
    login: 'Login',
    code: 'Verification Code',
    copyright: '',
    logoutCf: 'Are you sure you want to logout and exit the system?'
  },
  // Navigation bar internationalization
  navbar: {
    full: 'Full Screen',
    language: 'Language',
    langKey: 'EN',
    vietnamese: 'Vietnamese',
    english: 'English',
    langIcon: 'english',
    dashboard: 'Dashboard',
    document: 'Document',
    layoutSize: 'Layout Size',
    selectTenant: 'Select Tenant',
    layoutSetting: 'Layout Setting',
    personalCenter: 'Profile',
    logout: 'Logout'
  },
  // Sidebar internationalization
  sidebar: {
    searchPlaceholder: 'Search'
  },
  cacheMonitor: {
    basicTt: 'Basic information',
    redisVersion: 'Redis version',
    oprMode: 'Operating mode',
    port: 'Port',
    clients: 'Number of clients',
    runningTime: 'Running time (days)',
    usedMemory: 'Used memory',
    usedCpu: 'Used CPU',
    memoryConf: 'Memory config',
    aof: 'AOF enabled',
    rdb: 'RDB successful',
    keys: 'Number of Keys',
    network: 'Network entry/exit',
    commandStatsTt: 'Command statistics',
    memoryTt: 'Memory information'
  },
  tagview: {
    refresh: 'Refresh page',
    closeCurrent: 'Close current',
    closeOther: 'Close other',
    closeLeft: 'Close left',
    closeRight: 'Close right',
    closeAll: 'Close all'
  },
  common: {
    logoutCfTt: 'Confirm',
    logoutCfMsg: 'The login status has expired, you can stay on this page or login again',
    logoutCfBtn: 'OK',
    logoutCancelBtn: 'Close',
    sessionExpiredMsg: 'Invalid session or session expired, please login again.',
    networkErrMsg: 'Abnormal backend interface connection',
    timeoutMsg: 'System interface request timed out',
    commonErrMsg: 'System interface %{code} exception',
    downloadProgressMsg: 'Downloading data, please wait',
    errDownloadMsg: 'There was an error downloading the file, please contact the administrator!',
    cfDelTt: 'Confirm',
    cfWarnTt: 'Confirm',
    cfDelBtnClose: 'Cancel',
    cfDelBtnOk: 'OK',
    cfWarnBtnClose: 'Cancel',
    cfWarnBtnOk: 'OK'
  },
  irupload: {
    tt: 'Drag and Drop file(s)',
    subTt: 'or',
    selectFileBtn: 'Select file',
    updateSupport: 'Whether to update existing data',
    supportedFormat: 'Supported format: ',
    tipNext: 'Only %{accept} format files are allowed to be imported'
  },
  irgrid: {
    validateNotInput: 'Please input data before submit',
    validateTt: 'Warning',
    validateDetail: 'Please input data at column "%{col}" row "%{row}"'
  },
  fileUpload: {
    selectBtn: 'Select file(s)',
    supportedFormats: 'Supported formats:',
    deleteBtn: 'Delete',
    incorrectFormat: 'The file format is incorrect, please upload file with formats: %{formats}!',
    sizeExceed: 'Upload file size cannot exceed %{fileSize} MB!',
    loadingWait: 'Uploading file, please wait...',
    numberExceed: 'The number of uploaded files cannot exceed %{fileNumber}!',
    failToUpload: 'Failed to upload file',
    cannotEmpty: 'File cannot be empty'
  },
  homepage: {
    topNav: {
      homepage: 'Home page',
      showtimes: 'Showtimes',
      film: 'Film',
      promotions: 'Promotions',
      cinema: 'Cinema',
      contact: 'Contact',
      carriers: 'Carriers',
      filmLabel: 'Film Content'
    },
    login: {
      tt: 'System login',
      logisticsTab: 'Logistics',
      shippinglineTab: 'Shipping line',
      usernameLb: 'Username',
      usernamePh: 'Input',
      passwordLb: 'Password',
      passwordPh: 'Input',
      rememberPassLb: 'Remember password',
      loginBtnTt: 'Login',
      rules: {
        usernameRqMsg: 'Please enter your username',
        passwordRqMsg: 'Please enter your password'
      }
    },
    film: {
      guideTt: 'Movie Selection',
      documentTt: 'Download document',
      documentDownloadBtn: 'Download',
      showAllBtn: 'Show all'
    },
    document: {
      guideTt: 'Promotions',
      documentTt: 'Download document',
      documentDownloadBtn: 'Download',
      showAllBtn: 'Show all'
    },
    contactInfo: {
      contactAddrLb: 'Contact address',
      addrLb: 'Address',
      addrContent1: '13 Dien Bien Phu Street, Hoa Khe Ward, ',
      addrContent2: 'District Thanh Khe, Da Nang City, Vietnam',
      phoneLb: 'Phone',
      customerPolicyTt: 'Customer policy',
      serviceTermLb: 'Terms of service',
      refundPolicyLb: 'Refund policy',
      customerPolicyLb: 'Customer policy',
      confidentialPolicyLb: 'Confidentiality policy',
      paymentTermLb: 'Payment terms',
      supportTt: 'Support',
      supportContent: 'Registering and using Star Cinema platform, support user manual, if you have any questions, please contact with hotline'
    },
    searchEdoTt1: 'Search electronic delivery order',
    searchEdoTt2: 'information - eDO',
    searchEdoContNoLb: 'Container no',
    searchEdoContNoPh: 'Input',
    searchEdoBlNoLb: 'Bill of lading',
    searchEdoBlNoPh: 'Input',
    searchEdoBtn: 'Search',
    searchEirTt1: 'Search equipment interchange receipt',
    searchEirTt2: 'information - EIR',
    searchEirContNoLb: 'Container no',
    searchEirContNoPh: 'Input',
    searchEirTruckNoLb: 'Truck no',
    searchEirTruckNoPh: 'Input',
    searchEirTimeLb: 'Date',
    searchEirTimePh: 'DD/MM/YYYY',
    searchEirBtn: 'Search',
    searchContainerTt: 'Search container information',
    searchContainerNoLb: 'Container no',
    searchContainerNoPh: 'Input',
    searchContainerNoBtn: 'Search',
    searchVesselScheduleTt: 'Search vessel schedule',
    searchVesselScheduleFromDateLb: 'From date',
    searchVesselScheduleFromDatePh: 'DD/MM/YYYY',
    searchVesselScheduleToDateLb: 'To date',
    searchVesselScheduleToDatePh: 'DD/MM/YYYY',
    searchVesselScheduleBtb: 'Search'
  },
  // User menu internationalization
  user: {
    leftPanel: {
      searchPlaceholder: 'Search'
    },
    searchInput: {
      userNameLb: 'Username',
      userNamePh: 'Input',
      phonenumberLb: 'Phone number',
      phonenumberPh: 'Input',
      statusLb: 'Status',
      statusPh: 'Select',
      createTimeLb: 'Create time',
      createTimeStartPh: 'From',
      createTimeEndPh: 'To'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete',
      importTemplateTt: 'Download template',
      importTt: 'Import excel',
      exportTt: 'Export excel'
    },
    dialog: {
      addTt: 'Add user',
      editTt: 'Edit user',
      nickNameLb: 'Personal name',
      nickNamePh: 'Input',
      deptIdLb: 'Department',
      deptIdPh: 'Select',
      phonenumberLb: 'Phone number',
      phonenumberPh: 'Input',
      emailLb: 'Email',
      emailPh: 'Input',
      userNameLb: 'Username',
      userNamePh: 'Input',
      passwordLb: 'Password',
      passwordPh: 'Input',
      sexLb: 'Gender',
      sexPh: 'Select',
      statusLb: 'Status',
      postIdsLb: 'Positions',
      postIdsPh: 'Select',
      roleIdsLb: 'Roles',
      roleIdsPh: 'Select',
      remarkLb: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        userNameRqMsg: 'Username cannot be empty',
        userNameMinMaxMsg: 'Length of username must be from %{min} to %{max} characters',
        nickNameRqMsg: 'Personal name cannot be empty',
        passwordRqMsg: 'Password cannot be empty',
        passwordMinMaxMsg: 'Length of password must be from %{min} to %{max} characters',
        emailRqMsg: 'Email cannot be empty',
        phonenumberPtMsg: 'Phone number is incorrect'
      }
    },
    columns: {
      userIdLb: 'User ID',
      userNameLb: 'Username',
      nickNameLb: 'Personal name',
      deptNameLb: 'Department',
      phonenumberLb: 'Phone number',
      statusLb: 'Status',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateDeleteLb: 'Delete',
      operateResetPwdLb: 'Reset password',
      operateAuthRoleLb: 'Assign roles'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete user(s)%{username}?',
      statusEnable: 'Enable',
      statusDisable: 'Disable',
      statusChangeCf: 'Are you sure to "%{action}" user "%{username}"?',
      statusChangeSuccess: ' successfully',
      importTt: 'Import excel',
      importResultTt: 'Import excel result',
      resetPwdTt: 'Reset password',
      resetPwdCf: 'Please input new password for "%{username}"',
      resetPwdMinMaxMsg: 'Length of password must be from %{min} to %{max} characters',
      resetPwdSuccess: 'Reset password successfully, new password is: %{newPassword}',
      resetPwdBtnSave: 'Save',
      resetPwdBtnClose: 'Close'
    },
    authRole: {
      searchInput: {
        nickNameLb: 'Personal name',
        userNameLb: 'Username'
      },
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      columns: {
        roleIdLb: 'ID',
        roleNameLb: 'Role name',
        roleKeyLb: 'Role code',
        createTimeLb: 'Create time'
      },
      submitSuccess: 'Authorize successfully'
    }
  },
  // Role menu internationalization
  role: {
    searchInput: {
      roleNameLb: 'Role name',
      roleNamePh: 'Input',
      roleKeyLb: 'Role code',
      roleKeyPh: 'Input',
      statusLb: 'Status',
      statusPh: 'Select',
      createTimeLb: 'Create time',
      createTimeStartPh: 'From',
      createTimeEndPh: 'To'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete',
      exportTt: 'Export excel'
    },
    dialog: {
      addTt: 'Add role',
      editTt: 'Edit role',
      roleNameLb: 'Role name',
      roleNamePh: 'Input',
      roleKeyLb: 'Role code',
      roleKeyPh: 'Input',
      roleKeyTooltip: 'Role code defined in controller',
      roleSortLb: 'Display order',
      statusLb: 'Status',
      menuPermissionLb: 'Menu permission',
      menuPermissionExpand: 'Expand/Collapse',
      menuPermissionAll: 'Select all',
      menuPermissionLink: 'Linkage',
      menuPermissionLoadingLb: 'Loading, Please wait',
      remarkLb: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        roleNameRqMsg: 'Role name cannot be empty',
        roleKeyRqMsg: 'Role code cannot be empty',
        roleSortRqMsg: 'Display order cannot be empty'
      }
    },
    columns: {
      roleIdLb: 'ID',
      roleNameLb: 'Role name',
      roleKeyLb: 'Role code',
      roleSortLb: 'Order',
      statusLb: 'Status',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateDeleteLb: 'Delete',
      operateDataScopeLb: 'Data permission',
      operateAuthUserLb: 'Assign users'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete role%{roleName}?',
      statusEnable: 'Enable',
      statusDisable: 'Disable',
      statusChangeCf: 'Are you sure to "%{action}" role "%{roleName}"?',
      statusChangeSuccess: ' successfully'
    },
    dataPermission: {
      tt: 'Data permission',
      successMsg: 'Authorize successfully',
      option1: 'All data',
      option2: 'Custom data',
      option3: 'Data of this department',
      option4: 'This department and the following data',
      option5: 'Only personal data',
      roleNameLb: 'Role name',
      roleKeyLb: 'Role code',
      dataScopeLb: 'Data scope',
      dataPermissionLb: 'Data permission',
      dataPermissionExpand: 'Expand/Collapse',
      dataPermissionAll: 'Select all',
      dataPermissionLink: 'Linkage',
      dataPermissionLoadingLb: 'Loading, please wait',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save'
    },
    authUser: {
      searchInput: {
        userNameLb: 'Username',
        userNamePh: 'Input',
        phonenumberLb: 'Phone number',
        phonenumberPh: 'Input'
      },
      headerButton: {
        addTt: 'Add',
        deauthorizeTt: 'Deauthorize',
        closeTt: 'Close'
      },
      columns: {
        userNameLb: 'Username',
        nickNameLb: 'Personal name',
        emailLb: 'Email',
        phonenumberLb: 'Phone number',
        statusLb: 'Status',
        createTimeLb: 'Create time',
        operateLb: 'Operate',
        operateAuthUserLb: 'Deauthorize'
      },
      operationMsg: {
        cancelAuthCf: 'Are you sure to cancel permission for user %{username}?',
        cancelAuthSuccess: 'Cancel permission successfully',
        cancelAuthUserAllCf: 'Are you sure to cancel permision for user(s)?',
        cancelAuthUserAllSuccess: 'Cancel permission successfully'
      },
      selectUser: {
        tt: 'Select user',
        userNameLb: 'Username',
        userNamePh: 'Input',
        phonenumberLb: 'Phone number',
        phonenumberPh: 'Input',
        cancelBtnTt: 'Close',
        saveBtnTt: 'Save',
        columns: {
          userNameLb: 'Username',
          nickNameLb: 'Personal name',
          emailLb: 'Email',
          phonenumberLb: 'Phone number',
          statusLb: 'Status',
          createTimeLb: 'Create time'
        },
        saveErrorMsg: 'Please select users',
        saveSuccessMsg: 'Select users successfully'
      }
    }
  },
  // Menu menu internationalization
  menu: {
    searchInput: {
      menuNameLb: 'Menu name',
      menuNamePh: 'Input',
      statusLb: 'Status',
      statusPh: 'Select'
    },
    headerButton: {
      addTt: 'Add',
      toggleExpandTt: 'Expand/Collapse'
    },
    dialog: {
      addTt: 'Add menu',
      editTt: 'Edit menu',
      parentIdLb: 'Parent menu',
      parentIdPh: 'Select',
      menuTypeLb: 'Menu type',
      menuTypeM: 'Table of contents',
      menuTypeC: 'Menu',
      menuTypeF: 'Button',
      iconLb: 'Menu icon',
      menuNameLb: 'Menu name',
      orderNumLb: 'Display order',
      linkLb: 'Link',
      linkTooltip: 'If you select external link, the routing address needs to start with `http(s)://`',
      linkYes: 'Yes',
      linkNo: 'No',
      pathLb: 'Routing address',
      pathTooltip: 'Routing address, such as: `user`, if the external network address needs internal link access, start with `http(s)://`',
      pathPh: 'Input',
      componentLb: 'Component path',
      componentTooltip: 'Component path to access, such as: `system/user/index`, default in the `views` directory',
      componentPh: 'Input',
      permsLb: 'Permission code',
      permsPh: 'Input',
      permsTooltip: 'Permission code defined in the controller',
      queryLb: 'Routing parameters',
      queryPh: 'Input',
      queryTooltip: 'Default passing parameters of the access route, such as: `{"id": 1, "name": "hieu"}`',
      cacheLb: 'Whether to cache',
      cacheTooltip:
        'If you select cache, it will be cached by `keep-alive`, and the `name` and address of the matching component need to be consistent',
      cacheYes: 'Cache',
      cacheNo: 'No cache',
      displayLb: 'Display status',
      displayTooltip: 'If you choose to hide, the route will not appear in the sidebar but it can still be accessed',
      statusLb: 'Menu status',
      statusTooltip: 'If you select disable, the route will not appear in the sidebar and cannot be accessed',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        menuNameRqMsg: 'Menu name cannot be empty',
        orderNumRqMsg: 'Display order cannot be empty',
        pathRqMsg: 'Routing address cannot be empty'
      }
    },
    columns: {
      menuNameLb: 'Menu name',
      iconLb: 'Icon',
      orderNumLb: 'Order',
      permsLb: 'Permission code',
      componentLb: 'Component path',
      statusLb: 'Status',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateAddLb: 'Add',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete menu %{menuName}?'
    }
  },
  // Dept menu internationalization
  dept: {
    searchInput: {
      deptNameLb: 'Department name',
      deptNamePh: 'Input',
      statusLb: 'Status',
      statusPh: 'Select'
    },
    headerButton: {
      addTt: 'Add',
      toggleExpandTt: 'Expand/Collapse'
    },
    dialog: {
      addTt: 'Add department',
      editTt: 'Edit department',
      parentIdLb: 'Parent department',
      parentIdPh: 'Select',
      deptNameLb: 'Department name',
      deptNamePh: 'Input',
      orderNumLb: 'Order',
      leaderLb: 'Person in charge',
      leaderPh: 'Input',
      phoneLb: 'Phone number',
      phonePh: 'Input',
      emailLb: 'Email',
      emailPh: 'Input',
      statusLb: 'Status',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        parentIdRqMsg: 'Parent department cannot be empty',
        deptNameRqMsg: 'Department name cannot be empty',
        orderNumRqMsg: 'Order cannot be empty',
        emailPtMsg: 'Email is incorrect',
        phonePtMsg: 'Phone number is incorrect'
      }
    },
    columns: {
      deptNameLb: 'Department name',
      orderNumLb: 'Order',
      statusLb: 'Status',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateAddLb: 'Add',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete department %{deptName}?'
    }
  },
  // Post menu internationalization
  post: {
    searchInput: {
      postCodeLb: 'Position code',
      postCodePh: 'Input',
      postNameLb: 'Position name',
      postNamePh: 'Input',
      statusLb: 'Status',
      statusPh: 'Select'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete',
      exportTt: 'Export excel'
    },
    dialog: {
      addTt: 'Add position',
      editTt: 'Edit position',
      postNameLb: 'Position name',
      postNamePh: 'Input',
      postCodeLb: 'Position code',
      postCodePh: 'Input',
      postSortLb: 'Order',
      statusLb: 'Status',
      remarkLb: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        postNameRqMsg: 'Position name cannot be empty',
        postCodeRqMsg: 'Position code cannot be empty',
        postSortRqMsg: 'Position order cannot be empty'
      }
    },
    columns: {
      postIdLb: 'ID',
      postCodeLb: 'Position code',
      postNameLb: 'Position name',
      postSortLb: 'Order',
      statusLb: 'Status',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete position(s)%{postName}?'
    }
  },
  // Dict menu internationalization
  dict: {
    searchInput: {
      dictNameLb: 'Dictionary name',
      dictNamePh: 'Input',
      dictTypeLb: 'Dictionary code',
      dictTypePh: 'Input',
      statusLb: 'Status',
      statusPh: 'Select',
      createTimeLb: 'Create time',
      createTimeStartPh: 'From',
      createTimeEndPh: 'To'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete',
      exportTt: 'Export excel',
      refreshTt: 'Refresh cache'
    },
    dialog: {
      addTt: 'Add dictionary',
      editTt: 'Edit dictionary',
      dictNameLb: 'Dictionary name',
      dictNamePh: 'Input',
      dictTypeLb: 'Dictionary code',
      dictTypePh: 'Input',
      statusLb: 'Status',
      remarkLb: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        dictNameRqMsg: 'Dictionary name cannot be empty',
        dictTypeRqMsg: 'Dictionary code cannot be empty'
      }
    },
    columns: {
      dictIdLb: 'ID',
      dictNameLb: 'Dictionary name',
      dictTypeLb: 'Dictionary code',
      statusLb: 'Status',
      createTimeLb: 'Create time',
      remarkLb: 'Remark',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      refreshSuccess: 'Refresh successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete dictionary%{dictName}?'
    },
    data: {
      searchInput: {
        dictTypeLb: 'Dictionary code',
        dictLabelLb: 'Dictionary label',
        dictLabelPh: 'Input',
        statusLb: 'Status',
        statusPh: 'Select'
      },
      headerButton: {
        addTt: 'Add',
        editTt: 'Edit',
        deleteTt: 'Delete',
        exportTt: 'Export excel',
        closeTt: 'Close'
      },
      dialog: {
        addTt: 'Add dictionary data',
        editTt: 'Edit dictionary data',
        dictTypeLb: 'Dictionary code',
        dictLabelLb: 'Data label',
        dictLabelPh: 'Input',
        dictValueLb: 'Data code',
        dictValuePh: 'Input',
        cssClassLb: 'CSS class',
        cssClassPh: 'Input',
        dictSortLb: 'Order',
        listClassLb: 'List class',
        statusLb: 'Status',
        remarkLb: 'Remark',
        remarkPh: 'Input',
        footerCancelTt: 'Close',
        footerSubmitTt: 'Save',
        rules: {
          dictLabelRqMsg: 'Data label cannot be empty',
          dictValueRqMsg: 'Data code cannot be empty',
          dictSortRqMsg: 'Data order cannot be empty'
        }
      },
      columns: {
        dictCodeLb: 'Dictionary code',
        dictLabelLb: 'Data label',
        dictValueLb: 'Data code',
        dictSortLb: 'Order',
        statusLb: 'Status',
        createTimeLb: 'Create time',
        remarkLb: 'Remark',
        operateLb: 'Operate',
        operateEditLb: 'Edit',
        operateDeleteLb: 'Delete'
      },
      operationMsg: {
        submitSuccess: 'Saved successfully',
        deleteSuccess: 'Deleted successfully',
        deleteCf: 'Are you sure to delete dictionary data%{dictLabel}?'
      }
    }
  },
  // Config menu internationalization
  config: {
    searchInput: {
      configNameLb: 'Configuration name',
      configNamePh: 'Input',
      configKeyLb: 'Configuration key',
      configKeyPh: 'Input',
      configTypeLb: 'Type',
      createTimeLb: 'Create time',
      createTimeStartPh: 'From',
      createTimeEndPh: 'To'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete',
      exportTt: 'Export excel',
      refreshTt: 'Refresh cache'
    },
    dialog: {
      addTt: 'Add configuration',
      editTt: 'Edit configuration',
      configNameLb: 'Configuration name',
      configNamePh: 'Input',
      configKeyLb: 'Configuration key',
      configKeyPh: 'Input',
      configValueLb: 'Configuration value',
      configValuePh: 'Input',
      configTypeLb: 'Type',
      remarkLb: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        configNameRqMsg: 'Configuration name cannot be empty',
        configKeyRqMsg: 'Configuration key cannot be empty',
        configValueRqMsg: 'Configuration value cannot be empty'
      }
    },
    columns: {
      configIdLb: 'ID',
      configNameLb: 'Name',
      configKeyLb: 'Key',
      configValueLb: 'Value',
      configTypeLb: 'Type',
      createTimeLb: 'Create time',
      remarkLb: 'Remark',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      refreshSuccess: 'Refresh successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete configuration%{configName}?'
    }
  },
  // Notice menu internationalization
  notice: {
    searchInput: {
      noticeTitleLb: 'Notice title',
      noticeTitlePh: 'Input',
      createByNameLb: 'Creator',
      createByNamePh: 'Input',
      noticeTypeLb: 'Notice type',
      noticeTypePh: 'Select'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete'
    },
    dialog: {
      addTt: 'Add notice',
      editTt: 'Edit notice',
      noticeTitleLb: 'Notice title',
      noticeTitlePh: 'Input',
      noticeTypeLb: 'Notice type',
      noticeTypePh: 'Select',
      statusLb: 'Status',
      noticeContentLb: 'Content',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        noticeTitleRqMsg: 'Notice title cannot be empty',
        noticeTypeRqMsg: 'Notice type cannot be empty'
      }
    },
    columns: {
      noticeIdLb: 'ID',
      noticeTitleLb: 'Notice title',
      noticeTypeLb: 'Notice type',
      statusLb: 'Status',
      createByNameLb: 'Creator',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete notice(s)%{noticeTitle}?'
    }
  },
  // Oss menu internationalization
  oss: {
    searchInput: {
      fileNameLb: 'File name',
      fileNamePh: 'Input',
      originalNameLb: 'Original name',
      originalNamePh: 'Input',
      fileSuffixLb: 'File extension',
      fileSuffixPh: 'Input',
      createTimeLb: 'Create time',
      createTimeStartPh: 'From',
      createTimeEndPh: 'To',
      serviceLb: 'Service provider',
      servicePh: 'Input'
    },
    headerButton: {
      uploadFileTt: 'Upload file',
      uploadImageTt: 'Upload image',
      deleteTt: 'Delete',
      downloadTt: 'Preview switch: ',
      configTt: 'Configuration management'
    },
    dialog: {
      imageTt: 'Upload image',
      fileTt: 'Upload file',
      fileNameLb: 'File name',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        fileRqMsg: 'File cannot be empty'
      }
    },
    columns: {
      ossIdLb: 'ID',
      fileNameLb: 'File name',
      originalNameLb: 'Original name',
      fileSuffixLb: 'File extension',
      urlLb: 'File URL',
      createTimeLb: 'Create time',
      createByNameLb: 'Uploader',
      serviceLb: 'Service provider',
      operateLb: 'Operate',
      operateDownloadLb: 'Download',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      previewEnable: 'Enable',
      previewDisable: 'Disable',
      previewChangeCf: 'Are you sure to "%{action}" option "Preview list images"?',
      previewChangeSuccess: ' successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete file(s)%{fileName}?'
    },
    config: {
      searchInput: {
        configKeyLb: 'Config key',
        configKeyPh: 'Input',
        bucketNameLb: 'Bucket name',
        bucketNamePh: 'Input',
        statusLb: 'Status',
        statusPh: 'Select'
      },
      headerButton: {
        addTt: 'Add',
        editTt: 'Edit',
        deleteTt: 'Delete'
      },
      dialog: {
        addTt: 'Add file configuration',
        editTt: 'Edit file configuration',
        configKeyLb: 'Configuration key',
        configKeyPh: 'Input',
        endpointLb: 'End point',
        endpointPh: 'Input',
        domainLb: 'Domain name',
        domainPh: 'Input',
        accessKeyLb: 'Access key',
        accessKeyPh: 'Input',
        secretKeyLb: 'Secret key',
        secretKeyPh: 'Input',
        bucketNameLb: 'Bucket name',
        bucketNamePh: 'Input',
        prefixLb: 'Prefix',
        prefixPh: 'Input',
        httpsLb: 'HTTPS',
        policyLb: 'Access policy',
        policyPrivateLb: 'Private',
        policyPublicLb: 'Public',
        policyCustomLb: 'Custom',
        regionLb: 'Region',
        regionPh: 'Input',
        remarkLb: 'Remark',
        remarkPh: 'Input',
        footerCancelTt: 'Close',
        footerSubmitTt: 'Save',
        rules: {
          configKeyRqMsg: 'Configuration Key cannot be empty',
          accessKeyRqMsg: 'Access key cannot be empty',
          accessKeyMinMaxMsg: 'Access key length must be from %{min} to %{max}',
          secretKeyRqMsg: 'Secret key cannot be empty',
          secretKeyMinMaxMsg: 'Secret key length must be from %{min} to %{max}',
          bucketNameRqMsg: 'Bucket name cannot be empty',
          bucketNameMinMaxMsg: 'Bucket name length must be from %{min} to %{max}',
          endpointRqMsg: 'End point cannot be empty',
          endpointMinMaxMsg: 'End point length must be from %{min} to %{max}',
          accessPolicyRqMsg: 'Access policy cannot be empty'
        }
      },
      columns: {
        ossConfigIdLb: 'ID',
        configKeyLb: 'Config key',
        endpointLb: 'End point',
        domainLb: 'Domain name',
        bucketNameLb: 'Bucket name',
        prefixLb: 'Prefix',
        regionLb: 'Region',
        accessPolicyLb: 'Access policy',
        statusLb: 'Status',
        operateLb: 'Operate',
        operateEditLb: 'Edit',
        operateDeleteLb: 'Delete'
      },
      operationMsg: {
        submitSuccess: 'Saved successfully',
        deleteSuccess: 'Deleted successfully',
        deleteCf: 'Are you sure to delete file configuration(s)%{configKey}?',
        statusEnable: 'Enable',
        statusDisable: 'Disable',
        statusChangeCf: 'Are you sure to "%{action}" file configuration "%{configKey}"?',
        statusChangeSuccess: ' successfully'
      }
    }
  },
  // Online menu internationalization
  online: {
    searchInput: {
      ipaddrLb: 'Login address',
      ipaddrPh: 'Input',
      userNameLb: 'Username',
      userNamePh: 'Input'
    },
    columns: {
      tokenIdLb: 'Token',
      userNameLb: 'Username',
      deptNameLb: 'Department',
      ipaddrLb: 'IP address',
      loginLocationLb: 'Location',
      osLb: 'OS',
      browserLb: 'Browser',
      loginTimeLb: 'Login time',
      operateLb: 'Operate',
      operateForceLogoutLb: 'Force logout'
    },
    operationMsg: {
      logoutSuccess: 'Logout successfully',
      logoutCf: 'Are you sure to force logout user "%{username}"?'
    }
  },
  // Robot menu internationalization
  robot: {
    searchInput: {
      robotNameLb: 'Robot name',
      robotNamePh: 'Input',
      projectNameLb: 'Robot type',
      projectNamePh: 'Input',
      statusLb: 'Status',
      statusPh: 'Select'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete',
      exportTt: 'Export excel'
    },
    dialog: {
      addTt: 'Add robot',
      editTt: 'Edit robot',
      robotNameTt: 'Robot name',
      robotNamePh: 'Input',
      projectNameTt: 'Robot type',
      projectNamePh: 'Input',
      ipAddressTt: 'IP address',
      ipAddressPh: 'Input',
      statusTt: 'Status',
      lockFlagTt: 'Active status',
      appDirTt: 'App directory',
      appDirPh: 'Input',
      baseDirTt: 'Base directory',
      baseDirPh: 'Input',
      versionNameTt: 'Version',
      versionNamePh: 'Input',
      endPointTt: 'End point',
      endPointPh: 'Input',
      defaultUsernameTt: 'Username',
      defaultUsernamePh: 'Input',
      defaultPasswordTt: 'Password',
      defaultPasswordPh: 'Input',
      remarkTt: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        robotNameRqMsg: 'Robot name cannot be empty',
        projectNameRqMsg: 'Robot type cannot be empty'
      }
    },
    columns: {
      idLb: 'ID',
      robotNameLb: 'Robot name',
      projectNameLb: 'Type',
      ipAddressLb: 'IP',
      statusLb: 'Status',
      lockFlagLb: 'Active status',
      createTimeLb: 'Create time',
      remarkLb: 'Remark',
      operateLb: 'Operate',
      editLb: 'Edit',
      deleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      unlock: 'Unlock',
      lock: 'Lock',
      lockChangeCf: 'Are you sure to "%{action}" robot "%{robotName}"?',
      lockChangeSuccess: ' successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete robot(s)%{robotName}?'
    },
    job: {
      searchInput: {
        robotNameLb: 'Robot name',
        robotNamePh: 'Input',
        projectNameLb: 'Robot type',
        projectNamePh: 'Input',
        statusLb: 'Status',
        statusPh: 'Select'
      },
      headerButton: {
        addTt: 'Add',
        editTt: 'Edit',
        deleteTt: 'Delete',
        exportTt: 'Export excel',
        closeTt: 'Close'
      },
      dialog: {
        addTt: 'Add robot job',
        editTt: 'Edit robot job',
        histTt: 'Job history',
        robotNameTt: 'Robot name',
        robotNamePh: 'Input',
        projectNameTt: 'Robot type',
        projectNamePh: 'Input',
        ipAddressTt: 'IP address',
        ipAddressPh: 'Input',
        statusTt: 'Status',
        reqJsonTt: 'Request data',
        resJsonTt: 'Response data',
        footerCancelTt: 'Close',
        footerSubmitTt: 'Save',
        histFooterCancelTt: 'Close'
      },
      columns: {
        jobIdLb: 'ID',
        refIdLb: 'Ref ID',
        robotNameLb: 'Robot name',
        projectNameLb: 'Type',
        ipAddressLb: 'IP',
        statusLb: 'Status',
        createTimeLb: 'Create time',
        operateLb: 'Operate',
        editLb: 'Edit',
        deleteLb: 'Delete',
        viewHistLb: 'View history'
      },
      histColumns: {
        createTimeLb: 'Creation time',
        stepOrderLb: 'Step',
        msgLb: 'Message',
        errMsgLb: 'Error message'
      },
      operationMsg: {
        submitSuccess: 'Saved successfully',
        deleteSuccess: 'Deleted successfully',
        deleteCf: 'Are you sure to delete robot job(s)%{projectName}?'
      }
    }
  },
  // Operlog menu internationalization
  operlog: {
    searchInput: {
      titleLb: 'Title',
      titlePh: 'Input',
      operNameLb: 'Operator',
      operNamePh: 'Input',
      systemTypeLb: 'System',
      systemTypePh: 'Input',
      businessTypeLb: 'Type',
      businessTypePh: 'Select',
      statusLb: 'Status',
      statusPh: 'Select',
      operTimeLb: 'Operation time',
      operTimeStartPh: 'From',
      operTimeEndPh: 'To'
    },
    headerButton: {
      deleteTt: 'Delete',
      clearTt: 'Clear',
      exportTt: 'Export excel'
    },
    dialog: {
      tt: 'Operation log detail',
      titleTt: 'Title',
      operUrlPh: 'Operation URL',
      operInfoTt: 'Operation Information',
      requestMethodPh: 'Request method',
      methodTt: 'Method',
      operParamPh: 'Params',
      jsonResultTt: 'Result',
      statusTt: 'Status',
      costTimeTt: 'Cost time (ms)',
      operTimeTt: 'Operation time',
      errorMsgTt: 'Error message',
      footerCancelTt: 'Close'
    },
    columns: {
      operIdLb: 'ID',
      titleLb: 'Title',
      businessTypeLb: 'Type',
      operNameLb: 'Operator',
      operIpLb: 'IP',
      systemTypeLb: 'System type',
      statusLb: 'Status',
      operTimeLb: 'Operation time',
      costTimeLb: 'Cost time',
      operateLb: 'Operate',
      detailLb: 'View detail'
    },
    operationMsg: {
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete operation log(s)%{title}?',
      clearSuccess: 'Clean successfully',
      clearCf: 'Are you sure to clear all operation logs?'
    }
  },
  // Logininfor menu internationalization
  logininfor: {
    searchInput: {
      ipaddrLb: 'Title',
      ipaddrPh: 'Input',
      userNameLb: 'Operator',
      userNamePh: 'Input',
      statusLb: 'Type',
      statusPh: 'Select',
      loginTimeLb: 'Login time',
      loginTimeStartPh: 'From',
      loginTimeEndPh: 'To'
    },
    headerButton: {
      deleteTt: 'Delete',
      unlockTt: 'Unlock',
      exportTt: 'Export excel'
    },
    columns: {
      ipaddrLb: 'IP address',
      loginLocationLb: 'Login location',
      osLb: 'Operating system',
      browserLb: 'Browser',
      statusLb: 'Status',
      msgLb: 'Message',
      loginTimeLb: 'Login time'
    },
    operationMsg: {
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete login log(s)?',
      clearSuccess: 'Clean successfully',
      clearCf: 'Are you sure to clear all login logs?',
      unlockSuccess: 'User %{username} unlock successfully',
      unlockCf: 'Are you sure to unlock user %{username}?'
    }
  },
  // ShippinglineList menu internationalization
  shippinglineList: {
    searchInput: {
      operatorCodeLb: 'Shipping line code',
      operatorCodePh: 'Input',
      operatorNameLb: 'Shipping line name',
      operatorNamePh: 'Input',
      domesticFlagLb: 'Shipping line type',
      domesticFlagPh: 'Select'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete',
      exportTt: 'Export excel'
    },
    dialog: {
      addTt: 'Add shipping line',
      editTt: 'Edit shipping line',
      operatorCodeTt: 'Shipping line code',
      operatorCodePh: 'Input',
      operatorNameTt: 'Shipping line name',
      operatorNamePh: 'Input',
      oprListTt: 'OPR list',
      oprListPh: 'Input',
      emailTt: 'Email',
      emailPh: 'Input',
      phonenumberTt: 'Phone number',
      phonenumberPh: 'Input',
      taxcodeTt: 'Tax code',
      taxcodePh: 'Input',
      domesticFlagTt: 'Shipping line type',
      remarkTt: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        operatorCodeRqMsg: 'Shipping line code cannot be empty',
        operatorNameRqMsg: 'Shipping line name cannot be empty',
        oprListRqMsg: 'OPR list cannot be empty',
        emailPtMsg: 'Email is incorrect',
        phonenumberPtMsg: 'Phone number is incorrect'
      }
    },
    columns: {
      idLb: 'ID',
      operatorCodeLb: 'Robot name',
      operatorNameLb: 'Type',
      oprListLb: 'IP',
      emailLb: 'Status',
      phonenumberLb: 'Active status',
      domesticFlagLb: 'Active status',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      editLb: 'Edit',
      deleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete shipping line(s)%{shippinglineCode}?'
    }
  },
  // ShippinglineUser menu internationalization
  shippinglineUser: {
    searchInput: {
      userNameLb: 'Username',
      userNamePh: 'Input',
      phonenumberLb: 'Phone number',
      phonenumberPh: 'Input',
      operatorNameLb: 'Shipping line',
      operatorNamePh: 'Input',
      statusLb: 'Status',
      statusPh: 'Select',
      createTimeLb: 'Create time',
      createTimeStartPh: 'From',
      createTimeEndPh: 'To'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete',
      exportTt: 'Export excel'
    },
    dialog: {
      addTt: 'Add user',
      editTt: 'Edit user',
      shippinglineIdLb: 'Shipping line',
      shippinglineIdPh: 'Select',
      oprLb: 'OPR',
      oprPh: 'Select',
      nickNameLb: 'Personal name',
      nickNamePh: 'Input',
      phonenumberLb: 'Phone number',
      phonenumberPh: 'Input',
      emailLb: 'Email',
      emailPh: 'Input',
      userNameLb: 'Username',
      userNamePh: 'Input',
      passwordLb: 'Password',
      passwordPh: 'Input',
      sexLb: 'Gender',
      sexPh: 'Select',
      statusLb: 'Status',
      roleIdsLb: 'Roles',
      roleIdsPh: 'Select',
      remarkLb: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        userNameRqMsg: 'Username cannot be empty',
        userNameMinMaxMsg: 'Length of username must be from %{min} to %{max} characters',
        nickNameRqMsg: 'Personal name cannot be empty',
        shippinglineIdRqMsg: 'Shipping line cannot be empty',
        shippinglineOprsRqMsg: 'OPR cannot be empty',
        passwordRqMsg: 'Password cannot be empty',
        passwordMinMaxMsg: 'Length of password must be from %{min} to %{max} characters',
        emailRqMsg: 'Email cannot be empty',
        phonenumberPtMsg: 'Phone number is incorrect'
      }
    },
    columns: {
      userIdLb: 'User ID',
      userNameLb: 'Username',
      nickNameLb: 'Personal name',
      operatorNameLb: 'Shipping line',
      phonenumberLb: 'Phone number',
      statusLb: 'Status',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateDeleteLb: 'Delete',
      operateResetPwdLb: 'Reset password',
      operateAuthRoleLb: 'Assign roles'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete user(s)%{username}?',
      statusEnable: 'Enable',
      statusDisable: 'Disable',
      statusChangeCf: 'Are you sure to "%{action}" user "%{username}"?',
      statusChangeSuccess: ' successfully',
      resetPwdTt: 'Reset password',
      resetPwdCf: 'Please input new password for "%{username}"',
      resetPwdMinMaxMsg: 'Length of password must be from %{min} to %{max} characters',
      resetPwdSuccess: 'Reset password successfully, new password is: %{newPassword}',
      resetPwdBtnSave: 'Save',
      resetPwdBtnClose: 'Close'
    },
    authRole: {
      searchInput: {
        nickNameLb: 'Personal name',
        userNameLb: 'Username'
      },
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      columns: {
        roleIdLb: 'ID',
        roleNameLb: 'Role name',
        roleKeyLb: 'Role code',
        createTimeLb: 'Create time'
      },
      submitSuccess: 'Authorize successfully'
    }
  },
  // ShippinglineRole menu internationalization
  shippinglineRole: {
    searchInput: {
      roleNameLb: 'Role name',
      roleNamePh: 'Input',
      roleKeyLb: 'Role code',
      roleKeyPh: 'Input',
      statusLb: 'Status',
      statusPh: 'Select',
      createTimeLb: 'Create time',
      createTimeStartPh: 'From',
      createTimeEndPh: 'To'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete',
      exportTt: 'Export excel'
    },
    dialog: {
      addTt: 'Add role',
      editTt: 'Edit role',
      roleNameLb: 'Role name',
      roleNamePh: 'Input',
      roleKeyLb: 'Role code',
      roleKeyPh: 'Input',
      roleKeyTooltip: 'Role code defined in controller',
      roleSortLb: 'Display order',
      statusLb: 'Status',
      menuPermissionLb: 'Menu permission',
      menuPermissionExpand: 'Expand/Collapse',
      menuPermissionAll: 'Select all',
      menuPermissionLink: 'Linkage',
      menuPermissionLoadingLb: 'Loading, Please wait',
      remarkLb: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        roleNameRqMsg: 'Role name cannot be empty',
        roleKeyRqMsg: 'Role code cannot be empty',
        roleSortRqMsg: 'Display order cannot be empty'
      }
    },
    columns: {
      roleIdLb: 'ID',
      roleNameLb: 'Role name',
      roleKeyLb: 'Role code',
      roleSortLb: 'Order',
      statusLb: 'Status',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateDeleteLb: 'Delete',
      operateDataScopeLb: 'Data permission',
      operateAuthUserLb: 'Assign users'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete role%{roleName}?',
      statusEnable: 'Enable',
      statusDisable: 'Disable',
      statusChangeCf: 'Are you sure to "%{action}" role "%{roleName}"?',
      statusChangeSuccess: ' successfully'
    },
    authUser: {
      searchInput: {
        userNameLb: 'Username',
        userNamePh: 'Input',
        phonenumberLb: 'Phone number',
        phonenumberPh: 'Input'
      },
      headerButton: {
        addTt: 'Add',
        deauthorizeTt: 'Deauthorize',
        closeTt: 'Close'
      },
      columns: {
        userNameLb: 'Username',
        nickNameLb: 'Personal name',
        emailLb: 'Email',
        phonenumberLb: 'Phone number',
        statusLb: 'Status',
        createTimeLb: 'Create time',
        operateLb: 'Operate',
        operateAuthUserLb: 'Deauthorize'
      },
      operationMsg: {
        cancelAuthCf: 'Are you sure to cancel permission for user %{username}?',
        cancelAuthSuccess: 'Cancel permission successfully',
        cancelAuthUserAllCf: 'Are you sure to cancel permision for user(s)?',
        cancelAuthUserAllSuccess: 'Cancel permission successfully'
      },
      selectUser: {
        tt: 'Select user',
        userNameLb: 'Username',
        userNamePh: 'Input',
        phonenumberLb: 'Phone number',
        phonenumberPh: 'Input',
        cancelBtnTt: 'Close',
        saveBtnTt: 'Save',
        columns: {
          userNameLb: 'Username',
          nickNameLb: 'Personal name',
          emailLb: 'Email',
          phonenumberLb: 'Phone number',
          statusLb: 'Status',
          createTimeLb: 'Create time'
        },
        saveErrorMsg: 'Please select users',
        saveSuccessMsg: 'Select users successfully'
      }
    }
  },
  // ShippinglineMenu menu internationalization
  ShippinglineMenu: {
    searchInput: {
      menuNameLb: 'Menu name',
      menuNamePh: 'Input',
      statusLb: 'Status',
      statusPh: 'Select'
    },
    headerButton: {
      addTt: 'Add',
      toggleExpandTt: 'Expand/Collapse'
    },
    dialog: {
      addTt: 'Add menu',
      editTt: 'Edit menu',
      parentIdLb: 'Parent menu',
      parentIdPh: 'Select',
      menuTypeLb: 'Menu type',
      menuTypeM: 'Table of contents',
      menuTypeC: 'Menu',
      menuTypeF: 'Button',
      iconLb: 'Menu icon',
      menuNameLb: 'Menu name',
      orderNumLb: 'Display order',
      linkLb: 'Link',
      linkTooltip: 'If you select external link, the routing address needs to start with `http(s)://`',
      linkYes: 'Yes',
      linkNo: 'No',
      pathLb: 'Routing address',
      pathTooltip: 'Routing address, such as: `user`, if the external network address needs internal link access, start with `http(s)://`',
      pathPh: 'Input',
      componentLb: 'Component path',
      componentTooltip: 'Component path to access, such as: `system/user/index`, default in the `views` directory',
      componentPh: 'Input',
      permsLb: 'Permission code',
      permsPh: 'Input',
      permsTooltip: 'Permission code defined in the controller',
      queryLb: 'Routing parameters',
      queryPh: 'Input',
      queryTooltip: 'Default passing parameters of the access route, such as: `{"id": 1, "name": "hieu"}`',
      cacheLb: 'Whether to cache',
      cacheTooltip:
        'If you select cache, it will be cached by `keep-alive`, and the `name` and address of the matching component need to be consistent',
      cacheYes: 'Cache',
      cacheNo: 'No cache',
      displayLb: 'Display status',
      displayTooltip: 'If you choose to hide, the route will not appear in the sidebar but it can still be accessed',
      statusLb: 'Menu status',
      statusTooltip: 'If you select disable, the route will not appear in the sidebar and cannot be accessed',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        menuNameRqMsg: 'Menu name cannot be empty',
        orderNumRqMsg: 'Display order cannot be empty',
        pathRqMsg: 'Routing address cannot be empty'
      }
    },
    columns: {
      menuNameLb: 'Menu name',
      iconLb: 'Icon',
      orderNumLb: 'Order',
      permsLb: 'Permission code',
      componentLb: 'Component path',
      statusLb: 'Status',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateAddLb: 'Add',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete menu %{menuName}?'
    }
  },
  // ShippinglineApi menu internationalization
  shippinglineApi: {
    searchInput: {
      operatorCodeLb: 'Shipping line code',
      operatorCodePh: 'Input',
      operatorNameLb: 'Shipping line name',
      operatorNamePh: 'Input',
      oprCodeLb: 'OPR',
      oprCodePh: 'Input',
      blockFlagLb: 'Status',
      blockFlagPh: 'Select'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete',
      exportTt: 'Export excel'
    },
    dialog: {
      addTt: 'Add api',
      editTt: 'Edit api',
      shippinglineIdTt: 'Shipping line',
      shippinglineIdPh: 'Select',
      oprCodeTt: 'OPR',
      oprCodePh: 'Select',
      blockFlagTt: 'Status',
      usernameTt: 'Username',
      usernamePh: 'Select',
      apiPrivateKeyTt: 'Private key',
      apiPublicKeyTt: 'Public key',
      remarkTt: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        shippinglineIdRqMsg: 'Shipping line cannot be empty',
        oprCodeoperatorNameRqMsg: 'OPR cannot be empty',
        usernameRqMsg: 'Username cannot be empty'
      }
    },
    columns: {
      idLb: 'ID',
      operatorCodeLb: 'Shipping line code',
      operatorNameLb: 'Shipping line name',
      oprCodeLb: 'OPR',
      blockFlagLb: 'Status',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      editLb: 'Edit',
      refreshLb: 'Refresh api key',
      deleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete shipping line api?',
      copySuccess: 'Copy successfully',
      refreshSuccess: 'Refresh successfully',
      refreshCf: 'Are you sure to refresh api key for OPR %{opr}?'
    }
  },
  // Edo menu internationalization
  edo: {
    searchInput: {
      vesselNameLb: 'Vessel',
      vesselNamePh: 'Input',
      voyNoLb: 'Voyage no',
      voyNoPh: 'Input',
      consigneeLb: 'Consignee',
      consigneePh: 'Input',
      blNoLb: 'B/L no',
      blNoPh: 'Input',
      containerNoLb: 'Container no',
      containerNoPh: 'Input',
      releaseDateLb: 'Release date',
      releaseDateStartPh: 'From',
      releaseDateEndPh: 'To'
    },
    headerButtonLeft: {
      releaseEdoTt: 'Release eDO'
    },
    headerButtonRight: {
      editTt: 'Edit',
      unlockTt: 'Unlock',
      lockTt: 'Lock',
      printTt: 'Print'
    },
    dialog: {
      editSingleTt: 'Edit container %{containerNo}',
      editMultiTt: 'Edit containers',
      expiredDemLb: 'Expired dem',
      expiredDemPh: 'Select',
      detFreeTimeLb: 'Det free time',
      detFreeTimePh: 'Input',
      emptyContainerDepotLb: 'Empty container depot',
      emptyContainerDepotPh: 'Input',
      consigneeLb: 'Consignee',
      consigneePh: 'Input',
      remarkLb: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save'
    },
    edoColumns: {
      idLb: 'ID',
      blNoLb: 'B/L no',
      vesselNameLb: 'Vessel',
      voyNoLb: 'Voyage no',
      releaseDateLb: 'Release date'
    },
    containerColumns: {
      idLb: 'ID',
      containerNoLb: 'Container no',
      sztpLb: 'Size type',
      oprCodeLb: 'OPR code',
      orderNumberLb: 'Order number',
      consigneeLb: 'Consignee',
      expiredDemLb: 'Expired dem',
      detFreeTimeLb: 'Det free time',
      emptyContainerDepotLb: 'Empty container depot',
      vesselNameLb: 'Vessel',
      voyNoLb: 'Voyage no',
      polLb: 'Port of loading',
      podLb: 'Port of discharge',
      remarkLb: 'Remark',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateHistoryLb: 'View history'
    },
    operationMsg: {
      submitSuccess: 'Edited edo successfully',
      containerLock: 'Lock',
      containerUnlock: 'Unlock',
      containerDluCf: 'Are you sure to "%{action}" for selected containers?',
      containerDluSuccess: '%{action} containers on process'
    },
    release: {
      oprLb: 'OPR code',
      blNoLb: 'B/L no',
      containerNoLb: 'Container no',
      sztpLb: 'Size type',
      oprCodeLb: 'OPR code',
      orderNumberLb: 'Order number',
      consigneeLb: 'Consignee',
      expiredDemLb: 'Expired dem',
      detFreeTimeLb: 'Det free time',
      emptyContainerDepotLb: 'Empty container depot',
      vesselNameLb: 'Vessel',
      voyNoLb: 'Voyage no',
      polLb: 'Port of loading',
      podLb: 'Port of discharge',
      remarkLb: 'Remark',
      releaseOffical: 'Release eDO',
      releaseDraft: 'Save as draft',
      importExcelBtn: 'Import excel',
      closeBtn: 'Close',
      importDialogCloseBtn: 'Close',
      importDialogImportBtn: 'Import',
      importDialogTt: 'Import excel',
      importFileSuccess: 'Imported excel successfully',
      releaseCf: 'Confirm release eDO?',
      draftCf: 'Confirm save eDO as draft?',
      releaseSuccess: 'Released eDO successfully',
      draftSuccess: 'Saved eDO as draft successfully',
      validateConainer: 'Container no is incorrect by container ISO standard, maybe the input is wrong, please check again'
    }
  },
  // Edo menu internationalization
  shippinglineEdo: {
    searchInput: {
      oprCodeLb: 'OPR',
      oprCodePh: 'Input',
      vesselNameLb: 'Vessel',
      vesselNamePh: 'Input',
      voyNoLb: 'Voyage no',
      voyNoPh: 'Input',
      consigneeLb: 'Consignee',
      consigneePh: 'Input',
      blNoLb: 'B/L no',
      blNoPh: 'Input',
      containerNoLb: 'Container no',
      containerNoPh: 'Input',
      releaseDateLb: 'Release date',
      releaseDateStartPh: 'From',
      releaseDateEndPh: 'To'
    },
    headerButtonRight: {
      editTt: 'Edit',
      printTt: 'Print'
    },
    dialog: {
      editSingleTt: 'Edit container %{containerNo}',
      editMultiTt: 'Edit containers',
      expiredDemLb: 'Expired dem',
      expiredDemPh: 'Select',
      detFreeTimeLb: 'Det free time',
      detFreeTimePh: 'Input',
      emptyContainerDepotLb: 'Empty container depot',
      emptyContainerDepotPh: 'Input',
      consigneeLb: 'Consignee',
      consigneePh: 'Input',
      remarkLb: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save'
    },
    edoColumns: {
      idLb: 'ID',
      blNoLb: 'B/L no',
      vesselNameLb: 'Vessel',
      voyNoLb: 'Voyage no',
      releaseDateLb: 'Release date'
    },
    containerColumns: {
      idLb: 'ID',
      containerNoLb: 'Container no',
      sztpLb: 'Size type',
      oprCodeLb: 'OPR code',
      orderNumberLb: 'Order number',
      consigneeLb: 'Consignee',
      expiredDemLb: 'Expired dem',
      detFreeTimeLb: 'Det free time',
      emptyContainerDepotLb: 'Empty container depot',
      vesselNameLb: 'Vessel',
      voyNoLb: 'Voyage no',
      polLb: 'Port of loading',
      podLb: 'Port of discharge',
      remarkLb: 'Remark',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateHistoryLb: 'View history'
    },
    operationMsg: {
      submitSuccess: 'Edited edo successfully'
    }
  },
  bulletin: {
    searchInput: {
      titleLb: 'Search',
      titlePh: 'Input title',
      createTimeLb: 'Create time',
      createTimeStartPh: 'From',
      createTimeEndPh: 'To'
    }
  },
  profile: {
    basicInfo: {
      tt: 'Profile',
      usernameLb: 'Username',
      phonenumberLb: 'Phone number',
      emailLb: 'Email',
      createTimeLb: 'Create time'
    },
    editInfo: {
      tt: 'Edit profile',
      basicTab: 'Basic information',
      passwordTab: 'Change password',
      nickNameLb: 'Personal name',
      phonenumberLb: 'Phone number',
      emailLb: 'Email',
      sexLb: 'Gender',
      sexMaleLb: 'Male',
      sexFemaleLb: 'Female',
      oldPasswordLb: 'Old password',
      oldPasswordPh: 'Input',
      newPasswordLb: 'New password',
      newPasswordPh: 'Input',
      confirmPasswordLb: 'Confirm password',
      confirmPasswordPh: 'Input',
      submitBtn: 'Save',
      cancelBtn: 'Close',
      infoRules: {
        nickNameRqMsg: 'Personal name cannot be empty',
        emailRqMsg: 'Email cannot be empty',
        emailPtMsg: 'Email is incorrect',
        phonenumberPtMsg: 'Phone number is incorrect'
      },
      passwordRules: {
        oldPasswordRqMsg: 'Old password cannot be empty',
        newPasswordRqMsg: 'New password cannot be empty',
        newPasswordMinMaxMsg: 'Length of the new password must be from %{min} to %{max} characters',
        passwordNotMatch: 'The two entered passwords do not match',
        confirmPasswordRqMsg: 'Confirm password can not be empty'
      },
      editSuccess: 'Edited successfully'
    },
    userAvatar: {
      chooseBtn: 'Choose',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      rotateLeft: 'Rotate left',
      rotateRight: 'Rotate right',
      saveBtn: 'Save',
      dialogTt: 'Edit avatar',
      uploadErr: 'The file format is wrong, please upload the image type, such as: JPG, PNG file extension.',
      editSuccess: 'Saved successfully'
    }
  },
  edoConsignee: {
    searchInput: {
      consigneeNameLb: 'Consignee name',
      consigneeNamePh: 'Input',
      taxCodeLb: 'Tax code',
      taxCodePh: 'Input'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete',
      exportTt: 'Export excel'
    },
    dialog: {
      addTt: 'Add consignee',
      editTt: 'Edit consignee',
      consigneeNameLb: 'Consignee name',
      consigneeNamePh: 'Input',
      taxCodeLb: 'Tax code',
      taxCodePh: 'Input',
      addressLb: 'Address',
      addressPh: 'Input',
      remarkLb: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        consigneeNameRqMsg: 'Consignee name cannot be empty',
        taxCodeRqMsg: 'Tax code cannot be empty'
      }
    },
    columns: {
      idLb: 'ID',
      consigneeNameLb: 'Consignee name',
      taxCodeLb: 'Tax code',
      addressLb: 'Address',
      remarkLb: 'Remark',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete consignee(s)%{consigneeName}?'
    }
  },
  edoDraft: {
    searchInput: {
      oprCodeLb: 'OPR',
      oprCodePh: 'Input',
      vesselNameLb: 'Vessel',
      vesselNamePh: 'Input',
      voyNoLb: 'Voyage no',
      voyNoPh: 'Input',
      consigneeLb: 'Consignee',
      consigneePh: 'Input',
      blNoLb: 'B/L no',
      blNoPh: 'Input',
      containerNoLb: 'Container no',
      containerNoPh: 'Input'
    },
    edoColumns: {
      idLb: 'ID',
      blNoLb: 'B/L no',
      vesselNameLb: 'Vessel',
      voyNoLb: 'Voyage no',
      createTimeLb: 'Create time'
    },
    containerColumns: {
      containerNoLb: 'Container no',
      sztpLb: 'Size type',
      oprCodeLb: 'OPR code',
      orderNumberLb: 'Order number',
      consigneeLb: 'Consignee',
      expiredDemLb: 'Expired dem',
      detFreeTimeLb: 'Det free time',
      emptyContainerDepotLb: 'Empty container depot',
      vesselNameLb: 'Vessel',
      voyNoLb: 'Voyage no',
      polLb: 'Port of loading',
      podLb: 'Port of discharge',
      remarkLb: 'Remark'
    },
    btn: {
      add: 'Add new',
      release: 'Release',
      delete: 'Delete',
      save: 'Save'
    },
    msg: {
      confirmDelete: 'Are you sure to delete seleted eDO draft(s)',
      deleteSuccess: 'Deleted successfully',
      confirmSave: 'Are you sure to save change',
      saveSuccess: 'Saved successfully',
      confirmRelease: 'Are you sure to release selected eDO draft(s)',
      releaseSuccess: 'Released successfully'
    }
  },
  dataHistory: {
    searchInput: {
      usernameLb: 'Username',
      usernamePh: 'Input',
      tableNameLb: 'Module',
      tableNamePh: 'Input',
      systemTypeLb: 'System type',
      systemTypePh: 'Input',
      createTimeLb: 'Create time',
      createTimeStartPh: 'From',
      createTimeEndPh: 'To'
    },
    headerButton: {
      deleteTt: 'Delete',
      exportTt: 'Export excel'
    },
    dialog: {
      detailTt: 'History detail',
      createTimeLb: 'Operation time',
      histTypeLb: 'Operation',
      tableNameLb: 'Module',
      systemTypeLb: 'System type',
      dataFieldLb: 'Data field',
      oldValueLb: 'Old value',
      newValueLb: 'New value',
      usernameLb: 'Operator',
      footerCancelTt: 'Close'
    },
    columns: {
      idLb: 'ID',
      refIdLb: 'Reference index',
      histTypeLb: 'Operation',
      tableNameLb: 'Module',
      systemTypeLb: 'System type',
      dataFieldLb: 'Data field',
      createTimeLb: 'Operation time',
      oldValueLb: 'Old value',
      newValueLb: 'New value',
      usernameLb: 'Operator',
      operateLb: 'Operate',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete history%{id}?'
    }
  },
  document: {
    searchInput: {
      docTitleLb: 'Title',
      docTitlePh: 'Input',
      docTypeLb: 'Document type',
      docTypePh: 'Select'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete'
    },
    dialog: {
      addTt: 'Add document',
      editTt: 'Edit document',
      docTitleLb: 'Title',
      docTitlePh: 'Input',
      docTypeLb: 'Type',
      isExternalLinkLb: 'External link',
      statusTt: 'Status',
      docTargetLb: 'Target',
      docTargetPh: 'Input',
      docUrlLb: 'URL',
      docUrlPh: 'Input',
      docDescriptionLb: 'Description',
      docDescriptionPh: 'Input',
      imageTypeLb: 'Image type',
      imageTypePh: 'Input',
      remarkLb: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        docTitleRqMsg: 'Document title cannot be empty'
      }
    },
    columns: {
      idLb: 'ID',
      docTypeLb: 'Type',
      docTitleLb: 'Title',
      urlLb: 'URL',
      statusLb: 'Status',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete document(s)%{title}?',
      statusEnable: 'Enable',
      statusDisable: 'Disable',
      statusChangeCf: 'Are you sure to "%{action}" document "%{docTitle}"?'
    }
  },
  prepaidCustomer: {
    searchInput: {
      taxCodeLb: 'Tax code',
      taxCodePh: 'Input',
      fullNameLb: 'Customer name',
      fullNamePh: 'Input',
      addressLb: 'Address',
      addressPh: 'Input'
    },
    columns: {
      taxCodeLb: 'Tax code',
      fullNameLb: 'Customer name',
      addressLb: 'Address'
    }
  },
  postpaidCustomer: {
    searchInput: {
      accountNoLb: 'Account no',
      accountNoPh: 'Input',
      fullNameLb: 'Customer name',
      fullNamePh: 'Input',
      addressLb: 'Address',
      addressPh: 'Input'
    },
    columns: {
      accountNoLb: 'Account no',
      fullNameLb: 'Customer name',
      addressLb: 'Address'
    }
  }
};
