import React from 'react'

type Props = {
    coloring: string
    align: 'center' | 'right' | 'left'
    isActive: boolean
    content?: string
    minorContent?: string
    isColoring: boolean
}


export const Key = (props: Props) => {
    const { coloring,  align, isActive, content, minorContent, isColoring } = props

    let backgroundColor = '#FFFFFF'
    if (isColoring){
        backgroundColor = coloring
    }
    if (isActive){
        backgroundColor = '#3295db'
    }

    return (
        <div className='key' style={{ backgroundColor: backgroundColor }}>
            <div className={align}>{content}</div>
            { minorContent !== undefined && <div className={align}>{minorContent}</div> }
        </div>
    )
}