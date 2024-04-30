// import Image from "next/image";
// import styles from "./page.module.css";

'use client'
import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable'; 
import MyComponents from "./myComponent";
import MyPopUp from "./myPopUp";
import styles from "./page.module.css";

export default function Home() {
  const [screenHeight,setScreenHeight]=useState(0)
  const [screenWidth,setScreenWidth]=useState(0)
  const [dragX,setDragX]=useState(0)
  const [dragY,setDragY]=useState(0)
  const [delay,setDelay]=useState('0s')
  const [op,setOp]=useState('1')
  const [popDragX,setPopDragX]=useState(0)
  const [popDragY,setPopDragY]=useState(0)
  const [floatShow, setFloatShow]=useState(true)
  const [popshow, setPopShow]=useState(false)
  let dragRef
  const isDragging=useRef(false)
  let dragClass={
    width:'50px',
    transform:'translate('+dragX+'px,'+dragY+'px) !important',
    transition:delay,
    opacity:op
  }
  let showPop=function(){
    console.log('1223')
    console.log('isDragging:',isDragging)
    if(!isDragging.current) {
      setFloatShow(false)
      setPopShow(true)
    }
  }
  useEffect(()=>{
    if(!screenHeight){
      setPopDragX(window.innerWidth/2-150)
      setPopDragY(window.innerHeight/2-250)
      setTimeout(()=>{
        setOp('0.5')
      },500)
    }
    setScreenHeight(window.innerHeight)
    setScreenWidth(window.innerWidth)
  })
  function handleStop(){
    isDragging.current=false
    resetFloat()
  }
  function handleStart(event){
    console.log("handleStart")
    isDragging.current=true
    setDragX(event.clientX)
    setDragY(event.clientY)
    setDelay('0s')
    setOp('1')
  }
  function hanleClick(){
    console.log("click")
    setTimeout(()=>{
      showPop()
    },500)
  }
  function handlePopStart(event){
    console.log(event)
    setPopDragX(event.clientX)
    setPopDragY(event.clientY)
  }
  function hanleDrag(event){
    setDragX(event.clientX)
    setDragY(event.clientY)
  }
  function handlePopDrag(event){
    setPopDragX(event.clientX-150)
    setPopDragY(event.clientY-50)
  }
  function resetFloat(){
    console.log("resetFloat")
    const left=dragX
    const right=screenWidth-dragX
    const top=dragY
    const bottom=screenHeight-dragY
    console.log(left,right,top,bottom)
    let min=Math.min(left,right,top,bottom)
      setDelay('.5s')
      if(min==left){
        setDragX(0)
        setDragY(top)
      }
      else if(min==bottom){
        setDragX(left)
        setDragY(screenHeight-50)
      }
      else if(min==top){
        setDragX(left)
        setDragY(0)
      }
      else{
        setDragX(screenWidth-50)
        setDragY(top)
      }
      setTimeout(()=>{
        setOp('0.5')
        if(dragX==0){
          setDragX(-25)
        }
        else if(dragX==screenWidth-50){
          setDragX(screenWidth+25)
        }
        else if(dragY==0){
          setDragY(-25)
        }
        else if(dragY==screenHeight-50){
          setDragY(screenHeight+25)
        }
      },1000)
  }
  function closePopUp(){
    setPopShow(false)
  }
  function miniPopUp(){
    setPopShow(false)
    setFloatShow(true)
    resetFloat()
  }
  function resetPos(flag){
    console.log("reset")
    if(!flag){
      setPopDragX(0)
      setPopDragY(0)
    }
    else{
      setPopDragX(window.innerWidth/2-150)
      setPopDragY(window.innerHeight/2-250)
    }
  }
  return (
    <div>
      <div className={styles.cnm}>
      {floatShow?<Draggable
        bounds={"."+styles.cnm}
        onStart={handleStart}
        onDrag={hanleDrag}
        onStop={handleStop}
        onMouseDown={hanleClick}
        scale={2}
        ref={dragRef}
        position={{x:dragX,y:dragY}}
        defaultClassNameDragging={"."+styles.dragging}
        defaultClassNameDragged={"."+styles.dragged}
        >
        <div
          style={dragClass}
        >
          <MyComponents></MyComponents>
        </div>
      </Draggable>:null}
      {popshow?<Draggable
        bounds={"."+styles.cnm}
        handle={'.'+styles.topBarDrag}
        filter={'.'+styles.content}
        position={{x:popDragX,y:popDragY}}
        onStart={handlePopStart}
        onDrag={handlePopDrag}
      >
        <div
        style={{width:'300px'}}>
          <MyPopUp close={()=>{closePopUp()}} mini={()=>{miniPopUp()}} resetPos={(flag)=>{resetPos(flag)}}></MyPopUp>
        </div>
      </Draggable>:null}
    </div>
    </div>
  );
}
