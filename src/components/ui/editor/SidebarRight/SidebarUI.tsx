import style from "./sidebarright.module.scss";

// Header de Sección
export const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className={style.section__title}>
        <Icon /> {title}
    </div>
);

// Input Genérico
interface PropInputProps {
    label: string;
    value?: any;
    defaultValue?: string;
    onChange: (val: any) => void;
    type?: string;
    placeholder?: string;
    className?: string;
}

export const PropertyInput = ({ label, value, defaultValue, onChange, type = "text", placeholder, className }: PropInputProps) => (
    <div className={`${style.input_group} ${className || ''}`}>
        {label && <label>{label}</label>}
        <input 
            type={type} 
            value={value} 
            defaultValue={defaultValue}
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


// --- NUEVO: Grupo de Botones (Para Alineación y Fill) ---
export const ButtonGroup = ({ label, children }: any) => (
    <div className={style.input_group}>
        {label && <label>{label}</label>}
        <div className={style.button_group}>
            {children}
        </div>
    </div>
);

// --- NUEVO: Switch / Checkbox Booleano ---
export const PropertySwitch = ({ label, value, onChange }: any) => (
    <div className={style.switch_row}>
        <label>{label}</label>
        <input 
            type="checkbox" 
            checked={!!value} 
            onChange={(e) => onChange(e.target.checked)} 
        />
    </div>
);

// --- NUEVO: Grilla pequeña (Para Padding L,R,T,B) ---
export const PropertyGrid = ({ label, children }: any) => (
    <div className={style.input_group}>
        {label && <label style={{marginBottom: 5, display:'block'}}>{label}</label>}
        <div className={style.mini_grid}>
            {children}
        </div>
    </div>
);