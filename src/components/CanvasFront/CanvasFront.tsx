import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect, useState } from 'react';
import './CanvasFront.css';
import useCanvasOne from '../../hooks/useCanvasOne';
import crossIcon from '../../assets/text.png';
interface txtProp {
    text: string;
    txtColor: string;
}
function CanvasFront(props: txtProp) {
    const [objects, setObjects] = useState({});

    const [color, setColor] = useState('');
    // const [image, setImage] = useState('');
    const { selectedObjects, editor, onReady } = useFabricJSEditor();
    const [imgURL, setImgURL] = useState('https://cdn.dribbble.com/users/24078/screenshots/15522433/media/e92e58ec9d338a234945ae3d3ffd5be3.jpg?compress=1&resize=400x300');


    useEffect(() => {
        console.log(editor?.canvas.toObject);
        initCanvas();

    }, [])
    const initCanvas = () => {
        editor?.canvas.setWidth(300);
        editor?.canvas.setHeight(400);
    }
    const addImg = (e: Event, url: string) => {

        e.preventDefault();
        fabric.Image.fromURL(url, function (oImg) {
            editor?.canvas.setWidth(300);
            editor?.canvas.setHeight(400);
            editor?.canvas.add(oImg);
            const obj = editor?.canvas.getObjects();
            obj?.forEach((o) => {
                if (o.type === "image") {
                    o.scaleToHeight(100);
                    o.scaleToHeight(100);
                }
            });
            editor?.canvas.centerObject(oImg);
            if (editor?.canvas.getObjects()) {
                setObjects(editor?.canvas.getObjects());
            }
            console.log(objects);


        });




        // setImgURL('');

    }
    const onAddCircle = () => {
        if (editor) {
            editor.addCircle();
        }
    };
    const onAddRectangle = () => {
        if (editor) {
            editor.addRectangle();
        }
    };





    // }, []);
    const deleteObject = () => {
        editor?.canvas.getActiveObjects().forEach((object) => {
            editor?.canvas.remove(object);
        });

    }
    // useEffect(()=>{
    //     fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    //         x: 0.5,
    //         y: -0.5,
    //         offsetY: 16,
    //         cursorStyle: 'pointer',
    //         mouseUpHandler: deleteObject,
    //         render: renderIcon,
    //         cornerSize: 24
    //       });
    //       function renderIcon(ctx:any, left:any, top:any, styleOverride:any, fabricObject:any) {
    //         var size = cornerSize;
    //         ctx.save();
    //         ctx.translate(left, top);
    //         ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    //         ctx.drawImage(crossIcon, -size/2, -size/2, size, size);
    //         ctx.restore();
    //       }
    // })

    // console.log(text);
    // useEffect(() => {
    //     console.log(text);
    // }, [text])


    // const addText = (e: Event, text: string) => {
    //     e.preventDefault();

    //     try {
    //         editor?.canvas.add(
    //             new fabric.Textbox(text, {
    //                 fill: textColor,
    //                 fontSize: 20,
    //                 fontFamily: "Arial",
    //                 fontWeight: "bold",
    //                 textAlign: "center",
    //                 name: "text",
    //             })
    //         );
    //         editor?.canvas.renderAll();
    //     } catch (error) {
    //         console.log(error);
    //     }

    //     setText('');
    //     if (editor) {
    //         setObjects(editor?.canvas.getObjects());
    //     }
    //     // console.log(objects);

    // }
    // const getObj = () => {
    //     if (objects) {
    //         objects.forEach((ob:{}) => {
    //             console.log(ob);
    //             editor?.canvas.add(ob);
    //             editor?.canvas.renderAll();
    //         })

    //     }


    // }
    useEffect(() => {
        console.log(props.text, "canvas");
        try {
            editor?.canvas.add(
                new fabric.Textbox(props.text, {
                    // fill: textColor,
                    fontSize: 20,
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    textAlign: "center",
                    name: "text",
                })
            );
            editor?.canvas.renderAll();
        } catch (error) {
            console.log(error);
        }

    }, [props.text]);

    useEffect(() => {


        if (editor?.canvas) {
            const obj = editor?.canvas.getObjects();
            obj?.forEach((o) => {

                if (o.type === "textbox") {
                    editor?.canvas.getActiveObject().set("fill", props.txtColor);
                    editor?.canvas.renderAll();
                }
            })
        }



    }, [props.txtColor]);

    return (
        <div id="drawingArea" className="drawing-area">
            <div className="canvas-container">
                <FabricJSCanvas className='canvas' onReady={onReady} />
            </div>
        </div>
    );
}

export default CanvasFront;
