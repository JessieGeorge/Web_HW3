import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function Students(){

    const [entries, setEntries] = useState([{
        studentId: -1,
        name: "",
        birthYr: 0,
        parent: "",
        parentEmail: "",
        studentGroupName: "",
        inactive: ""
    }]);

    const yearNow = new Date().getFullYear();

    useEffect(() => {
        axios.get("http://localhost:8080/students")
        .then(res => setEntries(res.data));
    });

    return (
        <React.Fragment>
            <p><Link to="/NewStudent">New Student</Link></p>
        
            <table className="table" border="1">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Age</th> 
                        <th>Parent</th>
                        <th>Email</th>
                        <th>Group</th>
                        <th>Inactive</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        entries.map((entry) => (
                            <tr key={entry.studentId}>
                                <td>{entry.name}</td>
                                <td>{yearNow - entry.birthYr}</td>
                                <td>{entry.parent}</td>
                                <td>{entry.parentEmail}</td>
                                <td>{entry.studentGroupName}</td>
                                <td>{entry.inactive.toString()}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </React.Fragment>
    );
}

export default Students;