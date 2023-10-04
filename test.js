let string ="level";

// let array = string.split('');
// console.log(array.length)
// const palindrome=()=>{
//     for (let index = 0; index < array.length; index++) {
//         // console.log(array[index],array[(array.length-index)-1]);
//         if(array[index] !== array[array.length-1 -index]){
//             return "it is not palidrome";
//         }
//     }
// }
// console.log(palindrome());

let data =["Hello","Hello Hi","om"];

const looper=(input)=> {
    let updatedData =  data.filter(item=> data.includes(input))
    return updatedData
        
}

console.log(looper("Hello"));