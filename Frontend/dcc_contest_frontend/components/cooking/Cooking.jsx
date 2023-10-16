import style from "./../../styles/Cooking.module.css"

const Cooking = () => {
    return (
        <>
            <div className={style.mainCookingContainer}>
                <div className={style.content}>
                    <h1 className={style.title}>Launching Soon
                        <div className={style.aurora}>
                            <div className={style.aurora__item}></div>
                            <div className={style.aurora__item}></div>
                            <div className={style.aurora__item}></div>
                            <div className={style.aurora__item}></div>
                        </div>
                    </h1>
                    <p className={style.subtitle}>Made with love by DCC.</p>
                </div>
            </div>
        </>);
}
export default Cooking;