console.log('Début')

let prom1 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('P1')
        // console.log("reject")
    },1500)
})

let prom2 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('P2')
        //reject('P2')
    },3000)
})

// Promise.all([prom1,prom2]) // Attente de toutes les promesses
Promise.race([prom1,prom2]) // Attente de la promesse la plus rapide
    .then(result=> console.log(result))

console.log('Fin')
