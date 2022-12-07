const post = (url, params) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(params)
        }).then(response => {
            try{
                response.json().then(res => {
                    const data = JSON.parse(res.data);
                    resolve(data);
                })
                
            }
            catch(err) {
                console.log(err, 'fetch报错JSON');
                reject('报错JSON')
            }
            
        }).catch(err => {
            console.log(err, '报错了');
            reject('报错了')
        })
    });
};

export default {
    post
};
