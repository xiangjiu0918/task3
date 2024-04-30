import styles from "./page.module.css";
import React,{useState} from "react";
export default function myComponents(props){
    const [isFull,setIsFull]=useState(false)
    const [changeIcon,setChangeIcon]=useState('big')
    function handleClose(){
        props.close()
    }
    function handleMini(){
        props.mini()
    }
    function fullPage(){
        if(!isFull){
            props.resetPos(0)
            setIsFull(true)
            setChangeIcon('small')
        }
        else{
            props.resetPos(1)
            setIsFull(false)
            setChangeIcon('big')
        }
    }
    return (
        <div className={isFull?styles.popupFull:styles.popup}>
            <div className={styles.topBar}>
                <div className={styles.topBarLeft}>
                    <div
                        className={styles.circle}
                        onClick={fullPage}
                    >
                        <img className={styles.icon} src={"/"+changeIcon+".png"}/>
                    </div>
                    <div 
                        className={styles.circle}
                        onClick={handleMini}
                        >
                        <img className={styles.icon} src="/exit.png"></img>
                    </div>
                </div>
                <div
                    className={styles.circle}
                    style={{marginRight:'10px'}}
                    onClick={handleClose}
                >
                    <img className={styles.icon} src="/close.png"></img>
                </div>
                <img className={styles.topBarDrag} src="/minus.png"></img>
            </div>
            <div className={styles.popContent}>
                <img className={styles.draw} src="/draw.jpg"></img>
            </div>
        </div>
    )
}