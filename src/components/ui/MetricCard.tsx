const MetricCard = ({ title, value,  color }) => {
    return (
        <div className="bg-gray-900 rounded-lg p-5">
            <h3 className="text-gray-400 mb-1">{title}</h3>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-3xl font-bold text-white">{value}</p>
                </div>

            </div>
        </div>
    )
}

export default MetricCard

