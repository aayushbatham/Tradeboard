const topPerformers = [
  {
    rank: 1,
    name: "Cazzisse Rasell",
    total: "$50,000",
    iconColor: "text-yellow-500",
    image: "path/to/image1.jpg",
  },
  {
    rank: 2,
    name: "Gwennie Bosnell",
    total: "$48,000",
    iconColor: "text-green-500",
    image: "path/to/image2.jpg",
  },
  {
    rank: 3,
    name: "Maddy Spyer",
    total: "$45,000",
    iconColor: "text-green-500",
    image: "path/to/image3.jpg",
  },
];
import { Crown } from "lucide-react";
import { FaCrown } from "react-icons/fa";

const TopPerformer = () => {
  return (
    <div className="p-20 h-full mb-20">
      <div className="flex justify-center items-center space-x-8 mb-10 p-28 m-auto relative h-full w-full">
        {/* Performer 1 */}
        <div className="flex flex-col items-center transform scale-150 absolute">
          {/* Circle container with crown */}
          <div className="relative mb-4 flex items-center justify-center rounded-full border-4 border-[#FECA29] w-60 h-60">
            <img
              // src="https://i.pravatar.cc/150?u=Cazzisse Rasell"
              src="/performer1.jpg"
              alt="Cazzisse Rasell"
              className="rounded-full object-cover w-56 h-56"
            />
            {/* Crown icon */}
            <FaCrown
              className="absolute text-7xl -top-20 left-1/2 transform -translate-x-1/2 text-[#FECA29]"
              size={80}
            />
            <div className="absolute rounded-full bg-[#FECA29] h-11 w-11 -bottom-6 ">
              <p className=" absolute text-2xl font-bold text-black ml-4 mt-2">
                1
              </p>
            </div>
          </div>
          {/* Rank number styling */}

          <div className="text-center mt-4">
            <p className="text-xl font-bold">Cazzisse Rasell</p>
            <p className="text-lg text-gray-500">$50,000</p>
          </div>
        </div>

        {/* Performer 2 */}
        <div className="flex flex-col items-center absolute right-20 scale-120">
          {/* Circle container */}
          <div className="relative mb-4 flex items-center justify-center rounded-full border-4 border-[#48E99C] w-70 h-70">
            <img
              // src="https://i.pravatar.cc/150?u=Gwennie Bosnell"
              src="/performer2.jpg"
              alt="Gwennie Bosnell"
              className="rounded-full object-cover w-64 h-64"
            />
            {/* Crown icon */}
            <FaCrown
              className="absolute text-6xl -top-20 left-1/2 transform -translate-x-1/2 text-[#48E99C]"
              size={80}
            />
            <div className="absolute rounded-full bg-[#48E99C] h-11 w-11 -bottom-6 ">
              <p className=" absolute text-2xl font-bold text-black ml-4 mt-2">
                2
              </p>
            </div>
          </div>
          {/* Rank number styling */}
          <div className="mt-6 text-center">
            <p className="text-xl font-bold">Gwennie Bosnell</p>
            <p className="text-lg text-gray-500">$48,000</p>
          </div>
        </div>

        {/* Performer 3 */}
        <div className="flex flex-col items-center absolute left-20 scale-120">
          {/* Circle container */}
          <div className="relative mb-4 flex items-center justify-center rounded-full border-4 border-[#ADEF44] w-70 h-70 ">
            <img
              // src="https://i.pravatar.cc/150?u=Maddy Spyer"
              src="/performer3.jpg"
              alt="Maddy Spyer"
              className="rounded-full object-fill w-64 h-64"
            />
            {/* Crown icon */}
            <FaCrown
              className="absolute text-6xl -top-20 left-1/2 transform -translate-x-1/2 text-[#ADEF44]"
              size={80}
            />
            <div className="absolute rounded-full bg-[#ADEF44] h-11 w-11 -bottom-6 ">
              <p className=" absolute text-2xl font-bold text-black ml-4 mt-2">
                3
              </p>
            </div>
          </div>
          {/* Rank number styling */}

          <div className="text-center mt-6">
            <p className="text-xl font-bold">Maddy Spyer</p>
            <p className="text-lg text-gray-500">$45,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPerformer;
