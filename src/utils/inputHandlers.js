export const textInputHandler = (fieldName, input, setInput, requiredNumberOfChars, setInvalidInputs, invalidInputs) => {
    if (input.length >= requiredNumberOfChars && invalidInputs[fieldName]==true) {
      setInvalidInputs({
        ...invalidInputs,[fieldName]:false
      })
    }
    setInput(input)
}

export const validateInputs = (inputs, invalidInputs, setInvalidInputs) => {
    let res = false
    let update = invalidInputs
    // [fieldName, input, validLength]
    for(let input = 0; input<inputs.length; input++){
      if(inputs[input][1]<inputs[input][2]){
        res=true
        update = {...update,[inputs[input][0]]:true}
      }
    }
    setInvalidInputs(update)
    return res
 }