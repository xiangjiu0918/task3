import styles from "./page.module.css";
export default function myComponents(){
    return (
        <div>
            <div className={styles.floatWrap}>
                <div className={styles.iconWrap}>
                    <img src="./favicon.ico" style={{height:'40px'}}></img>
                </div>
            </div>
        </div>
    )
}