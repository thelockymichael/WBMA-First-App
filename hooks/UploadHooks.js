import {useState} from 'react'
import {validator} from '../utils/validator'
import validate from 'validate.js'
const constraints = {
  title: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: {
      minimum: 3,
      message: 'needs to contain at least 3 characters.',
    },
  },
  description: {
    presence: false,
    length: {
      minimum: 5,
      message: 'needs to contain at least 5 characters.',
    },
  },
  image: {
    presence: false,
    length: {
      minimum: 3,
      message: 'must be uploaded.',
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

  const validateOnSend = () => {
    const titleError = validator('title', inputs.title, constraints)
    const descriptionError = validator(
      'description',
      inputs.description,
      constraints,
    )
    const imageError = validator('image', inputs.image, constraints)

    if (titleError !== null ||
      descriptionError !== null ||
      imageError !== null) {
      return false
    } else {
      return true
    }
  }

  return {
    handleInputChange,
    validateOnSend,
    uploadErrors,
    inputs,
  }
}


export default UploadHooks
