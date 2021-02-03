
console.log('Début')

new Promise((resolve, reject) => {
    setTimeout(() => {
        // la promesse renvoie resolve ou reject selon le cas
        resolve('All good')
        // reject(new Error('Message erreur : pas good'))
    },1500)
})
.then(message =>  {
    console.log(message)
    console.log('Autre chose')
})
.catch(err => console.log(err.message))

console.log('Fin')

// let p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         //resolve('All good')
//         reject(new Error('Message erreur : pas good'))
//     },1500)
// })

// p.then((message) => {
//     console.log(message)
// }).catch((err) => {
//     console.log(err.message)
// })
// console.log('Fin')