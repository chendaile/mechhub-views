import React from "react";
import type { ActiveView } from "../shared/types";

interface MainLayoutViewProps {
    activeView: ActiveView;
    sidebar: React.ReactNode;
    home: React.ReactNode;
    chat: React.ReactNode;
    profile: React.ReactNode;
    classHub?: React.ReactNode;
    submitAssignment?: React.ReactNode;
    viewFeedback?: React.ReactNode;
    publishAssignment?: React.ReactNode;
    gradeAssignment?: React.ReactNode;
}

export const MainLayoutView = ({
    activeView,
    sidebar,
    home,
    chat,
    profile,
    classHub,
    submitAssignment,
    viewFeedback,
    publishAssignment,
    gradeAssignment,
}: MainLayoutViewProps) => {
    return (
        <div className="flex h-screen bg-white text-slate-800 overflow-hidden font-['Inter']">
            {sidebar}

            <main className="flex-1 flex flex-col h-full relative overflow-hidden min-w-0 min-h-0">
                {activeView === "home" && home}
                {activeView === "chat" && chat}
                {activeView === "profile" && profile}
                {activeView === "classHub" && classHub}
                {activeView === "submitAssignment" && submitAssignment}
                {activeView === "viewFeedback" && viewFeedback}
                {activeView === "publishAssignment" && publishAssignment}
                {activeView === "gradeAssignment" && gradeAssignment}
            </main>
        </div>
    );
};
