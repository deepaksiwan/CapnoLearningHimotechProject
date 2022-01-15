import { removeData } from 'jquery';
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import user from '../../images/user.png'

const Login = () => {

    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    const [alerts, setalerts] = useState(false)
    const navigate = useNavigate();

	async function loginUser(event) {
		event.preventDefault()
        setalerts(false)

		const response = await fetch('https://capno-api.herokuapp.com/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})


       
		const data = await response.json()
        
		if (data.status) {
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('session_id', data.user_id);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('selectedGroup', false);
            localStorage.setItem('selectedTrainer', null);
            // localStorage.setItem('selectedGroup', false);
            localStorage.setItem('userType', data.user_type);
            if(data.user_type == 1 || data.user_type == 2){
                localStorage.setItem('selectedTrainer', data.user_id);
            }
            localStorage.setItem('selectedClient', null);
            localStorage.setItem('selectedSession', null);
            if(data.user_type == 3){
                localStorage.setItem('selectedClient', data.user_id);
            }
			navigate("/");
		} else {
            setalerts(true)
			
		}
      
        // alert('Logined')
	}

    console.warn('user');
    return(
      <div className='login-bg'>
          <div className="wrp-login">
              <form onSubmit={ loginUser }>
                  <div className="login-content">
                  <div className="login-database">
                          <p>Login to CapnoTrainer® Cloud Database</p>
                      </div>
                      <div className="user-img">
                          <img src={user} alt="user-img" />
                      </div>
                      
                      <div className="wrp-label">
                          <label>Email Address</label>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                         />
                      </div>
                      <div className="wrp-label mrt-input">
                          <label>Password</label>
                          <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                         />
                      </div>
                      {
                          alerts &&
                          <p className="invalid-p">Invalid Login</p>
                      }
                    
                      <button className="login-btn"  type="submit" >Login</button>
                     
                  </div>
              </form>
          </div>
      </div>
    );
}


export default Login;