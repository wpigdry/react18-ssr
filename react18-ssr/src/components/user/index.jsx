import React from "react";

function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
        (r) => {
            status = "success";
            result = r;
        },
        (e) => {
            status = "error";
            result = e;
        }
    );
    console.log(suspender, 'suspender');
    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        },
    };
}

// 网络请求，获取 user 数据
const requestUser = (id) =>
    new Promise((resolve) =>
        setTimeout(
            () => resolve({ id, name: `用户${id}`, age: 10 + id }),
            id * 2000
        )
    );

const resourceMap = {
    1: wrapPromise(requestUser(1)),
    3: wrapPromise(requestUser(3)),
    5: wrapPromise(requestUser(5)),
};

// 使用Suspense必须返回一个会resolve ES Module的Promise(throw抛出错误的Promise)
// throw抛出错误的Promise，为了打断子树渲染，这里直接抛错出去，发现是Pending状态后就会去渲染fallback，并持续等待Promise的状态变更，持续流式渲染状态
// 区别对待不同网络环境（数据返回快的话压根不会出现fallback-loading）

// rm -rf node_modules 删掉重新下载 不然dist有额外的user文件

const User = (props) => {
    const resource = resourceMap[props.id];
    const user = resource.read();

    return <div>当前用户是: {user.name}</div>;
};

export default User;
