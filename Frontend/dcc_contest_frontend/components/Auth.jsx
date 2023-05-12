// Import the necessary dependencies
import { useEffect } from "react"; // Importing the useEffect hook from the React library
import checkToken from "../utils/checkToken"; // Importing the checkToken module from the "../utils" directory
import { useSelector } from "react-redux"; // Importing the useSelector hook from the React Redux library

// Define the Auth component
export default function Auth(props) {
    // Retrieve the loggedIn state using the useSelector hook
    const loggedIn = useSelector(state => state.login.loggedIn);

    useEffect(() => {
        // Check if the user is not logged in
        if (!loggedIn) {
            // Call the checkToken function to validate the token
            checkToken()
                .then((res) => {
                    // Token is valid
                    console.log("From useEffect of Auth");
                    console.log(Date());
                })
                .catch((err) => {
                    // Token is invalid or an error occurred
                    console.log(err);
                });
        }
    });

    // Render the child components
    return (<>{props.children}</>);
}
