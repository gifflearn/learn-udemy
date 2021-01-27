console.log('Hello world');

// (function() {
//     console.log('Test');
// })()

(() => {
    console.log('TestES6b');
})()

//ES6
setTimeout(() => {
    console.log('TestES6');
}, 5000);


setTimeout(function()
{
    console.log('Test2');
},3000)