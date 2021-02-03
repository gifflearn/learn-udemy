console.log('Début');


// (() => {
//     console.log('milieu')
// })()

// async function viewArticles() {
//     let member = await getMember()
//     let articles = await getArticles(member)
//     console.log(articles)
// }
// viewArticles()

(async () => {
    try {
        let member = await getMember()
        let articles = await getArticles(member)
        console.log(articles)
    } catch (err) {
        console.log(err.message)
    }    
})()


function getMember() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('Member 1')
            // reject(new Error('Y\'a une couille dans l\'paté'))
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


console.log('Fin')
