import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);

  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [editing, setEditing] = useState(false);
  const [newColor, setNewColor] = useState({ color: "", code: { hex: "" } });

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
        const updatedColors = colors.map(color =>
          color.id === colorToEdit.id ? res.data : color
        );
        updateColors(updatedColors);
        setEditing(false);
      })
      .catch(err => console.log(err.response));
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        console.log(res.data);
        const updatedColors = colors.filter(color => color.id !== color.id);
        updateColors(updatedColors);
      })
      .catch(err => console.log(err.response));
  };

  const addColor = event => {
    event.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors`, newColor)
      .then(res => {
        console.log("axios post data", res);
        updateColors(res.data);
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={event => deleteColor(color)}>
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
            <button type="submit" onClick={saveEdit}>
              save
            </button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {!editing && (
        <form onSubmit={addColor}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>

          <label>
            hex code:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit" onClick={addColor}>
              add
            </button>
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
