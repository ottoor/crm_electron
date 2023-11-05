import { aV as isClient, aW as isObject, b as buildProps, g as definePropType, O as mutable, d as defineComponent, j as inject, B as computed, u as useNamespace, al as isNumber, R as isObject$1, a as openBlock, l as createBlock, w as withCtx, e as renderSlot, n as normalizeClass, f as unref, aa as normalizeStyle, m as resolveDynamicComponent, _ as _export_sfc, q as withInstall, aX as markRaw, aY as full_screen_default, aZ as scale_to_original_default, af as useLocale, a_ as useZIndex, r as ref, a$ as effectScope, au as shallowRef, G as watch, U as nextTick, o as onMounted, a0 as createVNode, k as createBaseVNode, a4 as withModifiers, Z as createCommentVNode, E as ElIcon, aq as close_default, c as createElementBlock, M as Fragment, az as arrow_left_default, D as arrow_right_default, b0 as zoom_out_default, aM as zoom_in_default, b1 as refresh_left_default, b2 as refresh_right_default, $ as renderList, K as withDirectives, L as vShow, T as Transition, b3 as Teleport, ac as useEventListener, v as EVENT_CODE, b4 as keysOf, b5 as useAttrs, t as toDisplayString, x as mergeProps, b6 as isElement, J as isString, b7 as useThrottleFn, F as reactive, Y as onBeforeMount, b8 as captchaImg, ap as withKeys, ao as isRef, X as createTextVNode, b9 as loginByJson } from "./index-575c9104.js";
import { E as ElForm, a as ElFormItem } from "./el-form-item-94e096cf.js";
import { E as ElButton } from "./el-button-5c456a10.js";
import { E as ElCheckbox } from "./el-checkbox-0e351c79.js";
import { u as useAttrs$1, E as ElInput } from "./el-input-bdf12b29.js";
import { D as Decrypt, E as Encrypt, u as useLogin } from "./useLogin-51b7b3c2.js";
import { d as debounce } from "./debounce-c9ded561.js";
import { g as getScrollContainer } from "./scroll-f89ecc33.js";
import "./index-0b8d8a8b.js";
import "./_baseClone-3f8b9b37.js";
import "./_initCloneObject-9695a491.js";
import "./event-28e3832c.js";
import "./isEqual-75679068.js";
import "./hasIn-13300d7d.js";
import "./_commonjs-dynamic-modules-58f2b0ec.js";
const isInContainer = (el, container) => {
  if (!isClient || !el || !container)
    return false;
  const elRect = el.getBoundingClientRect();
  let containerRect;
  if (container instanceof Element) {
    containerRect = container.getBoundingClientRect();
  } else {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    };
  }
  return elRect.top < containerRect.bottom && elRect.bottom > containerRect.top && elRect.right > containerRect.left && elRect.left < containerRect.right;
};
var FUNC_ERROR_TEXT = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
const rowContextKey = Symbol("rowContextKey");
const colProps = buildProps({
  tag: {
    type: String,
    default: "div"
  },
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  pull: {
    type: Number,
    default: 0
  },
  push: {
    type: Number,
    default: 0
  },
  xs: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  sm: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  md: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  lg: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  xl: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  }
});
const __default__$2 = defineComponent({
  name: "ElCol"
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...__default__$2,
  props: colProps,
  setup(__props) {
    const props = __props;
    const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) });
    const ns = useNamespace("col");
    const style = computed(() => {
      const styles = {};
      if (gutter.value) {
        styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`;
      }
      return styles;
    });
    const colKls = computed(() => {
      const classes = [];
      const pos = ["span", "offset", "pull", "push"];
      pos.forEach((prop) => {
        const size = props[prop];
        if (isNumber(size)) {
          if (prop === "span")
            classes.push(ns.b(`${props[prop]}`));
          else if (size > 0)
            classes.push(ns.b(`${prop}-${props[prop]}`));
        }
      });
      const sizes = ["xs", "sm", "md", "lg", "xl"];
      sizes.forEach((size) => {
        if (isNumber(props[size])) {
          classes.push(ns.b(`${size}-${props[size]}`));
        } else if (isObject$1(props[size])) {
          Object.entries(props[size]).forEach(([prop, sizeProp]) => {
            classes.push(prop !== "span" ? ns.b(`${size}-${prop}-${sizeProp}`) : ns.b(`${size}-${sizeProp}`));
          });
        }
      });
      if (gutter.value) {
        classes.push(ns.is("guttered"));
      }
      return [ns.b(), classes];
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        class: normalizeClass(unref(colKls)),
        style: normalizeStyle(unref(style))
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class", "style"]);
    };
  }
});
var Col = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/col/src/col.vue"]]);
const ElCol = withInstall(Col);
const imageViewerProps = buildProps({
  urlList: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  zIndex: {
    type: Number
  },
  initialIndex: {
    type: Number,
    default: 0
  },
  infinite: {
    type: Boolean,
    default: true
  },
  hideOnClickModal: Boolean,
  teleported: Boolean,
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  zoomRate: {
    type: Number,
    default: 1.2
  },
  minScale: {
    type: Number,
    default: 0.2
  },
  maxScale: {
    type: Number,
    default: 7
  }
});
const imageViewerEmits = {
  close: () => true,
  switch: (index) => isNumber(index),
  rotate: (deg) => isNumber(deg)
};
const _hoisted_1$2 = ["src"];
const __default__$1 = defineComponent({
  name: "ElImageViewer"
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: imageViewerProps,
  emits: imageViewerEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const modes = {
      CONTAIN: {
        name: "contain",
        icon: markRaw(full_screen_default)
      },
      ORIGINAL: {
        name: "original",
        icon: markRaw(scale_to_original_default)
      }
    };
    const { t } = useLocale();
    const ns = useNamespace("image-viewer");
    const { nextZIndex } = useZIndex();
    const wrapper = ref();
    const imgRefs = ref([]);
    const scopeEventListener = effectScope();
    const loading = ref(true);
    const activeIndex = ref(props.initialIndex);
    const mode = shallowRef(modes.CONTAIN);
    const transform = ref({
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: false
    });
    const isSingle = computed(() => {
      const { urlList } = props;
      return urlList.length <= 1;
    });
    const isFirst = computed(() => {
      return activeIndex.value === 0;
    });
    const isLast = computed(() => {
      return activeIndex.value === props.urlList.length - 1;
    });
    const currentImg = computed(() => {
      return props.urlList[activeIndex.value];
    });
    const arrowPrevKls = computed(() => [
      ns.e("btn"),
      ns.e("prev"),
      ns.is("disabled", !props.infinite && isFirst.value)
    ]);
    const arrowNextKls = computed(() => [
      ns.e("btn"),
      ns.e("next"),
      ns.is("disabled", !props.infinite && isLast.value)
    ]);
    const imgStyle = computed(() => {
      const { scale, deg, offsetX, offsetY, enableTransition } = transform.value;
      let translateX = offsetX / scale;
      let translateY = offsetY / scale;
      switch (deg % 360) {
        case 90:
        case -270:
          [translateX, translateY] = [translateY, -translateX];
          break;
        case 180:
        case -180:
          [translateX, translateY] = [-translateX, -translateY];
          break;
        case 270:
        case -90:
          [translateX, translateY] = [-translateY, translateX];
          break;
      }
      const style = {
        transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
        transition: enableTransition ? "transform .3s" : ""
      };
      if (mode.value.name === modes.CONTAIN.name) {
        style.maxWidth = style.maxHeight = "100%";
      }
      return style;
    });
    const computedZIndex = computed(() => {
      return isNumber(props.zIndex) ? props.zIndex : nextZIndex();
    });
    function hide() {
      unregisterEventListener();
      emit("close");
    }
    function registerEventListener() {
      const keydownHandler = throttle((e) => {
        switch (e.code) {
          case EVENT_CODE.esc:
            props.closeOnPressEscape && hide();
            break;
          case EVENT_CODE.space:
            toggleMode();
            break;
          case EVENT_CODE.left:
            prev();
            break;
          case EVENT_CODE.up:
            handleActions("zoomIn");
            break;
          case EVENT_CODE.right:
            next();
            break;
          case EVENT_CODE.down:
            handleActions("zoomOut");
            break;
        }
      });
      const mousewheelHandler = throttle((e) => {
        const delta = e.deltaY || e.deltaX;
        handleActions(delta < 0 ? "zoomIn" : "zoomOut", {
          zoomRate: props.zoomRate,
          enableTransition: false
        });
      });
      scopeEventListener.run(() => {
        useEventListener(document, "keydown", keydownHandler);
        useEventListener(document, "wheel", mousewheelHandler);
      });
    }
    function unregisterEventListener() {
      scopeEventListener.stop();
    }
    function handleImgLoad() {
      loading.value = false;
    }
    function handleImgError(e) {
      loading.value = false;
      e.target.alt = t("el.image.error");
    }
    function handleMouseDown(e) {
      if (loading.value || e.button !== 0 || !wrapper.value)
        return;
      transform.value.enableTransition = false;
      const { offsetX, offsetY } = transform.value;
      const startX = e.pageX;
      const startY = e.pageY;
      const dragHandler = throttle((ev) => {
        transform.value = {
          ...transform.value,
          offsetX: offsetX + ev.pageX - startX,
          offsetY: offsetY + ev.pageY - startY
        };
      });
      const removeMousemove = useEventListener(document, "mousemove", dragHandler);
      useEventListener(document, "mouseup", () => {
        removeMousemove();
      });
      e.preventDefault();
    }
    function reset() {
      transform.value = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      };
    }
    function toggleMode() {
      if (loading.value)
        return;
      const modeNames = keysOf(modes);
      const modeValues = Object.values(modes);
      const currentMode = mode.value.name;
      const index = modeValues.findIndex((i) => i.name === currentMode);
      const nextIndex = (index + 1) % modeNames.length;
      mode.value = modes[modeNames[nextIndex]];
      reset();
    }
    function setActiveItem(index) {
      const len = props.urlList.length;
      activeIndex.value = (index + len) % len;
    }
    function prev() {
      if (isFirst.value && !props.infinite)
        return;
      setActiveItem(activeIndex.value - 1);
    }
    function next() {
      if (isLast.value && !props.infinite)
        return;
      setActiveItem(activeIndex.value + 1);
    }
    function handleActions(action, options = {}) {
      if (loading.value)
        return;
      const { minScale, maxScale } = props;
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: props.zoomRate,
        rotateDeg: 90,
        enableTransition: true,
        ...options
      };
      switch (action) {
        case "zoomOut":
          if (transform.value.scale > minScale) {
            transform.value.scale = Number.parseFloat((transform.value.scale / zoomRate).toFixed(3));
          }
          break;
        case "zoomIn":
          if (transform.value.scale < maxScale) {
            transform.value.scale = Number.parseFloat((transform.value.scale * zoomRate).toFixed(3));
          }
          break;
        case "clockwise":
          transform.value.deg += rotateDeg;
          emit("rotate", transform.value.deg);
          break;
        case "anticlockwise":
          transform.value.deg -= rotateDeg;
          emit("rotate", transform.value.deg);
          break;
      }
      transform.value.enableTransition = enableTransition;
    }
    watch(currentImg, () => {
      nextTick(() => {
        const $img = imgRefs.value[0];
        if (!($img == null ? void 0 : $img.complete)) {
          loading.value = true;
        }
      });
    });
    watch(activeIndex, (val) => {
      reset();
      emit("switch", val);
    });
    onMounted(() => {
      var _a, _b;
      registerEventListener();
      (_b = (_a = wrapper.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    });
    expose({
      setActiveItem
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, {
        to: "body",
        disabled: !_ctx.teleported
      }, [
        createVNode(Transition, {
          name: "viewer-fade",
          appear: ""
        }, {
          default: withCtx(() => [
            createBaseVNode("div", {
              ref_key: "wrapper",
              ref: wrapper,
              tabindex: -1,
              class: normalizeClass(unref(ns).e("wrapper")),
              style: normalizeStyle({ zIndex: unref(computedZIndex) })
            }, [
              createBaseVNode("div", {
                class: normalizeClass(unref(ns).e("mask")),
                onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.hideOnClickModal && hide(), ["self"]))
              }, null, 2),
              createCommentVNode(" CLOSE "),
              createBaseVNode("span", {
                class: normalizeClass([unref(ns).e("btn"), unref(ns).e("close")]),
                onClick: hide
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(close_default))
                  ]),
                  _: 1
                })
              ], 2),
              createCommentVNode(" ARROW "),
              !unref(isSingle) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createBaseVNode("span", {
                  class: normalizeClass(unref(arrowPrevKls)),
                  onClick: prev
                }, [
                  createVNode(unref(ElIcon), null, {
                    default: withCtx(() => [
                      createVNode(unref(arrow_left_default))
                    ]),
                    _: 1
                  })
                ], 2),
                createBaseVNode("span", {
                  class: normalizeClass(unref(arrowNextKls)),
                  onClick: next
                }, [
                  createVNode(unref(ElIcon), null, {
                    default: withCtx(() => [
                      createVNode(unref(arrow_right_default))
                    ]),
                    _: 1
                  })
                ], 2)
              ], 64)) : createCommentVNode("v-if", true),
              createCommentVNode(" ACTIONS "),
              createBaseVNode("div", {
                class: normalizeClass([unref(ns).e("btn"), unref(ns).e("actions")])
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(unref(ns).e("actions__inner"))
                }, [
                  createVNode(unref(ElIcon), {
                    onClick: _cache[1] || (_cache[1] = ($event) => handleActions("zoomOut"))
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(zoom_out_default))
                    ]),
                    _: 1
                  }),
                  createVNode(unref(ElIcon), {
                    onClick: _cache[2] || (_cache[2] = ($event) => handleActions("zoomIn"))
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(zoom_in_default))
                    ]),
                    _: 1
                  }),
                  createBaseVNode("i", {
                    class: normalizeClass(unref(ns).e("actions__divider"))
                  }, null, 2),
                  createVNode(unref(ElIcon), { onClick: toggleMode }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(unref(mode).icon)))
                    ]),
                    _: 1
                  }),
                  createBaseVNode("i", {
                    class: normalizeClass(unref(ns).e("actions__divider"))
                  }, null, 2),
                  createVNode(unref(ElIcon), {
                    onClick: _cache[3] || (_cache[3] = ($event) => handleActions("anticlockwise"))
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(refresh_left_default))
                    ]),
                    _: 1
                  }),
                  createVNode(unref(ElIcon), {
                    onClick: _cache[4] || (_cache[4] = ($event) => handleActions("clockwise"))
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(refresh_right_default))
                    ]),
                    _: 1
                  })
                ], 2)
              ], 2),
              createCommentVNode(" CANVAS "),
              createBaseVNode("div", {
                class: normalizeClass(unref(ns).e("canvas"))
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.urlList, (url, i) => {
                  return withDirectives((openBlock(), createElementBlock("img", {
                    ref_for: true,
                    ref: (el) => imgRefs.value[i] = el,
                    key: url,
                    src: url,
                    style: normalizeStyle(unref(imgStyle)),
                    class: normalizeClass(unref(ns).e("img")),
                    onLoad: handleImgLoad,
                    onError: handleImgError,
                    onMousedown: handleMouseDown
                  }, null, 46, _hoisted_1$2)), [
                    [vShow, i === activeIndex.value]
                  ]);
                }), 128))
              ], 2),
              renderSlot(_ctx.$slots, "default")
            ], 6)
          ]),
          _: 3
        })
      ], 8, ["disabled"]);
    };
  }
});
var ImageViewer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/image-viewer/src/image-viewer.vue"]]);
const ElImageViewer = withInstall(ImageViewer);
const imageProps = buildProps({
  hideOnClickModal: Boolean,
  src: {
    type: String,
    default: ""
  },
  fit: {
    type: String,
    values: ["", "contain", "cover", "fill", "none", "scale-down"],
    default: ""
  },
  loading: {
    type: String,
    values: ["eager", "lazy"]
  },
  lazy: Boolean,
  scrollContainer: {
    type: definePropType([String, Object])
  },
  previewSrcList: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  previewTeleported: Boolean,
  zIndex: {
    type: Number
  },
  initialIndex: {
    type: Number,
    default: 0
  },
  infinite: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  zoomRate: {
    type: Number,
    default: 1.2
  },
  minScale: {
    type: Number,
    default: 0.2
  },
  maxScale: {
    type: Number,
    default: 7
  }
});
const imageEmits = {
  load: (evt) => evt instanceof Event,
  error: (evt) => evt instanceof Event,
  switch: (val) => isNumber(val),
  close: () => true,
  show: () => true
};
const _hoisted_1$1 = ["src", "loading"];
const _hoisted_2 = { key: 0 };
const __default__ = defineComponent({
  name: "ElImage",
  inheritAttrs: false
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: imageProps,
  emits: imageEmits,
  setup(__props, { emit }) {
    const props = __props;
    let prevOverflow = "";
    const { t } = useLocale();
    const ns = useNamespace("image");
    const rawAttrs = useAttrs();
    const attrs = useAttrs$1();
    const imageSrc = ref();
    const hasLoadError = ref(false);
    const isLoading = ref(true);
    const showViewer = ref(false);
    const container = ref();
    const _scrollContainer = ref();
    const supportLoading = isClient && "loading" in HTMLImageElement.prototype;
    let stopScrollListener;
    let stopWheelListener;
    const imageKls = computed(() => [
      ns.e("inner"),
      preview.value && ns.e("preview"),
      isLoading.value && ns.is("loading")
    ]);
    const containerStyle = computed(() => rawAttrs.style);
    const imageStyle = computed(() => {
      const { fit } = props;
      if (isClient && fit) {
        return { objectFit: fit };
      }
      return {};
    });
    const preview = computed(() => {
      const { previewSrcList } = props;
      return Array.isArray(previewSrcList) && previewSrcList.length > 0;
    });
    const imageIndex = computed(() => {
      const { previewSrcList, initialIndex } = props;
      let previewIndex = initialIndex;
      if (initialIndex > previewSrcList.length - 1) {
        previewIndex = 0;
      }
      return previewIndex;
    });
    const isManual = computed(() => {
      if (props.loading === "eager")
        return false;
      return !supportLoading && props.loading === "lazy" || props.lazy;
    });
    const loadImage = () => {
      if (!isClient)
        return;
      isLoading.value = true;
      hasLoadError.value = false;
      imageSrc.value = props.src;
    };
    function handleLoad(event) {
      isLoading.value = false;
      hasLoadError.value = false;
      emit("load", event);
    }
    function handleError(event) {
      isLoading.value = false;
      hasLoadError.value = true;
      emit("error", event);
    }
    function handleLazyLoad() {
      if (isInContainer(container.value, _scrollContainer.value)) {
        loadImage();
        removeLazyLoadListener();
      }
    }
    const lazyLoadHandler = useThrottleFn(handleLazyLoad, 200, true);
    async function addLazyLoadListener() {
      var _a;
      if (!isClient)
        return;
      await nextTick();
      const { scrollContainer } = props;
      if (isElement(scrollContainer)) {
        _scrollContainer.value = scrollContainer;
      } else if (isString(scrollContainer) && scrollContainer !== "") {
        _scrollContainer.value = (_a = document.querySelector(scrollContainer)) != null ? _a : void 0;
      } else if (container.value) {
        _scrollContainer.value = getScrollContainer(container.value);
      }
      if (_scrollContainer.value) {
        stopScrollListener = useEventListener(_scrollContainer, "scroll", lazyLoadHandler);
        setTimeout(() => handleLazyLoad(), 100);
      }
    }
    function removeLazyLoadListener() {
      if (!isClient || !_scrollContainer.value || !lazyLoadHandler)
        return;
      stopScrollListener == null ? void 0 : stopScrollListener();
      _scrollContainer.value = void 0;
    }
    function wheelHandler(e) {
      if (!e.ctrlKey)
        return;
      if (e.deltaY < 0) {
        e.preventDefault();
        return false;
      } else if (e.deltaY > 0) {
        e.preventDefault();
        return false;
      }
    }
    function clickHandler() {
      if (!preview.value)
        return;
      stopWheelListener = useEventListener("wheel", wheelHandler, {
        passive: false
      });
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      showViewer.value = true;
      emit("show");
    }
    function closeViewer() {
      stopWheelListener == null ? void 0 : stopWheelListener();
      document.body.style.overflow = prevOverflow;
      showViewer.value = false;
      emit("close");
    }
    function switchViewer(val) {
      emit("switch", val);
    }
    watch(() => props.src, () => {
      if (isManual.value) {
        isLoading.value = true;
        hasLoadError.value = false;
        removeLazyLoadListener();
        addLazyLoadListener();
      } else {
        loadImage();
      }
    });
    onMounted(() => {
      if (isManual.value) {
        addLazyLoadListener();
      } else {
        loadImage();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "container",
        ref: container,
        class: normalizeClass([unref(ns).b(), _ctx.$attrs.class]),
        style: normalizeStyle(unref(containerStyle))
      }, [
        hasLoadError.value ? renderSlot(_ctx.$slots, "error", { key: 0 }, () => [
          createBaseVNode("div", {
            class: normalizeClass(unref(ns).e("error"))
          }, toDisplayString(unref(t)("el.image.error")), 3)
        ]) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          imageSrc.value !== void 0 ? (openBlock(), createElementBlock("img", mergeProps({ key: 0 }, unref(attrs), {
            src: imageSrc.value,
            loading: _ctx.loading,
            style: unref(imageStyle),
            class: unref(imageKls),
            onClick: clickHandler,
            onLoad: handleLoad,
            onError: handleError
          }), null, 16, _hoisted_1$1)) : createCommentVNode("v-if", true),
          isLoading.value ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(unref(ns).e("wrapper"))
          }, [
            renderSlot(_ctx.$slots, "placeholder", {}, () => [
              createBaseVNode("div", {
                class: normalizeClass(unref(ns).e("placeholder"))
              }, null, 2)
            ])
          ], 2)) : createCommentVNode("v-if", true)
        ], 64)),
        unref(preview) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          showViewer.value ? (openBlock(), createBlock(unref(ElImageViewer), {
            key: 0,
            "z-index": _ctx.zIndex,
            "initial-index": unref(imageIndex),
            infinite: _ctx.infinite,
            "zoom-rate": _ctx.zoomRate,
            "min-scale": _ctx.minScale,
            "max-scale": _ctx.maxScale,
            "url-list": _ctx.previewSrcList,
            "hide-on-click-modal": _ctx.hideOnClickModal,
            teleported: _ctx.previewTeleported,
            "close-on-press-escape": _ctx.closeOnPressEscape,
            onClose: closeViewer,
            onSwitch: switchViewer
          }, {
            default: withCtx(() => [
              _ctx.$slots.viewer ? (openBlock(), createElementBlock("div", _hoisted_2, [
                renderSlot(_ctx.$slots, "viewer")
              ])) : createCommentVNode("v-if", true)
            ]),
            _: 3
          }, 8, ["z-index", "initial-index", "infinite", "zoom-rate", "min-scale", "max-scale", "url-list", "hide-on-click-modal", "teleported", "close-on-press-escape"])) : createCommentVNode("v-if", true)
        ], 64)) : createCommentVNode("v-if", true)
      ], 6);
    };
  }
});
var Image = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/image/src/image.vue"]]);
const ElImage = withInstall(Image);
const elCol = "";
const elImage = "";
const elImageViewer = "";
function useMemoPassword() {
  let memoVal = ref(localStorage.getItem("memoPassword") == "true" ? true : false);
  const onMemoPassword = (value) => {
    localStorage.setItem("memoPassword", memoVal.value = value);
  };
  return {
    memoVal,
    onMemoPassword
  };
}
const User_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = { class: "boxCode" };
const _sfc_main = {
  __name: "User",
  setup(__props) {
    const form = reactive({
      username: "",
      password: "",
      captcha: ""
    });
    const rules = reactive({});
    let captcha = reactive({
      url: "",
      key: ""
    });
    onBeforeMount(() => {
      let userPwd = localStorage.getItem("user-pwd");
      if (userPwd) {
        let { username, password } = JSON.parse(localStorage.getItem("user-pwd"));
        form.username = Decrypt(username);
        form.password = Decrypt(password);
      }
      getCodeApi();
    });
    const getCodeApi = async () => {
      const key = (/* @__PURE__ */ new Date()).getTime().toString();
      captcha.key = key;
      const res = await captchaImg({ key });
      let blob = new Blob([res], { type: "application/vnd.ms-excel" });
      let imgUrl = URL.createObjectURL(blob);
      captcha.url = imgUrl;
    };
    const login = async () => {
      let res = await loginByJson({
        username: Encrypt(form.username),
        password: Encrypt(form.password),
        key: captcha.key,
        captcha: form.captcha
      });
      if (res.code == 200) {
        useLogin(res.data);
        setMemoPassword();
      }
    };
    let { memoVal, onMemoPassword } = useMemoPassword();
    let checkPassword = ref(memoVal);
    const setMemoPassword = () => {
      checkPassword.value ? localStorage.setItem("user-pwd", JSON.stringify({
        username: Encrypt(form.username),
        password: Encrypt(form.password)
      })) : localStorage.removeItem("user-pwd");
    };
    return (_ctx, _cache) => {
      const _component_el_input = ElInput;
      const _component_el_form_item = ElFormItem;
      const _component_el_image = ElImage;
      const _component_el_checkbox = ElCheckbox;
      const _component_el_col = ElCol;
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
          createVNode(_component_el_form_item, { prop: "user" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: form.username,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.username = $event),
                "prefix-icon": "user",
                clearable: "",
                placeholder: "输入用户名"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { prop: "password" }, {
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: form.password,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.password = $event),
                "prefix-icon": "lock",
                clearable: "",
                "show-password": "",
                placeholder: "输入密码"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createVNode(_component_el_input, {
                  modelValue: form.captcha,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.captcha = $event),
                  "prefix-icon": "CircleCheck",
                  clearable: "",
                  placeholder: "请输入验证码",
                  class: "plinpnt"
                }, null, 8, ["modelValue"]),
                createVNode(_component_el_image, {
                  src: unref(captcha).url,
                  onClick: getCodeApi,
                  class: "code"
                }, null, 8, ["src"])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, { style: { "margin-bottom": "10px" } }, {
            default: withCtx(() => [
              createVNode(_component_el_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_el_checkbox, {
                    modelValue: unref(checkPassword),
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(checkPassword) ? checkPassword.value = $event : checkPassword = $event),
                    onChange: unref(onMemoPassword)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("记住密码")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onChange"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_el_form_item, null, {
            default: withCtx(() => [
              createVNode(_component_el_button, {
                type: "primary",
                style: { "width": "100%" },
                round: "",
                onClick: login
              }, {
                default: withCtx(() => [
                  createTextVNode("登录")
                ]),
                _: 1
              })
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
