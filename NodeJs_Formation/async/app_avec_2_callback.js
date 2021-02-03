
console.log('Début')

let membername = "Member2"

// Appel de la fonction principale
getMember(membername, (member) => { 
   console.log(membername)
   getArticle(member,(articles) => {
        console.log(articles)
   }) 
})
console.log('Fin')

function getMember() { // appel de la fonction callbak qui ramène l'Id du membre
    setTimeout(() => {
        if (membername=="Member1") { func_callback(1) } else { func_callback(2) } 
    }, 1500)
}

function getArticle(memberId, func2_callback) {
    setTimeout(() => {
        let art = [["1,2,3"],["4,5,6"]]
        let res = art[memberId-1]
        func2_callback(res)
    },1500)
}
