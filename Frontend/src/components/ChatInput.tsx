import { useRef, useState } from 'react';
import { IoSendSharp, IoDocumentAttachSharp } from "react-icons/io5";
import { API_ENDPOINTS } from '../config';

interface ChatInputProp {
    onSend: (text: string) => void;
    onUploadSuccess: (newTitles: string[]) => void;
    disabled: boolean;
}

const ChatInput = ({ onSend, onUploadSuccess, disabled }: ChatInputProp) => {
    const [input, setInput] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !disabled && !isUploading) {
            onSend(input);
            setInput('');
        }
    };

    const handleAttachClick = () => {
        if (isUploading) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {  
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const formData = new FormData();

        Array.from(files).forEach((file) => {
            formData.append('files', file);
        });
        try {
            const response = await fetch(`${API_ENDPOINTS.INGEST}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Mid-conversation vector ingestion failed.');
            }

            const data = await response.json();

            let uploadedTitles: string[] = [];
            if (data.documents && data.documents.length > 0) {
                uploadedTitles = data.documents.map((doc: { title: string }) => doc.title);
            } else {
                uploadedTitles = Array.from(files).map((f) => f.name.split('.')[0]);
            }
            onUploadSuccess(uploadedTitles);
        } catch (err) {
            console.error("Attachment error:", err);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = ''; 
        }
    };

    return (
        <div className="w-full max-w-full overflow-hidden pt-1 flex items-center gap-2 px-2 sm:px-0">
            <input 
                type="file" 
                accept=".pdf,.txt" 
                multiple 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
            />

            {/* Attach File Button - shrink-0 ensures it never squishes */}
            <button 
                type="button"
                onClick={handleAttachClick}
                disabled={isUploading}
                title="Attach additional document"
                className='shrink-0 flex items-center justify-center bg-blue-800 hover:bg-blue-600 disabled:bg-zinc-800 border border-transparent text-white font-medium px-4 py-3 rounded-lg transition-all active:scale-[0.98]'
            >
                <IoDocumentAttachSharp className="text-lg" />
            </button>
        
            {/* Form wrapper with min-w-0 to prevent flex blowout */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 min-w-0">
                
                {/* Text input with min-w-0 so it gracefully shrinks on mobile */}
                <input 
                    type="text"
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    disabled={disabled}
                    placeholder={disabled ? "No context found, please upload..." : "Ask your queries...."}
                    className="w-full min-w-0 flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
                />
                
                {/* Send Button - shrink-0 locks its size so it won't bleed out */}
                <button 
                    type="submit"
                    disabled={disabled}
                    className="shrink-0 flex items-center justify-center bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:border-zinc-700 disabled:cursor-not-allowed border border-transparent text-white font-medium px-4 py-3 rounded-lg transition-all active:scale-[0.98]"
                >
                    <IoSendSharp className="text-lg" />
                </button>

            </form>
        </div>
    );
};

export default ChatInput;