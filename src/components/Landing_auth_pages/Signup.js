import React,{useState} from 'react'
import landing1 from '../images/landing2.jpeg'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate()
    const[user,setUsers]=useState({
        firstName:'',
        lastName:'',
        email:'',
        phoneNumber:'',
        password:''
    })

    const handleInputs=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setUsers({...user,[name]:value})
    }

    const postData = async (e) =>{
        e.preventDefault()
        const {firstName,lastName,email,phoneNumber,password}=user
        const res = await fetch('http://127.0.0.1:5000/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                firstName,lastName,email,phoneNumber,password
            })
        });

        if(res.status===200){
            window.alert("signup sucessfull register")
            navigate('/login')
        }
        else{
            window.alert('signup problem')
        }
    }
    return (
        <div>
            <header className='landing1'>
                <div className="lan_context">
                    <div className="content">
                        <div class="containers">
                            <form id="form" class="form">
                                <h2>Signup</h2>
                                <div class="form-control" style={{backgroundColor:'transparent',border:'0px'}}>
                                    <label for="f_name">First Name</label>
                                    <input type="text" id="f_name" name='firstName' placeholder="Enter Firstname" value={user.firstName} onChange={handleInputs}/>
                                    <small>Error message</small>
                                </div>
                                <div class="form-control" style={{backgroundColor:'transparent',border:'0px'}}>
                                    <label for="l_name">Last Name</label>
                                    <input type="text" id="l_name" name='lastName' placeholder="Enter Lastname" value={user.lastName} onChange={handleInputs}/>
                                    <small>Error message</small>
                                </div>
                                <div class="form-control" style={{backgroundColor:'transparent',border:'0px'}}>
                                    <label for="email">Email</label>
                                    <input type="text" id="email" name='email' placeholder="Enter email" value={user.email} onChange={handleInputs}/>
                                    <small>Error message</small>
                                </div>
                                <div class="form-control" style={{backgroundColor:'transparent',border:'0px'}}>
                                    <label for="phonenumber">Phonenumber</label>
                                    <input type="number" id="phonenumber" name='phoneNumber' placeholder="Enter Phonenumber" value={user.phoneNumber} onChange={handleInputs}/>
                                    <small>Error message</small>
                                </div>
                                <div class="form-control" style={{backgroundColor:'transparent',border:'0px'}}>
                                    <label for="password">Password</label>
                                    <input type="password" id="password" name='password' placeholder="Enter password" value={user.password} onChange={handleInputs}/>
                                    <small>Error message</small>
                                </div>
                                <div class="form-control" style={{backgroundColor:'transparent',border:'0px'}}>
                                    <label for="password2">Confirm password</label>
                                    <input type="password" id="password2" placeholder="Renter your password" />
                                    <small>Error message</small>
                                </div>
                                <button type="submit" onClick={postData}>Submit</button>
                            </form>
                            <p>Already a member?<a href='/login'>Login</a></p>
                        </div>
                    </div>
                   
                </div>
            </header>
        </div>
    )
}

export default Signup