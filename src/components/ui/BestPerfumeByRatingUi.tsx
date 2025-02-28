import { useState } from "react";

const BestPerfumebyRating = ({ name, image, brand, averageRating, otherPerfumes }) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="bg-gray-900 rounded-lg p-5 relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Best Perfumes</h2>
                <button className="text-gray-400">{averageRating}</button>
            </div>

            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                    <img src={image} alt={name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div>
                    <p className="text-white">{name}</p>
                    <p className="text-xs text-gray-400">{brand}</p>
                </div>
            </div>

            {otherPerfumes.length > 0 && (
                <button
                    className="mt-4 text-blue-500 hover:underline"
                    onClick={() => setShowMore(!showMore)}
                >
                    {showMore ? "Show Less" : "Show More"}
                </button>
            )}

            {showMore && (
                <div className="absolute left-0 top-full mt-2 w-full bg-gray-800 rounded-lg shadow-lg p-3 z-10">
                    {otherPerfumes.map((perfume, index) => (
                        <div key={index} className="flex items-center gap-3 mt-2">
                            <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                                <img src={perfume.image} alt={perfume.name} className="w-full h-full object-cover rounded-lg" />
                            </div>
                            <div>
                                <p className="text-white text-sm">{perfume.name}</p>
                                <p className="text-xs text-gray-400">{perfume.brand}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BestPerfumebyRating;
