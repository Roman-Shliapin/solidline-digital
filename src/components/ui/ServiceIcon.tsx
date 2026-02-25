import { HiOutlineGlobeAlt, HiOutlineCursorClick, HiOutlineBell, HiOutlineLightningBolt } from "react-icons/hi";
import type { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
    globe: HiOutlineGlobeAlt,
    cursor: HiOutlineCursorClick,
    bell: HiOutlineBell,
    bolt: HiOutlineLightningBolt,
};

const ServiceIcon = ({ name, className }: { name: string; className?: string }) => {
    const Icon = iconMap[name];
    if (!Icon) return null;
    return <Icon className={className} />;
};

export default ServiceIcon;
