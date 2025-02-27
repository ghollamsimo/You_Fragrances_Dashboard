const PieChart = () => {
    const data = [
        { region: "America", percentage: 27.7, color: "#3b82f6" },
        { region: "Africa", percentage: 28.4, color: "#f59e0b" },
        { region: "Europe", percentage: 34.7, color: "#ec4899" },
        { region: "Asia", percentage: 9.2, color: "#8b5cf6" },
    ]

    // Calculate the cumulative percentages for the pie chart
    let cumulativePercentage = 0
    const segments = data.map((item) => {
        const startAngle = cumulativePercentage
        cumulativePercentage += item.percentage
        const endAngle = cumulativePercentage
        return {
            ...item,
            startAngle: (startAngle / 100) * 360,
            endAngle: (endAngle / 100) * 360,
        }
    })

    return (
        <div className="bg-gray-900 rounded-lg p-5">
            <h2 className="text-xl font-bold text-white mb-4">Current visit</h2>

            <div className="flex justify-center">
                <div className="relative w-40 h-40">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {segments.map((segment, index) => {
                            const startAngle = segment.startAngle * (Math.PI / 180)
                            const endAngle = segment.endAngle * (Math.PI / 180)

                            const x1 = 50 + 50 * Math.sin(startAngle)
                            const y1 = 50 - 50 * Math.cos(startAngle)
                            const x2 = 50 + 50 * Math.sin(endAngle)
                            const y2 = 50 - 50 * Math.cos(endAngle)

                            const largeArcFlag = segment.endAngle - segment.startAngle > 180 ? 1 : 0

                            const pathData = [`M 50 50`, `L ${x1} ${y1}`, `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`, `Z`].join(" ")

                            return <path key={index} d={pathData} fill={segment.color} />
                        })}
                    </svg>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-300">{item.region}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PieChart

