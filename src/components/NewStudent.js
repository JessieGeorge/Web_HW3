import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

function NewStudent() {

    const [groups, setGroups] = useState([{
        studentGroupId: -1,
        name: ""
    }]);

    useEffect(() => {
        axios.get("http://localhost:8080/student-groups")
        .then(res => setGroups(res.data));
    });

    const navigate = useNavigate();

    const studentName = React.useRef(null);
    const birthYr = React.useRef(null);
    const parentName = React.useRef(null);
    const parentEmail = React.useRef(null);
    
    const [studentGroupId, setStudentGroupId] = useState("");

    async function handleSubmit(event) {
      event.preventDefault();

      if (studentName.current.value=="" || birthYr.current.value==""
            || parentName.current.value=="" || parentEmail.current.value=="") {
          alert("Error: Empty value.");
      } else {
        let didAlert = false;
        const res = await axios.post("http://localhost:8080/students/", 
                                        {name:studentName.current.value,
                                         birthYr:birthYr.current.value,
                                         parent:parentName.current.value,
                                         parentEmail:parentEmail.current.value,
                                         studentGroupId:studentGroupId
                                        })
                                .catch(error => {alert(error); 
                                                didAlert=true;});
        
        if (!didAlert) {
            navigate("../Students", {replace: true }); 
        }
      }
    }

    function handleDropDown(event) {
        setStudentGroupId(event.target.value);
    }

    return  (
    <React.Fragment>
    <table className="table" border="1">
        <thead>
            <tr>
                <th>Name</th>
                <td>
                    <form>
                        <input type="text" ref={studentName}></input>
                    </form>
                </td>
            </tr>

            <tr>
                <th>Birth Year</th>
                <td>
                    <form>
                        <input type="text" ref={birthYr}></input>
                    </form>
                </td>
            </tr>

            <tr>
                <th>Parent Name</th>
                <td>
                    <form>
                        <input type="text" ref={parentName}></input>
                    </form>
                </td>
            </tr>

            <tr>
                <th>Parent Email</th>
                <td>
                    <form>
                        <input type="text" ref={parentEmail}></input>
                    </form>
                </td>
            </tr>

            <tr>
                <th>Group</th>
                <td>
                    <form>
                        <select onChange={handleDropDown}>
                            <option value=""></option>
                            {
                                groups.map((group) => (
                                    <option value={group.studentGroupId}>{group.name}</option>
                                ))
                            }
                        </select>
                    </form>
                </td>
            </tr>

            <tr>
                <td colspan="2">
                    <Button variant="primary" type="submit" 
                        onClick={handleSubmit}>
                        Add
                    </Button>
                </td>
            </tr>         
        </thead>
    </table>
    </React.Fragment>
    );
}

export default NewStudent;