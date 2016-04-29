function convert (str){
    var priority = ['(',')','+','-','*','/'];
    var stack = [];
    var stackSymbol = [];
    for(var i = 0; i < str.length; i++){
        if(!isNaN(+str[i])){
            stack.push(str[i]);
        } else {
            if(str[i] === '+' || str[i] === '-' || str[i] === '*' || str[i] === '/'){
                if(stackSymbol.length !== 0){
                    for(var j = stackSymbol.length; j > 0; j--){
                        if(priority[str[i]] <= priority[stackSymbol[j]]){
                            stack.push(stackSymbol[j]);
                            stackSymbol.pop();
                            stackSymbol.push(str[i]);
                            break;
                        } else {
                            stackSymbol.push(str[i]);
                            break;
                        }
                    }
                } else {
                    stackSymbol.push(str[i])
                }
            } else if(str[i] === '('){
                stackSymbol.push(str[i]);
            } else if(str[i] === ')'){
                for(var k = stackSymbol.length-1; k >= 0; k--){
                    if(stackSymbol[k] === '('){
                        stackSymbol.pop();
                        break;
                    } else{
                        var n = stackSymbol.pop();
                        stack.push(n);
                    }
                }
            }
        }
    }
    while(stackSymbol.length){
        var n2 = stackSymbol.pop();
        stack.push(n2);
    }
    return stack;
}
console.log(convert('2+2*2'));
console.log(convert('2+(2+2)*2'));

//Done