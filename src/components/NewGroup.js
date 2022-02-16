import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

function NewGroup() {

    const navigate = useNavigate();

    const groupName = React.useRef(null);
  
    async function handleSubmit(event) {
      event.preventDefault();

      if (groupName.current.value=="") {
          alert("Error: Empty value.");
      } else {
        let didAlert = false;
        const res = await axios.post("http://localhost:8080/student-groups/", 
                                        {name:groupName.current.value})
                                .catch(error => {alert(error); 
                                                didAlert=true;});
        
        if (!didAlert) {
            navigate("../Groups", {replace: true }); 
        }
      }
    }

    return  (
    <React.Fragment>
    <table className="table" border="1">
        <thead>
            <tr>
                <th>Name</th>
                <td>
                    <form>
                        <input type="text" ref={groupName}></input>
                    </form>
                </td>
            </tr>
            <tr>
                <td colSpan="2">
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

export default NewGroup;