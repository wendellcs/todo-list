import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

import './home.css'

export default function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        if (email && password) {
            // Fazer mais validações
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/Admin', { replace: true })

                }).catch(err => {
                    alert(err)
                })
        } else {
            alert('vazio')
        }
    }

    return (
        <div className='home-container'>
            <h1>To Do List</h1>
            <h2>Gerencie sua agenda de forma fácil.</h2>

            <form className='form' onSubmit={handleLogin}>
                <label for='email'>Email:</label>
                <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Digite seu email' />
                <label for='pass'>Senha:</label>
                <input type='password' id='pass' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='********' />

                <button type='submit'>Acessar</button>
            </form>
            <Link className='button-link' to='/Register'>
                Não possui uma conta? Cadastre-se
            </Link>

        </div>
    );
}
