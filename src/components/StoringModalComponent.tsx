import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} aria-hidden="true"></div>
            <div className="relative bg-[#0E131F] rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] p-6 overflow-y-auto">
                <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="text-base font-semibold">{title}</h3>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 focus:outline-none"
                    >
                        ✕
                    </button>
                </div>
                <div className="mt-3">{children}</div>
            </div>
        </div>
    );
};

export default ModalComponent;
