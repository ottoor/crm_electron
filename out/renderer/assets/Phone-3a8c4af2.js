import { F as reactive, r as ref, a as openBlock, l as createBlock, w as withCtx, ap as withKeys, a0 as createVNode, X as createTextVNode, k as createBaseVNode, c as createElementBlock, t as toDisplayString, f as unref, Z as createCommentVNode, aS as sendCaptcha, aT as ElMessage, aU as loginByMobile } from "./index-575c9104.js";
import { E as ElForm, a as ElFormItem } from "./el-form-item-94e096cf.js";
import { E as ElButton } from "./el-button-5c456a10.js";
import { E as ElInput } from "./el-input-bdf12b29.js";
import { E as Encrypt, u as useLogin } from "./useLogin-51b7b3c2.js";
import "./index-0b8d8a8b.js";
import "./_baseClone-3f8b9b37.js";
import "./_initCloneObject-9695a491.js";
import "./event-28e3832c.js";
import "./_commonjs-dynamic-modules-58f2b0ec.js";
const _hoisted_1 = { class: "login-msg-yzm" };
const _hoisted_2 = { key: 0 };
const _sfc_main = {
  __name: "Phone",
  setup(__props) {
    const form = reactive({
      mobile: "",
      captcha: ""
    });
    const rules = reactive({});
    const disabled = ref(false);
    let time = ref(10);
    const getCode = async () => {
      let res = await sendCaptcha({ mobile: Encrypt(form.mobile) });
      if (res.code != "200") {
        return ElMessage({
          message: "发送失败，请检查网络...",
          type: "error"
        });
      }
      ElMessage({
        message: "发送中...",
        type: "success"
      });
      disabled.value = true;
      time.value = 10;
      let t = setInterval(() => {
        time.value -= 1;
        if (time.value < 1) {
          clearInterval(t);
          disabled.value = false;
          time.value = 0;
        }
      }, 1e3);
    };
    const login = async () => {
      let res = await loginByMobile({
        mobile: Encrypt(form.mobile),
        captcha: Encrypt(form.captcha)
      });
      if (res.code == "200") {
        useLogin(res.data);
      }
    };
    return (_ctx, _cache) => {
      const _component_el_input = ElInput;
      const _component_el_form_item = ElFormItem;
      const _component_el_button = ElButton;
      const _component_el_form = ElForm;
      return openBlock(), createBlock(_component_el_form, {
        ref: "loginForm",
        model: form,
        rules,
        "label-width": "0",
        size: "large",
        onKeyup: withKeys(login, ["enter"])
      }, {
        default: withCtx(() => [
          createVNode(_component_el_form_item, { prop: "mobile" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: form.mobile,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.mobile = $event),
                "prefix-icon": "iphone",
                placeholder: "请输入手机号"
              }, {
                prepend: withCtx(() => [
                  createTextVNode("+86")
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, {
            prop: "captcha",
            style: { "margin-bottom": "35px" }
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createVNode(_component_el_input, {
                  modelValue: form.captcha,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.captcha = $event),
                  "prefix-icon": "unlock",
                  placeholder: "验证码"
                }, null, 8, ["modelValue"]),
                createVNode(_component_el_button, {
                  onClick: getCode,
                  disabled: disabled.value
                }, {
                  default: withCtx(() => [
                    createTextVNode("请输入验证码"),
                    disabled.value ? (openBlock(), createElementBlock("span", _hoisted_2, " (" + toDisplayString(unref(time)) + ")", 1)) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, null, {
            default: withCtx(() => [
              createVNode(_component_el_button, {
                type: "primary",
                style: { "width": "100%" },
                loading: _ctx.islogin,
                round: "",
                onClick: login
              }, {
                default: withCtx(() => [
                  createTextVNode(" 登录 ")
                ]),
                _: 1
              }, 8, ["loading"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model", "rules", "onKeyup"]);
    };
  }
};
export {
  _sfc_main as default
};
