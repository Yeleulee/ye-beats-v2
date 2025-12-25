import React, { memo } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MoodCardProps {
    label: string;
    icon: LucideIcon;
    gradient: string;
    glow: string;
    iconBg: string;
    onClick: () => void;
}

const MoodCard: React.FC<MoodCardProps> = ({ label, icon: Icon, gradient, glow, iconBg, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                'group relative aspect-[3/4] rounded-3xl p-6 flex flex-col justify-end overflow-hidden transition-all duration-300 transform hover:-translate-y-2',
                gradient
            )}
        >
            <div className={cn('absolute inset-0 bg-gradient-to-t from-black/70 to-transparent')} />
            <div className={cn('relative z-10', glow)}>
                <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center mb-4', iconBg)}>
                    <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white">{label}</h3>
                <p className="text-white/70">Curated Mix</p>
            </div>
        </button>
    );
};

export default memo(MoodCard);
