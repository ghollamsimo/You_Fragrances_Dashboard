import { PieChart, Search } from "lucide-react";
import Sidebar from "../components/ui/Sidebar";
import MetricCard from "../components/ui/MetricCard.tsx";
import BestSaleCard from "../components/ui/BestSaleCard.tsx";
import CustomerList from "../components/ui/CustomerList.tsx";
import GaugeChart from "../components/ui/GaugeChart.tsx";
import RevenueChart from "../components/ui/RevenueChart.tsx";
import OrderList from "../components/ui/OrderList.tsx";
import ProductList from "../components/ui/ProductList.tsx";

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-gray-950 text-white">
            <Sidebar />
            <div className="flex-1 ml-64 p-6 overflow-auto">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search anything here..."
                            className="bg-gray-800 rounded-full py-2 pl-10 pr-4 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard title="Users" value="320" percentage={75} color="#3b82f6" period="2 Month" />
                    <MetricCard title="Perfumes" value="500" percentage={65} color="#3b82f6" period="1 Month" />
                    <MetricCard title="Brands" value="20" percentage={35} color="#f59e0b" period="3 Month" />
                    <BestSaleCard />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <div className="lg:col-span-2">
                        <RevenueChart />
                    </div>
                    <CustomerList />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <div>
                        <GaugeChart percentage={70} title="Profit Increase" />
                    </div>
                    <div>
                        <OrderList />
                    </div>
                    <div>
                        <ProductList />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <div>
                        <PieChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
