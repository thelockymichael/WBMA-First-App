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
      message: 'needs to be at least 3 characters.',
    },
  },
  description: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: {
      minimum: 5,
      message: 'needs to be at least 5 characters.',
    },
  },
}

const UploadHooks = (callback) => {
  const [uploadErrors, setUploadErrors] = useState({})

  const [inputs, setInputs] = useState({
    title: '',
    password: '',
  })

  const handleInputChange = (name, text) => {
    const error = validator(name, te)
  }
}

export default UploadHooks
