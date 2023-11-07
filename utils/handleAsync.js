// Wrapper used for Async functions
module.exports = (func) => {
    return (req, res, next) => {
        // Executes the passed in function and returns any errors to next.
        func(req, res, next).catch(next);
    };
};
