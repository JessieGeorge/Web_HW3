import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function Groups(){
    
    const [entries, setEntries] = useState([{
        studentGroupId: -1,
        name: ""
    }]);

    useEffect(() => {
        axios.get("http://localhost:8080/student-groups")
        .then(res => setEntries(res.data));
    });
    
    /*
    As per canvas instructions for HW2, 
    inactive students do not show up as group members.
    */
    const [allMembers, setAllMembers] = useState({"-1":""});

    for(let i = 0; i < entries.length; i++) {
        let sgid = entries[i].studentGroupId;
        if (sgid != -1) {   
            async function getMemberNames() {
                let memberNames = [];
                const members = await axios
                            .get("http://localhost:8080/student-groups/" + sgid)
                            .then(res => res.data.members); 

                for (let j = 0; j < members.length; j++) {
                    memberNames[j] = Object.values(members[j]);
                }
                
                let oneString = memberNames.join(', ');
                
                let newAllMembers = allMembers;
                newAllMembers[sgid] = oneString;
                setAllMembers(newAllMembers);
            }; 

            getMemberNames();
        }
    }

    return (
        <React.Fragment>
            <p><Link to="/NewGroup">New Group</Link></p>

            <table className="table" border="1">
                <thead>
                    <tr>
                        <th>Group</th>
                        <th>Members</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        entries.map((entry) => (
                            <tr key={entry.studentGroupId}>
                                <td>{entry.name}</td>
                                <td>{allMembers[entry.studentGroupId]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </React.Fragment>
    );
}

export default Groups;