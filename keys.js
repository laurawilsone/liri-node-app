
console.log('this is loaded');

exports.twitter = {
    consumer_key: 'hcGbUFsEcky8uBK3bYfjEGi79',
    consumer_secret: 'Dr9UQx2EzjVQTWmlFGIB7yKZphfi59ChWY0Xc70ftSIuG0hUAY',
    access_token_key: '990983965707300864-p7H1P8ca5GaPokc2mx2TQGC37AG6ueC',
    access_token_secret: 'uZZ3ZZsquFaNGbqVJvez89s5BGnfD9M6FWe1AObTWaD0H',
};

exports.spotify = {
    id: 'ae2623b2db2c44779cc94dc42344507b',
    secret: '6b86ee68a63247e2b412386493e8243b',
};

var spotify = new spotify(keys.spotify);
var client = new Twitter(keys.twitter);