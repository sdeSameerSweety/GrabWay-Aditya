import React from 'react'
import { useMemo } from 'react';
import {GoogleMaps, useLoadScript , Marker} from "@react-google-maps/api";

const Map = () => {
    const {}=useLoadScript()
  return (<>
    <div className='ml-[50%]'>
      Maps here bro
    </div>
    </>)
}

export default Map
