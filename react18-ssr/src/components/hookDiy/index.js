import React, {useId} from 'react';

const HookDiy = () => {
    console.log(33333);

    const a = useId();
    const b = useId();
    const id = useId();


    console.log(a, 'ppppp', b);

    return (<div>
        hook
        <div className='field'>
            <label htmlFor={id}>Do you like React?{id}</label>
            <input type="text" name="react" id={id} />
            </div>
    </div>)
}

export default HookDiy;
