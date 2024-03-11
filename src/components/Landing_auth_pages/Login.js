import React,{useState} from 'react'
import landing1 from '../images/landing2.jpeg'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const onSubmit = async(e)=>{
        e.preventDefault()

        const res = await fetch('http://127.0.0.1:5000/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        });
        const data = await res.json();

        if(res.status===200){
            window.alert('User Login successfully')
            localStorage.setItem('token',data.token)
            navigate('/homepage')
        }else{
            window.alert('Wrong')
        }
    }

    return (
        <div>
            <header className='landing1'>
                <div className="lan_context">
                    <div className="content">
                        <div class="containers" id="login">
                            <form id="form" class="form">
                                <h2>Login</h2>
                                <div class="form-control" style={{backgroundColor:'transparent',border:'0px'}}>
                                    <label for="email">Email</label> 
                                    <input type="text" id="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    <small>Error message</small>
                                </div>
                                <div class="form-control" style={{backgroundColor:'transparent',border:'0px'}}>
                                    <label for="password">Password</label>
                                    <input type="password" id="password" placeholder="Enter password"value={password} onChange={(e)=>setPassword(e.target.value)} />
                                    <small>Error message</small>
                                </div>
                                <button type="submit" onClick={onSubmit}>Submit</button>
                            </form>
                            <p>If <a href="/forgotpassword">forgot password?</a></p>
                            <p>Join new member?<a href="/signup">Signup</a></p>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Login