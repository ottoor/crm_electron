import { aj as http, r as ref, F as reactive, h as getCurrentInstance, Y as onBeforeMount, a as openBlock, l as createBlock, w as withCtx, f as unref, a0 as createVNode, c as createElementBlock, $ as renderList, M as Fragment, k as createBaseVNode, X as createTextVNode, t as toDisplayString, aT as ElMessage } from "./index-575c9104.js";
import { E as ElDialog, a as ElRadioGroup, b as ElRadio } from "./el-radio-a1020461.js";
import { E as ElButton } from "./el-button-5c456a10.js";
import { a as ElFormItem, E as ElForm } from "./el-form-item-94e096cf.js";
import { E as ElTree } from "./el-tree-94823251.js";
import { E as ElCheckbox } from "./el-checkbox-0e351c79.js";
import { E as ElInput } from "./el-input-bdf12b29.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
function rolePage(data) {
  return http.get("/system/role/page", data, { loading: true });
}
function menuTree() {
  return http.get("/system/menu/tree");
}
function roleAdd(data) {
  return http.post("/system/role/add", data);
}
function roleDel(data) {
  return http.get(`/system/role/delete/${data}`);
}
function roleGet(data) {
  return http.get(`/system/role/get/${data}`);
}
function roleUpdate(data) {
  return http.post("/system/role/update", data);
}
const roleDialog_vue_vue_type_style_index_0_scoped_88ca9603_lang = "";
const _hoisted_1 = { class: "item-menu" };
const _hoisted_2 = { class: "dialog-footer" };
const _sfc_main = {
  __name: "roleDialog",
  props: {
    show: Boolean,
    updateRow: String
  },
  setup(__props, { emit: __emit }) {
    const props = __props;
    let updateRow = ref(props.updateRow);
    const emit = __emit;
    const show = ref(props.show);
    const menuTreeRef = ref(null);
    const form = reactive({
      roleName: "",
      rolePerm: "",
      enabled: "1",
      descript: ""
    });
    let permission = reactive({
      treeList: [],
      treeProps: {
        label: "name"
      },
      linkage: true,
      openAll: false
    });
    const { proxy } = getCurrentInstance();
    onBeforeMount(async () => {
      if (updateRow.value) {
        let roleData = await roleGet(updateRow.value);
        let { id, roleName, rolePerm, enabled, descript } = roleData.data.role;
        form.id = id;
        form.roleName = roleName;
        form.rolePerm = rolePerm;
        form.enabled = enabled;
        form.descript = descript;
        menuTreeRef.value.setCheckedKeys(roleData.data.permissions);
      }
      proxy.sendDicts(["system_global_status"]);
      let res = await menuTree();
      permission.treeList = res.data;
    });
    const close = () => {
      emit("update:show", false);
    };
    const toggleTreeCollapse = (e) => {
      let nodeMap = menuTreeRef.value.store.nodesMap;
      Object.keys(nodeMap).forEach((key) => {
        nodeMap[key].expanded = e;
      });
    };
    const toggleTreeChecked = (e) => {
      let nodeMap = menuTreeRef.value.store.nodesMap;
      Object.keys(nodeMap).forEach((key) => {
        nodeMap[key].checked = e;
      });
    };
    const add = async () => {
      let res = await roleAdd({
        permissionIds: menuTreeRef.value.getCheckedKeys(),
        ...form
      });
      if (res.code == "200")
        ElMessage({ type: "success", message: "新增成功" });
    };
    const update = async () => {
      let res = await roleUpdate({
        permissionIds: menuTreeRef.value.getCheckedKeys(),
        ...form
      });
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
      const _component_el_radio = ElRadio;
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_checkbox = ElCheckbox;
      const _component_el_tree = ElTree;
      const _component_el_form = ElForm;
      const _component_el_button = ElButton;
      const _component_el_dialog = ElDialog;
      return openBlock(), createBlock(_component_el_dialog, {
        modelValue: show.value,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => show.value = $event),
        onClose: close,
        title: unref(updateRow) ? "修改角色" : "新增角色",
        width: "600px",
        "append-to-body": true,
        "destroy-on-close": true,
        "before-close": close
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form, {
            ref: "formRef",
            "label-width": "80px",
            model: form
          }, {
            default: withCtx(() => [
              createVNode(_component_el_form_item, {
                label: "角色名称",
                prop: "roleName"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    placeholder: "请输入角色名称",
                    modelValue: form.roleName,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.roleName = $event)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "权限字符",
                prop: "rolePerm"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    placeholder: "请输入权限字符",
                    modelValue: form.rolePerm,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.rolePerm = $event)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "状态",
                prop: "enabled"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_radio_group, {
                    modelValue: form.enabled,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.enabled = $event)
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.dicts.system_global_status, (item) => {
                        return openBlock(), createBlock(_component_el_radio, {
                          key: item.v,
                          label: form.enabled == item.v ? form.enabled : item.v
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.k), 1)
                          ]),
                          _: 2
                        }, 1032, ["label"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, { label: "菜单权限" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1, [
                    createVNode(_component_el_checkbox, {
                      modelValue: unref(permission).openAll,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(permission).openAll = $event),
                      onChange: toggleTreeCollapse
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 展开/折叠 ")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    createVNode(_component_el_checkbox, {
                      modelValue: unref(permission).selectAll,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref(permission).selectAll = $event),
                      onChange: toggleTreeChecked
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 全选/全不选 ")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    createVNode(_component_el_checkbox, {
                      modelValue: unref(permission).linkage,
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => unref(permission).linkage = $event)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 父子(联动/不联动) ")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    createVNode(_component_el_tree, {
                      ref_key: "menuTreeRef",
                      ref: menuTreeRef,
                      data: unref(permission).treeList,
                      props: unref(permission).treeProps,
                      "check-strictly": !unref(permission).linkage,
                      "default-expand-all": unref(permission).openAll,
                      "show-checkbox": "",
                      "node-key": "id",
                      class: "tree"
                    }, null, 8, ["data", "props", "check-strictly", "default-expand-all"])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "备注",
                prop: "descript"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    type: "textarea",
                    placeholder: "请输入内容",
                    modelValue: form.descript,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => form.descript = $event),
                    maxlength: 200,
                    "show-word-limit": ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        footer: withCtx(() => [
          createBaseVNode("span", _hoisted_2, [
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
const roleDialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-88ca9603"]]);
const roleDialog$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: roleDialog
}, Symbol.toStringTag, { value: "Module" }));
export {
  roleDialog as a,
  roleDel as b,
  roleDialog$1 as c,
  rolePage as r
};
