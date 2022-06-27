const axios = require("axios");
let { fileToUrl, filesToUrl } = require("@/hook/fileToUrl.js");
let { mergeArrObj } = require("@/hook/merge.js");
function Hook() { }
// 区域 设置 
/**
 * @headElem 头部元素 --- 上
 * @bodyElem 可视区域 --- 中
 * @bottomElem 底部元素 --- 下
 * */
Hook.prototype.setArea = function ({ headElem, bottomElem, bodyElem }) {

    let clientHeight = document.documentElement.clientHeight;
    let head, bottom, body;
    if (headElem) {
        head = document.querySelector(headElem);
    }
    if (bottomElem) {
        bottom = document.querySelector(bottomElem);
    }
    body = document.querySelector(bodyElem);
    let bottomH = bottom ? bottom.clientHeight : 0;
    let headH = head ? head.clientHeight : 0;
    body.style.height =
        clientHeight -
        bottomH -
        headH +
        "px";
}
/**
 * @type 上传文件时 -- 文件格式
 * */ 
Hook.prototype.axios = function ({ method, url, params, type = null }, fun = null) {
    return new Promise((resolve, reject) => {
        console.log(type, "type---------")
        let headers=null, requestParams = null;
        // Content-Type:application/json;charset=utf-8
        switch (type) {
            // 上传为图片是 配置
            case 'image':

            case 'file':
                // headers = { 'Content-Type': 'multipart/form-data' };
                headers = { contentType: 'multipart/form-data;' };
                requestParams = {
                    ...headers,
                    method,
                    url,
                    // headers,
                    data:params,// 上传图片时 必须为data接收formdata格式数据
                }
                break;
            default:
                // application/x-www-form-urlencoded
                // headers = { 'Content-Type': 'application/json;charset=utf-8' };
                // headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
                headers = { contentType: 'application/x-www-form-urlencoded' };
                requestParams = {
                    ...headers,
                    method,
                    url,
                    // headers,
                    params,
                }
                break;
        }
        axios.request(requestParams).then(res => {
            resolve(res);
            // fun && fun(res)
        })
    })

}

// 创建聊天连接
Hook.prototype.createConnection = function (ws_host = 'ws://localhost', port = "8181", { onopen, onclose, onmessage }) {
    let ws = null;
    ws = new WebSocket(`${ws_host}:${port}`);
    ws.onopen = function (e) {
        // // 成功连接服务器回调
        console.log(`客户端（client--${ws_host}:${port}）:与服务器的连接已打开`);
        onopen && onopen(e);
    };
    ws.onclose = function (e) {
        console.log("onclose-----");
        onclose && onclose(e);
    };
    ws.onmessage = function (e) {
        console.log("onmessage----");
        onmessage && onmessage(e);
    };
    return ws;
}
module.exports = {
    Hook,
    fileToUrl,
    filesToUrl,
    mergeArrObj
}