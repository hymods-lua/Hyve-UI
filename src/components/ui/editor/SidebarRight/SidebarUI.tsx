import style from "./sidebarright.module.scss"; // Asumo que usas el mismo archivo

// Header de Sección
export const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className={style.section__title}>
        <Icon /> {title}
    </div>
);

// Input Genérico
interface PropInputProps {
    label: string;
    value: any;
    onChange: (val: any) => void;
    type?: string;
    placeholder?: string;
}

export const PropertyInput = ({ label, value, onChange, type = "text", placeholder }: PropInputProps) => (
    <div className={style.input_group}>
        <label>{label}</label>
        <input 
            type={type} 
            value={value} 
            placeholder={placeholder}
            onChange={(e) => onChange(type === "number" ? Number.parseFloat(e.target.value) : e.target.value)} 
        />
    </div>
);

// Select Genérico
export const PropertySelect = ({ label, value, options, onChange }: any) => (
    <div className={style.input_group}>
        {label && <label>{label}</label>}
        <select 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className={style.select}
        >
            {options.map((opt: any) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    </div>
);