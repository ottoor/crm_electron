import { b as buildProps, i as iconPropType, d as defineComponent, u as useNamespace, r as ref, p as provide, o as onMounted, a as openBlock, c as createElementBlock, e as renderSlot, n as normalizeClass, f as unref, _ as _export_sfc, g as definePropType, h as getCurrentInstance, j as inject, k as createBaseVNode, l as createBlock, w as withCtx, m as resolveDynamicComponent, E as ElIcon, t as toDisplayString, q as withInstall, s as withNoopInstall, v as EVENT_CODE, x as mergeProps, T as Transition, y as addClass, z as removeClass, A as hasClass, B as computed, C as arrow_down_default, D as arrow_right_default, F as reactive, G as watch, H as onBeforeUnmount, I as h, J as isString, K as withDirectives, L as vShow, M as Fragment, N as useTimeoutFn, O as mutable, P as watchEffect, Q as more_default, R as isObject, S as useResizeObserver, U as nextTick, V as toRef, W as resolveComponent, X as createTextVNode, Y as onBeforeMount, Z as createCommentVNode, $ as renderList, a0 as createVNode, a1 as useRoute, a2 as useRouter, a3 as defineStore, a4 as withModifiers, a5 as useMenuStore, a6 as storeToRefs, a7 as KeepAlive, a8 as pushScopeId, a9 as popScopeId } from "./index-575c9104.js";
import "./el-tooltip-9958ff85.js";
import { E as ElTooltip, a as ElScrollbar } from "./el-scrollbar-20c86168.js";
/* empty css                  */import { _ as _imports_0 } from "./logo-c1ae4c99.js";
import { _ as _CollapseTransition } from "./index-02f7aa6a.js";
import { T as TinyColor, u as useDeprecated, t as throwError, i as isNil } from "./index-0b8d8a8b.js";
import { f as flattedChildren } from "./vnode-d371cc4c.js";
import { _ as _export_sfc$1 } from "./_plugin-vue_export-helper-cc2b3d55.js";
import { u as utils } from "./index-e0e58765.js";
import "./focus-trap-64f23100.js";
import "./index.browser-f9f2e8e5.js";
import "./_commonjs-dynamic-modules-58f2b0ec.js";
const triggerEvent = function(elm, name, ...opts) {
  let eventName;
  if (name.includes("mouse") || name.includes("click")) {
    eventName = "MouseEvents";
  } else if (name.includes("key")) {
    eventName = "KeyboardEvent";
  } else {
    eventName = "HTMLEvents";
  }
  const evt = document.createEvent(eventName);
  evt.initEvent(name, ...opts);
  elm.dispatchEvent(evt);
  return elm;
};
const breadcrumbKey = Symbol("breadcrumbKey");
const breadcrumbProps = buildProps({
  separator: {
    type: String,
    default: "/"
  },
  separatorIcon: {
    type: iconPropType
  }
});
const __default__$1 = defineComponent({
  name: "ElBreadcrumb"
});
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: breadcrumbProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("breadcrumb");
    const breadcrumb = ref();
    provide(breadcrumbKey, props);
    onMounted(() => {
      const items = breadcrumb.value.querySelectorAll(`.${ns.e("item")}`);
      if (items.length) {
        items[items.length - 1].setAttribute("aria-current", "page");
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "breadcrumb",
        ref: breadcrumb,
        class: normalizeClass(unref(ns).b()),
        "aria-label": "Breadcrumb",
        role: "navigation"
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/breadcrumb/src/breadcrumb.vue"]]);
const breadcrumbItemProps = buildProps({
  to: {
    type: definePropType([String, Object]),
    default: ""
  },
  replace: {
    type: Boolean,
    default: false
  }
});
const __default__ = defineComponent({
  name: "ElBreadcrumbItem"
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: breadcrumbItemProps,
  setup(__props) {
    const props = __props;
    const instance = getCurrentInstance();
    const breadcrumbContext = inject(breadcrumbKey, void 0);
    const ns = useNamespace("breadcrumb");
    const router = instance.appContext.config.globalProperties.$router;
    const link = ref();
    const onClick = () => {
      if (!props.to || !router)
        return;
      props.replace ? router.replace(props.to) : router.push(props.to);
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(unref(ns).e("item"))
      }, [
        createBaseVNode("span", {
          ref_key: "link",
          ref: link,
          class: normalizeClass([unref(ns).e("inner"), unref(ns).is("link", !!_ctx.to)]),
          role: "link",
          onClick
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2),
        ((_a = unref(breadcrumbContext)) == null ? void 0 : _a.separatorIcon) ? (openBlock(), createBlock(unref(ElIcon), {
          key: 0,
          class: normalizeClass(unref(ns).e("separator"))
        }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(unref(breadcrumbContext).separatorIcon)))
          ]),
          _: 1
        }, 8, ["class"])) : (openBlock(), createElementBlock("span", {
          key: 1,
          class: normalizeClass(unref(ns).e("separator")),
          role: "presentation"
        }, toDisplayString((_b = unref(breadcrumbContext)) == null ? void 0 : _b.separator), 3))
      ], 2);
    };
  }
});
var BreadcrumbItem = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/breadcrumb/src/breadcrumb-item.vue"]]);
const ElBreadcrumb = withInstall(Breadcrumb, {
  BreadcrumbItem
});
withNoopInstall(BreadcrumbItem);
let SubMenu$1 = class SubMenu {
  constructor(parent, domNode) {
    this.parent = parent;
    this.domNode = domNode;
    this.subIndex = 0;
    this.subIndex = 0;
    this.init();
  }
  init() {
    this.subMenuItems = this.domNode.querySelectorAll("li");
    this.addListeners();
  }
  gotoSubIndex(idx) {
    if (idx === this.subMenuItems.length) {
      idx = 0;
    } else if (idx < 0) {
      idx = this.subMenuItems.length - 1;
    }
    this.subMenuItems[idx].focus();
    this.subIndex = idx;
  }
  addListeners() {
    const parentNode = this.parent.domNode;
    Array.prototype.forEach.call(this.subMenuItems, (el) => {
      el.addEventListener("keydown", (event) => {
        let prevDef = false;
        switch (event.code) {
          case EVENT_CODE.down: {
            this.gotoSubIndex(this.subIndex + 1);
            prevDef = true;
            break;
          }
          case EVENT_CODE.up: {
            this.gotoSubIndex(this.subIndex - 1);
            prevDef = true;
            break;
          }
          case EVENT_CODE.tab: {
            triggerEvent(parentNode, "mouseleave");
            break;
          }
          case EVENT_CODE.enter:
          case EVENT_CODE.space: {
            prevDef = true;
            event.currentTarget.click();
            break;
          }
        }
        if (prevDef) {
          event.preventDefault();
          event.stopPropagation();
        }
        return false;
      });
    });
  }
};
let MenuItem$1 = class MenuItem {
  constructor(domNode, namespace) {
    this.domNode = domNode;
    this.submenu = null;
    this.submenu = null;
    this.init(namespace);
  }
  init(namespace) {
    this.domNode.setAttribute("tabindex", "0");
    const menuChild = this.domNode.querySelector(`.${namespace}-menu`);
    if (menuChild) {
      this.submenu = new SubMenu$1(this, menuChild);
    }
    this.addListeners();
  }
  addListeners() {
    this.domNode.addEventListener("keydown", (event) => {
      let prevDef = false;
      switch (event.code) {
        case EVENT_CODE.down: {
          triggerEvent(event.currentTarget, "mouseenter");
          this.submenu && this.submenu.gotoSubIndex(0);
          prevDef = true;
          break;
        }
        case EVENT_CODE.up: {
          triggerEvent(event.currentTarget, "mouseenter");
          this.submenu && this.submenu.gotoSubIndex(this.submenu.subMenuItems.length - 1);
          prevDef = true;
          break;
        }
        case EVENT_CODE.tab: {
          triggerEvent(event.currentTarget, "mouseleave");
          break;
        }
        case EVENT_CODE.enter:
        case EVENT_CODE.space: {
          prevDef = true;
          event.currentTarget.click();
          break;
        }
      }
      if (prevDef) {
        event.preventDefault();
      }
    });
  }
};
let Menu$1 = class Menu {
  constructor(domNode, namespace) {
    this.domNode = domNode;
    this.init(namespace);
  }
  init(namespace) {
    const menuChildren = this.domNode.childNodes;
    Array.from(menuChildren).forEach((child) => {
      if (child.nodeType === 1) {
        new MenuItem$1(child, namespace);
      }
    });
  }
};
const _sfc_main$7 = defineComponent({
  name: "ElMenuCollapseTransition",
  setup() {
    const ns = useNamespace("menu");
    const listeners = {
      onBeforeEnter: (el) => el.style.opacity = "0.2",
      onEnter(el, done) {
        addClass(el, `${ns.namespace.value}-opacity-transition`);
        el.style.opacity = "1";
        done();
      },
      onAfterEnter(el) {
        removeClass(el, `${ns.namespace.value}-opacity-transition`);
        el.style.opacity = "";
      },
      onBeforeLeave(el) {
        if (!el.dataset) {
          el.dataset = {};
        }
        if (hasClass(el, ns.m("collapse"))) {
          removeClass(el, ns.m("collapse"));
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth.toString();
          addClass(el, ns.m("collapse"));
        } else {
          addClass(el, ns.m("collapse"));
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth.toString();
          removeClass(el, ns.m("collapse"));
        }
        el.style.width = `${el.scrollWidth}px`;
        el.style.overflow = "hidden";
      },
      onLeave(el) {
        addClass(el, "horizontal-collapse-transition");
        el.style.width = `${el.dataset.scrollWidth}px`;
      }
    };
    return {
      listeners
    };
  }
});
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, mergeProps({ mode: "out-in" }, _ctx.listeners), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16);
}
var ElMenuCollapseTransition = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$2], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-collapse-transition.vue"]]);
function useMenu(instance, currentIndex) {
  const indexPath = computed(() => {
    let parent = instance.parent;
    const path = [currentIndex.value];
    while (parent.type.name !== "ElMenu") {
      if (parent.props.index) {
        path.unshift(parent.props.index);
      }
      parent = parent.parent;
    }
    return path;
  });
  const parentMenu = computed(() => {
    let parent = instance.parent;
    while (parent && !["ElMenu", "ElSubMenu"].includes(parent.type.name)) {
      parent = parent.parent;
    }
    return parent;
  });
  return {
    parentMenu,
    indexPath
  };
}
function useMenuColor(props) {
  const menuBarColor = computed(() => {
    const color = props.backgroundColor;
    if (!color) {
      return "";
    } else {
      return new TinyColor(color).shade(20).toString();
    }
  });
  return menuBarColor;
}
const useMenuCssVar = (props, level) => {
  const ns = useNamespace("menu");
  return computed(() => {
    return ns.cssVarBlock({
      "text-color": props.textColor || "",
      "hover-text-color": props.textColor || "",
      "bg-color": props.backgroundColor || "",
      "hover-bg-color": useMenuColor(props).value || "",
      "active-color": props.activeTextColor || "",
      level: `${level}`
    });
  });
};
const subMenuProps = buildProps({
  index: {
    type: String,
    required: true
  },
  showTimeout: {
    type: Number,
    default: 300
  },
  hideTimeout: {
    type: Number,
    default: 300
  },
  popperClass: String,
  disabled: Boolean,
  popperAppendToBody: {
    type: Boolean,
    default: void 0
  },
  teleported: {
    type: Boolean,
    default: void 0
  },
  popperOffset: {
    type: Number,
    default: 6
  },
  expandCloseIcon: {
    type: iconPropType
  },
  expandOpenIcon: {
    type: iconPropType
  },
  collapseCloseIcon: {
    type: iconPropType
  },
  collapseOpenIcon: {
    type: iconPropType
  }
});
const COMPONENT_NAME$2 = "ElSubMenu";
var SubMenu2 = defineComponent({
  name: COMPONENT_NAME$2,
  props: subMenuProps,
  setup(props, { slots, expose }) {
    useDeprecated({
      from: "popper-append-to-body",
      replacement: "teleported",
      scope: COMPONENT_NAME$2,
      version: "2.3.0",
      ref: "https://element-plus.org/en-US/component/menu.html#submenu-attributes"
    }, computed(() => props.popperAppendToBody !== void 0));
    const instance = getCurrentInstance();
    const { indexPath, parentMenu } = useMenu(instance, computed(() => props.index));
    const nsMenu = useNamespace("menu");
    const nsSubMenu = useNamespace("sub-menu");
    const rootMenu = inject("rootMenu");
    if (!rootMenu)
      throwError(COMPONENT_NAME$2, "can not inject root menu");
    const subMenu = inject(`subMenu:${parentMenu.value.uid}`);
    if (!subMenu)
      throwError(COMPONENT_NAME$2, "can not inject sub menu");
    const items = ref({});
    const subMenus = ref({});
    let timeout;
    const mouseInChild = ref(false);
    const verticalTitleRef = ref();
    const vPopper = ref(null);
    const currentPlacement = computed(() => mode.value === "horizontal" && isFirstLevel.value ? "bottom-start" : "right-start");
    const subMenuTitleIcon = computed(() => {
      return mode.value === "horizontal" && isFirstLevel.value || mode.value === "vertical" && !rootMenu.props.collapse ? props.expandCloseIcon && props.expandOpenIcon ? opened.value ? props.expandOpenIcon : props.expandCloseIcon : arrow_down_default : props.collapseCloseIcon && props.collapseOpenIcon ? opened.value ? props.collapseOpenIcon : props.collapseCloseIcon : arrow_right_default;
    });
    const isFirstLevel = computed(() => {
      return subMenu.level === 0;
    });
    const appendToBody = computed(() => {
      var _a;
      const value = (_a = props.teleported) != null ? _a : props.popperAppendToBody;
      return value === void 0 ? isFirstLevel.value : value;
    });
    const menuTransitionName = computed(() => rootMenu.props.collapse ? `${nsMenu.namespace.value}-zoom-in-left` : `${nsMenu.namespace.value}-zoom-in-top`);
    const fallbackPlacements = computed(() => mode.value === "horizontal" && isFirstLevel.value ? [
      "bottom-start",
      "bottom-end",
      "top-start",
      "top-end",
      "right-start",
      "left-start"
    ] : [
      "right-start",
      "right",
      "right-end",
      "left-start",
      "bottom-start",
      "bottom-end",
      "top-start",
      "top-end"
    ]);
    const opened = computed(() => rootMenu.openedMenus.includes(props.index));
    const active = computed(() => {
      let isActive = false;
      Object.values(items.value).forEach((item2) => {
        if (item2.active) {
          isActive = true;
        }
      });
      Object.values(subMenus.value).forEach((subItem) => {
        if (subItem.active) {
          isActive = true;
        }
      });
      return isActive;
    });
    const mode = computed(() => rootMenu.props.mode);
    const item = reactive({
      index: props.index,
      indexPath,
      active
    });
    const ulStyle = useMenuCssVar(rootMenu.props, subMenu.level + 1);
    const doDestroy = () => {
      var _a, _b, _c;
      return (_c = (_b = (_a = vPopper.value) == null ? void 0 : _a.popperRef) == null ? void 0 : _b.popperInstanceRef) == null ? void 0 : _c.destroy();
    };
    const handleCollapseToggle = (value) => {
      if (!value) {
        doDestroy();
      }
    };
    const handleClick = () => {
      if (rootMenu.props.menuTrigger === "hover" && rootMenu.props.mode === "horizontal" || rootMenu.props.collapse && rootMenu.props.mode === "vertical" || props.disabled)
        return;
      rootMenu.handleSubMenuClick({
        index: props.index,
        indexPath: indexPath.value,
        active: active.value
      });
    };
    const handleMouseenter = (event, showTimeout = props.showTimeout) => {
      var _a;
      if (event.type === "focus") {
        return;
      }
      if (rootMenu.props.menuTrigger === "click" && rootMenu.props.mode === "horizontal" || !rootMenu.props.collapse && rootMenu.props.mode === "vertical" || props.disabled) {
        return;
      }
      subMenu.mouseInChild.value = true;
      timeout == null ? void 0 : timeout();
      ({ stop: timeout } = useTimeoutFn(() => {
        rootMenu.openMenu(props.index, indexPath.value);
      }, showTimeout));
      if (appendToBody.value) {
        (_a = parentMenu.value.vnode.el) == null ? void 0 : _a.dispatchEvent(new MouseEvent("mouseenter"));
      }
    };
    const handleMouseleave = (deepDispatch = false) => {
      var _a, _b;
      if (rootMenu.props.menuTrigger === "click" && rootMenu.props.mode === "horizontal" || !rootMenu.props.collapse && rootMenu.props.mode === "vertical") {
        return;
      }
      timeout == null ? void 0 : timeout();
      subMenu.mouseInChild.value = false;
      ({ stop: timeout } = useTimeoutFn(() => !mouseInChild.value && rootMenu.closeMenu(props.index, indexPath.value), props.hideTimeout));
      if (appendToBody.value && deepDispatch) {
        if (((_a = instance.parent) == null ? void 0 : _a.type.name) === "ElSubMenu") {
          (_b = subMenu.handleMouseleave) == null ? void 0 : _b.call(subMenu, true);
        }
      }
    };
    watch(() => rootMenu.props.collapse, (value) => handleCollapseToggle(Boolean(value)));
    {
      const addSubMenu = (item2) => {
        subMenus.value[item2.index] = item2;
      };
      const removeSubMenu = (item2) => {
        delete subMenus.value[item2.index];
      };
      provide(`subMenu:${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        handleMouseleave,
        mouseInChild,
        level: subMenu.level + 1
      });
    }
    expose({
      opened
    });
    onMounted(() => {
      rootMenu.addSubMenu(item);
      subMenu.addSubMenu(item);
    });
    onBeforeUnmount(() => {
      subMenu.removeSubMenu(item);
      rootMenu.removeSubMenu(item);
    });
    return () => {
      var _a;
      const titleTag = [
        (_a = slots.title) == null ? void 0 : _a.call(slots),
        h(ElIcon, {
          class: nsSubMenu.e("icon-arrow"),
          style: {
            transform: opened.value ? props.expandCloseIcon && props.expandOpenIcon || props.collapseCloseIcon && props.collapseOpenIcon && rootMenu.props.collapse ? "none" : "rotateZ(180deg)" : "none"
          }
        }, {
          default: () => isString(subMenuTitleIcon.value) ? h(instance.appContext.components[subMenuTitleIcon.value]) : h(subMenuTitleIcon.value)
        })
      ];
      const child = rootMenu.isMenuPopup ? h(ElTooltip, {
        ref: vPopper,
        visible: opened.value,
        effect: "light",
        pure: true,
        offset: props.popperOffset,
        showArrow: false,
        persistent: true,
        popperClass: props.popperClass,
        placement: currentPlacement.value,
        teleported: appendToBody.value,
        fallbackPlacements: fallbackPlacements.value,
        transition: menuTransitionName.value,
        gpuAcceleration: false
      }, {
        content: () => {
          var _a2;
          return h("div", {
            class: [
              nsMenu.m(mode.value),
              nsMenu.m("popup-container"),
              props.popperClass
            ],
            onMouseenter: (evt) => handleMouseenter(evt, 100),
            onMouseleave: () => handleMouseleave(true),
            onFocus: (evt) => handleMouseenter(evt, 100)
          }, [
            h("ul", {
              class: [
                nsMenu.b(),
                nsMenu.m("popup"),
                nsMenu.m(`popup-${currentPlacement.value}`)
              ],
              style: ulStyle.value
            }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)])
          ]);
        },
        default: () => h("div", {
          class: nsSubMenu.e("title"),
          onClick: handleClick
        }, titleTag)
      }) : h(Fragment, {}, [
        h("div", {
          class: nsSubMenu.e("title"),
          ref: verticalTitleRef,
          onClick: handleClick
        }, titleTag),
        h(_CollapseTransition, {}, {
          default: () => {
            var _a2;
            return withDirectives(h("ul", {
              role: "menu",
              class: [nsMenu.b(), nsMenu.m("inline")],
              style: ulStyle.value
            }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]), [[vShow, opened.value]]);
          }
        })
      ]);
      return h("li", {
        class: [
          nsSubMenu.b(),
          nsSubMenu.is("active", active.value),
          nsSubMenu.is("opened", opened.value),
          nsSubMenu.is("disabled", props.disabled)
        ],
        role: "menuitem",
        ariaHaspopup: true,
        ariaExpanded: opened.value,
        onMouseenter: handleMouseenter,
        onMouseleave: () => handleMouseleave(true),
        onFocus: handleMouseenter
      }, [child]);
    };
  }
});
const menuProps = buildProps({
  mode: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "vertical"
  },
  defaultActive: {
    type: String,
    default: ""
  },
  defaultOpeneds: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  uniqueOpened: Boolean,
  router: Boolean,
  menuTrigger: {
    type: String,
    values: ["hover", "click"],
    default: "hover"
  },
  collapse: Boolean,
  backgroundColor: String,
  textColor: String,
  activeTextColor: String,
  collapseTransition: {
    type: Boolean,
    default: true
  },
  ellipsis: {
    type: Boolean,
    default: true
  },
  popperEffect: {
    type: String,
    values: ["dark", "light"],
    default: "dark"
  }
});
const checkIndexPath = (indexPath) => Array.isArray(indexPath) && indexPath.every((path) => isString(path));
const menuEmits = {
  close: (index2, indexPath) => isString(index2) && checkIndexPath(indexPath),
  open: (index2, indexPath) => isString(index2) && checkIndexPath(indexPath),
  select: (index2, indexPath, item, routerResult) => isString(index2) && checkIndexPath(indexPath) && isObject(item) && (routerResult === void 0 || routerResult instanceof Promise)
};
var Menu2 = defineComponent({
  name: "ElMenu",
  props: menuProps,
  emits: menuEmits,
  setup(props, { emit, slots, expose }) {
    const instance = getCurrentInstance();
    const router = instance.appContext.config.globalProperties.$router;
    const menu = ref();
    const nsMenu = useNamespace("menu");
    const nsSubMenu = useNamespace("sub-menu");
    const sliceIndex = ref(-1);
    const openedMenus = ref(props.defaultOpeneds && !props.collapse ? props.defaultOpeneds.slice(0) : []);
    const activeIndex = ref(props.defaultActive);
    const items = ref({});
    const subMenus = ref({});
    const isMenuPopup = computed(() => {
      return props.mode === "horizontal" || props.mode === "vertical" && props.collapse;
    });
    const initMenu = () => {
      const activeItem = activeIndex.value && items.value[activeIndex.value];
      if (!activeItem || props.mode === "horizontal" || props.collapse)
        return;
      const indexPath = activeItem.indexPath;
      indexPath.forEach((index2) => {
        const subMenu = subMenus.value[index2];
        subMenu && openMenu(index2, subMenu.indexPath);
      });
    };
    const openMenu = (index2, indexPath) => {
      if (openedMenus.value.includes(index2))
        return;
      if (props.uniqueOpened) {
        openedMenus.value = openedMenus.value.filter((index22) => indexPath.includes(index22));
      }
      openedMenus.value.push(index2);
      emit("open", index2, indexPath);
    };
    const close = (index2) => {
      const i = openedMenus.value.indexOf(index2);
      if (i !== -1) {
        openedMenus.value.splice(i, 1);
      }
    };
    const closeMenu = (index2, indexPath) => {
      close(index2);
      emit("close", index2, indexPath);
    };
    const handleSubMenuClick = ({
      index: index2,
      indexPath
    }) => {
      const isOpened = openedMenus.value.includes(index2);
      if (isOpened) {
        closeMenu(index2, indexPath);
      } else {
        openMenu(index2, indexPath);
      }
    };
    const handleMenuItemClick = (menuItem) => {
      if (props.mode === "horizontal" || props.collapse) {
        openedMenus.value = [];
      }
      const { index: index2, indexPath } = menuItem;
      if (isNil(index2) || isNil(indexPath))
        return;
      if (props.router && router) {
        const route = menuItem.route || index2;
        const routerResult = router.push(route).then((res) => {
          if (!res)
            activeIndex.value = index2;
          return res;
        });
        emit("select", index2, indexPath, { index: index2, indexPath, route }, routerResult);
      } else {
        activeIndex.value = index2;
        emit("select", index2, indexPath, { index: index2, indexPath });
      }
    };
    const updateActiveIndex = (val) => {
      const itemsInData = items.value;
      const item = itemsInData[val] || activeIndex.value && itemsInData[activeIndex.value] || itemsInData[props.defaultActive];
      if (item) {
        activeIndex.value = item.index;
      } else {
        activeIndex.value = val;
      }
    };
    const calcSliceIndex = () => {
      var _a, _b;
      if (!menu.value)
        return -1;
      const items2 = Array.from((_b = (_a = menu.value) == null ? void 0 : _a.childNodes) != null ? _b : []).filter((item) => item.nodeName !== "#comment" && (item.nodeName !== "#text" || item.nodeValue));
      const moreItemWidth = 64;
      const paddingLeft = Number.parseInt(getComputedStyle(menu.value).paddingLeft, 10);
      const paddingRight = Number.parseInt(getComputedStyle(menu.value).paddingRight, 10);
      const menuWidth = menu.value.clientWidth - paddingLeft - paddingRight;
      let calcWidth = 0;
      let sliceIndex2 = 0;
      items2.forEach((item, index2) => {
        calcWidth += item.offsetWidth || 0;
        if (calcWidth <= menuWidth - moreItemWidth) {
          sliceIndex2 = index2 + 1;
        }
      });
      return sliceIndex2 === items2.length ? -1 : sliceIndex2;
    };
    const debounce = (fn, wait = 33.34) => {
      let timmer;
      return () => {
        timmer && clearTimeout(timmer);
        timmer = setTimeout(() => {
          fn();
        }, wait);
      };
    };
    let isFirstTimeRender = true;
    const handleResize = () => {
      const callback = () => {
        sliceIndex.value = -1;
        nextTick(() => {
          sliceIndex.value = calcSliceIndex();
        });
      };
      isFirstTimeRender ? callback() : debounce(callback)();
      isFirstTimeRender = false;
    };
    watch(() => props.defaultActive, (currentActive) => {
      if (!items.value[currentActive]) {
        activeIndex.value = "";
      }
      updateActiveIndex(currentActive);
    });
    watch(() => props.collapse, (value) => {
      if (value)
        openedMenus.value = [];
    });
    watch(items.value, initMenu);
    let resizeStopper;
    watchEffect(() => {
      if (props.mode === "horizontal" && props.ellipsis)
        resizeStopper = useResizeObserver(menu, handleResize).stop;
      else
        resizeStopper == null ? void 0 : resizeStopper();
    });
    {
      const addSubMenu = (item) => {
        subMenus.value[item.index] = item;
      };
      const removeSubMenu = (item) => {
        delete subMenus.value[item.index];
      };
      const addMenuItem = (item) => {
        items.value[item.index] = item;
      };
      const removeMenuItem = (item) => {
        delete items.value[item.index];
      };
      provide("rootMenu", reactive({
        props,
        openedMenus,
        items,
        subMenus,
        activeIndex,
        isMenuPopup,
        addMenuItem,
        removeMenuItem,
        addSubMenu,
        removeSubMenu,
        openMenu,
        closeMenu,
        handleMenuItemClick,
        handleSubMenuClick
      }));
      provide(`subMenu:${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        mouseInChild: ref(false),
        level: 0
      });
    }
    onMounted(() => {
      if (props.mode === "horizontal") {
        new Menu$1(instance.vnode.el, nsMenu.namespace.value);
      }
    });
    {
      const open = (index2) => {
        const { indexPath } = subMenus.value[index2];
        indexPath.forEach((i) => openMenu(i, indexPath));
      };
      expose({
        open,
        close,
        handleResize
      });
    }
    return () => {
      var _a, _b;
      let slot = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : [];
      const vShowMore = [];
      if (props.mode === "horizontal" && menu.value) {
        const originalSlot = flattedChildren(slot);
        const slotDefault = sliceIndex.value === -1 ? originalSlot : originalSlot.slice(0, sliceIndex.value);
        const slotMore = sliceIndex.value === -1 ? [] : originalSlot.slice(sliceIndex.value);
        if ((slotMore == null ? void 0 : slotMore.length) && props.ellipsis) {
          slot = slotDefault;
          vShowMore.push(h(SubMenu2, {
            index: "sub-menu-more",
            class: nsSubMenu.e("hide-arrow")
          }, {
            title: () => h(ElIcon, {
              class: nsSubMenu.e("icon-more")
            }, { default: () => h(more_default) }),
            default: () => slotMore
          }));
        }
      }
      const ulStyle = useMenuCssVar(props, 0);
      const vMenu = h("ul", {
        key: String(props.collapse),
        role: "menubar",
        ref: menu,
        style: ulStyle.value,
        class: {
          [nsMenu.b()]: true,
          [nsMenu.m(props.mode)]: true,
          [nsMenu.m("collapse")]: props.collapse
        }
      }, [...slot, ...vShowMore]);
      if (props.collapseTransition && props.mode === "vertical") {
        return h(ElMenuCollapseTransition, () => vMenu);
      }
      return vMenu;
    };
  }
});
const menuItemProps = buildProps({
  index: {
    type: definePropType([String, null]),
    default: null
  },
  route: {
    type: definePropType([String, Object])
  },
  disabled: Boolean
});
const menuItemEmits = {
  click: (item) => isString(item.index) && Array.isArray(item.indexPath)
};
const COMPONENT_NAME$1 = "ElMenuItem";
const _sfc_main$6 = defineComponent({
  name: COMPONENT_NAME$1,
  components: {
    ElTooltip
  },
  props: menuItemProps,
  emits: menuItemEmits,
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const rootMenu = inject("rootMenu");
    const nsMenu = useNamespace("menu");
    const nsMenuItem = useNamespace("menu-item");
    if (!rootMenu)
      throwError(COMPONENT_NAME$1, "can not inject root menu");
    const { parentMenu, indexPath } = useMenu(instance, toRef(props, "index"));
    const subMenu = inject(`subMenu:${parentMenu.value.uid}`);
    if (!subMenu)
      throwError(COMPONENT_NAME$1, "can not inject sub menu");
    const active = computed(() => props.index === rootMenu.activeIndex);
    const item = reactive({
      index: props.index,
      indexPath,
      active
    });
    const handleClick = () => {
      if (!props.disabled) {
        rootMenu.handleMenuItemClick({
          index: props.index,
          indexPath: indexPath.value,
          route: props.route
        });
        emit("click", item);
      }
    };
    onMounted(() => {
      subMenu.addSubMenu(item);
      rootMenu.addMenuItem(item);
    });
    onBeforeUnmount(() => {
      subMenu.removeSubMenu(item);
      rootMenu.removeMenuItem(item);
    });
    return {
      parentMenu,
      rootMenu,
      active,
      nsMenu,
      nsMenuItem,
      handleClick
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tooltip = resolveComponent("el-tooltip");
  return openBlock(), createElementBlock("li", {
    class: normalizeClass([
      _ctx.nsMenuItem.b(),
      _ctx.nsMenuItem.is("active", _ctx.active),
      _ctx.nsMenuItem.is("disabled", _ctx.disabled)
    ]),
    role: "menuitem",
    tabindex: "-1",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    _ctx.parentMenu.type.name === "ElMenu" && _ctx.rootMenu.props.collapse && _ctx.$slots.title ? (openBlock(), createBlock(_component_el_tooltip, {
      key: 0,
      effect: _ctx.rootMenu.props.popperEffect,
      placement: "right",
      "fallback-placements": ["left"],
      persistent: ""
    }, {
      content: withCtx(() => [
        renderSlot(_ctx.$slots, "title")
      ]),
      default: withCtx(() => [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.nsMenu.be("tooltip", "trigger"))
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2)
      ]),
      _: 3
    }, 8, ["effect"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
      renderSlot(_ctx.$slots, "default"),
      renderSlot(_ctx.$slots, "title")
    ], 64))
  ], 2);
}
var MenuItem2 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$1], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-item.vue"]]);
const menuItemGroupProps = {
  title: String
};
const COMPONENT_NAME = "ElMenuItemGroup";
const _sfc_main$5 = defineComponent({
  name: COMPONENT_NAME,
  props: menuItemGroupProps,
  setup() {
    const ns = useNamespace("menu-item-group");
    return {
      ns
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", {
    class: normalizeClass(_ctx.ns.b())
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.ns.e("title"))
    }, [
      !_ctx.$slots.title ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        createTextVNode(toDisplayString(_ctx.title), 1)
      ], 64)) : renderSlot(_ctx.$slots, "title", { key: 1 })
    ], 2),
    createBaseVNode("ul", null, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 2);
}
var MenuItemGroup = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-item-group.vue"]]);
const ElMenu = withInstall(Menu2, {
  MenuItem: MenuItem2,
  MenuItemGroup,
  SubMenu: SubMenu2
});
const ElMenuItem = withNoopInstall(MenuItem2);
withNoopInstall(MenuItemGroup);
withNoopInstall(SubMenu2);
const elMenu = "";
const elMenuItem = "";
const _hoisted_1$4 = { key: 0 };
const _sfc_main$4 = {
  __name: "nextMenu",
  props: {
    nextMenuList: Object
  },
  setup(__props) {
    const props = __props;
    onBeforeMount(() => {
      reactive(props.nextMenuList);
    });
    const hasChildren = (item) => {
      return item.children && !item.children.every((item2) => item2.meta.hidden);
    };
    return (_ctx, _cache) => {
      const _component_el_menu_item = ElMenuItem;
      const _component_el_icon = ElIcon;
      return openBlock(), createElementBlock(Fragment, null, [
        __props.nextMenuList.length <= 0 ? (openBlock(), createElementBlock("div", _hoisted_1$4, " 没有子级菜单 ")) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.nextMenuList, (navItem) => {
          return openBlock(), createElementBlock(Fragment, { key: navItem }, [
            hasChildren(navItem) ? (openBlock(), createBlock(_component_el_menu_item, {
              key: 0,
              index: navItem.path
            }, {
              default: withCtx(() => [
                createTextVNode(" 有子 ")
              ]),
              _: 2
            }, 1032, ["index"])) : (openBlock(), createBlock(_component_el_menu_item, {
              key: 1,
              index: navItem.path
            }, {
              title: withCtx(() => [
                createBaseVNode("span", null, toDisplayString(navItem.name), 1)
              ]),
              default: withCtx(() => [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(navItem.meta.icon.replace("el-icon-", "") || "user")))
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1032, ["index"]))
          ], 64);
        }), 128))
      ], 64);
    };
  }
};
const elBreadcrumb = "";
const topBar_vue_vue_type_style_index_0_scoped_96b8d78e_lang = "";
const _hoisted_1$3 = { class: "top-bar" };
const _hoisted_2$2 = { class: "left-panel" };
const _hoisted_3$1 = { class: "right-panel" };
const _sfc_main$3 = {
  __name: "topBar",
  setup(__props) {
    let route = useRoute();
    let router = useRouter();
    let hash = ref([]);
    watch(() => router.currentRoute.value.path, () => {
      hash.value = route.meta.breadcrumb;
    }, { immediate: true });
    return (_ctx, _cache) => {
      const _component_el_icon = ElIcon;
      const _component_el_breadcrumb = ElBreadcrumb;
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", _hoisted_2$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(hash), (item) => {
            return openBlock(), createBlock(_component_el_breadcrumb, {
              key: item.path
            }, {
              default: withCtx(() => [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(item.meta.icon.replace("el-icon-", ""))))
                  ]),
                  _: 2
                }, 1024),
                createTextVNode(" " + toDisplayString(item.name), 1)
              ]),
              _: 2
            }, 1024);
          }), 128))
        ]),
        createBaseVNode("div", _hoisted_3$1, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])
      ]);
    };
  }
};
const topBar = /* @__PURE__ */ _export_sfc$1(_sfc_main$3, [["__scopeId", "data-v-96b8d78e"]]);
const userBar_vue_vue_type_style_index_0_scoped_87a6609e_lang = "";
const _hoisted_1$2 = { class: "user-bar" };
const _hoisted_2$1 = { key: 0 };
const _sfc_main$2 = {
  __name: "userBar",
  setup(__props) {
    let websocket = reactive(null);
    let token = localStorage.getItem("TOKEN");
    let socketNum = ref(0);
    onBeforeMount(() => {
      socketNum.value = localStorage.getItem("socketNum");
      websocket = new WebSocket("ws://uat.crm.xuexiluxian.cn/crm/websocket", token);
      websocket.onopen = () => {
        console.log("链接成功");
      };
      websocket.onmessage = (e) => {
        console.log(e);
        if (e.isTrusted) {
          socketNum.value++;
          localStorage.setItem("socketNum", socketNum.value);
        }
      };
    });
    const down = () => {
      electron.ipcRenderer.invoke("renderer-to-main", {
        name: "open-window-down"
      });
    };
    const min = () => {
      electron.ipcRenderer.invoke("renderer-to-main", {
        name: "min-window"
      });
    };
    const max = () => {
      utils.Fullscreen();
    };
    const close = () => {
      electron.ipcRenderer.invoke("renderer-to-main", {
        name: "quit-window"
      });
    };
    const chat = () => {
      electron.ipcRenderer.invoke("renderer-to-main", {
        name: "chat"
      });
      localStorage.removeItem("socketNum");
      socketNum.value = 0;
    };
    return (_ctx, _cache) => {
      const _component_Minus = resolveComponent("Minus");
      const _component_el_icon = ElIcon;
      const _component_FullScreen = resolveComponent("FullScreen");
      const _component_Close = resolveComponent("Close");
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", {
          class: "panel-item",
          onClick: chat
        }, [
          createTextVNode(" 聊天通信 "),
          unref(socketNum) ? (openBlock(), createElementBlock("span", _hoisted_2$1, " [" + toDisplayString(unref(socketNum)) + "] ", 1)) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", {
          class: "panel-item",
          onClick: down
        }, "异步下载"),
        createBaseVNode("div", {
          class: "panel-item",
          onClick: min
        }, [
          createVNode(_component_el_icon, null, {
            default: withCtx(() => [
              createVNode(_component_Minus)
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", {
          class: "panel-item",
          onClick: max
        }, [
          createVNode(_component_el_icon, null, {
            default: withCtx(() => [
              createVNode(_component_FullScreen)
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", {
          class: "panel-item",
          onClick: close
        }, [
          createVNode(_component_el_icon, null, {
            default: withCtx(() => [
              createVNode(_component_Close)
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
};
const userBar = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["__scopeId", "data-v-87a6609e"]]);
const useTagStore = defineStore("tagId", {
  state: () => {
    return {
      tagList: [
        { name: "仪表盘", path: "/dashboard" }
      ]
    };
  },
  actions: {
    //添加标签
    addTag(route) {
      let { name, path } = route;
      let pathIndex = this.tagList.findIndex((item) => item.path);
      let target = this.tagList.find((item) => item.path == route.path);
      let isName = route.name;
      if (!target && isName) {
        if (pathIndex == -1) {
          this.tagList.push({ name, path });
        } else {
          this.tagList.splice(pathIndex + 1, 0, { name, path });
        }
      }
    },
    //删除标签
    delTag(route) {
      if (this.tagList.length == 1)
        return;
      this.tagList.forEach((item, index2) => {
        if (item.path == route.path) {
          this.tagList.splice(index2, 1);
        }
      });
    }
  }
});
const useKeepStore = defineStore("keepId", {
  state: () => {
    return {
      //要缓存的组件名称
      keepAliveRoute: []
    };
  },
  getters: {},
  actions: {
    pushKeepAlive(name) {
      if (!this.keepAliveRoute.includes(name)) {
        this.keepAliveRoute.push(name);
      }
    }
  }
});
const _hoisted_1$1 = { class: "adminui-tags" };
const _sfc_main$1 = {
  __name: "tags",
  setup(__props) {
    let router = useRouter();
    let tagStore = useTagStore();
    let keepStore = useKeepStore();
    let tagList = ref([]);
    let toPath = ref({});
    onBeforeMount(() => {
      tagList.value = tagStore.tagList;
    });
    const addTag = (val) => {
      tagStore.addTag(val);
    };
    const delTag = (item) => {
      tagStore.delTag(item);
    };
    watch(() => router.currentRoute.value, (newVal) => {
      toPath.value = newVal;
      addTag(newVal);
      keepStore.pushKeepAlive(newVal.name);
    }, { immediate: true });
    return (_ctx, _cache) => {
      const _component_close = resolveComponent("close");
      const _component_el_icon = ElIcon;
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("ul", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(tagList), (item) => {
            return openBlock(), createElementBlock("li", {
              key: item.path,
              class: normalizeClass(item.path == unref(toPath).path ? "active" : "")
            }, [
              createVNode(_component_router_link, {
                to: item.path
              }, {
                default: withCtx(() => [
                  createBaseVNode("span", null, toDisplayString(item.name), 1),
                  item.path != "/dashboard" ? (openBlock(), createBlock(_component_el_icon, {
                    key: 0,
                    onClick: withModifiers(($event) => delTag(item), ["prevent", "stop"])
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_close)
                    ]),
                    _: 2
                  }, 1032, ["onClick"])) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["to"])
            ], 2);
          }), 128))
        ])
      ]);
    };
  }
};
const index_vue_vue_type_style_index_0_scoped_2dd9256c_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-2dd9256c"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "container" };
const _hoisted_2 = { class: "slider-split" };
const _hoisted_3 = { class: "slider-split-t aminui-side-split-top" };
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", { src: _imports_0 }, null, -1));
const _hoisted_5 = { class: "slider-split-scroll" };
const _hoisted_6 = ["onClick"];
const _hoisted_7 = {
  key: 0,
  class: "adminui-side-top"
};
const _hoisted_8 = { class: "adminui-side-scroll" };
const _hoisted_9 = { class: "main" };
const _hoisted_10 = { class: "content" };
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let menuStore = useMenuStore();
    let keepStore = useKeepStore();
    const { keepAliveRoute } = storeToRefs(keepStore);
    let route = useRoute();
    let pmenu = ref(null);
    let menu = ref([]);
    let nextMenuList = ref([]);
    onBeforeMount(() => {
      menu.value = menuStore.menuList;
      console.log(menu.value);
      showRouter();
    });
    const showMenu = (item) => {
      pmenu.value = item;
      nextMenuList.value = pmenu.value.children;
    };
    const showRouter = () => {
      pmenu.value = route.meta.breadcrumb ? route.meta.breadcrumb[0] : {};
      nextMenuList.value = pmenu.value.children;
    };
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_el_icon = ElIcon;
      const _component_el_scrollbar = ElScrollbar;
      const _component_el_menu = ElMenu;
      const _component_Expand = resolveComponent("Expand");
      const _component_Fold = resolveComponent("Fold");
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(_component_router_link, { to: "/" }, {
              default: withCtx(() => [
                _hoisted_4
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_5, [
            createVNode(_component_el_scrollbar, null, {
              default: withCtx(() => [
                createBaseVNode("ul", null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(menu), (item) => {
                    return openBlock(), createElementBlock("li", {
                      onClick: ($event) => showMenu(item),
                      class: normalizeClass(unref(pmenu).path == item.path ? "active" : "")
                    }, [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(item.meta.icon.replace("el-icon-", ""))))
                        ]),
                        _: 2
                      }, 1024),
                      createBaseVNode("span", null, toDisplayString(item.name), 1)
                    ], 10, _hoisted_6);
                  }), 256))
                ])
              ]),
              _: 1
            })
          ])
        ]),
        createBaseVNode("div", {
          class: normalizeClass(unref(menuStore).menuIsCollapse ? "aminui-side isCollapse" : "aminui-side")
        }, [
          !unref(menuStore).menuIsCollapse ? (openBlock(), createElementBlock("div", _hoisted_7, [
            createBaseVNode("h2", null, toDisplayString(unref(pmenu).name), 1)
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_8, [
            createVNode(_component_el_scrollbar, null, {
              default: withCtx(() => [
                createVNode(_component_el_menu, {
                  router: "",
                  collapse: unref(menuStore).menuIsCollapse
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$4, { nextMenuList: unref(nextMenuList) }, null, 8, ["nextMenuList"])
                  ]),
                  _: 1
                }, 8, ["collapse"])
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", {
            class: "adminui-side-bottom",
            onClick: _cache[0] || (_cache[0] = (...args) => unref(menuStore).toggle_nextMenu && unref(menuStore).toggle_nextMenu(...args))
          }, [
            createVNode(_component_el_icon, null, {
              default: withCtx(() => [
                unref(menuStore).menuIsCollapse ? (openBlock(), createBlock(_component_Expand, { key: 0 })) : (openBlock(), createBlock(_component_Fold, { key: 1 }))
              ]),
              _: 1
            })
          ])
        ], 2),
        createBaseVNode("div", _hoisted_9, [
          createVNode(topBar, null, {
            default: withCtx(() => [
              createVNode(userBar)
            ]),
            _: 1
          }),
          createVNode(_sfc_main$1),
          createBaseVNode("div", _hoisted_10, [
            createVNode(_component_router_view, null, {
              default: withCtx(({ Component }) => [
                (openBlock(), createBlock(KeepAlive, { include: unref(keepAliveRoute) }, [
                  (openBlock(), createBlock(resolveDynamicComponent(Component), {
                    key: unref(route).path
                  }))
                ], 1032, ["include"]))
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
};
const index = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__scopeId", "data-v-2dd9256c"]]);
export {
  index as default
};
