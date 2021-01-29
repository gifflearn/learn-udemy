
console.log('Début')

getMember()
.then(member => getArticles(member))
.then(articles => console.log(articles))
.catch(err => console.log(err.message) )

console.log('Fin')

function getMember() {
    
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            // console.log('Member 1')
            // resolve('Member 1')
            reject(new Error('Y\'a une couille dans l\'paté'))
        }, 1500)
    })
    
}

function getArticles(member) {

    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve([1,2,3])
        }, 1500)
    })

}
