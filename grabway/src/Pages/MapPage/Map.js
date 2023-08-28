import React from 'react'
import MapLayout from '../../components/Map/MapLayout'

const Map = (props) => {
    const nonce =  props.nonceVal;
  return (
    <div>
      <MapLayout nonceVal={nonce} />
    </div>
  )
}

export default Map
