import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const ColorList = ({
  colors,
  updateColors,
  getData,
  history,
  initialColor,
  colorToEdit,
  setColorToEdit
}) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log("axios data", res);
        console.log("colorToEdit", colorToEdit);
        setColorToEdit(initialColor);
        updateColors(res.data);
        history.push("/bubblepage");
      });
    // .catch(err => console.log(err.response));
  };

  const deleteColor = (event, color) => {
    event.preventDefault();
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${colorToEdit.id}`)
      .then(res => {
        console.log(res.data);
        updateColors(res.data);
        history.push("/bubblepage");
      });
    // .catch(err => console.log(err.response));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      console.log("edit", color)
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={event => deleteColor(event, color)}
              >
                x
              </span>
              {color.color}
            </span>

            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>

          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
