const CustomerList = () => {
    const customers = [
        {
            name: "Harry Joe",
            avatar: "/placeholder.svg?height=40&width=40",
            purchases: 20,
            likes: 120,
        },
        {
            name: "Martha June",
            avatar: "/placeholder.svg?height=40&width=40",
            purchases: 0,
            likes: 150,
        },
        {
            name: "Michal Clerk",
            avatar: "/placeholder.svg?height=40&width=40",
            purchases: 40,
            likes: 90,
        },
    ]

    return (
        <div className="bg-gray-900 rounded-lg p-5">
            <h2 className="text-xl font-bold text-white mb-4">Latest Customer</h2>
            <div className="space-y-4">
                {customers.map((customer, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={customer.avatar || "/placeholder.svg"} alt={customer.name} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="text-white font-medium">{customer.name}</p>
                                <p className="text-xs text-gray-400">
                                    {customer.purchases} Purchases | {customer.likes} Likes
                                </p>
                            </div>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-blue-400">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CustomerList

