import React, {useState} from 'react'
import PropTypes from 'prop-types'

const AuthContext = React.createContext({})

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <AuthContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {props.children}
    </AuthContext.Provider>
  )
}

AuthContext.propTypes = {
  children: PropTypes.node,
}

export {AuthContext, AuthProvider}
