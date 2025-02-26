// import { useState } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Verify token at loading of the page

  useEffect(() => {
    const token = localStorage.getItem('cineclub-token');
    const verifyToken = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/check-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data); // ✅ Email récupéré
        navigate('/home', {replace: true});
      } catch (err) {
        console.error('❌ Token invalide ou expiré.');
        setMessage('❌ Token invalide ou expiré.');
      }
    };
    verifyToken();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8000/api/login', { email, password }, { withCredentials: true });
      console.log(data);
      localStorage.setItem('cineclub-token', data.token);
      setMessage('✅ Connexion réussie !');
      navigate('/home', {replace: true});
    } catch (err) {
      setMessage('❌ Identifiants invalides.');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='w-screen h-screen connexion__bg bg-cover'>
          <div className="flex items-center justify-center h-screen">
            <section className='bg-gray-200 flex flex-col w-100 gap-3 border border-[#3630DF] border-3'>

              <div className="text-gray-100 bg-[#0268F9] px-3 py-2 flex justify-between items-center">
                <h1 className="inline-block">Connexion</h1>
                <button type="button" className="bg-red-600 hover:bg-red-700 py-1 px-2">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              <label htmlFor="email" className="sr-only">Email</label>
              <input id="email" className='bg-gray-100 px-3 py-1 mx-3 border border-gray-100 focus:outline-none focus:border-[#3630DF]' 
              type="text" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required/>

              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input id="password" className='bg-gray-100 px-3 py-1 mx-3 border border-gray-100 focus:outline-none focus:border-[#3630DF]' 
              type="password" placeholder='Mot de passe' value={password} onChange={e => setPassword(e.target.value)} required/>

              {message && <p className="px-3">{message}</p>}
              <div className="flex justify-center pb-2 py-4">
                <button className="border border-[#3630DF] w-30 content-center hover:bg-gray-300" type="submit">Se connecter</button>
              </div>
              
            </section>
          </div>
          
        </div>
      </form>
      
    </>
  )
}

export default App
