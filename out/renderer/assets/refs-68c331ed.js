import { aI as isFunction } from "./index-575c9104.js";
const composeRefs = (...refs) => {
  return (el) => {
    refs.forEach((ref) => {
      if (isFunction(ref)) {
        ref(el);
      } else {
        ref.value = el;
      }
    });
  };
};
export {
  composeRefs as c
};
