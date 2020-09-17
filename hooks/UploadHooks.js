import {useState} from 'react'
import {validator} from '../utils/validator'
import validate from 'validate.js'

/* const constraints = {
  title: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: {
      minimum: 3,
      message: 'needs to contain at least 3 characters.',
    },
  },
  description:
    function (value, attributes, attributeName, options, constraints) {
      console.log('attri', attributes.description)
      const descText = attributes.description.trim()
      if (descText !== '' && descText.length > 0) {
        return {
          presence: {message: 'is required when using AMEX'},
          length: {
            is: 5,
            message: 'needs to contain at least 5 characters.',
          },
        }
      }
    },
  image: {
    length: {
      is: 3,
      message: 'needs to be uploaded.',
    },
  },
} */

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
  image: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: {
      minimum: 3,
      message: 'needs to be at least 3 characters.',
    },
  },
}

const UploadHooks = (callback) => {
  const [uploadErrors, setUploadErrors] = useState({})

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    image: '',
  })

  const handleInputChange = (name, text) => {
    const error = validator(name, text, constraints)

    console.log(name, text, error)
    setUploadErrors((uploadErrors) => {
      return {
        ...uploadErrors,
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

  /*   const handleInputEnd = (name, event) => {
    const text = event.nativeEvent.text
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      }
    })
    let error
    if (name === 'confirmPassword') {
      error = validator(name, {
        password: inputs.password,
        confirmPassword: text,
      }, constraints)
    } else {
      error = validator(name, text, constraints)
    }


    setUploadErrors((uploadErrors) => {
      return {
        ...uploadErrors,
        [name]: error,
      }
    })
  } */


  const validateOnSend = () => {
    const titleError = validator('title', inputs.title, constraints)
    const descriptionError = validator(
      'description',
      inputs.description,
      constraints,
    )

    const imageError = validator('image', inputs.image, constraints)

    console.log('IMAGE ERROR', imageError)
    console.log('desc ERROR', descriptionError)

    setUploadErrors((uploadErrors) => {
      return {
        ...uploadErrors,
        image: imageError,
      }
    })

    if (titleError !== null ||
      descriptionError !== null ||
      imageError !== null) {
      return false
    } else {
      return true
    }
  }

  const canBeSubmitted = () => {
    const {title, description, image} = inputs
    const titleError = validator('title', title, constraints)
    const descError = validator('description', description, constraints)
    const imageError = validator('image', image, constraints)
    // const imageError = validator('image', inputs.image, constraints)

    if (titleError !== null || descError !== null || imageError !== null) {
      return true
    } else {
      return false
    }
  }

  const resetForm = () => {
    setInputs((inputs) => {
      return {
        title: '',
        description: '',
        image: '',
      }
    })
  }

  return {
    handleInputChange,
    validateOnSend,
    uploadErrors,
    inputs,
    canBeSubmitted,
    resetForm,
  }
}


export default UploadHooks
