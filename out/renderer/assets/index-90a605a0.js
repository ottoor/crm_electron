import { aj as http, d as defineComponent, h as getCurrentInstance, F as reactive, Y as onBeforeMount, a as openBlock, l as createBlock, w as withCtx, a0 as createVNode, f as unref, c as createElementBlock, $ as renderList, M as Fragment, X as createTextVNode, aT as ElMessage } from "./index-575c9104.js";
import { E as ElContainer, b as ElHeader, a as ElMain, d as ElFooter } from "./el-main-67cab1c2.js";
import { a as ElFormItem, E as ElForm } from "./el-form-item-94e096cf.js";
import { E as ElButton } from "./el-button-5c456a10.js";
import { E as ElInput } from "./el-input-bdf12b29.js";
import "./el-tag-adbebd4f.js";
import { E as ElSelect, a as ElOption } from "./el-select-8f71d2c9.js";
import "./el-scrollbar-20c86168.js";
import { _ as _sfc_main$1 } from "./pagination-749f6997.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import "./index-0b8d8a8b.js";
import "./_baseClone-3f8b9b37.js";
import "./_initCloneObject-9695a491.js";
import "./event-28e3832c.js";
import "./isEqual-75679068.js";
import "./hasIn-13300d7d.js";
import "./strings-1a3193eb.js";
import "./scroll-f89ecc33.js";
import "./debounce-c9ded561.js";
import "./focus-trap-64f23100.js";
function subjectExport() {
  return http.get("/crm/teach/subject/export");
}
const __default__ = defineComponent({
  name: "科目管理"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  setup(__props) {
    const { proxy } = getCurrentInstance();
    let form = reactive({
      name: "",
      enabled: "1"
    });
    onBeforeMount(async () => {
      proxy.sendDicts(["system_global_status"]);
    });
    const exBtn = async () => {
      let res = await subjectExport();
      if (res.code == "200")
        ElMessage({ type: "success", message: res.data });
    };
    const pages = reactive({
      current: 1,
      size: 10,
      total: 100
    });
    const handleSizeChange = async (val) => {
      pages.size = val;
    };
    const handleCurrentChange = async (val) => {
      pages.current = val;
    };
    return (_ctx, _cache) => {
      const _component_el_input = ElInput;
      const _component_el_form_item = ElFormItem;
      const _component_el_option = ElOption;
      const _component_el_select = ElSelect;
      const _component_el_button = ElButton;
      const _component_el_form = ElForm;
      const _component_el_header = ElHeader;
      const _component_el_main = ElMain;
      const _component_el_footer = ElFooter;
      const _component_el_container = ElContainer;
      return openBlock(), createBlock(_component_el_container, null, {
        default: withCtx(() => [
          createVNode(_component_el_header, { height: "auto" }, {
            default: withCtx(() => [
              createVNode(_component_el_form, {
                class: "role-top",
                model: unref(form),
                inline: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "科目名称",
                    prop: "name"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        placeholder: "请输入科目名称",
                        modelValue: unref(form).name,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(form).name = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "科目状态" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: unref(form).enabled,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(form).enabled = $event)
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
                  createVNode(_component_el_form_item, null, {
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
                icon: "plus"
              }, {
                default: withCtx(() => [
                  createTextVNode("添加科目")
                ]),
                _: 1
              }),
              createVNode(_component_el_button, {
                type: "primary",
                icon: "delete",
                onClick: exBtn
              }, {
                default: withCtx(() => [
                  createTextVNode("导出")
                ]),
                _: 1
              })
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
          })
        ]),
        _: 1
      });
    };
  }
});
const index_vue_vue_type_style_index_0_scoped_93ee465c_lang = "";
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-93ee465c"]]);
export {
  index as default
};
