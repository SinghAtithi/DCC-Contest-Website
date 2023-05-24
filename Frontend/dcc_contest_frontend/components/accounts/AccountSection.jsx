import { useState } from "react";
import { BASE_URL, UPDATE_USER_ENDPOINT_BACKEND } from "../../utils/constants";
import axios from "axios";

export default function AccountSection(props) {

    const [disabled, setDisabled] = useState(true);
    const [viewEdit, setViewEdit] = useState(false);
    const [value, setNewValue] = useState(props.value);

    const [saveButtonLoading, setSaveButtonLoading] = useState("");


    function setSave() {
        setDisabled(false);
        setViewEdit(true);
    }

    function cancelEdit() {
        setDisabled(true);
        setViewEdit(false);
    }

    function saveEdit() {
        setSaveButtonLoading("loading");
        const url = BASE_URL + UPDATE_USER_ENDPOINT_BACKEND;
        const options = {
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
        };
        const body = {
            update_field: props.update_field,
            new_value: value
        };

        axios.put(url, body, options).then((res) => {
            props.setToastClass("alert alert-success relative");
            props.setToastMessage(`${props.heading} successfully updated`);
            setSaveButtonLoading("");
            setDisabled(true);
            setViewEdit(false);
            props.setValue(value);

        }).catch((error) => {
            props.setToastClass("alert alert-error relative");
            if (error.response) {
                const statusCode = error.response.status;
                if (statusCode == 400) props.setToastMessage(`Bad Request for ${props.heading}`);
                else if (statusCode == 401) props.setToastMessage("Your session has expired. Please relogin.");
                else props.setToastMessage("Internal Server Error");
            }
            else if (error.request) props.setToastMessage("Network Error. Please check your internet connectivity.");
            else props.setToastMessage("Something went wrong. Please reload.");
            setSaveButtonLoading("");
        })
    }


    return (
        <div className="account-section">
            <div className="account-section-area">
                <div className="account-section-heading">
                    {props.heading}
                </div>
                <div className="account-section-value">
                    <input type="text" value={value} disabled={disabled} onChange={(e) => { setNewValue(e.target.value); }} />
                </div>
                {!viewEdit && <div className="account-section-button-edit">
                    {props.disable_edit
                        ?
                        <div className="cursor-not-allowed"><button className="btn btn-outline btn-info btn-sm rounded" disabled>Edit</button></div>
                        :
                        <button className="btn btn-outline btn-info btn-sm rounded" onClick={() => { setSave(); }}>Edit</button>
                    }
                </div>}
            </div>
            {viewEdit && <div className="account-section-button-save">
                <button className={`btn btn-outline btn-info btn-sm rounded mr-2 ${saveButtonLoading}`} onClick={() => { saveEdit(); }} >Save</button>
                <button className="btn btn-outline btn-info btn-sm rounded" onClick={() => { cancelEdit(); }}>Cancel</button>
            </div>}
        </div>
    )
}