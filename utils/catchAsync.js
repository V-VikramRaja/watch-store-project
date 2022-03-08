// this function accepts a function and returns a executed function
// If it has any error it will return it

module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}