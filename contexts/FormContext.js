import React, {useState} from 'react'
import PropTypes from 'prop-types'

const FormContext = React.createContext([{}, () => {}])

const FormProvider = (props) => {
  const [userData, setUserData] = useState({})

  return (
    <FormContext.Provider
      value={[userData, setUserData]}>
      {props.children}
    </FormContext.Provider>
  )
}

FormContext.propTypes = {
  children: PropTypes.node,
}

export {FormContext, FormProvider}
