function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    console.log(expr);
    findBrackets();

    //find brackets
    function findBrackets() {
        let openBracketIndex = expr.lastIndexOf('(');
        let closeBracketIndex = expr.indexOf(')');
        //without one bracket from pair (!!(-1)->bool)
        if ((!!closeBracketIndex && !(!!openBracketIndex)) || (!!openBracketIndex && !(!!closeBracketIndex))) {
            console.log("here");
            throw ("ExpressionError: Brackets must be paired");
        }
        plus(expr.slice(openBracketIndex + 1, closeBracketIndex));
    }

    function plus(str) {
        console.log("plus "+str);
        return str.split('+').map(item => minus(item))
            .reduce(function (acum, item) {
                return parseFloat(acum) + parseFloat(item);
            });
    }

    function minus(str) {
        console.log("minus "+str);
        return str.split('-').map(item => divide(item))
            .reduce(function (acum, item) {
                return (parseFloat(acum) - parseFloat(item));
            });
    }

    function divide(str) {
        console.log("divide "+str);
        return str.split('/').map(function (item) {
            if (parseFloat(item) == 0)
                throw ("TypeError: Division by zero.");
            else {
                multiply(item);
            }
        }).reduce(function (acum, item) {
            console.log("acum "+ acum + " item " + item);
            console.log("divide "+parseFloat(acum) / parseFloat(item));
            return (parseFloat(acum) / parseFloat(item));
        });
    }

    function multiply(str) {
        console.log("multiply "+str);
        return str.split('*').reduce(function (acum, item) {
            console.log("multiply "+parseFloat(acum) * parseFloat(item));
            return (parseFloat(acum) * parseFloat(item));
        });
    }
}

module.exports = {
    expressionCalculator
}