const GaugeChart = ({ percentage, title }) => {
    // Calculate the angle for the gauge needle
    const angle = (percentage / 100) * 180

    return (
        <div className="bg-gray-900 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{title}</h2>
                <button className="text-gray-400">
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
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                </button>
            </div>

            <div className="flex justify-center">
                <div className="relative w-48 h-24 mt-4">
                    {/* Gauge background */}
                    <svg className="w-full h-full" viewBox="0 0 200 100">
                        <path d="M20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#333" strokeWidth="30" strokeLinecap="round" />
                        <path
                            d="M20 100 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="30"
                            strokeDasharray={`${percentage * 2.8} 280`}
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Gauge needle */}
                    <div
                        className="absolute bottom-0 left-1/2 w-1 h-16 bg-white rounded-t-full origin-bottom transform -translate-x-1/2"
                        style={{ transform: `translateX(-50%) rotate(${angle - 90}deg)` }}
                    ></div>

                    {/* Percentage display */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-4 text-2xl font-bold text-blue-500">
                        {percentage}%
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GaugeChart

