import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';

function List(props) {
    return (
        <div className="list">
            <Card elevation={Elevation.THREE}>
                {
                    props.pagination().map((item,idx) => (
                        <div key={item.id}>
                            {/* <p>{item.id}</p>
                            <p>{idx}</p>

                            <p>Status : {item.complete.toString()}</p> */}


                            <p>{item.complete==false ? "Pending" : "Complete"}</p>
                            <p>To Do : {item.todo}</p>
                            <p><small>Assigned to: {item.assignee}</small></p>
                            <p><small>Difficulty: {item.difficulty}</small></p>
                            {
                                (!item.complete)
                                    ? <Button onClick={() => props.toggleComplete(item.id)}>{item.complete==false ? "Pending" : "Complete"}</Button>
                                    : <Button onClick={() => props.deleteItem(item.id)}>Delete </Button>
                            }
                            <hr />
                        </div>
                    ))
                }
             
            </Card>
            <Button onClick={props.previous}>Previous</Button>
                <Button onClick={props.next}>Next</Button>
        </div>
    );
};

export default List;