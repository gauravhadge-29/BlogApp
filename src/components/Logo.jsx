import React from 'react'

function Logo({width = '100px', className = ''}) {
  return (
    <div className={className} style={{width}}>
      Blogger
    </div>
  )
}

export default Logo
