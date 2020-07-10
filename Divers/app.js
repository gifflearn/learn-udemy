// var doload = function(){
//     var elements = document.getElementsByTagName('li');;
//     for (let index = 0; index < elements.length; index++) {
//         elements[index].addEventListener('click', function() {
//             console.log(index);
//             elements[index].innerHTML = elements[index].innerHTML+' clicked';
//         })
        
//     }
// }

var doload = function(){
    var elements = document.getElementsByTagName('li');;
    
    for (let index = 0; index < elements.length; index++) {
        
        elements[index].addEventListener('click', ( function(local_index) {
            return function() {
                console.log(local_index);
                elements[local_index].innerHTML = elements[local_index].innerHTML+' clicked';
            };
        })(index));
        
    }
}

window.onload = doload;