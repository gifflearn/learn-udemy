
console.log('Début')
getMember((member) => {
   console.log(member)
   getArticle(member,(articles) => {
        console.log(articles)
   }) 
})
console.log('Fin')

function getMember(func_call_back) {
    setTimeout(() => {
        func_call_back('Member 1')
    }, 1500)
}

function getArticle(member, func2_call_back) {
    setTimeout(() => {
        func2_call_back([1,2,3])
    },1500)
}
