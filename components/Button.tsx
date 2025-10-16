interface ButtonProps {
    text: string;
    color?: "blue" | "green" | "red";
    onClick?: () => void;
}

export default function Button({ text, color = "blue", onClick }: ButtonProps) {
    const base =
        "px-8 py-3 rounded-lg shadow-md font-semibold transform hover:scale-105 transition-all duration-200";
    const colors = {
        blue: "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
        green: "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
        red: "bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600",
    };
    return (
        <button onClick={onClick} className={`${base} ${colors[color]} text-white`}>
            {text}
        </button>
    );
}
