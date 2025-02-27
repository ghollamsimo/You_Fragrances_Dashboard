const MetricCard = ({ title, value, percentage, color, period }) => {
    return (
        <div className="bg-gray-900 rounded-lg p-5">
            <h3 className="text-gray-400 mb-1">{title}</h3>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-3xl font-bold text-white">{value}</p>
                    <p className="text-xs text-gray-400 mt-1">During {period}</p>
                </div>
                <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#333" strokeWidth="10" />
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke={color}
                            strokeWidth="10"
                            strokeDasharray={`${percentage * 2.51} 251`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-medium" style={{ color }}>
                        {percentage}%
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MetricCard

