import { b as buildProps, ak as componentSizes, al as isNumber, i as iconPropType, g as definePropType, d as defineComponent, u as useNamespace, r as ref, B as computed, J as isString, ag as addUnit, G as watch, a as openBlock, c as createElementBlock, aa as normalizeStyle, f as unref, l as createBlock, w as withCtx, m as resolveDynamicComponent, E as ElIcon, e as renderSlot, n as normalizeClass, _ as _export_sfc, q as withInstall, X as createTextVNode, t as toDisplayString, Z as createCommentVNode, k as createBaseVNode, am as isUndefined, aj as http, a6 as storeToRefs, an as useUserStore, F as reactive, Y as onBeforeMount, a0 as createVNode, $ as renderList, M as Fragment, ao as isRef, ap as withKeys, aq as close_default, ar as user_default, as as iphone_default, at as message_default, a8 as pushScopeId, a9 as popScopeId } from "./index-575c9104.js";
import { E as ElContainer, b as ElHeader, c as ElAside, a as ElMain } from "./el-main-67cab1c2.js";
import { u as useFormSize, E as ElButton } from "./el-button-5c456a10.js";
import { E as ElInput } from "./el-input-bdf12b29.js";
import { a as ElTabPane, E as ElTabs } from "./el-tab-pane-f79820ea.js";
import { E as ElTree } from "./el-tree-94823251.js";
import "./el-checkbox-0e351c79.js";
/* empty css                  */import { n as nanoid } from "./index.browser-f9f2e8e5.js";
import { _ as _export_sfc$1 } from "./_plugin-vue_export-helper-cc2b3d55.js";
import "./index-0b8d8a8b.js";
import "./event-28e3832c.js";
import "./strings-1a3193eb.js";
import "./vnode-d371cc4c.js";
import "./index-02f7aa6a.js";
import "./isEqual-75679068.js";
import "./hasIn-13300d7d.js";
const avatarProps = buildProps({
  size: {
    type: [Number, String],
    values: componentSizes,
    default: "",
    validator: (val) => isNumber(val)
  },
  shape: {
    type: String,
    values: ["circle", "square"],
    default: "circle"
  },
  icon: {
    type: iconPropType
  },
  src: {
    type: String,
    default: ""
  },
  alt: String,
  srcSet: String,
  fit: {
    type: definePropType(String),
    default: "cover"
  }
});
const avatarEmits = {
  error: (evt) => evt instanceof Event
};
const _hoisted_1$1 = ["src", "alt", "srcset"];
const __default__$2 = defineComponent({
  name: "ElAvatar"
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...__default__$2,
  props: avatarProps,
  emits: avatarEmits,
  setup(__props, { emit }) {
    const props = __props;
    const ns = useNamespace("avatar");
    const hasLoadError = ref(false);
    const avatarClass = computed(() => {
      const { size, icon, shape } = props;
      const classList = [ns.b()];
      if (isString(size))
        classList.push(ns.m(size));
      if (icon)
        classList.push(ns.m("icon"));
      if (shape)
        classList.push(ns.m(shape));
      return classList;
    });
    const sizeStyle = computed(() => {
      const { size } = props;
      return isNumber(size) ? ns.cssVarBlock({
        size: addUnit(size) || ""
      }) : void 0;
    });
    const fitStyle = computed(() => ({
      objectFit: props.fit
    }));
    watch(() => props.src, () => hasLoadError.value = false);
    function handleError(e) {
      hasLoadError.value = true;
      emit("error", e);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(unref(avatarClass)),
        style: normalizeStyle(unref(sizeStyle))
      }, [
        (_ctx.src || _ctx.srcSet) && !hasLoadError.value ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: _ctx.src,
          alt: _ctx.alt,
          srcset: _ctx.srcSet,
          style: normalizeStyle(unref(fitStyle)),
          onError: handleError
        }, null, 44, _hoisted_1$1)) : _ctx.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))
          ]),
          _: 1
        })) : renderSlot(_ctx.$slots, "default", { key: 2 })
      ], 6);
    };
  }
});
var Avatar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/avatar/src/avatar.vue"]]);
const ElAvatar = withInstall(Avatar);
const cardProps = buildProps({
  header: {
    type: String,
    default: ""
  },
  bodyStyle: {
    type: definePropType([String, Object, Array]),
    default: ""
  },
  bodyClass: String,
  shadow: {
    type: String,
    values: ["always", "hover", "never"],
    default: "always"
  }
});
const __default__$1 = defineComponent({
  name: "ElCard"
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: cardProps,
  setup(__props) {
    const ns = useNamespace("card");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([unref(ns).b(), unref(ns).is(`${_ctx.shadow}-shadow`)])
      }, [
        _ctx.$slots.header || _ctx.header ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(ns).e("header"))
        }, [
          renderSlot(_ctx.$slots, "header", {}, () => [
            createTextVNode(toDisplayString(_ctx.header), 1)
          ])
        ], 2)) : createCommentVNode("v-if", true),
        createBaseVNode("div", {
          class: normalizeClass([unref(ns).e("body"), _ctx.bodyClass]),
          style: normalizeStyle(_ctx.bodyStyle)
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 6)
      ], 2);
    };
  }
});
var Card = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/card/src/card.vue"]]);
const ElCard = withInstall(Card);
const textProps = buildProps({
  type: {
    type: String,
    values: ["primary", "success", "info", "warning", "danger", ""],
    default: ""
  },
  size: {
    type: String,
    values: componentSizes,
    default: ""
  },
  truncated: {
    type: Boolean
  },
  lineClamp: {
    type: [String, Number]
  },
  tag: {
    type: String,
    default: "span"
  }
});
const __default__ = defineComponent({
  name: "ElText"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: textProps,
  setup(__props) {
    const props = __props;
    const textSize = useFormSize();
    const ns = useNamespace("text");
    const textKls = computed(() => [
      ns.b(),
      ns.m(props.type),
      ns.m(textSize.value),
      ns.is("truncated", props.truncated),
      ns.is("line-clamp", !isUndefined(props.lineClamp))
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        class: normalizeClass(unref(textKls)),
        style: normalizeStyle({ "-webkit-line-clamp": _ctx.lineClamp })
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class", "style"]);
    };
  }
});
var Text = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/text/src/text.vue"]]);
const ElText = withInstall(Text);
const elCard = "";
const elText = "";
const elAvatar = "";
function chatContacts(data) {
  return http.get("/crm/chat/contacts", data, {});
}
function chatSessions(data) {
  return http.get("/crm/chat/sessions", data, {});
}
function chatSession(fromUserId, toUserId) {
  return http.get(`/crm/chat/session/${fromUserId}/${toUserId}`);
}
function chatHistory(data) {
  return http.get("/crm/chat/history", data);
}
const chat_vue_vue_type_style_index_0_scoped_98361a7e_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-98361a7e"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "title" }, "聊天窗口", -1));
const _hoisted_2 = { key: 0 };
const _hoisted_3 = {
  key: 1,
  class: "contacts-user-item"
};
const _hoisted_4 = { class: "session-list" };
const _hoisted_5 = ["onClick", "id"];
const _hoisted_6 = { class: "info" };
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h4", null, "系统消息", -1));
const _hoisted_8 = { class: "info-text" };
const _hoisted_9 = { class: "info" };
const _hoisted_10 = { class: "info-text" };
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", null, "[1]", -1));
const _hoisted_12 = ["onClick"];
const _hoisted_13 = { key: 0 };
const _hoisted_14 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h3", { style: { "text-align": "center" } }, "暂无聊天会话", -1));
const _hoisted_15 = [
  _hoisted_14
];
const _hoisted_16 = { id: "app" };
const _hoisted_17 = { class: "chat-room" };
const _hoisted_18 = {
  key: 0,
  class: "chat-header"
};
const _hoisted_19 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h3", null, "系统消息", -1));
const _hoisted_20 = {
  key: 1,
  class: "chat-header"
};
const _hoisted_21 = { class: "chat-message" };
const _hoisted_22 = { class: "chat-message-ul" };
const _hoisted_23 = ["id"];
const _hoisted_24 = { class: "chat-footer" };
const _hoisted_25 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h3", { style: { "text-align": "center", "margin-top": "20px" } }, "请选择一个联系人来开始聊天", -1));
const _hoisted_26 = { style: { "display": "flex", "flex-direction": "column", "align-items": "center", "margin-top": "20px" } };
const _hoisted_27 = { style: { "margin-top": "10px" } };
const _hoisted_28 = { style: { "margin-top": "5px" } };
const _hoisted_29 = { style: { "margin": "20px" } };
const _hoisted_30 = { class: "textUser" };
const _hoisted_31 = { class: "textUser" };
const _hoisted_32 = { class: "textUser" };
const _sfc_main = {
  __name: "chat",
  setup(__props) {
    const { userInfo } = storeToRefs(useUserStore());
    let token = localStorage.getItem("TOKEN");
    let websocket = reactive(null);
    let currentSession = ref({
      messages: [],
      promoterUsername: ""
      //和谁聊天【名称】
    });
    onBeforeMount(async () => {
      websocket = new WebSocket("ws://uat.crm.xuexiluxian.cn/crm/websocket", token);
      websocket.onopen = () => {
        console.log("链接成功");
      };
      websocket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        currentSession.value.messages.push({
          id: data.id,
          event: data.event,
          fromUserId: data.fromUserId,
          toUserId: data.toUserId,
          msgType: data.msgType,
          message: {
            type: data.message.type,
            content: data.message.content
          },
          messageBodyType: data.message.type,
          messageBodyContent: data.message.content
        });
      };
      await getContacts();
      await getSessions();
    });
    let treeList = ref([]);
    const getContacts = async () => {
      let { data } = await chatContacts();
      treeList.value = data;
    };
    let sessionList = ref([]);
    const getSessions = async () => {
      let res = await chatSessions();
      sessionList.value = res.data.records;
    };
    const onNodeClick = async (node) => {
      if (node.id == userInfo.value.id)
        return console.log("不自己聊~");
      let { data } = await chatSession(node.id, userInfo.value.id);
      currentSession.value = data;
      loadHistory();
    };
    const goChat = (item) => {
      currentSession.value = item;
      loadHistory();
    };
    const loadHistory = async () => {
      let res = await chatHistory({
        sessionId: currentSession.value.id
      });
      currentSession.value.message = res.data.records;
    };
    let message = ref("");
    const sendMessage = () => {
      if (message.value.trim() == "")
        return;
      const msg = {
        id: nanoid(),
        event: "message",
        fromUserId: userInfo.value.id,
        //谁发消息的id
        toUserId: currentSession.value.promoter,
        //谁接收消息的id
        msgType: "text",
        //打消息的类型
        message: {
          type: "message",
          content: message.value
          //当前发送的消息
        },
        messageBodyType: "message",
        messageBodyContent: message.value
        //当前发送的消息
      };
      websocket.send(JSON.stringify(msg));
      currentSession.value.message.push(msg);
      message.value = "";
      getSessions();
    };
    return (_ctx, _cache) => {
      const _component_el_icon_close = close_default;
      const _component_el_icon = ElIcon;
      const _component_el_header = ElHeader;
      const _component_el_avatar = ElAvatar;
      const _component_el_tree = ElTree;
      const _component_el_tab_pane = ElTabPane;
      const _component_el_tabs = ElTabs;
      const _component_el_aside = ElAside;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _component_el_main = ElMain;
      const _component_el_icon_user = user_default;
      const _component_el_text = ElText;
      const _component_el_icon_iphone = iphone_default;
      const _component_el_icon_message = message_default;
      const _component_el_card = ElCard;
      const _component_el_container = ElContainer;
      return openBlock(), createBlock(_component_el_container, null, {
        default: withCtx(() => [
          createVNode(_component_el_header, {
            class: "titleBar",
            height: "40px"
          }, {
            default: withCtx(() => [
              _hoisted_1,
              createVNode(_component_el_icon, {
                class: "close",
                size: "large"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon_close)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_el_container, null, {
            default: withCtx(() => [
              createVNode(_component_el_aside, { width: "240px" }, {
                default: withCtx(() => [
                  createVNode(_component_el_tabs, {
                    type: "border-card",
                    style: { "height": "428px" }
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_tab_pane, { label: "联系人" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_tree, {
                            ref: "treeRef",
                            data: unref(treeList),
                            "expand-on-click-node": false,
                            "highlight-current": "",
                            "default-expand-all": "",
                            "node-key": "id",
                            onNodeClick
                          }, {
                            default: withCtx(({ node, data }) => [
                              data.type === "_type_unit" ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(data.name), 1)) : createCommentVNode("", true),
                              data.type === "_type_user" ? (openBlock(), createElementBlock("div", _hoisted_3, [
                                createVNode(_component_el_avatar, {
                                  src: data.avatar,
                                  size: "small"
                                }, null, 8, ["src"]),
                                createTextVNode(" " + toDisplayString(data.realName), 1)
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["data"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_tab_pane, { label: "会话列表" }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_4, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(sessionList), (item) => {
                              return openBlock(), createElementBlock("div", {
                                class: "session-list-item",
                                key: item.id,
                                style: { "margin-bottom": "10px" },
                                onClick: ($event) => goChat(item),
                                id: item.id
                              }, [
                                item.promoter == -1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                  createVNode(_component_el_avatar, {
                                    circle: "",
                                    src: "/images/logo.png"
                                  }),
                                  createBaseVNode("div", _hoisted_6, [
                                    _hoisted_7,
                                    createBaseVNode("span", _hoisted_8, toDisplayString(item.messages[0]?.messageBodyContent), 1)
                                  ])
                                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                  createVNode(_component_el_avatar, {
                                    circle: "",
                                    src: item.promoter === unref(userInfo).id ? item.partakerAvatar : item.promoterAvatar
                                  }, null, 8, ["src"]),
                                  createBaseVNode("div", _hoisted_9, [
                                    createBaseVNode("h4", null, toDisplayString(item.promoter === unref(userInfo).id ? item.promoterUsername : item.promoterUsername), 1),
                                    createBaseVNode("span", _hoisted_10, toDisplayString(item.messages[0]?.messageBodyContent), 1)
                                  ]),
                                  _hoisted_11
                                ], 64)),
                                createBaseVNode("div", {
                                  class: "close-btn",
                                  text: "",
                                  onClick: ($event) => _ctx.deleteSession(item.id)
                                }, [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_icon_close)
                                    ]),
                                    _: 1
                                  })
                                ], 8, _hoisted_12)
                              ], 8, _hoisted_5);
                            }), 128))
                          ]),
                          unref(sessionList).length == 0 ? (openBlock(), createElementBlock("div", _hoisted_13, _hoisted_15)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              unref(currentSession) ? (openBlock(), createBlock(_component_el_main, {
                key: 0,
                class: "nopadding"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_16, [
                    createBaseVNode("div", _hoisted_17, [
                      unref(currentSession).promoter == -1 ? (openBlock(), createElementBlock("div", _hoisted_18, [
                        createVNode(_component_el_avatar, {
                          src: "/images/logo.png",
                          size: "default",
                          circle: ""
                        }),
                        _hoisted_19
                      ])) : (openBlock(), createElementBlock("div", _hoisted_20, [
                        createVNode(_component_el_avatar, {
                          size: "default",
                          circle: "",
                          src: unref(currentSession).promoter === unref(userInfo).id ? unref(currentSession).partakerAvatar : unref(currentSession).promoterAvatar
                        }, null, 8, ["src"]),
                        createBaseVNode("h3", null, "正在与 " + toDisplayString(unref(currentSession).promoter === unref(userInfo).id ? unref(currentSession).promoterRealname : unref(currentSession).promoterRealname) + " 对话...", 1)
                      ])),
                      createBaseVNode("div", {
                        class: "chat-body",
                        ref: "chatBody",
                        onScroll: _cache[0] || (_cache[0] = (...args) => _ctx.scrollTopHandler && _ctx.scrollTopHandler(...args))
                      }, [
                        createBaseVNode("div", _hoisted_21, [
                          createBaseVNode("ul", _hoisted_22, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(currentSession).message, (message2, i) => {
                              return openBlock(), createElementBlock("li", {
                                id: message2.id,
                                key: i,
                                class: normalizeClass(message2.toUserId === unref(userInfo).id ? "left_word" : "right_word")
                              }, [
                                createBaseVNode("span", null, toDisplayString(message2.messageBodyContent), 1)
                              ], 10, _hoisted_23);
                            }), 128))
                          ])
                        ])
                      ], 544),
                      createBaseVNode("div", _hoisted_24, [
                        createVNode(_component_el_input, {
                          type: "textarea",
                          modelValue: unref(message),
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(message) ? message.value = $event : message = $event),
                          placeholder: "说点什么...",
                          onKeyup: withKeys(sendMessage, ["enter"])
                        }, null, 8, ["modelValue", "onKeyup"]),
                        createVNode(_component_el_button, {
                          type: "primary",
                          onClick: sendMessage
                        }, {
                          default: withCtx(() => [
                            createTextVNode("发送")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ])
                ]),
                _: 1
              })) : (openBlock(), createBlock(_component_el_main, { key: 1 }, {
                default: withCtx(() => [
                  _hoisted_25
                ]),
                _: 1
              })),
              createVNode(_component_el_aside, { width: "260px" }, {
                default: withCtx(() => [
                  createVNode(_component_el_card, {
                    "body-style": { padding: "0px" },
                    style: { "height": "100%" }
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_26, [
                        createVNode(_component_el_avatar, {
                          size: "large",
                          src: unref(userInfo).avatar
                        }, null, 8, ["src"]),
                        createBaseVNode("h2", _hoisted_27, toDisplayString(unref(userInfo).username), 1),
                        createBaseVNode("p", _hoisted_28, toDisplayString(unref(userInfo).unit?.name), 1)
                      ]),
                      createBaseVNode("div", _hoisted_29, [
                        createVNode(_component_el_text, {
                          class: "mx-1",
                          type: "info"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon_user)
                              ]),
                              _: 1
                            }),
                            createBaseVNode("span", _hoisted_30, toDisplayString(unref(userInfo).realName), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_text, {
                          class: "mx-1",
                          type: "info"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon_iphone)
                              ]),
                              _: 1
                            }),
                            createBaseVNode("span", _hoisted_31, toDisplayString(unref(userInfo).unit?.mobile), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_text, {
                          class: "mx-1",
                          type: "info"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon_message)
                              ]),
                              _: 1
                            }),
                            createBaseVNode("span", _hoisted_32, toDisplayString(unref(userInfo).email), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
const chat = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__scopeId", "data-v-98361a7e"]]);
export {
  chat as default
};
