import React from 'react'
import ReactDOM from 'react-dom'

//import './frontend.scss'


const sweapButtons = document.querySelectorAll('[data-sweap-button]')
sweapButtons.forEach((buttonElement) => {
    const data = JSON.parse(buttonElement.querySelector('pre').innerHTML)
    ReactDOM.render(<SweapButton {...data} />, buttonElement)
})


function SweapButton(props) {
    return (<>
        <a target="_blank" href={props.link} className={props.style}>{props.text} <span> </span>  <i className={props.icon}></i></a>
    </>
    )
}