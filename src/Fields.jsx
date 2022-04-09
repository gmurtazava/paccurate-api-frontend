import React from 'react'
import ColorPicker from './ColorPicker'
function Fields(props) {

  return (
    <div>  
        <div className="d-flex align-items-center">
            <ColorPicker colorHandler={(color) => props.colorHandler(color, props.obj.id)} />
            <div>
                <button className="btn btn-danger" onClick={() => props.deleteHandler(props.obj.id)}>Delete</button>
            </div>
        </div>
        <div className="d-flex">
            <input type="text" placeholder="x cord..." onChange={(e) => props.changeHandler(e, props.obj.id, "x_cord")} className="m-2 cells form-control"/>
            <input type="text" placeholder="y cord..." onChange={(e) => props.changeHandler(e, props.obj.id, "y_cord")} className="m-2 cells form-control"/>
            <input type="text" placeholder="z cord..." onChange={(e) => props.changeHandler(e, props.obj.id, "z_cord")} className="m-2 cells form-control"/>
            <input type="text" placeholder="weight..." onChange={(e) => props.changeHandler(e, props.obj.id, "weight")} className="m-2 form-control cells"/>
            <input type="number" placeholder="quantity..." onChange={(e) => props.changeHandler(e, props.obj.id, "quantity" )} className="m-2 form-control cells"/>
        </div>
    </div>
  )
}

export default Fields