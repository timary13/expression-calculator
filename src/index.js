function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    //delete whitespaces to avoid empty cicle
    //replace minus to avoid losing num<0
    expr = expr.replace(/ /g, '');
    expr = expr.replace(/-/g, '^');

    while (expr.indexOf('(') !== -1 || expr.indexOf(')') !== -1)
        expr = findBrackets(expr);

    return plus(expr);

    //find brackets
    function findBrackets(expr) {
        let openBracketIndex = expr.lastIndexOf('(');
        //for get current brackets
        let closeBracketIndex = expr.slice(openBracketIndex).indexOf(')');
        //without one bracket from pair
        if(((expr.match(/\(|\)/g)||[]).length)%2 != 0) {
            throw ("ExpressionError: Brackets must be paired");
        }
        //if no one brackets
        if(((expr.match(/\(|\)/g)||[]).length) == 0) {
            return plus(expr);
        }
        //when similar pair brackets
        if(closeBracketIndex < 0 || openBracketIndex < 0) {
            throw ("ExpressionError: Brackets must be paired");
        }
        let z = (plus(expr.slice(openBracketIndex + 1, openBracketIndex + closeBracketIndex))).toString();
        let c = expr.slice(0, openBracketIndex) + z + expr.slice(openBracketIndex + closeBracketIndex+1);
        return c;

    }

    function plus(str) {
        return str.split('+').map(item => minus(item))
            .reduce(function (acum, item) {
                return parseFloat(acum) + parseFloat(item);
            });
    }

    function minus(str) {
        return str.split('^').map(item => multiply(item))
            .reduce(function (acum, item) {
                return (parseFloat(acum) - parseFloat(item));
            });
    }

    function divide(str) {
        return str.split('/').reduce(function (acum, item) {
            if (parseFloat(item) == 0 || parseFloat(acum) == 0)
                throw ("TypeError: Division by zero.");
            return (parseFloat(acum) / parseFloat(item));
        });
    }

    function multiply(str) {
        let x = str.split('*')
            .map(item => divide(item))
            .reduce(function (acum, item) {
            return parseFloat(acum) * parseFloat(item);
        });
        return x;
    }
}

module.exports = {
    expressionCalculator
}