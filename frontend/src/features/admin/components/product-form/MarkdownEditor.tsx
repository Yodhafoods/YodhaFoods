import { Streamdown } from "streamdown";
import { useEffect, useState } from "react";

interface MarkdownEditorProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    height?: string;
}

export function MarkdownEditor({
    label,
    value,
    onChange,
    placeholder = "Type markdown here...",
    height = "h-48"
}: MarkdownEditorProps) {
    const [preview, setPreview] = useState(false);

    // Streamdown expects a stream or string. For simple input, passing string works.
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setPreview(false)}
                        className={`text-xs px-3 py-1 rounded transition-colors ${!preview
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-500 hover:bg-gray-100"
                            }`}
                    >
                        Write
                    </button>
                    <button
                        type="button"
                        onClick={() => setPreview(true)}
                        className={`text-xs px-3 py-1 rounded transition-colors ${preview
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-500 hover:bg-gray-100"
                            }`}
                    >
                        Preview
                    </button>
                </div>
            </div>

            <div className={`relative border rounded-lg overflow-hidden ${height}`}>
                {!preview ? (
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className="w-full h-full p-4 resize-none focus:outline-none font-mono text-sm"
                    />
                ) : (
                    <div className="w-full h-full p-4 overflow-auto prose max-w-none bg-gray-50">
                        {value ? <Streamdown>{value}</Streamdown> : <span className="text-gray-400 italic">Nothing to preview</span>}
                    </div>
                )}
            </div>
        </div>
    );
}
