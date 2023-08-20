import React from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
const MapLayout = () => {
 
    const {isLoaded}=useJsApiLoader({
      googleMapsApiKey:"AIzaSyAfuFBhydCeCnk1Kl1c6u_1SfrIyXlReh0",
      libraries:['places'],
    }) 
    
    if(!isLoaded){
      return <>Loading...</>
    }
  }

export default MapLayout
