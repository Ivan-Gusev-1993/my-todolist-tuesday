import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    callBack:(title: string)=>void
    title: string
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [edit, setEdit] = useState(false)
    let [title, setTitle] = useState(props.title)

    const changeTitleValue = (event: ChangeEvent<HTMLInputElement>)=> {
        setTitle(event.currentTarget.value)
    }

    const onBlurHandler = () => {
        props.callBack(title)
        setEdit(false)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter'){
            props.callBack(title)
            setEdit(false)
        }
    }

    const onDoubleClickHandler = () => {
        setEdit(true)
    }
    return (
        <div>
            {edit ?
                <input value={title}
                       onChange={changeTitleValue}
                       onBlur={onBlurHandler}
                       onKeyDown={onKeyDownHandler}
                       autoFocus/>
                :
                <span onDoubleClick={onDoubleClickHandler}>
                        {props.title}
                    </span>
            }
        </div>
    );
};

