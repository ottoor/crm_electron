import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import { be as resolveDirective, a as openBlock, c as createElementBlock, K as withDirectives, X as createTextVNode, k as createBaseVNode } from "./index-575c9104.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h1", null, "新建XX组件", -1);
function _sfc_render(_ctx, _cache) {
  const _directive_auths = resolveDirective("auths");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    withDirectives((openBlock(), createElementBlock("button", null, [
      createTextVNode("新建")
    ])), [
      [_directive_auths, "system:user:add"]
    ]),
    withDirectives((openBlock(), createElementBlock("button", null, [
      createTextVNode("删除")
    ])), [
      [_directive_auths, "system:user:del"]
    ]),
    withDirectives((openBlock(), createElementBlock("button", null, [
      createTextVNode("修改")
    ])), [
      [_directive_auths, "system:user:update"]
    ])
  ]);
}
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  index as default
};
