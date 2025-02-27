const ProductList = () => {
    const products = [
        {
            name: "Laptop Batteries",
            image: "/placeholder.svg?height=60&width=100",
            rating: 4,
            stock: 500,
            price: 40,
        },
        {
            name: "Wireless Charger",
            image: "/placeholder.svg?height=60&width=100",
            rating: 4,
            stock: 100,
            price: 30,
        },
    ]

    return (
        <div className="bg-gray-900 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Trending Items</h2>
                <a href="#" className="text-sm text-blue-500">
                    See All
                </a>
            </div>

            <div className="space-y-4">
                {products.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-20 h-12 rounded-lg bg-gray-800 object-cover"
                            />
                            <div>
                                <p className="text-white">{product.name}</p>
                                <div className="flex items-center gap-1 my-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < product.rating ? "text-yellow-400" : "text-gray-600"}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-400">In stock • {product.stock}</p>
                            </div>
                        </div>
                        <div className="text-white font-medium">${product.price}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList

