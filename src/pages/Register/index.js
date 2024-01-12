import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleRegister(e) {
        e.preventDefault()
        if (email && password) {

            // Criar mais validações
            await createUserWithEmailAndPassword(auth, email, password)
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
            <h1>Cadastre-se</h1>
            <h2>Vamos criar a sua conta!</h2>

            <form className='form' onSubmit={handleRegister}>
                <label for='email'>Email:</label>
                <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Digite seu email' />
                <label for='pass'>Senha:</label>
                <input type='password' id='pass' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='********' />

                <button type='submit'>Cadastrar</button>
            </form>
            <Link className='button-link' to='/'>
                Já possui uma conta? Faça login!
            </Link>
        </div>
    );
}
