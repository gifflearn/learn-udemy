// Utilisation des fonctions de callback pour effectuer des calculs
//
// Fonctions secondaires

// Addidition
function add(a,b) {
    console.log(a+b)
}

// multiplication
function prod(a,b) {
    console.log(a*b)
}

// fonction Principale 
// Calculateur
function calc(a,b,op) {
 op(a,b)
}

// Appel du calculateur

calc(2,3,prod)