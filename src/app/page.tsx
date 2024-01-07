import React from 'react'

const page = () => {
  return (
    <div>
      <div>
        <h1>Next js Authentication</h1>
        <h2>Use Credentials for route: /admin</h2>
        <p>Username:<strong>balkrishna</strong></p>
        <p>Password:<strong>password</strong></p>

      </div>
      <div>
        <h2>Use Github sign in for route /author</h2>
      </div>
      <div>
        <h2>Or use google sign in only for user level access</h2>
      </div>
    </div>
  )
}

export default page