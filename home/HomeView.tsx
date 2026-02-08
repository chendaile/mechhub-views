import React from "react";
import { HomeGreeting } from "./parts/HomeGreeting";
import { HomeInput } from "./parts/HomeInput";
import { TypewriterText } from "./parts/TypewriterText";

interface HomeViewProps {
    userName: string;
    inputBar: React.ReactNode;
}

export const HomeView = ({ userName, inputBar }: HomeViewProps) => {
    return (
        <div className="relative flex h-full flex-1 flex-col items-center justify-center bg-white p-8">
            <div className="ml-[50px] flex w-full max-w-6xl flex-col items-start">
                <HomeGreeting userName={userName} />

                <div className="w-[90%] max-w-5xl">
                    <h1
                        className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-3 tracking-tight leading-tight min-h-[1.2em]"
                        style={{ fontFamily: "Courier New, monospace" }}
                    >
                        <TypewriterText text="Where should we start?" delay={0.3} />
                    </h1>

                    <HomeInput inputBar={inputBar} />
                </div>
            </div>
        </div>
    );
};
