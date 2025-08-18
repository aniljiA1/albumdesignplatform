import React from 'react'

export default function FlipViewer({ pages }){
  return (
    <div className="viewer">
      {pages.map(p => (
        <div className={"page "+p.layout} key={p.index} style={{marginBottom:12}}>
          {p.images.map((img,i)=>(
            <img key={i} className="thumb" src={img.url} alt="" />
          ))}
        </div>
      ))}
    </div>
  )
}
