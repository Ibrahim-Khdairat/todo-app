import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import { v4 as uuid } from 'uuid';

import Header from '../header/header.js';
import Form from '../form/form.js';
import List from '../list/list.js';
import { SettingsContext } from '../../context/settings';


const ToDo = () => {

    const settings = useContext(SettingsContext);

    const [list, setList] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const { handleChange, handleSubmit } = useForm(addItem);
    // const  handleChange   = addItem();
    // const  handleSubmit   = addItem();


    const [startPage, setStartPage] = useState(0);
    const [endPage, setEndPage] = useState(settings.itemNumber);

    function addItem(item) {
        if (!item.difficulty) {item.difficulty = 3}

        let todo = {
            id: uuid(),
            complete: false,
            assignee : item.assignee,
            todo : item.todo,
            difficulty : item.difficulty

        }
        // item.id = uuid();
        // item.complete = false;

        // console.log("item -------> ",item);
        //  console.log("Id -------> ",item.id);

        setList([...list, todo]);
    }

    function deleteItem(id) {
        const items = list.filter(item => item.id !== id);
        setList(items);
    }

    function toggleComplete(id) {

        const items = list.map(item => {
            if (item.id == id) {
                item.complete = !item.complete;
            }
            return item;
        });

        setList(items);

    }

    useEffect(() => {
        let incompleteCount = list.filter(item => !item.complete).length;
        setIncomplete(incompleteCount);
        document.title = `To Do List: ${incomplete}`;
    }, [list]);

    function pagination() {
        let result = list.slice(startPage, endPage);
        return result;
    }

    function next() {
        setStartPage(startPage + settings.itemNumber);
        setEndPage(endPage + settings.itemNumber);
    }
    function previous() {
        setEndPage(endPage - settings.itemNumber);
        setStartPage(startPage - settings.itemNumber);
    }
    // console.log("List ------->>>> ",list);
    return (
        <>
<h1>To Do : {incomplete} items pending</h1>

            <Form
                handleSubmit={handleSubmit}
                handleChange={handleChange}
            />

            <List
                pagination={pagination}
                next={next}
                previous={previous}
                toggleComplete={toggleComplete}
                deleteItem={deleteItem}
            />

        </>
    );
};

export default ToDo;