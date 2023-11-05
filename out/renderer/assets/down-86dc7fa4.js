import { aj as http, h as getCurrentInstance, r as ref, Y as onBeforeMount, a as openBlock, c as createElementBlock, k as createBaseVNode, f as unref, Z as createCommentVNode, a0 as createVNode, w as withCtx, aa as normalizeStyle, M as Fragment, $ as renderList, X as createTextVNode, a8 as pushScopeId, a9 as popScopeId, l as createBlock, t as toDisplayString } from "./index-575c9104.js";
import { E as ElContainer, a as ElMain } from "./el-main-67cab1c2.js";
import { E as ElTableColumn, a as ElTable } from "./el-table-column-10e6d41a.js";
import "./el-checkbox-0e351c79.js";
import "./el-tooltip-9958ff85.js";
import "./el-scrollbar-20c86168.js";
import { E as ElButton } from "./el-button-5c456a10.js";
import { E as ElTag } from "./el-tag-adbebd4f.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import "./index-0b8d8a8b.js";
import "./_initCloneObject-9695a491.js";
import "./hasIn-13300d7d.js";
import "./debounce-c9ded561.js";
import "./event-28e3832c.js";
import "./isEqual-75679068.js";
import "./focus-trap-64f23100.js";
const taskPage = () => {
  return http.get("/crm/task/page");
};
const down_vue_vue_type_style_index_0_scoped_c5bc723e_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-c5bc723e"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h4", null, "任务列表", -1));
const _sfc_main = {
  __name: "down",
  setup(__props) {
    const { proxy } = getCurrentInstance();
    let tableData = ref([]);
    onBeforeMount(async () => {
      proxy.sendDicts(["system_global_status"]);
      await getTableData();
    });
    const getTableData = async () => {
      let res = await taskPage();
      tableData.value = res.data.records;
    };
    const download = (row) => {
      electron.ipcRenderer.invoke("renderer-to-main", {
        name: "download",
        data: {
          url: row.downloadUrl
        }
      });
    };
    let isKeyDown = ref(false);
    let dinatesX = ref(0);
    let dinatesY = ref(0);
    const mousedown = (e) => {
      isKeyDown.value = true;
      dinatesX.value = e.x;
      dinatesY.value = e.y;
      document.onmousemove = (ev) => {
        if (isKeyDown.value) {
          const x = ev.screenX - dinatesX.value;
          const y = ev.screenY - dinatesY.value;
          let data = {
            appX: x,
            appY: y
          };
          electron.ipcRenderer.invoke("renderer-to-main", {
            name: "custom-adsorption",
            data
          });
        }
      };
      document.onmouseup = (ev) => {
        isKeyDown.value = false;
      };
    };
    const close = () => {
      electron.ipcRenderer.invoke("renderer-to-main", {
        name: "close-window"
      });
    };
    let hoverColor = ref("rgba(0,0,0,.5)");
    let isKiosk = ref(false);
    const kiosk = () => {
      isKiosk.value = !isKiosk.value;
      if (isKiosk.value) {
        hoverColor.value = "";
      } else {
        hoverColor.value = "rgba(0,0,0,.5)";
      }
      electron.ipcRenderer.invoke("renderer-to-main", {
        name: "kiosk",
        kiosk: isKiosk.value
      });
    };
    return (_ctx, _cache) => {
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_button = ElButton;
      const _component_el_table = ElTable;
      const _component_el_main = ElMain;
      const _component_el_container = ElContainer;
      return openBlock(), createElementBlock("div", {
        class: "down",
        style: normalizeStyle({ "--hover-color": unref(hoverColor) })
      }, [
        createBaseVNode("header", { onMousedown: mousedown }, [
          _hoisted_1,
          createBaseVNode("div", { onClick: close }, "关闭")
        ], 32),
        createBaseVNode("button", { onClick: kiosk }, "加锁/解锁"),
        !unref(isKiosk) ? (openBlock(), createElementBlock("button", {
          key: 0,
          onClick: close
        }, "关闭")) : createCommentVNode("", true),
        createVNode(_component_el_container, null, {
          default: withCtx(() => [
            createVNode(_component_el_main, null, {
              default: withCtx(() => [
                createVNode(_component_el_table, {
                  data: unref(tableData),
                  style: { "width": "100%" },
                  height: "250"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_table_column, {
                      type: "index",
                      label: "序号",
                      width: "180"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "taskName",
                      label: "任务名称",
                      width: "180"
                    }),
                    createVNode(_component_el_table_column, { label: "状态" }, {
                      default: withCtx(({ row }) => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.dicts.system_global_status, (item) => {
                          return openBlock(), createElementBlock(Fragment, null, [
                            row.status == item.v ? (openBlock(), createBlock(_component_el_tag, { key: 0 }, {
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
                          onClick: ($event) => download(row)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("下载")
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        createVNode(_component_el_button, {
                          link: "",
                          type: "primary",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("删除")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ], 4);
    };
  }
};
const down = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c5bc723e"]]);
export {
  down as default
};
