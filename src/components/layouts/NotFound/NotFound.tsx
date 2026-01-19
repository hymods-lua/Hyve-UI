import style from "./notfound.module.scss";

export default function NotFount() {
    return (
        <div className={style.notFoundContainer}>
            <h1>404</h1>
            <p>Página no encontrada</p>
        </div>
    )
}