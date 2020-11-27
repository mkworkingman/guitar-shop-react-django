import React, { useState, useEffect } from 'react';

interface IParams {
  item: object,
  user: undefined | object
}

const Instrument: React.FC<IParams> = ({item, user}) => {
  console.log(item)
  console.log(user)
  return (
    <div>
      
    </div>
  );
}

export default Instrument;