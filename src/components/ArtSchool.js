import React from "react";
import {Link} from "react-router-dom";

function ArtSchool() {
    
    return (
        <React.Fragment>
            <p>
                <Link to="/Students">Students</Link>
                {" | "}
                <Link to="/Groups">Groups</Link>
            </p>
        </React.Fragment>
    );
}

export default ArtSchool;