import React from 'react';
import { useDrag } from 'react-dnd';

const TextBox = ({ text, position, height, width, resizeHandler, id, handleOnChange }) => {
  const [{isDragging}, ref] = useDrag(() => ({
    type: 'text',
    item:{id:id},
    collect: (monitor)=>({
        isDragging: !!monitor.isDragging()
    })
  }))
    return (
        <div ref={ref} >
            <input
            type='textbox'
            className="outline-none text-3xl text-white bg-transparent font-medium focus:border-blue-300 focus:border-2" 
            value={text} onChange={(e)=>handleOnChange(id, e.target.value)}
            style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
                width:'auto',
            }}
            />
        </div>
    );
};


const MyHandle = React.forwardRef((props, ref) => {
    const {handleAxis, ...restProps} = props;
    return <div ref={ref} className={`foo handle-${handleAxis}`} {...restProps}>
        <div className="border border-black">

        </div>
    </div>;
});

export default TextBox;
