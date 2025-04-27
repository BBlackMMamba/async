
const fetchUserBasicInfo = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: 'გიორგი', email: 'giorgi@mail.com' });
        }, 1000);
    });
};

const fetchUserDetails = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ address: 'თბილისი', phone: '599123456', age: 28 });
        }, 1500);
    });
};

/*
დავალება: დაწერეთ ფუნქცია getUserProfile, რომელიც:
მიიღებს userId-ს
ჩატვირთავს ძირითად ინფორმაციას
ჩატვირთავს დეტალებს
დააბრუნებს გაერთიანებულ ობიექტს
გამოიყენეთ ორივე მიდგომა:
a) Promise
b) async/await-ით
*/


function getUserProfile(userId) {
    return fetchUserBasicInfo(userId)
        .then((info) => {
            return fetchUserDetails(userId)
                .then((details) => {
                    return { ...info, ...details };
                })
        })
}

getUserProfile(0).then((profile) => console.log(profile));

async function getUserProfile(userId) {
    let info = await fetchUserBasicInfo(userId);
    let details = await fetchUserDetails(userId);
    let object = { ...info, ...details }
    return object;
}


getUserProfile(0).then((profile) => console.log(profile));


//დავალება 2:

const fetchProduct = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 3) {
                reject(new Error('პროდუქტი არ მოიძებნა'));
            }
            resolve({ id, name: `პროდუქტი ${id}`, price: id * 100 });
        }, 500);
    });
};

/*
დაწერეთ ფუნქცია getProducts:
მიიღოს პროდუქტების ID-ების მასივი [1, 2, 3, 4]
ჩატვირთოს ყველა პროდუქტი პარალელურად
დაჰენდელთ შეცდომები (try/catch)
დააბრუნეთ წარმატებით ჩატვირთული პროდუქტები
გამოიყენეთ Promise.all().

*/
async function getProducts(a, b, c) {
    try {
        a = fetchProduct(a);
        b = fetchProduct(b);
        c = fetchProduct(c);
        let allProducts = await Promise.all([a, b, c])
        return allProducts
    } catch (error) {
        console.log(error.message)
    }
}

//getProducts(1, 2, 3).then(products => console.log(products));
getProducts(0, 2, 1).then(products => console.log(products));


//დავალება 3:

const login = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'test@mail.com' && password === '123') {
                resolve({ userId: 1, token: 'abc123' });
            } else {
                reject(new Error('არასწორი მონაცემები'));
            }
        }, 1000);
    });
};

/*
დაწერეთ ფუნქცია loginUser:
მიიღოს email და password
შეასრულოს login
დააბრუნოს წარმატების შემთხვევაში token
შეცდომის შემთხვევაში დააბრუნოს error message
გამოიყენეთ try/catch.
*/

async function loginUser(email, password) {
    try {
        let response = await login(email, password);
        return response.token
    } catch (error) {
        return error.message
    }

}

loginUser('test@mail.com', '123').then(console.log);
loginUser('test2@mail.com', '1234').then(console.log);