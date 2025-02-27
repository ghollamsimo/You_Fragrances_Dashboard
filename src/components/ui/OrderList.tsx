const OrderList = () => {
    const orders = [
        {
            product: "Smart Watch",
            image: "/placeholder.svg?height=40&width=40",
            time: "2 minutes ago",
            price: 50,
        },
        {
            product: "Phone Lenses",
            image: "/placeholder.svg?height=40&width=40",
            time: "3 minutes ago",
            price: 30,
        },
        {
            product: "Minimalist Wallet",
            image: "/placeholder.svg?height=40&width=40",
            time: "8 minutes ago",
            price: 28,
        },
        {
            product: "Car vacume",
            image: "/placeholder.svg?height=40&width=40",
            time: "15 minutes ago",
            price: 90,
        },
    ]

    return (
        <div className="bg-gray-900 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Recent order</h2>
                <a href="#" className="text-sm text-blue-500">
                    See All
                </a>
            </div>

            <div className="space-y-4">
                {orders.map((order, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src={order.image || "/placeholder.svg"}
                                alt={order.product}
                                className="w-10 h-10 rounded-lg bg-gray-800"
                            />
                            <div>
                                <p className="text-white">{order.product}</p>
                                <p className="text-xs text-gray-400">{order.time}</p>
                            </div>
                        </div>
                        <div className="text-white font-medium">${order.price}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrderList

