import {
    Home,
    BarChart2,
    Users,
    User,
} from "lucide-react"

const Sidebar = () => {
    const navItems = [
        { icon: <Home size={20} />, label: "Home", active: true },
    ]

    return (
        <div className="fixed left-0 top-0 h-screen w-52 bg-transparent border-r-2 border-gray-700 text-white flex flex-col z-10">
            <div className="p-6">
                <div className="flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="w-4 h-4 bg-white rounded-sm"></div>
                        <div className="w-4 h-4 bg-white rounded-sm"></div>
                        <div className="w-4 h-4 bg-white rounded-sm"></div>
                        <div className="w-4 h-4 bg-white rounded-sm"></div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <nav className="px-4 py-2">
                    <ul className="space-y-2">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <a
                                    href="#"
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                                        item.active ? "bg-blue-600" : "hover:bg-gray-800"
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                    {item.hasDropdown && (
                                        <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>



            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-950">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-900 font-bold">
                        P
                    </div>
                    <span className="font-medium">Profile</span>
                    <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Sidebar

