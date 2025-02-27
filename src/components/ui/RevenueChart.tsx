const RevenueChart = () => {
    const months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Sample data for the chart
    const data = [
        { month: "Jan", earnings: 100, expenses: 150 },
        { month: "Feb", earnings: 120, expenses: 180 },
        { month: "Mar", earnings: 110, expenses: 200 },
        { month: "April", earnings: 130, expenses: 160 },
        { month: "May", earnings: 90, expenses: 120 },
        { month: "Jun", earnings: 100, expenses: 140 },
        { month: "Jul", earnings: 80, expenses: 110 },
        { month: "Aug", earnings: 90, expenses: 130 },
        { month: "Sep", earnings: 100, expenses: 120 },
        { month: "Oct", earnings: 110, expenses: 170 },
        { month: "Nov", earnings: 90, expenses: 140 },
        { month: "Dec", earnings: 120, expenses: 150 },
    ]

    const maxValue = 300

    return (
        <div className="bg-gray-900 rounded-lg p-5">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Revenue Report</h2>
                <div className="flex items-center gap-2">
                    <span className="text-white">Month</span>
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                    <span className="text-sm text-gray-300">Earning</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                    <span className="text-sm text-gray-300">Expenses</span>
                </div>
            </div>

            <div className="relative h-80">
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
                    <div>+300</div>
                    <div>+200</div>
                    <div>+100</div>
                    <div>0</div>
                    <div>-100</div>
                    <div>-200</div>
                </div>

                <div className="ml-10 h-full flex">
                    {data.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col justify-center items-center">
                            <div className="relative h-64 w-6 flex flex-col justify-center">
                                <div
                                    className="absolute bottom-1/2 w-6 bg-blue-500 rounded-t-sm"
                                    style={{ height: `${(item.expenses / maxValue) * 100}%` }}
                                ></div>
                                <div
                                    className="absolute top-1/2 w-6 bg-yellow-500 rounded-b-sm"
                                    style={{ height: `${(item.earnings / maxValue) * 100}%` }}
                                ></div>
                            </div>
                            <div className="mt-2 text-xs text-gray-400">{item.month}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RevenueChart

