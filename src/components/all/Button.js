import React from 'react';

import { Loader } from './Loader';

export function Button(props){
  const { loading, type, className, text, disabled } = props;

  return (
    <button type={type} className={className} disabled={loading || disabled}>
      {loading ? <Loader className='l_loader' color='#fff' /> : text}
    </button>
  );
}