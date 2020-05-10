import React from "react";

type Props = {
    align: 'center' | 'right' | 'left'
    isActive: boolean
    content?: string
    minorContent?: string
}


export const Key = (props: Props) => {

    const { align, isActive, content, minorContent } = props;


    return (
        <div className={`key ${isActive ? 'active' : ''}`}>
            <div className={align}>{content}</div>
            { minorContent !== undefined && <div className={align}>{minorContent}</div> }
        </div>
    )
}