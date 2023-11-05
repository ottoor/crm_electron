export default class EventRouter {
    #api = { };
    #routers;
  
    constructor() {
      this.routers = new Array()
    }
  
    //添加单个路由
    addRoute(route) {
      this.routers.push(route)
    }
  
    //添加多个路由
    addRoutes(routers) {
      this.routers = this.routers.concat(routers)
    }
  
    //移除指定名称的路由
    removeRoute(name){
      for(let i = 0; i < this.routers.length; i++){
        if(this.routers[i].name === name){
          this.routers.splice(i, 1)
        }
      }
    }
  
    //触发指定名称的路由回调
    router(data){

      for(let i = 0; i < this.routers.length; i++){
        let r = this.routers[i]
        if(data.name === r.name && r.callback){
          r.callback(this.#api, data)
        }
      }


    }
  
    //添加api
    addApi(key, api){
      this.#api[key] = api
    }

}  