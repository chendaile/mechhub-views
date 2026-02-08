export const LandingBackground = () => {
    return (
        <div className="absolute inset-0 pointer-events-none opacity-40">
            <svg
                className="w-full h-full"
                viewBox="0 0 800 600"
                preserveAspectRatio="xMidYMid slice"
            >
                <g className="text-border-subtle" stroke="currentColor">
                    <line x1="50" y1="100" x2="200" y2="250" />
                    <line x1="50" y1="300" x2="200" y2="250" />
                    <line x1="50" y1="100" x2="50" y2="300" />
                </g>
                <g className="text-focus-ring" fill="currentColor">
                    <circle cx="50" cy="100" r="3" />
                    <circle cx="200" cy="250" r="3" />
                    <circle cx="50" cy="300" r="3" />
                </g>

                <g className="text-border-subtle" stroke="currentColor">
                    <line x1="700" y1="50" x2="600" y2="150" />
                    <line x1="750" y1="200" x2="600" y2="150" />
                </g>
                <g className="text-focus-ring" fill="currentColor">
                    <circle cx="700" cy="50" r="3" />
                    <circle cx="600" cy="150" r="3" />
                    <circle cx="750" cy="200" r="3" />
                </g>
            </svg>
        </div>
    );
};
