import {useState} from 'react'
import {validator} from '../utils/validator'

const constraints = {
  title: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: {
      minimum: 3,
      message: 'needs to be at least 3 characters.',
    },
  },
  description: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: function (value, attributes, attributeName, options, constraints) {
      const trimmedValue = value.trim()
      if (trimmedValue) {
        return {
          minimum: 5,
          message: 'needs to be at least 5 characters.',
        }
      }
      return false
    },
  },
}

const initialInputState = {
  title: '',
  description: '',
}

const ModifyHooks = (callback) => {
  const [modifyErrors, setModifyErrors] = useState({})

  const [inputs, setInputs] = useState(
    initialInputState,
  )

  const handleInputChange = (name, text) => {
    const error = validator(name, text, constraints)

    console.log(name, text, error)
    setModifyErrors((modifyErrors) => {
      return {
        ...modifyErrors,
        [name]: error,
      }
    })

    console.log(name, text)
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      }
    })
  }

  const validateOnSend = () => {
    const titleError = validator('title', inputs.title, constraints)
    const descriptionError = validator(
      'description',
      inputs.description,
      constraints,
    )

    if (titleError !== null ||
      descriptionError !== null) {
      return false
    } else {
      return true
    }
  }

  const canBeSubmitted = () => {
    const {title, description} = inputs
    const titleError = validator('title', title, constraints)
    const descError = validator('description', description, constraints)

    if (titleError !== null || descError !== null) {
      return true
    } else {
      return false
    }
  }

  const resetForm = () => {
    setInputs(() => {
      return initialInputState
    })
  }

  return {
    handleInputChange,
    validateOnSend,
    modifyErrors,
    inputs,
    canBeSubmitted,
    resetForm,
  }
}


export default ModifyHooks
