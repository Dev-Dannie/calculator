class Calculator {
    constructor(prevOpTextElement, newOpTextElement) {
      this.prevOpTextElement = prevOpTextElement
      this.newOpTextElement = newOpTextElement
      this.remove()
    }
  
    remove() {
      this.newOp = ''
      this.prevOp = ''
      this.operation = undefined
    }
  
    del() {
      this.newOp = this.newOp.toString().slice(0, -1)
    }
  
    appendNumber(num) {
      if (num === '.' && this.newOp.includes('.')) return
      this.newOp = this.newOp.toString() + num.toString()
    }
  
    chooseOperation(operation) {
      if (this.newOp === '') return
      if (this.prevOp !== '') {
        this.compute()
      }
      this.operation = operation
      this.prevOp = this.newOp
      this.newOp = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.prevOp)
      const current = parseFloat(this.newOp)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.newOp = computation
      this.operation = undefined
      this.prevOp = ''
    }
  
    getDisplayNum(num) {
      const stringNum = num.toString()
      const integerDigits = parseFloat(stringNum.split('.')[0])
      const decimalDigits = stringNum.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.newOpTextElement.innerText =
        this.getDisplayNum(this.newOp)
      if (this.operation != null) {
        this.prevOpTextElement.innerText =
          `${this.getDisplayNum(this.prevOp)} ${this.operation}`
      } else {
        this.prevOpTextElement.innerText = ''
      }
    }
  }
  
  
  const operationBtns = document.querySelectorAll('[data-op]') 
  const numberBtns = document.querySelectorAll('[data-num]')
  const deleteBtn = document.querySelector('[data-del]')
  const prevOpTextElement = document.querySelector('[data-prev-op]')
  const newOpTextElement = document.querySelector('[data-current-op]')
  const equalsBtn = document.querySelector('[data-equals]')
  const allClearBtn = document.querySelector('[data-clear]')
  
  
  const calculator = new Calculator(prevOpTextElement, newOpTextElement)
  
  numberBtns.forEach(Btn => {
    Btn.addEventListener('click', () => {
      calculator.appendNumber(Btn.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationBtns.forEach(Btn => {
    Btn.addEventListener('click', () => {
      calculator.chooseOperation(Btn.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsBtn.addEventListener('click', Btn => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearBtn.addEventListener('click', Btn => {
    calculator.remove()
    calculator.updateDisplay()
  })
  
  deleteBtn.addEventListener('click', Btn => {
    calculator.del()
    calculator.updateDisplay()
  })