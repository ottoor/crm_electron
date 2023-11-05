import { u as useNamespace, bq as toRefs, B as computed, U as nextTick, d as defineComponent, h as getCurrentInstance, G as watch, aI as isFunction, j as inject, r as ref, F as reactive, o as onMounted, I as h, _ as _export_sfc, aj as http, Y as onBeforeMount, a as openBlock, l as createBlock, w as withCtx, f as unref, k as createBaseVNode, a0 as createVNode, Z as createCommentVNode, c as createElementBlock, $ as renderList, M as Fragment, X as createTextVNode, t as toDisplayString, aT as ElMessage } from "./index-575c9104.js";
import { E as ElDialog, a as ElRadioGroup, b as ElRadio } from "./el-radio-a1020461.js";
import { E as ElButton } from "./el-button-5c456a10.js";
import { a as ElFormItem, E as ElForm } from "./el-form-item-94e096cf.js";
import { E as ElInput } from "./el-input-bdf12b29.js";
import "./el-tag-adbebd4f.js";
import { E as ElSelect, a as ElOption, s as selectKey } from "./el-select-8f71d2c9.js";
import "./el-scrollbar-20c86168.js";
import { _ as _Tree } from "./el-tree-94823251.js";
import { p as pick } from "./el-checkbox-0e351c79.js";
import { _ as _export_sfc$1 } from "./_plugin-vue_export-helper-cc2b3d55.js";
import { U as UPDATE_MODEL_EVENT } from "./event-28e3832c.js";
import { i as isEqual } from "./isEqual-75679068.js";
const useSelect = (props, { attrs }, {
  tree,
  key
}) => {
  const ns = useNamespace("tree-select");
  const result = {
    ...pick(toRefs(props), Object.keys(ElSelect.props)),
    ...attrs,
    valueKey: key,
    popperClass: computed(() => {
      const classes = [ns.e("popper")];
      if (props.popperClass)
        classes.push(props.popperClass);
      return classes.join(" ");
    }),
    filterMethod: (keyword = "") => {
      if (props.filterMethod)
        props.filterMethod(keyword);
      nextTick(() => {
        var _a;
        (_a = tree.value) == null ? void 0 : _a.filter(keyword);
      });
    },
    onVisibleChange: (visible) => {
      var _a;
      (_a = attrs.onVisibleChange) == null ? void 0 : _a.call(attrs, visible);
      if (props.filterable && visible) {
        result.filterMethod();
      }
    }
  };
  return result;
};
const component = defineComponent({
  extends: ElOption,
  setup(props, ctx) {
    const result = ElOption.setup(props, ctx);
    delete result.selectOptionClick;
    const vm = getCurrentInstance().proxy;
    nextTick(() => {
      if (!result.select.cachedOptions.get(vm.value)) {
        result.select.onOptionCreate(vm);
      }
    });
    return result;
  },
  methods: {
    selectOptionClick() {
      this.$el.parentElement.click();
    }
  }
});
function isValidValue(val) {
  return val || val === 0;
}
function isValidArray(val) {
  return Array.isArray(val) && val.length;
}
function toValidArray(val) {
  return Array.isArray(val) ? val : isValidValue(val) ? [val] : [];
}
function treeFind(treeData, findCallback, getChildren, resultCallback, parent) {
  for (let i = 0; i < treeData.length; i++) {
    const data = treeData[i];
    if (findCallback(data, i, treeData, parent)) {
      return resultCallback ? resultCallback(data, i, treeData, parent) : data;
    } else {
      const children = getChildren(data);
      if (isValidArray(children)) {
        const find = treeFind(children, findCallback, getChildren, resultCallback, data);
        if (find)
          return find;
      }
    }
  }
}
function treeEach(treeData, callback, getChildren, parent) {
  for (let i = 0; i < treeData.length; i++) {
    const data = treeData[i];
    callback(data, i, treeData, parent);
    const children = getChildren(data);
    if (isValidArray(children)) {
      treeEach(children, callback, getChildren, data);
    }
  }
}
const useTree = (props, { attrs, slots, emit }, {
  select,
  tree,
  key
}) => {
  watch(() => props.modelValue, () => {
    if (props.showCheckbox) {
      nextTick(() => {
        const treeInstance = tree.value;
        if (treeInstance && !isEqual(treeInstance.getCheckedKeys(), toValidArray(props.modelValue))) {
          treeInstance.setCheckedKeys(toValidArray(props.modelValue));
        }
      });
    }
  }, {
    immediate: true,
    deep: true
  });
  const propsMap = computed(() => ({
    value: key.value,
    label: "label",
    children: "children",
    disabled: "disabled",
    isLeaf: "isLeaf",
    ...props.props
  }));
  const getNodeValByProp = (prop, data) => {
    var _a;
    const propVal = propsMap.value[prop];
    if (isFunction(propVal)) {
      return propVal(data, (_a = tree.value) == null ? void 0 : _a.getNode(getNodeValByProp("value", data)));
    } else {
      return data[propVal];
    }
  };
  const defaultExpandedParentKeys = toValidArray(props.modelValue).map((value) => {
    return treeFind(props.data || [], (data) => getNodeValByProp("value", data) === value, (data) => getNodeValByProp("children", data), (data, index, array, parent) => parent && getNodeValByProp("value", parent));
  }).filter((item) => isValidValue(item));
  const cacheOptions = computed(() => {
    if (!props.renderAfterExpand && !props.lazy)
      return [];
    const options = [];
    treeEach(props.data.concat(props.cacheData), (node) => {
      const value = getNodeValByProp("value", node);
      options.push({
        value,
        currentLabel: getNodeValByProp("label", node),
        isDisabled: getNodeValByProp("disabled", node)
      });
    }, (data) => getNodeValByProp("children", data));
    return options;
  });
  const cacheOptionsMap = computed(() => {
    return cacheOptions.value.reduce((prev, next) => ({ ...prev, [next.value]: next }), {});
  });
  return {
    ...pick(toRefs(props), Object.keys(_Tree.props)),
    ...attrs,
    nodeKey: key,
    expandOnClickNode: computed(() => {
      return !props.checkStrictly && props.expandOnClickNode;
    }),
    defaultExpandedKeys: computed(() => {
      return props.defaultExpandedKeys ? props.defaultExpandedKeys.concat(defaultExpandedParentKeys) : defaultExpandedParentKeys;
    }),
    renderContent: (h2, { node, data, store }) => {
      return h2(component, {
        value: getNodeValByProp("value", data),
        label: getNodeValByProp("label", data),
        disabled: getNodeValByProp("disabled", data)
      }, props.renderContent ? () => props.renderContent(h2, { node, data, store }) : slots.default ? () => slots.default({ node, data, store }) : void 0);
    },
    filterNodeMethod: (value, data, node) => {
      var _a;
      if (props.filterNodeMethod)
        return props.filterNodeMethod(value, data, node);
      if (!value)
        return true;
      return (_a = getNodeValByProp("label", data)) == null ? void 0 : _a.includes(value);
    },
    onNodeClick: (data, node, e) => {
      var _a, _b, _c;
      (_a = attrs.onNodeClick) == null ? void 0 : _a.call(attrs, data, node, e);
      if (props.showCheckbox && props.checkOnClickNode)
        return;
      if (!props.showCheckbox && (props.checkStrictly || node.isLeaf)) {
        if (!getNodeValByProp("disabled", data)) {
          const option = (_b = select.value) == null ? void 0 : _b.options.get(getNodeValByProp("value", data));
          (_c = select.value) == null ? void 0 : _c.handleOptionSelect(option);
        }
      } else if (props.expandOnClickNode) {
        e.proxy.handleExpandIconClick();
      }
    },
    onCheck: (data, params) => {
      if (!props.showCheckbox)
        return;
      const dataValue = getNodeValByProp("value", data);
      const uncachedCheckedKeys = params.checkedKeys;
      const cachedKeys = props.multiple ? toValidArray(props.modelValue).filter((item) => item in cacheOptionsMap.value && !tree.value.getNode(item) && !uncachedCheckedKeys.includes(item)) : [];
      const checkedKeys = uncachedCheckedKeys.concat(cachedKeys);
      if (props.checkStrictly) {
        emit(UPDATE_MODEL_EVENT, props.multiple ? checkedKeys : checkedKeys.includes(dataValue) ? dataValue : void 0);
      } else {
        if (props.multiple) {
          emit(UPDATE_MODEL_EVENT, tree.value.getCheckedKeys(true));
        } else {
          const firstLeaf = treeFind([data], (data2) => !isValidArray(getNodeValByProp("children", data2)) && !getNodeValByProp("disabled", data2), (data2) => getNodeValByProp("children", data2));
          const firstLeafKey = firstLeaf ? getNodeValByProp("value", firstLeaf) : void 0;
          const hasCheckedChild = isValidValue(props.modelValue) && !!treeFind([data], (data2) => getNodeValByProp("value", data2) === props.modelValue, (data2) => getNodeValByProp("children", data2));
          emit(UPDATE_MODEL_EVENT, firstLeafKey === props.modelValue || hasCheckedChild ? void 0 : firstLeafKey);
        }
      }
      nextTick(() => {
        var _a;
        const checkedKeys2 = toValidArray(props.modelValue);
        tree.value.setCheckedKeys(checkedKeys2);
        (_a = attrs.onCheck) == null ? void 0 : _a.call(attrs, data, {
          checkedKeys: tree.value.getCheckedKeys(),
          checkedNodes: tree.value.getCheckedNodes(),
          halfCheckedKeys: tree.value.getHalfCheckedKeys(),
          halfCheckedNodes: tree.value.getHalfCheckedNodes()
        });
      });
    },
    cacheOptions
  };
};
var CacheOptions = defineComponent({
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const select = inject(selectKey);
    watch(() => props.data, () => {
      var _a;
      props.data.forEach((item) => {
        if (!select.cachedOptions.has(item.value)) {
          select.cachedOptions.set(item.value, item);
        }
      });
      const inputs = ((_a = select.selectWrapper) == null ? void 0 : _a.querySelectorAll("input")) || [];
      if (!Array.from(inputs).includes(document.activeElement)) {
        select.setSelected();
      }
    }, { flush: "post", immediate: true });
    return () => void 0;
  }
});
const _sfc_main$1 = defineComponent({
  name: "ElTreeSelect",
  inheritAttrs: false,
  props: {
    ...ElSelect.props,
    ..._Tree.props,
    cacheData: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context) {
    const { slots, expose } = context;
    const select = ref();
    const tree = ref();
    const key = computed(() => props.nodeKey || props.valueKey || "value");
    const selectProps = useSelect(props, context, { select, tree, key });
    const { cacheOptions, ...treeProps } = useTree(props, context, {
      select,
      tree,
      key
    });
    const methods = reactive({});
    expose(methods);
    onMounted(() => {
      Object.assign(methods, {
        ...pick(tree.value, [
          "filter",
          "updateKeyChildren",
          "getCheckedNodes",
          "setCheckedNodes",
          "getCheckedKeys",
          "setCheckedKeys",
          "setChecked",
          "getHalfCheckedNodes",
          "getHalfCheckedKeys",
          "getCurrentKey",
          "getCurrentNode",
          "setCurrentKey",
          "setCurrentNode",
          "getNode",
          "remove",
          "append",
          "insertBefore",
          "insertAfter"
        ]),
        ...pick(select.value, ["focus", "blur"])
      });
    });
    return () => h(ElSelect, reactive({
      ...selectProps,
      ref: (ref2) => select.value = ref2
    }), {
      ...slots,
      default: () => [
        h(CacheOptions, { data: cacheOptions.value }),
        h(_Tree, reactive({
          ...treeProps,
          ref: (ref2) => tree.value = ref2
        }))
      ]
    });
  }
});
var TreeSelect = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tree-select/src/tree-select.vue"]]);
TreeSelect.install = (app) => {
  app.component(TreeSelect.name, TreeSelect);
};
const _TreeSelect = TreeSelect;
const ElTreeSelect = _TreeSelect;
function userPage(data) {
  return http.get("/system/user/page", data);
}
function unitList() {
  return http.get("/system/unit/list");
}
function postPage() {
  return http.get("/system/post/page");
}
function rolePage() {
  return http.get("/system/role/page");
}
function userAdd(data) {
  return http.post("/system/user/add", data);
}
function userGet(data) {
  return http.get(`/system/user/get/${data}`);
}
function userUpdate(data) {
  return http.post("/system/user/update", data);
}
function userDelete(data) {
  return http.get(`/system/user/delete/${data}`);
}
const elTreeSelect = "";
const userDialog_vue_vue_type_style_index_0_scoped_36d60d93_lang = "";
const _hoisted_1 = { class: "form-container" };
const _hoisted_2 = { class: "form-row" };
const _hoisted_3 = { class: "dialog-footer" };
const _sfc_main = {
  __name: "userDialog",
  props: {
    show: Boolean,
    updateRow: String
  },
  setup(__props, { emit: __emit }) {
    const props = __props;
    let updateRow = ref(props.updateRow);
    const emit = __emit;
    const show = ref(props.show);
    const userForm = reactive({
      username: "",
      password: "",
      realName: "",
      email: "",
      gender: "1",
      phone: "",
      enabled: "1",
      unitTree: "",
      //所属机构
      postIds: "",
      //所属岗位
      remark: ""
      //备注
    });
    let unitTree = ref([]);
    let postTree = ref([]);
    let roleTree = ref([]);
    const { proxy } = getCurrentInstance();
    onBeforeMount(async () => {
      if (updateRow.value) {
        let res = await userGet(updateRow.value);
        let { id, username, password, realName, email, gender, avatar, remark, phone, enabled, unitId } = res.data.user;
        let { roleIds, postIds } = res.data;
        userForm.id = id;
        userForm.username = username;
        userForm.password = password;
        userForm.realName = realName;
        userForm.email = email;
        userForm.gender = gender;
        userForm.phone = phone;
        userForm.enabled = enabled;
        userForm.remark = remark;
        userForm.unitId = unitId;
        userForm.roleIds = roleIds;
        userForm.postIds = postIds;
      }
      proxy.sendDicts(["system_global_status", "system_global_gender"]);
      let unitData = await unitList();
      unitTree.value = unitData.data;
      let postData = await postPage();
      postTree.value = postData.data.records;
      let roleData = await rolePage();
      roleTree.value = roleData.data.records;
      console.log(roleTree.value);
    });
    const close = () => {
      emit("update:show", false);
    };
    const add = async () => {
      let res = await userAdd(userForm);
      if (res.code == "200")
        ElMessage({ type: "success", message: "修改成功" });
    };
    const update = async () => {
      let res = await userUpdate(userForm);
      if (res.code == "200")
        ElMessage({ type: "success", message: "修改成功" });
    };
    const onSubmit = async () => {
      if (updateRow.value) {
        await update();
      } else {
        await add();
      }
      show.value = false;
      emit("change");
    };
    return (_ctx, _cache) => {
      const _component_el_input = ElInput;
      const _component_el_form_item = ElFormItem;
      const _component_el_option = ElOption;
      const _component_el_select = ElSelect;
      const _component_el_radio = ElRadio;
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_tree_select = ElTreeSelect;
      const _component_el_form = ElForm;
      const _component_el_button = ElButton;
      const _component_el_dialog = ElDialog;
      return openBlock(), createBlock(_component_el_dialog, {
        modelValue: show.value,
        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => show.value = $event),
        onClose: close,
        title: unref(updateRow) ? "修改用户" : "新增用户",
        width: "800px",
        "append-to-body": true,
        "destroy-on-close": true,
        "before-close": close
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createVNode(_component_el_form, {
              ref: "formRef",
              model: userForm,
              "label-width": "90px",
              class: "user-editor-form"
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_2, [
                  createVNode(_component_el_form_item, {
                    label: "用户名",
                    prop: "username",
                    class: "inline"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: userForm.username,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => userForm.username = $event),
                        "show-word-limit": "",
                        placeholder: "请输入用户名"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  !userForm.id ? (openBlock(), createBlock(_component_el_form_item, {
                    key: 0,
                    label: "密码",
                    prop: "password",
                    class: "inline"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: userForm.password,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => userForm.password = $event),
                        "show-word-limit": "",
                        placeholder: "请输入用户密码"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_component_el_form_item, {
                    label: "真实姓名",
                    prop: "realName",
                    class: "inline"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: userForm.realName,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => userForm.realName = $event),
                        placeholder: "请输入真实姓名"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "邮箱",
                    prop: "email",
                    class: "inline"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: userForm.email,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => userForm.email = $event),
                        placeholder: "请输入邮箱"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "性别",
                    prop: "gender",
                    class: "inline"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: userForm.gender,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => userForm.gender = $event),
                        placeholder: "请选择性别"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.dicts.system_global_gender, (item) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: item.v,
                              label: item.k,
                              value: userForm.gender == item.v ? userForm.gender : item.v
                            }, null, 8, ["label", "value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "手机号码",
                    prop: "phone",
                    class: "inline"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: userForm.phone,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => userForm.phone = $event),
                        placeholder: "请输入手机号码"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "启用状态",
                    prop: "enabled",
                    class: "inline"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_radio_group, {
                        modelValue: userForm.enabled,
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => userForm.enabled = $event)
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.dicts.system_global_status, (item) => {
                            return openBlock(), createBlock(_component_el_radio, {
                              key: item.v,
                              label: userForm.enabled == item.v ? userForm.enabled : item.v,
                              value: item.v
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.k), 1)
                              ]),
                              _: 2
                            }, 1032, ["label", "value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "所属机构",
                    prop: "unitId",
                    class: "inline"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_tree_select, {
                        class: "treeList",
                        modelValue: userForm.unitId,
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => userForm.unitId = $event),
                        placeholder: "请选择所属机构",
                        "render-after-expand": false,
                        data: unref(unitTree),
                        props: { label: "name" },
                        "check-strictly": true,
                        "auto-expand-parent": true,
                        "default-expand-all": true,
                        "node-key": "id"
                      }, null, 8, ["modelValue", "data"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "所属岗位",
                    prop: "postIds",
                    class: "inline"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_tree_select, {
                        class: "treeList",
                        modelValue: userForm.postIds,
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => userForm.postIds = $event),
                        placeholder: "请选择所属岗位",
                        "render-after-expand": false,
                        data: unref(postTree),
                        props: { label: "postName" },
                        "auto-expand-parent": true,
                        "default-expand-all": true,
                        "node-key": "id",
                        "show-checkbox": "",
                        multiple: ""
                      }, null, 8, ["modelValue", "data"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "分配角色",
                    prop: "roleIds",
                    class: "inline"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_tree_select, {
                        class: "treeList",
                        modelValue: userForm.roleIds,
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => userForm.roleIds = $event),
                        placeholder: "请选择分配角色",
                        "render-after-expand": false,
                        data: unref(roleTree),
                        props: { label: "roleName" },
                        "auto-expand-parent": true,
                        "default-expand-all": true,
                        "node-key": "id",
                        "show-checkbox": "",
                        multiple: ""
                      }, null, 8, ["modelValue", "data"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "备注",
                    prop: "remark"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: userForm.remark,
                        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => userForm.remark = $event),
                        type: "textarea",
                        placeholder: "请输入用户备注",
                        maxlength: 200,
                        "show-word-limit": ""
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ])
              ]),
              _: 1
            }, 8, ["model"])
          ])
        ]),
        footer: withCtx(() => [
          createBaseVNode("span", _hoisted_3, [
            createVNode(_component_el_button, { onClick: close }, {
              default: withCtx(() => [
                createTextVNode("取消")
              ]),
              _: 1
            }),
            createVNode(_component_el_button, {
              type: "primary",
              onClick: onSubmit
            }, {
              default: withCtx(() => [
                createTextVNode(" 确认 ")
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
};
const userDialog = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__scopeId", "data-v-36d60d93"]]);
const userDialog$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: userDialog
}, Symbol.toStringTag, { value: "Module" }));
export {
  userDialog as a,
  userDelete as b,
  userDialog$1 as c,
  userPage as u
};
