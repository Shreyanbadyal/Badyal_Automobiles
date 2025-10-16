interface ButtonProps {
    text: string;
    color?: "blue" | "green" | "red" | "yellow";  // ✅ added yellow
    onClick?: () => void;
    type?: "button" | "submit" | "reset";         // ✅ added optional type
}

export default function Button({
    text,
    color = "blue",
    onClick,
    type = "button",                               // ✅ default button type
}: ButtonProps) {
    const base =
        "px-8 py-3 rounded-lg shadow-md font-semibold transform hover:scale-105 transition-all duration-200";

    const colors: Record<string, string> = {
        blue: "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
        green:
            "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
        red: "bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600",
        yellow:
            "bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600", // ✅ added yellow gradient
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${base} ${colors[color]} text-white`}
        >
            {text}
        </button>
    );
}
