

const jokes = document.querySelector('#joke');
const jokebtn = document.querySelector('#jokebtn');

// const generatejokes = () => {                           // Fetch api using PROMISES
//                                                         // Fetch api using PROMISES
//     const setHeader = {                                 // Fetch api using PROMISES
//         headers  : {                                    // Fetch api using PROMISES
//             Accept : "application/json"                 // Fetch api using PROMISES
//         }                                               // Fetch api using PROMISES
//     }                                                   // Fetch api using PROMISES
//                                                         // Fetch api using PROMISES
//     fetch('https://icanhazdadjoke.com', setHeader)      // Fetch api using PROMISES
//     .then((res) => res.json() )                         // Fetch api using PROMISES
//     .then((data) => {                                   // Fetch api using PROMISES
//         jokes.innerHTML = data.joke;                    // Fetch api using PROMISES
//     }).catch((error) => {                               // Fetch api using PROMISES
//         console.log(error);                             // Fetch api using PROMISES
//     })                                                  // Fetch api using PROMISES
// }                                                       // Fetch api using PROMISES


// async await ka promises ko handle karne ka tarika alag h 

// where to define async await in normal tradition function without fat arrow function

// async function generatejokes(){

// }

const generatejokes = async () => {                                         // Fetch api using Async await
                                                                            // Fetch api using Async await
    try{                                                                    // Fetch api using Async await
       const setHeader = {                                                  // Fetch api using Async await
        headers  : {                                                        // Fetch api using Async await
            Accept : "application/json"                                     // Fetch api using Async await
        }                                                                   // Fetch api using Async await
    }                                                                       // Fetch api using Async await
                                                                            // Fetch api using Async await
    const res = await fetch('https://icanhazdadjoke.com', setHeader)        // Fetch api using Async await
                                                                            // Fetch api using Async await
    const data = await res.json();                                          // Fetch api using Async await
    jokes.innerHTML = data.joke;                                            // Fetch api using Async await
   }catch(err){                                                             // Fetch api using Async await
    console.log(`the error is ${err}`);                                     // Fetch api using Async await
   }                                                                        // Fetch api using Async await
                                                                            // Fetch api using Async await
}                                                                           // Fetch api using Async await

jokebtn.addEventListener('click', generatejokes);
generatejokes(); 