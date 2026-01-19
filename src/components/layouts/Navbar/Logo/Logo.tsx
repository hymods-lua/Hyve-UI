import { Link } from "react-router-dom";
import style from './logo.module.scss';

const Logo = () => (
    <Link to="/" className={style.container}>
        <div className={style.brandBox}>
            <span className={style.brandText}>
                Hyve <span>UI</span>
            </span>
        </div>
    </Link>
);


export default Logo;