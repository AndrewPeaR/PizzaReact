import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f5f5f5"
    foregroundColor="#e6e6e6"
  >
    <circle cx="141" cy="130" r="110" /> 
    <rect x="0" y="260" rx="10" ry="10" width="280" height="27" /> 
    <rect x="0" y="308" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="407" rx="10" ry="10" width="95" height="30" /> 
    <rect x="122" y="403" rx="24" ry="24" width="152" height="42" />
  </ContentLoader>
)

export default Skeleton