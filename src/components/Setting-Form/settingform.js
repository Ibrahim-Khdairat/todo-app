import React, { useContext } from 'react'
import { Button, FormGroup, Menu, MenuItem } from '@blueprintjs/core';
import { SettingsContext } from '../../context/settings';
import useForm from '../../hooks/form';
import { DropdownButton } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap'

export default function SettingForm() {
    const settings = useContext(SettingsContext);
    const { handleChange, handleSubmit } = useForm(saveSetting);

    function saveSetting(setting) {
        console.log(setting.number)
        settings.setItemNumber(setting.number);
        console.log(settings.hide);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <h2>Change Setting</h2>

                <label>
                    <span>Number of Items To be Shown</span>
                    <input onChange={handleChange} name="number" type="number" placeholder="Number of Items" />

                </label>


                <select name = "options"  >
                    <option value="hide" onClick = {settings.setHide(false)}>Hide</option>
                    <option value="show" onClick = {settings.setHide(true)} >Show</option>
                </select>



                <label>
                    <Button type="submit">Save Settings</Button>
                </label>
            </form>
        </div>
    )
}



