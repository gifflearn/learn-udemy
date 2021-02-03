
console.log('Début')

getMember()
.then(member => getArticles())
.then(article => console.log(article))
//.then(articles => console.log(articles))
.catch(err => console.log(err.message) )

console.log('Fin')

function getMember() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('Member 1')
            resolve()
            // reject(new Error('Y\'a une couille dans l\'paté'))
        }, 1500)
    })
}

function getArticles() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve([1,2,3])
        }, 1500)
    })
}
