/*
 * @file: 文字高亮组件
 */

const HighLight = ({className = '', text, matching = ''}) => {
    let reg = new RegExp(matching, 'i');
    const parts = text.split(reg);

    const words = parts.length > 1
        ? parts.reduce((res, str, index) => {
            if (index === 0) {
                res.push(str);
            } else {
                const position = text.search(reg);
                res.push(
                    <span key={`matching_${index}`} style={{color: 'red', backgroundColor: 'yellow'}}>
                        {position !== -1 ? text.slice(position, matching.length + position) : matching}
                    </span>
                );
                res.push(str);
            }

            return res;
        }, [])
        : text;

    return (
        <div className={className}>
            {words}
        </div>
    );
};

export default HighLight;
