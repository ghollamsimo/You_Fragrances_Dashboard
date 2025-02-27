"use client"

import { useEffect } from "react"
import Sidebar from "./components/ui/Sidebar"
import Dashboard from "./pages/Dashboard.tsx";

function App() {
    // Set dark mode by default
    useEffect(() => {
        document.documentElement.classList.add("dark")
    }, [])

    return (
        <div className="flex h-screen w-full bg-gray-950">
            <Sidebar/>
            <div className="flex-1 ml-64 overflow-auto">
                <Dashboard />
            </div>
        </div>
    )
}

export default App

