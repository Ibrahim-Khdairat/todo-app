import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import { v4 as uuid } from 'uuid';

import Header from '../header/header.js';
import Form from '../form/form.js';
import List from '../list/list.js';
import { SettingsContext } from '../../context/settings';
import LoginProvider, { LoginContext } from '../../context/login.js';
import { When } from 'react-if';
import Auth from '../auth/auth.js';


const ToDo = () => {


    // useEffect(() => {
    //     let data = localStorage.getItem('logout');
    //     let listData = JSON.parse(data);
    // console.log('from to do' , listData);
    //     let parsedData = JSON.stringify(listData);
    //     localStorage.setItem('list' , parsedData);
    // }, []);

    const login = useContext(LoginContext);
    const settings = useContext(SettingsContext);


    const [list, setList] = useState([]);


    const [incomplete, setIncomplete] = useState([]);
    const { handleChange, handleSubmit } = useForm(addItem);
    // const  handleChange   = addItem();
    // const  handleSubmit   = addItem();


    const [startPage, setStartPage] = useState(0);
    const [endPage, setEndPage] = useState(settings.itemNumber);

    function addItem(item) {
        if (!item.difficulty) { item.difficulty = 3 }

        let todo = {
            id: uuid(),
            complete: false,
            assignee: item.assignee,
            todo: item.todo,
            difficulty: item.difficulty

        }
        // item.id = uuid();
        // item.complete = false;

        // console.log("item -------> ",item);
        //  console.log("Id -------> ",item.id);

        setList([...list, todo]);
    }

    useEffect(() => {
        addItemToLocalStorage(list);
    }, [list]);

    function addItemToLocalStorage(list) {
        let data = JSON.stringify(list);
        localStorage.setItem('list', data);
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
        document.title = `To Do List: ${incompleteCount}`;
    }, [list]);



    const [result, setResult] = useState([]);
    
    useEffect(() => {  let data2 = localStorage.getItem('logout');
    let listData2 = JSON.parse(data2);
    if (listData2) {
        let data = JSON.stringify(listData2);
        localStorage.setItem('list', data);

        setList([...listData2])
    }},[]);
  
    useEffect(() => {


        let data1 = localStorage.getItem('list');
        let listData = JSON.parse(data1);

        // setList([...list , listData]);


        let resultData = list.slice(startPage, endPage);
        setResult(resultData)
    }, [list]);


    function pagination() {
        // let data = localStorage.getItem('list');
        // let listData = JSON.parse(data)||[] ;
        // let result = listData.slice(startPage, endPage);

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
    return (
        <>
            <h1>To Do : {incomplete} items pending</h1>

            <When condition={login.loggedIn}>
                <Auth capability={"create"}>
                    <Form
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                    />
                </Auth>

                <List
                    pagination={pagination}
                    next={next}
                    previous={previous}
                    toggleComplete={toggleComplete}
                    deleteItem={deleteItem}
                />

            </When>

        </>
    );
};


export default ToDo;