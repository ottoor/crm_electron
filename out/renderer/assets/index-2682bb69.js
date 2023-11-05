import { d as defineComponent, F as reactive, r as ref, h as getCurrentInstance, Y as onBeforeMount, a as openBlock, l as createBlock, w as withCtx, a0 as createVNode, c as createElementBlock, $ as renderList, M as Fragment, X as createTextVNode, f as unref, Z as createCommentVNode, aT as ElMessage, t as toDisplayString } from "./index-575c9104.js";
import { E as ElContainer, b as ElHeader, a as ElMain, d as ElFooter } from "./el-main-67cab1c2.js";
import { E as ElTableColumn, a as ElTable } from "./el-table-column-10e6d41a.js";
import "./el-checkbox-0e351c79.js";
import "./el-tooltip-9958ff85.js";
import "./el-scrollbar-20c86168.js";
import { E as ElTag } from "./el-tag-adbebd4f.js";
import { a as ElFormItem, E as ElForm } from "./el-form-item-94e096cf.js";
import { E as ElButton } from "./el-button-5c456a10.js";
import { E as ElInput } from "./el-input-bdf12b29.js";
import { E as ElSelect, a as ElOption } from "./el-select-8f71d2c9.js";
import { u as utils } from "./index-e0e58765.js";
import { r as rolePage, a as roleDialog, b as roleDel } from "./roleDialog-e805edb1.js";
import { _ as _sfc_main$1 } from "./pagination-749f6997.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import "./index-0b8d8a8b.js";
import "./_initCloneObject-9695a491.js";
import "./hasIn-13300d7d.js";
import "./debounce-c9ded561.js";
import "./event-28e3832c.js";
import "./isEqual-75679068.js";
import "./focus-trap-64f23100.js";
import "./_baseClone-3f8b9b37.js";
import "./strings-1a3193eb.js";
import "./scroll-f89ecc33.js";
import "./index.browser-f9f2e8e5.js";
import "./_commonjs-dynamic-modules-58f2b0ec.js";
import "./el-radio-a1020461.js";
import "./vnode-d371cc4c.js";
import "./refs-68c331ed.js";
import "./el-tree-94823251.js";
import "./index-02f7aa6a.js";
const __default__ = defineComponent({
  name: "角色管理"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  setup(__props) {
    const pages = reactive({
      current: 1,
      size: 10,
      total: 100
    });
    const handleSizeChange = async (val) => {
      pages.size = val;
      await getTableData();
    };
    const handleCurrentChange = async (val) => {
      pages.current = val;
      await getTableData();
    };
    const form = reactive({
      name: "",
      perm: "",
      enabled: ""
    });
    let tableData = ref([]);
    const { proxy } = getCurrentInstance();
    onBeforeMount(async () => {
      proxy.sendDicts(["system_global_status"]);
      await getTableData();
    });
    const getTableData = async (val) => {
      let res = await rolePage({
        current: pages.current,
        size: pages.size,
        ...val
      });
      tableData.value = res.data.records;
      pages.total = res.data.total;
      tableData.value.forEach((item) => {
        item.createTime = utils.getTime(item.createTime, "yyyy-MM-dd hh:mm");
      });
    };
    const roleDiaglog = reactive({
      show: false
    });
    let updateRow = ref("");
    const addorupdate = (row) => {
      if (row) {
        updateRow.value = row.id;
      }
      if (roleDiaglog.show)
        return;
      roleDiaglog.show = true;
    };
    const del = async (row) => {
      let res = await roleDel(row.id);
      if (res.code != 200) {
        return ElMessage.error({
          message: res.msg
        });
      }
      await getTableData();
      ElMessage.success({
        message: res.msg
      });
    };
    const multipleSelection = ref([]);
    const handleSelectionChange = (val) => {
      multipleSelection.value = val;
    };
    const delAll = () => {
      Promise.all(multipleSelection.value.map((item) => roleDel(item.id))).then(async (res) => {
        await getTableData();
      });
    };
    return (_ctx, _cache) => {
      const _component_el_input = ElInput;
      const _component_el_form_item = ElFormItem;
      const _component_el_option = ElOption;
      const _component_el_select = ElSelect;
      const _component_el_button = ElButton;
      const _component_el_form = ElForm;
      const _component_el_header = ElHeader;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_table = ElTable;
      const _component_el_main = ElMain;
      const _component_el_footer = ElFooter;
      const _component_el_container = ElContainer;
      return openBlock(), createBlock(_component_el_container, null, {
        default: withCtx(() => [
          createVNode(_component_el_header, { height: "auto" }, {
            default: withCtx(() => [
              createVNode(_component_el_form, {
                class: "role-top",
                model: form,
                inline: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "角色名称",
                    prop: "name"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        placeholder: "请输入角色名称",
                        modelValue: form.name,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.name = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "角色编码",
                    prop: "perm"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        placeholder: "请输入角色编码",
                        modelValue: form.perm,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.perm = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "状态" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: form.enabled,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.enabled = $event)
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.dicts.system_global_status, (item) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: item.v,
                              label: item.k,
                              value: item.v
                            }, null, 8, ["label", "value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { style: { "display": "block" } }, {
                    default: withCtx(() => [
                      createVNode(_component_el_button, { icon: "search" }, {
                        default: withCtx(() => [
                          createTextVNode("搜索")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_button, { icon: "refresh" }, {
                        default: withCtx(() => [
                          createTextVNode("重置")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])
            ]),
            _: 1
          }),
          createVNode(_component_el_main, null, {
            default: withCtx(() => [
              createVNode(_component_el_button, {
                type: "primary",
                icon: "plus",
                onClick: addorupdate
              }, {
                default: withCtx(() => [
                  createTextVNode("新增")
                ]),
                _: 1
              }),
              createVNode(_component_el_button, {
                type: "primary",
                icon: "delete",
                onClick: delAll
              }, {
                default: withCtx(() => [
                  createTextVNode("删除")
                ]),
                _: 1
              }),
              createVNode(_component_el_table, {
                data: unref(tableData),
                style: { "width": "100%" },
                onSelectionChange: handleSelectionChange
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    type: "selection",
                    width: "55"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "roleName",
                    label: "角色名称",
                    width: "180"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "rolePerm",
                    label: "权限编码",
                    width: "180"
                  }),
                  createVNode(_component_el_table_column, { label: "是否启用" }, {
                    default: withCtx(({ row }) => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.dicts.system_global_status, (item) => {
                        return openBlock(), createElementBlock(Fragment, null, [
                          row.enabled == item.v ? (openBlock(), createBlock(_component_el_tag, { key: 0 }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.k), 1)
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true)
                        ], 64);
                      }), 256))
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "createTime",
                    label: "创建时间"
                  }),
                  createVNode(_component_el_table_column, {
                    fixed: "right",
                    label: "操作"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_button, {
                        link: "",
                        type: "primary",
                        size: "small",
                        onClick: ($event) => del(row)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("删除")
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      createVNode(_component_el_button, {
                        link: "",
                        type: "primary",
                        size: "small",
                        onClick: ($event) => addorupdate(row)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("修改")
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["data"])
            ]),
            _: 1
          }),
          createVNode(_component_el_footer, { style: { "display": "flex", "justify-content": "flex-end" } }, {
            default: withCtx(() => [
              createVNode(_sfc_main$1, {
                pages,
                onChangeSize: handleSizeChange,
                onChangeCurrent: handleCurrentChange
              }, null, 8, ["pages"])
            ]),
            _: 1
          }),
          roleDiaglog.show ? (openBlock(), createBlock(roleDialog, {
            key: 0,
            show: roleDiaglog.show,
            "onUpdate:show": _cache[3] || (_cache[3] = ($event) => roleDiaglog.show = $event),
            onChange: getTableData,
            updateRow: unref(updateRow)
          }, null, 8, ["show", "updateRow"])) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
});
const index_vue_vue_type_style_index_0_scoped_78fae7e3_lang = "";
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-78fae7e3"]]);
export {
  index as default
};
