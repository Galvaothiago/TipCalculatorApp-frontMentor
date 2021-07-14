const inputTotalValue = document.querySelector('[data-js="inputTotalValue"]')
const inputAmountPeople = document.querySelector('[data-js="inputAmountPeople"]')
const formSelectTip = document.querySelector('[data-js="containerSelectTip"]')
const allButtons = document.querySelectorAll('.discount')

const customButton = document.querySelector('[data-js="customInput"]')

const warning = document.querySelector('.text-warning')
const refInputWarning = document.querySelector('.inputContainerPeopleAmount')

const tagShowAmountPerson = document.querySelector('[data-js="showTipAmount"]')
const tagShowValueTotal = document.querySelector('[data-js="showTotal"]')

const buttonReset = document.querySelector('[data-js="button-reset"]')

let inputBillValue = 0
let inputNumberPeople = 0
let valueFieldCustom = 0


const calculateValueWithoutDiscount = () => {
    const result = inputBillValue / inputNumberPeople
    return result
}

const calculateTotalValueWithDiscount = (discount, funcCalc) => {
    const valuePerPersonWithoutDiscount = funcCalc()

    const discountPerPerson = Number((valuePerPersonWithoutDiscount * (discount / 100)).toFixed(2))
    const finalValuePerPerson = Number((valuePerPersonWithoutDiscount - discountPerPerson).toFixed(2))

    return { discountPerPerson, finalValuePerPerson }
}

const showCalculateOnScreen =  (values) => {
    const { discountPerPerson, finalValuePerPerson } = calculateTotalValueWithDiscount(values, calculateValueWithoutDiscount)

    console.log({ discountPerPerson, finalValuePerPerson })
    tagShowAmountPerson.innerText = discountPerPerson
    tagShowValueTotal.innerText = finalValuePerPerson

}

inputTotalValue.addEventListener('change', (event) => {
    inputBillValue = Number(event.target.value)
    
})

inputAmountPeople.addEventListener('change', (event) =>  {
    inputNumberPeople = Number(event.target.value)

})

customButton.addEventListener('change', (event) => {
    valueFieldCustom = Number(event.target.value)

    if(valueFieldCustom !== 0) {
        setTimeout(() => {
            showCalculateOnScreen(valueFieldCustom)
        }, 2000)
    }

})

formSelectTip.addEventListener('click', (event) => {
    const itemClassDiscount = event.target.className
    const discountValue = event.target.innerText.split('%')[0]

    if(inputBillValue !== 0 && inputNumberPeople > 0) {
        if(!!valueFieldCustom) {
            return
        }
        showCalculateOnScreen(discountValue)
    }

    if(inputBillValue === 0) {
        alert("Please, insert the bill first")
        inputTotalValue.focus()
        return
    }

    if(inputNumberPeople === 0) {
        warning.innerText = 'Can`t be zero'
        refInputWarning.classList.add('warning')

        setTimeout(() => {
            warning.innerText = ''
            refInputWarning.classList.remove('warning')
            inputAmountPeople.focus()
        }, 4500)
        
        return
    }

    if(itemClassDiscount === 'discount') {
        allButtons.forEach(buttonDiscount => {
            const textContentValue = buttonDiscount.innerText.split('%')[0]

            if(buttonDiscount.className.includes('selected')) {
                buttonDiscount.classList.remove('selected')
            }

            if(textContentValue === discountValue) {
                buttonDiscount.classList.add('selected')
            }
        })
    }
})

buttonReset.addEventListener('click', () => {
    allButtons.forEach( button => {
        if(button.className.includes('selected')) {
            button.classList.remove('selected')
        }
    })

    inputBillValue = 0
    inputNumberPeople = 0
    valueFieldCustom = 0

    inputTotalValue.value = ""
    inputAmountPeople.value = ""
    customButton.value = ""

    tagShowAmountPerson.innerText = '0.00'
    tagShowValueTotal.innerText = '0.00'

})



