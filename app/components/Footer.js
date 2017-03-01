import React from 'react'
import ScLogo from './ScLogo';
export default () => (
  <section>
    <div className="row center-xs">
      <a className="col-3" style={{textDecoration: 'none', color: 'rgb(255, 65, 0)'}} target="_blank" href="https://soundcloud.com" >
        <p className="row center-xs">powered by</p>
        <ScLogo style={{fill: 'rgb(255, 65, 0)'}} />
        <p className="row center-xs">SOUNDCLOUD</p>
      </a>
    </div>
  </section>
)


const styles={}

