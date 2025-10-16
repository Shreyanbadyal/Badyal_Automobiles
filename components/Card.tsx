import { ReactNode } from "react";

export default function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div
            className={`bg-gray-900/60 backdrop-blur-md shadow-2xl border border-gray-700 ${className}`}
        >
            {children}
        </div>
    );
}
