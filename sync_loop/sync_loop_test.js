
const axios = require('axios');


async function testApiCall () {
   return new Promise((resolve, reject) => {
    axios.get('https://fakestoreapi.com/products').then((res) => {
        // console.log(res);
        resolve(res);
    }).catch((err) => {
        reject(err);
    });
   });
}

(
    async () => {
        for(let i = 0; i <5 ; i++) {
            console.log(i);
            console.log('\n\n================================');
           let res =  await new Promise(resolve => setTimeout(resolve, 3000));
           console.log(res);
           let a = await testApiCall()
           console.log(a.data);
        }
    }
)();