import { PieChart, Search } from "lucide-react";
import Sidebar from "../components/ui/Sidebar";
import MetricCard from "../components/ui/MetricCard.tsx";
import BestPerfumebyRating from "../components/ui/BestPerfumeByRatingUi.tsx";
import GaugeChart from "../components/ui/GaugeChart.tsx";
import RevenueChart from "../components/ui/RevenueChart.tsx";
import OrderList from "../components/ui/OrderList.tsx";
import ProductList from "../components/ui/ProductList.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/Store.ts";
import {useEffect, useState} from "react";
import {bestPerfume, indexUsers, stats} from "../redux/slices/AuthSlice.ts";
import ClientList from "../components/ui/ClientsListUi.tsx";

const Dashboard = () => {
    const dispatch = useDispatch();
    const stat = useSelector((state: RootState) => state.users.dataObj);
    const bestPerfumeState = useSelector((state: RootState) => state.users.datalist);
    const clients = useSelector((state: RootState) => state.users.usersData)
    useEffect(() => {
        dispatch(stats());
        dispatch(bestPerfume());
        dispatch(indexUsers())
    }, [dispatch]);

    const usersCount = stat?.data?.length ? stat.data[0].users : 0;
    const perfumesCount = stat?.data?.length ? stat.data[0].perfumes : 0;
    const brandsCount = stat?.data?.length ? stat.data[0].brands : 0;

    const prevData = { users: 1, perfumes: 1, brands: 1 };

    const calculatePercentage = (current: number, previous: number) => {
        if (previous === 0) return 100;
        return Math.round(((current - previous) / previous) * 100);
    };
    if (!bestPerfumeState || bestPerfumeState.length === 0) {
        return <p className="text-gray-400">No top-rated perfume found.</p>;
    }

    const sortedPerfumes = [...bestPerfumeState].sort((a, b) => b.averageRating - a.averageRating);

    const bestPerfumeCard = sortedPerfumes[0];
    const otherBestPerfumes = sortedPerfumes.slice(1);
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
                    <MetricCard
                        title="Users"
                        value={usersCount}
                        percentage={calculatePercentage(usersCount, prevData.users)}
                        color="#3b82f6"
                    />
                    <MetricCard
                        title="Perfumes"
                        value={perfumesCount}
                        percentage={calculatePercentage(perfumesCount, prevData.perfumes)}
                        color="#3b82f6"
                    />
                    <MetricCard
                        title="Brands"
                        value={brandsCount}
                        percentage={calculatePercentage(brandsCount, prevData.brands)}
                        color="#f59e0b"
                    />
                    <BestPerfumebyRating
                        name={bestPerfumeCard.name}
                        image={bestPerfumeCard.image}
                        brand={bestPerfumeCard.brand}
                        averageRating={bestPerfumeCard.averageRating}
                        otherPerfumes={otherBestPerfumes}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <div className="lg:col-span-2">
                        <RevenueChart />
                    </div>
                    <ClientList clients={clients} />
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
