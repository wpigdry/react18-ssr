import React, {Suspense} from "react";
import User from '../user';
const head = () => {
    return (<div>
        我是head组件2
        <React.Suspense fallback={<div>Loading...</div>}>
            <User id={1} />
        </React.Suspense>
        <React.Suspense fallback={<div>Loading...</div>}>
            <User id={3} />
        </React.Suspense>
        <React.Suspense fallback={<div>Loading...</div>}>
            <User id={5} />
        </React.Suspense>
    </div>)
}

export default head;