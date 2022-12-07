import React, {useEffect, useState, useRef} from "react";
import request from '../../common/utils/request';
import './index.css';

function Tabs () {

    const flag = useRef(false); // 接口是否返回
    const promiseStatus = useRef(null); // 记录Promise状态

    const [tab, setTab] = useState([{text: '查找'}, {text: '筛选'}]);

    useEffect(() => {
        const url = 'http://localhost:3000/getTabs';
        const params = {};
        promiseStatus.current = request.post(url, params).then(res => {
            flag.current = true;
            setTab(res);

        });
    }, []);


    if (!flag.current) {
        if (promiseStatus.current) {
            throw promiseStatus.current;
        }
        else {
            return promiseStatus.current;
        }
    }

    return (<div className="tab-container">
        <div className="tab-title">tab列表</div>
        {
            tab.length
            && <div className="tab-wrap">
                {
                    tab.map(item => {
                        return (<div
                            className="tab-text"
                            key={item.text}
                        >
                            {item.text}
                        </div>)
                    })
                }
            </div>
        }
    </div>)
}

export default Tabs;
