import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageDisplay from './components/ImageDisplay';
import TextBox from './components/TextBox';
import { useDrop } from 'react-dnd';
import { useLocation } from 'react-router-dom';

const EditImage = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [textboxes, setTextboxes] = useState([]);
    const [text, setText] = useState('');
    
    let { state } = useLocation();

    const [{isOver}, drop] = useDrop(()=>({
        accept:'text',
        drop:(item, monitor)=>{
            const dropPosition = monitor.getClientOffset();
            if (dropPosition) {
                const { x, y } = dropPosition;
                handleDrop({id:item.id, x:x, y:y})
            }
            
        },
        collect: (monitor)=>({
            isOver: !!monitor.isOver(),
        })
    })
    )

    const handleDrop = ({id, x, y}) => {
        setTextboxes((prev)=>
            prev.map((textBox)=>{
                if(textBox.id == id){
                    return {...textBox, position:{x:x, y:y}}
                }
                return textBox
            })
        )
    }

    const fetchImage = async () => {
        try {
        const response = await axios.get(
            'https://source.unsplash.com/random/800x600'
        );
        setImageUrl(response.request.responseURL);
        } catch (error) {
        console.error('Error fetching image:', error);
        }
    };

    const addTextbox = () => {
        if (text) {
        const newTextbox = {
            id: Date.now(),
            text,
            position: { x: window.innerWidth*0.4, y: 200 },
        };
        setTextboxes([...textboxes, newTextbox]);
        setText('');
        }
    };

    const resizeHandler = (e, data, id) => {
        const updatedTextboxes = textboxes.map((textbox) => {
        if (textbox.id === id) {
            return {
                ...textbox,
                width: data.size.width,
                height: data.size.height,
            };
        }
        return textbox;
        });
        setTextboxes(updatedTextboxes);
    };

    const handleOnChange = (id, text) => {
        console.log(text)
        setTextboxes((prev)=>
            prev.map((textBox)=>{
                if(textBox.id == id){
                    return {...textBox, text:text}
                }
                return textBox
            })
        )
    }

    console.log('text items', textboxes)

    return (
        <div className="flex flex-col justify-center items-center mt-6">
            <div className='flex flex-row items-center w-[320px] sm:w-[400px] md:w-[600px] gap-x-2 mb-2'>
                <input
                    type="text"
                    placeholder="Enter text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="pl-3 outline-none border border-gray-300 rounded-sm w-4/5 h-[50px]"
                />
                <button onClick={addTextbox} className='p-3 outline-none w-1/5 bg-blue-500 rounded-md border-2 border-blue-600 text-white font-bold'>Add</button>
            </div>
         
         <div ref={drop} className='relative'>
            <ImageDisplay imageUrl={state.url} />
         </div>
            {textboxes.map((textbox) => (
                <TextBox
                key={textbox.id}
                text={textbox.text}
                position={textbox.position}
                resizeHandler={(e, data) =>
                    resizeHandler(e, data, textbox.id)
                }
                id={textbox.id}
                height={textbox.height}
                width={textbox.width}
                handleOnChange={handleOnChange}
                />
            ))}

        
        </div>
    );
};

export default EditImage;
