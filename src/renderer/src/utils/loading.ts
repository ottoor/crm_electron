let loadingBool = null;
let loadingNumber = 0;

import debounce from "lodash/debounce"; // 防抖函数

const showLoading = ()=>{
    if( loadingNumber == 0 ){
        loadingBool = ElLoading.service({ fullscreen: true });
    }
    loadingNumber++;
}

const hideLoading = debounce(()=>{
    loadingBool?.close();
    loadingBool = null;
},500)

const isLoading = ()=>{
    loadingNumber--;
    loadingNumber = Math.max(  loadingNumber , 0 );
    if( loadingNumber == 0 ){
        hideLoading();
    }
}

export {  showLoading,hideLoading }