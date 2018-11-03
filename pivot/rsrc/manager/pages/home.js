import React from 'react'
import { connect } from 'dva'

function Home() {
  return (
    <div>
      <h1>home</h1>
    </div>
  )
}

export default connect()(Home)
