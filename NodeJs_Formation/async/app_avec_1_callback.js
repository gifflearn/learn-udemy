
console.log('Début')

// appel de lacontion principale
getMember((member) => {
   console.log(member) // appel du callback
})
console.log('Fin')

// Fonction de callback avec un timeout
function getMember(func_callback) {
    setTimeout(() => {
        func_callback('Member 1')
    }, 1500)
}
