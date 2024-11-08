import { useState } from "react"
import styles from "./Form.module.css"

export default function Form(){
    const [formDetails, setFormDetails] = useState({fullname:"", email:"", password:""})
    const [isSignUp, setIsSignUp] = useState(true)
    const [errors, setErrors] = useState({})

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setFormDetails({ fullname: "", email: "", password: "" }); 
        setErrors({});
    }

    const validateForm = () => {
        const newErrors = {}

        if (isSignUp) {
            // Full name validation for Sign Up form
            if (!formDetails.fullname) newErrors.fullname = "Full name is required.";
        }

        // this email validation ensures that the email field not empty and is in a valid format
        if (!formDetails.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formDetails.email)) {
            newErrors.email = "Email address is invalid."
        }

        // this password validation ensures it's not empty and is not less than 8 characters
        if (!formDetails.password) {
            newErrors.password = "Password is required."
        } else if (formDetails.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters."
        }

        setErrors(newErrors)

        // Returns true if no errors, false if otherwise
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()

        // Validate form and submit if valid
        if (validateForm()) {
            alert("Thank you for Signing up")

            setFormDetails({ fullname: "", email: "", password: "" })
            setErrors({})
        }
    }

    return(
        <div className="form-container">

            <div className="header">
                <h1>Welcome</h1>
            </div>

            <div className="tab">
                <div className={`signup ${isSignUp ? "active" : "inactive"}`} onClick={() => setIsSignUp(true)}>
                    <p>Sign Up</p>
                </div>

                <div className={`signin ${!isSignUp ? "active" : "inactive"}`} onClick={() => setIsSignUp(false)}>
                    <p>Sign In</p>
                </div>
            </div>
        
            <form>
                <div className="input">
                {isSignUp && (
                    <div className="inputgroup">
                        <label htmlFor="fullname">Enter Full Name</label> 
                        <input type="text" id="fullname" 
                        name="fullname"
                        placeholder="Enter your Full name"
                        value={formDetails.fullname || ""} 
                        onChange={(evt)=> setFormDetails({...formDetails, fullname: evt.target.value})}/>

                        {errors.fullname && <p className="error">{errors.fullname}</p>}
                    </div>
                )}

                    <div className="inputgroup">
                        <label htmlFor="email">Enter Your Email</label> 
                        <input type="email" id="email" 
                        name="email"
                        placeholder="Enter your Email"
                        value={formDetails.email || ""} 
                        onChange={(evt)=> setFormDetails({...formDetails,email: evt.target.value})}/>

                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className="inputgroup">
                        <label htmlFor="password">Enter Your Password</label> 
                        <input type="password" id="password" 
                        name="password"
                        placeholder="Enter your Password"
                        value={formDetails.password || ""} 
                        onChange={(evt)=> setFormDetails({...formDetails,password: evt.target.value})}/>

                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                </div>
                
                <div className="button-container">
                    <button onClick={handleSubmit}>{isSignUp ? "Sign Up" : "Sign In"}</button>
                </div>
            </form>
        </div>
    )
}
