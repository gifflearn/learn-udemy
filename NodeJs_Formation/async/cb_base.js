
// une fonction de callback est une fonction que l'on fait appeler 
// par un traitement( la fonction principale) au moment opportun
// Elles sont utilisées pour synchoniser des actions
// elles peuvent être déclenchées sur des évènements

// fonction principale
// utilise une fonction de callback
function fn_main(a,b,cb) {
    console.log('Je suis la fonction principale ' + a)
    console.log('et je fais plein de tratement')
    console.log('avant d\'appeler une fonction de callback ')
    cb(b); // j'appelle une fonction de callback 
}

//utilisation de la fonction principale 
fn_main('Mainfonc','du texte',fn_cb_02)

// la fonction de callback 
function fn_cb_01() {
    console.log("je suis la fonction de callback fn_cb_01")
}

// une autre fonction de callback avec un parametre
function fn_cb_02(foo) {
    console.log(foo + " je suis la fonction de callback fn_cb_02")
}