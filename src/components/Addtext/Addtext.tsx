import './Addtext.css'
import { SwatchesPicker, TwitterPicker, TwitterPickerProps } from 'react-color';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { NavLink } from 'react-router-dom';
import { Dispatch, SetStateAction } from "react";
import useCanvasOne from '../../hooks/useCanvasOne';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    example: string,
    txtRequired: string,

};
// interface textProps {
//     setText: Dispatch<SetStateAction<string>>;
//     setTextColor: Dispatch<SetStateAction<string>>;


// }
interface txtProps {
    setText: Dispatch<SetStateAction<string>>;
    text: string;
    setTxtColor: Dispatch<SetStateAction<string>>;
    setDelTxt: Dispatch<SetStateAction<boolean>>;

    setText2: Dispatch<SetStateAction<string>>;
    text2: string;
    setTxtColor2: Dispatch<SetStateAction<string>>;
    setDelTxt2: Dispatch<SetStateAction<boolean>>;

    changeCanvas: boolean;


}
function Addtext(props: txtProps) {
    // const { text, setText, textColor, setTextColor } = useCanvasOne();
    const { selectedObjects, editor, onReady } = useFabricJSEditor();
    // const { setText, text } = props;
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {

        // if (!props.changeCanvas) {
        //     props.setText(data.txtRequired);
        // }
        // else {
        //     props.setText2(data.txtRequired);
        // }
        props.setText(data.txtRequired);
        // data.txtRequired = '';
    }

    const handleChange = (color: any, event: any) => {
        // if (!props.changeCanvas) {
        //     props.setTxtColor(color.hex);
        // }
        // else {
        //     props.setTxtColor2(color.hex);
        // }
        props.setTxtColor(color.hex);


    }
    const handleAddText = (e: any) => {
        e.preventDefault();
        // console.log(props);



    }
    const handleDelText = () => {




    }



    return (
        <div>
            <NavLink className="cross-btn" to='/'>

                <ArrowBackIosNewRoundedIcon></ArrowBackIosNewRoundedIcon>
            </NavLink>
            <p className='pb-1' style={{ textAlign: 'center', color: 'grey' }}>Add Text</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <input onChange={e => props.setText(e.target.value)} /> */}
                <input className="feedback-input"  {...register("txtRequired", { required: true })} />
                {/* {errors.txtRequired && <span>This field is required</span>} */}

                <input type="submit" />
            </form>
            {/* <form onSubmit={e => handleAddText(e)}>
                <input name="Addtext" type="text" className="feedback-input" placeholder="Enter text here" onChange={e => props.setText(e.target.value)} />


                <input type="submit" value="Add text" />
            </form> */}
            <button onClick={() => props.setDelTxt(true)} className="button button1">Remove text</button>

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
