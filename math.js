function pascal_tri(n) {
    var tri = [1];
    while(tri.length < n + 1) {
        tri[tri.length] = tri[tri.length - 1];
        for(var i = tri.length - 2; i > 0; i--) {
            tri[i] = tri[i - 1] + tri[i];
        }
    }
    return tri;
}

function divide(coeff, k) {
    var l = 1;
    while(k * l != Math.floor(k * l)) {l++;}
    k = k * l;
    for(var i = 1; i < coeff.length; i++) {
        coeff[i-1] /= l;
        coeff[i] = coeff[i] + k * coeff[i-1];
    }
    return coeff;
}

function factor(coeff) {
    if(coeff.length > 2) {
        var last_factors = [];
        var val = false;
        for(var i = 1; i <= Math.abs(coeff[coeff.length - 1]); i++) {
            if(coeff[coeff.length - 1] / i == Math.floor(coeff[coeff.length - 1] / i)) {
                last_factors.push(i);
                last_factors.push(-i);
            }
        }
        if(coeff[coeff.length - 1] === 0) last_factors.push(0);
        var x = calc(last_factors, poly(coeff));
        for(i = 0; i < y.length; i++) {
            if(x[i][1] === 0) {
                val = x[i][0];
                coeff = divide(coeff, val);
                coeff.pop();
                break;
            }
        }
        if(val !== false) {
            return "(x " + ((val < 0) ? "+" : "-") + " " + Math.abs(val) + ")" + factor(coeff);
        } else {
            var first_factors = [];
                for(i = 1; i < Math.abs(coeff[0]); i++) {
                if(coeff[0] / i == Math.floor(coeff[0] / i)) {
                    for(var j = 0; j < last_factors.length; j++) {
                        first_factors.push(last_factors[j] / i);
                        first_factors.push(last_factors[j] / -i);
                    }
                }
            }
            x = calc(first_factors, poly(coeff));
            for(i = 0; i < y.length; i++) {
                if(x[i][1] === 0) {
                    val = x[i][0];
                    coeff = divide(coeff, val);
                    coeff.pop();
                    break;
                }
            }
            if(val !== false) {
                var l = 1;
                while(val * l != Math.floor(val * l)) {l++;}
                return "(" + l + "x " + ((val < 0) ? "+" : "-") + " " + Math.abs(val * l) + ")" + factor(coeff);
            }
        }
    }
    return poly_string(coeff);
}
function quad(a,b,c) {
    return Array(((-b+Math.sqrt(b*b - 4 * a * c))/2*a), ((-b-Math.sqrt(b*b - 4 * a * c))/2*a));
}

function calc(x, func) {
    x = [].concat(x);
    y = [];
    for(var i = 0; i < x.length; i++) {
        y.push(
            [x[i], func(x[i])]
        );
    }
    return y;
}

function poly(coeff) {
    coeff = [].concat(coeff);
    return function(x) {
        var y = 0;
        for(var i = 0; i < coeff.length; i++) {
            y += coeff[i] * Math.pow(x, coeff.length - i - 1);
        }
        return y;
    };
}
function poly_string(coeff) {
    var str = "(";
    for(var i = 0; i < coeff.length - 1; i++) {
        if(coeff[i] !== 0) {
            str += 	(coeff[i] < 0 ? " - " : (i !== 0 ? " + " : "")) +
					(Math.abs(coeff[i]) != 1 ? Math.abs(coeff[i]) : "") + "x" + 
					(coeff.length - i - 1 > 1 ? "^" + (coeff.length - i - 1) : "");
        }
    }
	if(coeff[coeff.length - 1] !== 0) {
		str += 	(coeff[coeff.length - 1] < 0 ? " - " : (i !== 0 ? " + " : "")) + 
				(Math.abs(coeff[coeff.length - 1]));
	}
    return str + ")";
}

function f(x) {
    return calc(x, poly(coeffs));
}

function g(x) {
    return (5 * x - 3) / (2 * x + 1);
}
coeffs = [];