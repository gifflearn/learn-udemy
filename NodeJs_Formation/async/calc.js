// Utilisation des fonctions de callback pour effectuer
// des calculs de surface et perimetre
//
// Fonctions secondaires

// peri
function peri(d) {
    return Math.PI*d
}

// surface
function surf(d) {
    return Math.PI*Math.pow(d,2)/4
}

// fonction Principale 
// Calculateur
function calc(d,op) {
 return console.log(op(d))
}

// Appel du calculateur

calc(2,surf)