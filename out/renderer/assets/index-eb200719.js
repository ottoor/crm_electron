import { b as buildProps, i as iconPropType, d as defineComponent, u as useNamespace, B as computed, a as openBlock, c as createElementBlock, l as createBlock, w as withCtx, m as resolveDynamicComponent, f as unref, E as ElIcon, Z as createCommentVNode, n as normalizeClass, e as renderSlot, _ as _export_sfc, q as withInstall, F as reactive, r as ref, h as getCurrentInstance, Y as onBeforeMount, a0 as createVNode, X as createTextVNode, M as Fragment, $ as renderList, k as createBaseVNode, aT as ElMessage, t as toDisplayString } from "./index-575c9104.js";
import { E as ElContainer, b as ElHeader, a as ElMain, d as ElFooter } from "./el-main-67cab1c2.js";
import { E as ElTableColumn, a as ElTable } from "./el-table-column-10e6d41a.js";
import "./el-checkbox-0e351c79.js";
import "./el-tooltip-9958ff85.js";
import "./el-scrollbar-20c86168.js";
import { E as ElTag } from "./el-tag-adbebd4f.js";
import { E as ElButton } from "./el-button-5c456a10.js";
import { u as userPage, a as userDialog, b as userDelete } from "./userDialog-53917148.js";
import { _ as _sfc_main$2 } from "./pagination-749f6997.js";
import { _ as _export_sfc$1 } from "./_plugin-vue_export-helper-cc2b3d55.js";
import "./index-0b8d8a8b.js";
import "./_initCloneObject-9695a491.js";
import "./hasIn-13300d7d.js";
import "./debounce-c9ded561.js";
import "./event-28e3832c.js";
import "./isEqual-75679068.js";
import "./focus-trap-64f23100.js";
import "./el-radio-a1020461.js";
import "./vnode-d371cc4c.js";
import "./refs-68c331ed.js";
import "./scroll-f89ecc33.js";
import "./el-form-item-94e096cf.js";
import "./_baseClone-3f8b9b37.js";
import "./el-input-bdf12b29.js";
import "./el-select-8f71d2c9.js";
import "./strings-1a3193eb.js";
import "./el-tree-94823251.js";
import "./index-02f7aa6a.js";
const linkProps = buildProps({
  type: {
    type: String,
    values: ["primary", "success", "warning", "info", "danger", "default"],
    default: "default"
  },
  underline: {
    type: Boolean,
    default: true
  },
  disabled: { type: Boolean, default: false },
  href: { type: String, default: "" },
  icon: {
    type: iconPropType
  }
});
const linkEmits = {
  click: (evt) => evt instanceof MouseEvent
};
const _hoisted_1$1 = ["href"];
const __default__$1 = defineComponent({
  name: "ElLink"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: linkProps,
  emits: linkEmits,
  setup(__props, { emit }) {
    const props = __props;
    const ns = useNamespace("link");
    const linkKls = computed(() => [
      ns.b(),
      ns.m(props.type),
      ns.is("disabled", props.disabled),
      ns.is("underline", props.underline && !props.disabled)
    ]);
    function handleClick(event) {
      if (!props.disabled)
        emit("click", event);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("a", {
        class: normalizeClass(unref(linkKls)),
        href: _ctx.disabled || !_ctx.href ? void 0 : _ctx.href,
        onClick: handleClick
      }, [
        _ctx.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))
          ]),
          _: 1
        })) : createCommentVNode("v-if", true),
        _ctx.$slots.default ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: normalizeClass(unref(ns).e("inner"))
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2)) : createCommentVNode("v-if", true),
        _ctx.$slots.icon ? renderSlot(_ctx.$slots, "icon", { key: 2 }) : createCommentVNode("v-if", true)
      ], 10, _hoisted_1$1);
    };
  }
});
var Link = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/link/src/link.vue"]]);
const ElLink = withInstall(Link);
const elLink = "";
const index_vue_vue_type_style_index_0_scoped_99ec6d0f_lang = "";
const _hoisted_1 = { class: "common-layout" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { key: 1 };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { class: "sys-table-main-actions" };
const __default__ = defineComponent({
  name: "用户管理"
});
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    const pages = reactive({
      current: 1,
      size: 10,
      total: 100
    });
    const handleSizeChange = async (val) => {
      pages.size = val;
      await getUserData();
    };
    const handleCurrentChange = async (val) => {
      pages.current = val;
      await getUserData();
    };
    const userList = ref([]);
    const userDiaglog = reactive({
      show: false
    });
    let { proxy } = getCurrentInstance();
    onBeforeMount(() => {
      proxy.sendDicts(["system_global_gender", "system_global_status"]);
      getUserData();
    });
    const getUserData = async () => {
      let res = await userPage({
        current: pages.current,
        size: pages.size
      });
      pages.total = res.data.total;
      userList.value = res.data.records;
    };
    let updateRow = ref("");
    const addorupdate = (row) => {
      if (row) {
        updateRow.value = row.id;
      }
      userDiaglog.show = true;
    };
    const del = async (row) => {
      let res = await userDelete(row.id);
      if (res.code == "200") {
        getUserData();
        return ElMessage({ type: "success", message: "修改成功" });
      }
    };
    const multipleSelection = ref([]);
    const handleSelectionChange = (val) => {
      multipleSelection.value = val;
    };
    const delAll = () => {
      Promise.all(multipleSelection.value.map((item) => userDelete(item.id))).then(async (res) => {
        await getUserData();
      });
    };
    return (_ctx, _cache) => {
      const _component_el_header = ElHeader;
      const _component_el_button = ElButton;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_link = ElLink;
      const _component_el_table = ElTable;
      const _component_el_main = ElMain;
      const _component_el_footer = ElFooter;
      const _component_el_container = ElContainer;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_el_container, null, {
          default: withCtx(() => [
            createVNode(_component_el_container, null, {
              default: withCtx(() => [
                createVNode(_component_el_header, {
                  class: "no-flex",
                  height: "auto"
                }),
                createVNode(_component_el_main, { class: "nopadding" }, {
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
                      data: userList.value,
                      height: "auto",
                      border: "",
                      paginationLayout: "total, prev, pager, next",
                      onSelectionChange: handleSelectionChange
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_table_column, {
                          align: "center",
                          type: "selection"
                        }),
                        createVNode(_component_el_table_column, {
                          label: "用户姓名",
                          prop: "username",
                          align: "center"
                        }),
                        createVNode(_component_el_table_column, {
                          label: "真实姓名",
                          prop: "realName",
                          align: "center"
                        }),
                        createVNode(_component_el_table_column, {
                          label: "用户类型",
                          prop: "userType",
                          width: "100px"
                        }, {
                          default: withCtx(({ row }) => [
                            row.userType == 0 ? (openBlock(), createElementBlock("div", _hoisted_2, "普通账号")) : createCommentVNode("", true),
                            row.userType == 1 ? (openBlock(), createElementBlock("div", _hoisted_3, "超级管理员")) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_table_column, {
                          label: "手机号码",
                          prop: "phone",
                          width: "150"
                        }),
                        createVNode(_component_el_table_column, {
                          label: "用户性别",
                          prop: "gender",
                          align: "center"
                        }, {
                          default: withCtx(({ row }) => [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.dicts.system_global_gender, (item) => {
                              return openBlock(), createElementBlock(Fragment, null, [
                                row.gender == item.v ? (openBlock(), createElementBlock("div", _hoisted_4, toDisplayString(item.k), 1)) : createCommentVNode("", true)
                              ], 64);
                            }), 256))
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_table_column, {
                          label: "账号状态",
                          prop: "enabled",
                          align: "center"
                        }, {
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
                          label: "操作",
                          align: "center",
                          width: "180",
                          fixed: "right"
                        }, {
                          default: withCtx(({ row }) => [
                            createBaseVNode("div", _hoisted_5, [
                              !row.userType == 1 ? (openBlock(), createBlock(_component_el_link, {
                                key: 0,
                                icon: "el-icon-edit",
                                type: "primary",
                                underline: false,
                                onClick: ($event) => addorupdate(row)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 修改")
                                ]),
                                _: 2
                              }, 1032, ["onClick"])) : createCommentVNode("", true),
                              !row.userType == 1 ? (openBlock(), createBlock(_component_el_link, {
                                key: 1,
                                icon: "el-icon-delete",
                                style: { "margin-left": "10px" },
                                type: "danger",
                                underline: false,
                                onClick: ($event) => del(row)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("删除")
                                ]),
                                _: 2
                              }, 1032, ["onClick"])) : createCommentVNode("", true)
                            ])
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
                    createVNode(_sfc_main$2, {
                      pages,
                      onChangeSize: handleSizeChange,
                      onChangeCurrent: handleCurrentChange
                    }, null, 8, ["pages"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        userDiaglog.show ? (openBlock(), createBlock(userDialog, {
          key: 0,
          show: userDiaglog.show,
          "onUpdate:show": _cache[0] || (_cache[0] = ($event) => userDiaglog.show = $event),
          onChange: getUserData,
          updateRow: unref(updateRow)
        }, null, 8, ["show", "updateRow"])) : createCommentVNode("", true)
      ]);
    };
  }
});
const index = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__scopeId", "data-v-99ec6d0f"]]);
export {
  index as default
};
