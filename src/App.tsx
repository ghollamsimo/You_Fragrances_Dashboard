import Dashboard from "./pages/Dashboard.tsx";
import {Navigate, Router, Routes, Route} from "react-router-dom";
import Login from "./pages/auth/LoginAuthPage.tsx";
import './App.css'
function App() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/dashboard" element={
                    <Dashboard/>
            }/>
        </Routes>
    )
}

export default App

