export const fakeAuth = (username, password) => 
        new Promise((resolve) => {
            if(username === "abe" && password === "password") {
                setTimeout(() => resolve('2342f2f1d131rf12'), 250); 
            }
            else {
                setTimeout(() => resolve(null), 250);
            }
    });