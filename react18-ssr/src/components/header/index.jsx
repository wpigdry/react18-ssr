import React, {lazy, Suspense} from "react";

// 使用lazy动态进行异步加载组件 懒加载组件
const User = lazy(() => {
    return import('../user');
});

const head = () => {
    return (<div>
        我是head组件2
        <Suspense fallback={<div>Loading...</div>}>
            <User id={1} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
            <User id={3} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
            <User id={5} />
        </Suspense>
    </div>)
}

export default head;