import React, {useId} from 'react';

const HookDiy = () => {
    const id = useId();

    return (<div>
        hook
        <div className="field">
            <label htmlFor={`${id}-address`} >Address</label>
            <input type="checkbox" name="address" id={`${id}-address`} />
        </div>
        <div className="field">
            <label htmlFor={`${id}-passport`} >Do you have passport?</label>
            <input type="checkbox" name="passport" id={`${id}-passport`} />
        </div>
    </div>)
}

export default HookDiy;
