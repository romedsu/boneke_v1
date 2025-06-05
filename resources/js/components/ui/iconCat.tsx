import * as Icons from 'lucide-react';

interface IconProps {
    name: string;
    className?: string;
    size?: number;
}

export function Icon({ name, className, size = 24 }: IconProps) {
    const LucideIcon = Icons[name as keyof typeof Icons];
    if (!LucideIcon) return null;
    return <LucideIcon className={className} size={size} />;
}