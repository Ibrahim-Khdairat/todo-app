import React from 'react';
import { Button, FormGroup } from '@blueprintjs/core';
import './form.scss';

function Form(props) {
    return (
        <div className = "form">
        <form onSubmit={props.handleSubmit}>

            <h2>Add To Do Item</h2>

            <label>
                <span>To Do Item</span>
                <input onChange={props.handleChange} name="todo" type="text" placeholder="Item Details"  />
                {/* <input  name="todo" type="text" placeholder="Item Details"  /> */}

            </label>

            <label>
                <span>Assigned To</span>
                <input onChange={props.handleChange} name="assignee" type="text" placeholder="Assignee Name" />
                {/* <input name="assignee" type="text" placeholder="Assignee Name" /> */}
            </label>

            <label>
                <span>Difficulty</span>
                <input onChange={props.handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" />
                {/* <input  defaultValue={3} type="range" min={1} max={5} name="difficulty" /> */}
            </label>

            <label>
                <Button type="submit">Add Item</Button>
            </label>
        </form>
        </div>
    )
}

export default Form;