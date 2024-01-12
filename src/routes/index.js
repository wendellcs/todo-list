import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Admin from '../pages/Admin'
import Private from './Private'

function RoutesApp() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Register' element={<Register />} />

            <Route path='/Admin' element={<Private> <Admin /> </Private>} />
        </Routes >
    )
}

export default RoutesApp