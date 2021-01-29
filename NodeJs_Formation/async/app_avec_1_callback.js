
console.log('Début')
getMember((member) => {
   console.log(member) 
})
console.log('Fin')

function getMember(func_call_back) {
    setTimeout(() => {
        func_call_back('Member 1')
    }, 1500)
}
