import { useEffect, useState } from "react"


const useCanvasOne = () => {
    const [text, setText] = useState('');
    const [textColor, setTextColor] = useState('#000000');

    // con


    return {
        text,
        setText,
        textColor,
        setTextColor
    }

}
export default useCanvasOne;