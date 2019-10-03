function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    console.log(expr);
    return findBrackets();

    //find brackets
    function findBrackets() {
        let openBracketIndex = expr.lastIndexOf('(');
        let closeBracketIndex = expr.indexOf(')');
        //without one bracket from pair (!!(-1)->bool)
        if ((!!closeBracketIndex && !(!!openBracketIndex)) || (!!openBracketIndex && !(!!closeBracketIndex))) {
            console.log("here");
            throw ("ExpressionError: Brackets must be paired");
        }
        let z = (plus(expr.slice(openBracketIndex + 1, closeBracketIndex))).toString();

        let c = plus(expr.slice(0, openBracketIndex) + z + expr.slice(closeBracketIndex+1));
        console.log(c);
        return c;

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
                return multiply(item);
            }
        }).reduce(function (acum, item) {
            console.log("divide "+parseFloat(acum) / parseFloat(item));
            return (parseFloat(acum) / parseFloat(item));
        });
    }

    function multiply(str) {
        console.log("multiply "+str);
        let x = str.split('*').reduce(function (acum, item) {
            console.log("multiply return "+parseFloat(acum) * parseFloat(item));
            return parseFloat(acum) * parseFloat(item);
        });
        console.log("x " + x);
        return x;
    }
}

module.exports = {
    expressionCalculator
}