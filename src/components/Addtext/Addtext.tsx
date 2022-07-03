import './Addtext.css'
import { SwatchesPicker, TwitterPicker, TwitterPickerProps } from 'react-color';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { NavLink } from 'react-router-dom';
import { Dispatch, SetStateAction } from "react";
import useCanvasOne from '../../hooks/useCanvasOne';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

// interface textProps {
//     setText: Dispatch<SetStateAction<string>>;
//     setTextColor: Dispatch<SetStateAction<string>>;


// }
interface txtProps {
    setText: Dispatch<SetStateAction<string>>;
    text: string;
    setTxtColor: Dispatch<SetStateAction<string>>;


}
function Addtext(props: txtProps) {
    // const { text, setText, textColor, setTextColor } = useCanvasOne();
    const { selectedObjects, editor, onReady } = useFabricJSEditor();
    // const { setText, text } = props;

    const handleChange = (color: any, event: any) => {
        props.setTxtColor(color.hex);
        console.log(props.text, "addtext");

    }
    const handleAddText = (e: any) => {
        e.preventDefault();
        console.log(props);



    }



    return (
        <div>
            <NavLink className="cross-btn" to='/'>

                <ArrowBackIosNewRoundedIcon></ArrowBackIosNewRoundedIcon>
            </NavLink>
            <p className='pb-1' style={{ textAlign: 'center', color: 'grey' }}>Add Text</p>

            <form onSubmit={e => handleAddText(e)}>
                <input name="Addtext" type="text" className="feedback-input" placeholder="Enter text here" onChange={e => props.setText(e.target.value)} />


                <input type="submit" value="Add text" />
            </form>
            <div className='text-clr pt-10' style={{ height: '260x' }}>
                <>
                    <p className='pb-1' style={{ textAlign: 'center', color: 'grey' }}>Change text color</p>
                </>
                <div>
                    <TwitterPicker className='pt-3' onChange={handleChange} />
                </div>
                <hr className='mt-5' style={{ height: '4px', color: 'red' }} />


            </div>
        </div>
    );
}

export default Addtext;
