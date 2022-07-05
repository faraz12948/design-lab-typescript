import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect, useState } from 'react';
import './CanvasFront.css';
import useCanvasOne from '../../hooks/useCanvasOne';
import crossIcon from '../../assets/remove.png';
import { Dispatch, SetStateAction } from "react";

interface txtProp {
    text: string;
    txtColor: string;
    delTxt: boolean;
    setDelTxt: Dispatch<SetStateAction<boolean>>;
    changeCanvas: boolean;
    imgURL: string;

}
function CanvasFront(props: txtProp) {
    const [objects, setObjects] = useState({});
    const [objectsBack, setObjectsBack] = useState({});

    const [color, setColor] = useState('');
    // const [image, setImage] = useState('');
    const { selectedObjects, editor, onReady } = useFabricJSEditor();
    // const [imgURL, setImgURL] = useState('https://cdn.dribbble.com/users/24078/screenshots/15522433/media/e92e58ec9d338a234945ae3d3ffd5be3.jpg?compress=1&resize=400x300');


    useEffect(() => {
        console.log(editor?.canvas.toObject);

        initCanvas();


    }, [])
    const initCanvas = () => {
        editor?.canvas.setWidth(300);
        editor?.canvas.setHeight(400);
    }
    useEffect(() => {


        fabric.Image.fromURL(props.imgURL, function (oImg) {
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
                // setObjects(editor?.canvas.getObjects());
            }


        });




        // setImgURL('');


    }, [props.imgURL])
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
    useEffect(() => {
        if (editor?.canvas.getActiveObjects()) {

            if (props.delTxt === true) {
                editor?.canvas.getActiveObjects().forEach((object) => {
                    if (object.type === "textbox")
                        editor?.canvas.remove(object);
                })
            }
            props.setDelTxt(false)

        }
        else {
            props.setDelTxt(false);
        }

    }, [props.delTxt]);
    const deleteObject = () => {
        editor?.canvas.getActiveObjects().forEach((object) => {
            editor?.canvas.remove(object);
        });
        return true;

    }
    useEffect(() => {

        var img = document.createElement('img');
        img.src = crossIcon;
        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.cornerColor = 'blue';
        fabric.Object.prototype.cornerStyle = 'circle';
        function renderIcon(ctx: CanvasRenderingContext2D, left: number, top: number, styleOverride: any, fabricObject: fabric.Object) {
            // console.log(fabric.util.degreesToRadians(fabricObject.angle || 0));
            var size = 24;
            ctx.save();
            ctx.translate(left, top);
            ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
            ctx.drawImage(img, -size / 2, -size / 2, size, size);
            ctx.restore();
        }
        // console.log("delet");

        // console.log(img);
        fabric.Object.prototype.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: deleteObject,
            render: renderIcon,
        });


    }, [editor?.canvas.getActiveObjects()]);
    function objectAddedListener(ev: any) {
        let target = ev.target;
        console.log('left', target.left, 'top', target.top, 'width', target.width, 'height', target.height);
    }

    function objectMovedListener(ev: any) {
        let target = ev.target;
        console.log('left', target.left, 'top', target.top, 'width', target.width * target.scaleX, 'height', ((target.height * target.scaleY) / (editor?.canvas.getHeight() || 1)) * 100);
    }
    useEffect(() => {

        editor?.canvas.on('object:modified', objectMovedListener);


    }, [editor?.canvas.getActiveObjects()])
    useEffect(() => {

        editor?.canvas.on('object:added', objectAddedListener);


    }, [editor?.canvas.getObjects()])








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
    //         objects.forEach((ob) => {
    //             console.log(ob);
    //             editor?.canvas.add(ob);
    //             editor?.canvas.renderAll();
    //         })

    //     }


    // }
    useEffect(() => {
        // console.log(props.text, "canvas");
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
            const obj = editor?.canvas.getActiveObjects();
            obj?.forEach((o) => {

                if (o.type === "textbox") {
                    editor?.canvas.getActiveObject().set("fill", props.txtColor);
                    editor?.canvas.renderAll();
                }
            })
        }



    }, [props.txtColor]);
    useEffect(() => {


        if (editor?.canvas) {
            const obj = editor?.canvas.getObjects();
            // console.log(typeof (obj), '=>', typeof (objects));
            // console.log(Object.values(objects));


            if (props.changeCanvas === true) {
                setObjects(obj);
                // console.log(objects, "front");
                editor?.canvas.getObjects().forEach((object) => {

                    editor?.canvas.remove(object);
                })
            }
            else {
                setObjectsBack(obj);
                // console.log(objectsBack, "objects back");
                editor?.canvas.getObjects().forEach((object) => {

                    editor?.canvas.remove(object);
                })
            }

        }



    }, [props.changeCanvas]);
    useEffect(() => {

        // console.log(objectsBack);



        if (objects) {
            Object.values(objects).forEach((o) => {

                // console.log(o);
                if (props.changeCanvas === false) {
                    // console.log(o as any);
                    // console.log("gg")
                    editor?.canvas.add(o as any);
                    editor?.canvas.renderAll();
                }
            })


        }
        if (objectsBack) {
            Object.values(objectsBack).forEach((o) => {

                // console.log(o);
                if (props.changeCanvas === true) {
                    // console.log(o as any);
                    // console.log("gg")
                    editor?.canvas.add(o as any);
                    editor?.canvas.renderAll();
                }
            })

        }





    }, [props.changeCanvas]);

    return (
        <div id="drawingArea" className="drawing-area">
            <div className="canvas-container">
                <FabricJSCanvas className='canvas' onReady={onReady} />
            </div>
        </div>
    );
}

export default CanvasFront;
