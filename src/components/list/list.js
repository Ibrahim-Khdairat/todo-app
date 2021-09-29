import React, { useEffect, useState } from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import Auth from '../auth/auth';
import { When } from 'react-if';
function List(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        getItemToLocalStorage();
    }, []);

    function getItemToLocalStorage() {
        let data = localStorage.getItem('list');
        let listData = JSON.parse(data);
        setData(listData);
    }


    return (
        <div className="list">
            <Card elevation={Elevation.THREE}>
                <Auth capability={'read'}>
                   
                            {
                                 props.pagination().map((item, idx) => (
                                    <div key={item.id}>
                                        <p className={item.complete.toString()}>{item.complete == false ? "Pending" : "Complete"}</p>
                                        <p>To Do : {item.todo}</p>
                                        <p><small>Assigned to: {item.assignee}</small></p>
                                        <p><small>Difficulty: {item.difficulty}</small></p>


                                        {
                                            (!item.complete)
                                                ? (
                                                    <Button onClick={() => props.toggleComplete(item.id)}>{item.complete == false ? "Pending" : "Complete"}</Button>)
                                                : (
                                                    <>
                                                        <Button onClick={() => props.toggleComplete(item.id)}>{item.complete == false ? "Pending" : "Complete"}</Button>                                        <br></br>
                                                        <Auth capability={'delete'}>
                                                            <Button onClick={() => props.deleteItem(item.id)}>Delete </Button>
                                                        </Auth>
                                                    </>
                                                )
                                        }
                                        <hr />
                                    </div>
                                ))
                            
                                    }
                    




                </Auth>


                {/* <Auth capability='create'>

                    {
                        props.pagination().map((item, idx) => (
                            <div key={item.id}>
                                <p className={item.complete.toString()}>{item.complete == false ? "Pending" : "Complete"}</p>
                                <p>To Do : {item.todo}</p>
                                <p><small>Assigned to: {item.assignee}</small></p>
                                <p><small>Difficulty: {item.difficulty}</small></p>


                                {
                                    (!item.complete)
                                        ? (
                                            <Button onClick={() => props.toggleComplete(item.id)}>{item.complete == false ? "Pending" : "Complete"}</Button>)
                                        : (
                                            <>
                                                <Button onClick={() => props.toggleComplete(item.id)}>{item.complete == false ? "Pending" : "Complete"}</Button>                                        <br></br>
                                                <Auth capability={'delete'}>
                                                    <Button onClick={() => props.deleteItem(item.id)}>Delete </Button>
                                                </Auth>
                                            </>
                                        )
                                }
                                <hr />
                            </div>
                        ))
                    }



                </Auth> */}
            </Card>


            <Button onClick={props.previous}>Previous</Button>
            <Button onClick={props.next}>Next</Button>
        </div>
    );
};

export default List;