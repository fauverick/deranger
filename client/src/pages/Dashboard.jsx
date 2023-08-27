import React from "react"
import axios from "axios"

export default function Dashboard(){

    const [userData, setUserData] = React.useState(
        {
            first_name: "",
            last_name: "",
            username: "",
            email: "", 
            id: ""
        }
    )


    const saveChanges = async() => {
        console.log("save")
        try {
            const newData = {
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                name: userData.username
            }
            const{data} = await axios.patch(`/api/v1/user/${userData.id}`, newData)
            console.log(data.user)
            alert("Changes saved")
        }
        catch(error){
            console.log(error)
        }
    }

    const cancelChanges = () => {
        console.log("cancel")
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUserData((prevData) => {
            return(
                {...prevData, [name]: value}
            )
        } )
        console.log(userData)
    }

    React.useEffect(() => {
        async function fetchData(){
            console.log("fetching dashboard")
            try{
                const {data} = await axios.get("/api/v1/user/showCurrentUser")
                const{first_name, last_name, name, email, _id} = data.user;
                console.log("data is ", data)
                setUserData({
                    first_name,
                    last_name,
                    email,
                    username:name, 
                    id: _id
                })
            }
            catch(error){
                console.log(error)
            }
        }
        fetchData();

    }, [])

  
    return (
      
        <div className="dashboard_container">
            <div className="dashboard">
                <div className="title">
                    Your Profile
                </div>
                <div className="dashboard_field">
                    <div className="dashboard_label">
                        <label 
                            htmlFor="first_name">First name:
                        </label>
                    </div>
                
                    <input 
                        type="text" 
                        id="first_name" 
                        name="first_name"
                        value = {userData.first_name}
                        onChange={handleChange}
                    > 
                    </input>
                </div>
            
                <div className="dashboard_field">
                    <div className="dashboard_label">
                        <label 
                            htmlFor="last_name">Last name:
                        </label>
                    </div>
                    <input 
                        type="text" 
                        id="last_name" 
                        name="last_name"
                        value = {userData.last_name}
                        onChange={handleChange}
                    > 
                    </input>
                </div>

                <div className="dashboard_field">
                    <div className="dashboard_label">
                        <label 
                            htmlFor="username">Username:
                        </label>
                    </div>
                    <input 
                        type="text" 
                        id="username" 
                        name="username"
                        value = {userData.username}
                        onChange={handleChange}
                    > 
                    </input>
                </div>

                <div className="dashboard_field">
                    <div className="dashboard_label">
                        <label 
                            htmlFor="email">Email:
                        </label>
                    </div>
                    <input 
                        type="text" 
                        id="email" 
                        name="email"
                        value = {userData.email}
                        onChange={handleChange}
                    > 
                    </input>
                </div>

                <div className="dashboard_btn">
                    <div className="dashboard_btn_container">
                        <div className="save_btn" onClick={saveChanges}>
                            Save
                        </div>

                        <div className="cancel_btn" onClick={cancelChanges}>
                            Cancel 
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
      
       
    )
}