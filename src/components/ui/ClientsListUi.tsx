const ClientList = ({ clients }) => {
    return (
        <div className="bg-gray-900 rounded-lg p-5">
            <h2 className="text-xl font-bold text-white mb-4">Latest Clients</h2>
            <div className="space-y-4">
                {clients.map((client) => (
                    <div key={client._id} className="flex items-center justify-between">
                        <div className="flex bg-cover items-center gap-3">
                            <img
                                src={client.image || "default-avatar.png"}
                                alt={client.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            <div>
                                <p className="text-white font-medium">{client.name}</p>
                                <p className="text-xs text-gray-400">
                                    {client.brandCount} Followed Brand | {client.likes} Favorite Perfumes
                                </p>
                            </div>
                        </div>
                        <div className="relative group">
                            <button
                                className="w-8 h-8 cursor-auto rounded-full bg-gray-800 flex items-center justify-center text-blue-400">
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

                            <div className="absolute -top-1.5 -left-[80px] -translate-x-1/2 hidden group-hover:flex bg-gray-800 text-white text-xs py-1 px-3 rounded-md">
                                {client.email}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientList;
