import React from 'react'

const ApplicationLayout = ({authenticated,children,notauthenticated}) => {
  return (
    <div>ApplicationLayout
        <div>
            { children}
        </div>
        <div>
            { authenticated }
        </div>
        <div>
            { notauthenticated }
        </div>
    </div>
  )
}

export default ApplicationLayout