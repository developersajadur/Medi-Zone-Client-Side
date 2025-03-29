"use client";

import dynamic from "next/dynamic";
import animationData from "@/assets/Jsons/loader.json";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-transparent">
            <Lottie options={defaultOptions}  isClickToPauseDisabled={true} height={400} width={400} />
        </div>
    );
};

export default Loader;
