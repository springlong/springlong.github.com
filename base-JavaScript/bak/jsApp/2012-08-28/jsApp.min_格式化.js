(function(G) {
    var F = G.document,
    J = G.location,
    K = G.navigator,
    B = B,
    C = [],
    A = "mousewheel,mouseover,mousemove,mouseout,mousedown,mouseup,mouseenter,mouseleave,click,dblclick,focus,blur,change,keydown,keypress,keyup,load,unload,beforeunload,resize,scroll,error,contextmenu,hashchange".split(","),
    D = function(M) {
        return new D.fn.init(M)
    },
    H = function() {
        D.each(C,
        function(N, M) {
            M()
        });
        F.addEventListener && F.removeEventListener("DOMContentLoaded", arguments.callee, false)
    },
    E = function(O, M) {
        var P = O.length,
        N;
        if (P) {
            for (N = 1; N < P; N++) {
                M.call(O, N, O[N])
            }
            return M.call(O, 0, O[0])
        }
        return O
    },
    I = function(M) {
        if (M !== null) {
            this.length = M.length;
            for (i = 0, len = M.length; i < len; i++) {
                this[i] = M[i]
            }
        }
    };
    D.fn = D.prototype = {
        init: function(Q) {
            var M = this,
            S, N, R, P, O;
            if (!Q) {
                return M
            }
            if (Q.nodeType || Q === G) {
                M[0] = Q;
                M.length = 1;
                return M
            }
            if (D.isString(Q)) {
                if (/^#[\w-]+$/i.test(Q)) {
                    S = F.getElementById(Q.substring(1, Q.length));
                    if (S !== null) {
                        M[0] = S;
                        M.length = 1
                    }
                } else {
                    if (/^[a-z]+$/i.test(Q) || Q === "*") {
                        S = F.getElementsByTagName(Q);
                        I.call(M, S)
                    } else {
                        if (/^.[\w-]+$/i.test(Q)) {
                            O = Q.substring(1, Q.length);
                            if (F.getElementsByClassName) {
                                S = F.getElementsByClassName(O);
                                I.call(M, S)
                            } else {
                                S = F.getElementsByTagName("*");
                                for (N = 0, R = 0, P = S.length; N < P; N++) {
                                    if ((" " + S[N].className + " ").indexOf(" " + O + " ") !== -1) {
                                        M.length = R + 1;
                                        M[R] = S[N];
                                        R++
                                    }
                                }
                            }
                        } else {
                            if (F.querySelectorAll) {
                                S = F.querySelectorAll(Q);
                                I.call(M, S)
                            } else {
                                if (!/[+>~\[]+/.test(Q)) {
                                    F.styleSheets["jsApp_selectorStyle"].addRule(Q, "q:a");
                                    S = F.getElementsByTagName("*");
                                    for (N = 0, R = 0, P = S.length; N < P; N++) {
                                        if (S[N].currentStyle.q === "a") {
                                            M.length = R + 1;
                                            M[R] = S[N];
                                            R++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (D.isFunction(Q)) {
                    M.ready(Q)
                }
            }
            return M
        },
        css: function(M, N) {
            return E(this,
            function(T, U) {
                var O = D.isJSON(M),
                S = {},
                P,
                R,
                Q;
                if (!O && N === B) {
                    R = M === "opacity" && U.style.opacity === B;
                    Q = R ? D.ieOpacity(U) : (U.currentStyle ? U.currentStyle[M] : G.getComputedStyle(U, null)[M]);
                    return Q === "auto" ? "0px": Q
                }
                O ? (S = M) : (S[M] = N);
                for (P in S) {
                    R = P === "opacity" && U.style.opacity === B;
                    Q = D.filterValue.call(U, T, S[P]);
                    R ? D.ieOpacity(U, Q) : (U.style[P] = Q)
                }
                return this
            })
        },
        attr: function(M, N) {
            return E(this,
            function(R, S) {
                var O = D.isJSON(M),
                Q = {},
                P;
                if (!O && N === B) {
                    return D.getAttrFilter(S, M)
                }
                O ? (Q = M) : (Q[M] = N);
                for (P in Q) {
                    D.setAttrFilter(S, P, D.filterValue.call(S, R, Q[P]))
                }
                return this
            })
        },
        hasAttr: function(M) {
            return this.attr(M) !== null
        },
        removeAttr: function(M) {
            return E(this,
            function(N, O) {
                M === "class" ? O.className = "": O.removeAttribute(M);
                return this
            })
        },
        addClass: function(M) {
            return E(this,
            function(N, O) { ! this.hasClass(M) && (O.className += " " + M);
                return this
            })
        },
        removeClass: function(M) {
            return E(this,
            function(P, Q) {
                var O = " " + Q.className + " ",
                N = " " + M + " ";
                while (O.indexOf(N) !== -1) {
                    O = O.replace(N, " ")
                }
                Q.className = D.trim(O);
                return this
            })
        },
        hasClass: function(M) {
            return E(this,
            function(N, O) {
                return (" " + O.className + " ").indexOf(" " + M + " ") !== -1
            })
        },
        toggleClass: function(M) {
            return E(this,
            function(N, O) {
                return this.hasClass(M) ? this.removeClass(M) : this.addClass(M)
            })
        },
        bind: function(O, N, M) {
            return E(this,
            function(P, R) {
                var Q = null;
                if ("mouseenter,mouseleave".indexOf(O) >= 0 && !("onmouseenter" in R)) {
                    O = O === "mouseenter" ? "mouseover": "mouseout";
                    Q = function(S) {
                        S = D.event(S);
                        var U = S.target;
                        var T = S.relatedTarget;
                        if (!R.contains(T) && R !== T) {
                            N.call(U, S)
                        }
                    }
                } else {
                    Q = function(S) {
                        S = D.event(S);
                        N.call(S.target, S)
                    }
                }
                F.addEventListener ? R.addEventListener(O, Q, M) : R.attachEvent("on" + O, Q);
                return Q
            })
        },
        unbind: function(O, N, M) {
            return E(this,
            function(P, Q) {
                if ("mouseenter,mouseleave".indexOf(O) >= 0 && !("onmouseenter" in Q)) {
                    O = O === "mouseenter" ? "mouseover": "mouseout"
                }
                F.addEventListener ? Q.removeEventListener(O, N, M) : Q.detachEvent("on" + O, N);
                return this
            })
        },
        ready: function(M) {
            var N = F.readyState;
            if (N === "interactive" || N === "complete") {
                return setTimeout(M, 1)
            }
            C.push(M);
            if (C.length === 1) {
                D.DomContentLoaded()
            }
            return this
        },
        firstChild: function() {
            var M = this.node.firstChild;
            while (M !== null && M.nodeName === "#text") {
                M = M.nextSibling
            }
            return D(M)
        },
        lastChild: function() {
            var M = this.node.lastChild;
            while (M !== null && M.nodeName === "#text") {
                M = M.previousSibling
            }
            return D(M)
        },
        prev: function() {
            var M = this.node.previousSibling;
            while (M !== null && M.nodeName === "#text") {
                M = M.previousSibling
            }
            return D(M)
        },
        next: function() {
            var M = this.node.nextSibling;
            while (M !== null && M.nodeName === "#text") {
                M = M.nextSibling
            }
            return D(M)
        },
        children: function() {
            return this.node.children
        },
        parent: function() {
            return D(this.node.parentNode)
        },
        html: function(M) {
            if (M === B) {
                return this.node.innerHTML
            } else {
                this.node.innerHTML = M
            }
            return this
        },
        text: function(N) {
            var M = this.node;
            if (N === B) {
                return (M.innerText || M.textContent)
            } else {
                M.innerHTML = N
            }
            return this
        }
    };
    D.fn.init.prototype = D.fn;
    D.extend = D.fn.extend = function() {
        var M, P = this,
        N = arguments[0],
        O = arguments[1] || "";
        if (O === true || D.isJSON(N)) {
            for (M in N) {
                P[M] = N[M]
            }
        } else {
            if (D.isFunction(N) && O !== "") {
                P[O] = N
            }
        }
    };
    D.extend({
        DomContentLoaded: function() {
            if (F.addEventListener) {
                F.addEventListener("DOMContentLoaded", H, false);
                return
            }
            var M = function() {
                try {
                    F.documentElement.doScroll("left")
                } catch(N) {
                    setTimeout(M, 10);
                    return
                }
                H()
            };
            M()
        },
        event: function(N) {
            N = N || G.event;
            var P = N.target || N.srcElement,
            M = N.type,
            O = {
                type: M,
                target: P,
                ctrlKey: N.ctrlKey,
                shiftKey: N.shiftKey,
                altKey: N.altKey,
                stopPropagation: function() {
                    if ("stopPropagation" in N) {
                        N.stopPropagation()
                    } else {
                        N.cancelBubble = true
                    }
                },
                preventDefault: function() {
                    if ("preventDefault" in N) {
                        N.preventDefault()
                    } else {
                        N.returnValue = false
                    }
                }
            };
            if (M.indexOf("mouse") >= 0 || M.indexOf("click") >= 0) {
                O.relatedTarget = N.relatedTarget === B ? (M === "mouseover" ? N.fromElement: N.toElement) : N.relatedTarget;
                O.offsetX = N.offsetX === B ? (N.clientX - P.getBoundingClientRect().left) : N.offsetX;
                O.offsetY = N.offsetY === B ? (N.clientY - P.getBoundingClientRect().top) : N.offsetY;
                O.clientX = N.clientX;
                O.clientY = N.clientY;
                O.pageX = N.pageX === B ? (F.documentElement.scrollLeft + event.clientX) : N.pageX;
                O.pageY = N.pageY === B ? (F.documentElement.scrollTop + event.clientY) : N.pageY;
                O.screenX = N.screenX;
                O.screenY = N.screenY;
                if (F.implementation.hasFeature("MouseEvents", "2.0")) {
                    O.button = N.button
                } else {
                    switch (N.button) {
                    case 0:
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                        O.button = 0;
                        break;
                    case 2:
                    case 6:
                        O.button = 2;
                        break;
                    case 4:
                        O.button = 1;
                        break
                    }
                }
            } else {
                if (M.indexOf("key") >= 0) {
                    O.keyCode = N.keyCode === 0 ? N.charCode: N.keyCode
                }
            }
            return O
        },
        ieOpacity: function(O, N) {
            try {
                if (N === B) {
                    return O.filters.alpha ? O.filters.alpha.opacity / 100 : 1
                }
                O.filters.alpha ? (O.filters.alpha.opacity = N * 100) : (O.style.cssText += ";filter:alpha(opacity=" + N * 100 + ");")
            } catch(M) {
                return 0
            }
        },
        getAttrFilter: function(O, N) {
            var M;
            switch (N) {
            case "class":
                M = O.className || null;
                break;
            case "style":
                M = O.style.cssText || null;
                break;
            case "tabindex":
                M = O.getAttribute(N) || null;
                break;
            case "for":
                M = "htmlFor" in O ? O.htmlFor: O.getAttribute(N);
                break;
            default:
                M = O[N] || O.getAttribute(N)
            }
            return M || null
        },
        setAttrFilter: function(O, M, N) {
            switch (M) {
            case "class":
                O.className = N;
                break;
            case "style":
                O.style.cssText = N;
                break;
            default:
                O[M] === null || O[M] === B ? O.setAttribute(M, N) : (O[M] = N)
            }
        },
        filterValue: function(N, M) {
            if (D.isFunction(M)) {
                return M.call(this, N)
            }
            return M
        },
        each: function(O, M) {
            var P, N, Q;
            if (D.isJSON(O)) {
                for (P in O) {
                    if (M.call(O[P], P, O[P]) === false) {
                        break
                    }
                }
            } else {
                for (N = 0, Q = O.length; N < Q; N++) {
                    if (M.call(O[N], N, O[N]) === false) {
                        break
                    }
                }
            }
        },
        isString: function(M) {
            return typeof(M) === "string"
        },
        isNumeric: function(M) {
            return ! isNaN(M) && D.type(M) === "number"
        },
        isFunction: function(M) {
            return D.type(M) === "function"
        },
        isArray: function(M) {
            return D.type(M) === "array"
        },
        isDate: function(M) {
            return D.type(M) === "date" || (typeof(M) === "string" && !isNaN(Date.parse(M.replace(/-/g, "/"))))
        },
        isJSON: function(M) {
            return M != null && D.type(M) === "object" && M.toString().toLowerCase() === "[object object]"
        },
        type: function(M) {
            return M == null ? String(M) : new RegExp("\\[object\\s+(.*)\\]").exec(Object.prototype.toString.call(M).toLowerCase())[1]
        },
        trim: function(N, M) {
            return M ? N.replace(/\s/g, "") : N.replace(/^\s*|\s*$/g, "")
        },
        padStr: function(P, M, Q, S) {
            var R = P.length,
            O = "",
            N = 0;
            if (R < Q) {
                S = (S.charAt(0) === "&" && S.length > 1) ? S: S.charAt(0);
                Q = Q - R;
                for (; N < Q; N++) {
                    O += S
                }
                if (M === "left") {
                    return O + P
                }
                return P + O
            }
            return P
        },
        dupStr: function(N, O) {
            var P = "",
            M = 1;
            for (; M < O; M++) {
                P += N
            }
            return (N + P)
        },
        setCookie: function(N, Q, M, S, R, T) {
            var O = N + "=" + escape(Q) + ";path=" + (S === B ? "/": S) + (R === B ? "": ";domain=" + R) + (T === B ? "": ";secure=");
            if (M > 0) {
                var P = new Date();
                P.setMinutes(P.getMinutes() + parseInt(M));
                O += ";expires=" + P.toGMTString()
            }
            F.cookie = O
        },
        getCookie: function(O) {
            var N = new RegExp("\\b" + O + "=([^;]*)");
            var M = N.exec(F.cookie);
            return M ? unescape(M[1]) : null
        },
        delCookie: function(N, P, O) {
            var M = new Date();
            M.setTime(M.getTime() - 100);
            F.cookie = N + "=;expires=" + M.toGMTString() + ";path=" + (P === B ? "/": P) + (O === B ? "": ";domain=" + O)
        },
        makeArray: function(O) {
            var Q = [],
            P = O.length,
            M = 0;
            try {
                Q = Array.prototype.slice.call(O)
            } catch(N) {
                for (; M < P; M++) {
                    Q[M] = O[M]
                }
            }
            return Q
        },
        getSelection: function() {
            var M = (F.selection) ? F.selection.createRange().text: F.getSelection();
            return M + ""
        },
        getDecimalValue: function(M) {
            switch (M.toString().toLowerCase()) {
            case "a":
                return 10;
                break;
            case "b":
                return 11;
                break;
            case "c":
                return 12;
                break;
            case "d":
                return 13;
                break;
            case "e":
                return 14;
                break;
            case "f":
                return 15;
                break;
            default:
                return parseInt(M)
            }
        },
        getHexValue: function(M) {
            switch (M) {
            case 10:
                return "A";
                break;
            case 11:
                return "B";
                break;
            case 12:
                return "C";
                break;
            case 13:
                return "D";
                break;
            case 14:
                return "E";
                break;
            case 15:
                return "F";
                break;
            default:
                return "" + M
            }
        },
        getDecimalToHex: function(N, M) {
            var P = new Array(0, 0);
            var O = 0;
            while (N > 15) {
                P[O] = D.getHexValue(N % 16);
                N = parseInt(N / 16);
                O++
            }
            P[O] = D.getHexValue(N);
            if (M === B) {
                M = P.length
            }
            return D.padStr(P.reverse().join(""), "left", M, "0")
        },
        getHexToDecimal: function(P) {
            var N = 0,
            O = P.length - 1,
            M = 0;
            P = String(P).toLowerCase();
            if (!/[^0-9a-f]/.test(P)) {
                for (; M < O; M++) {
                    N += Math.pow(16, P.length - 1 - M) * D.getDecimalValue(P.charAt(M))
                }
                N += D.getDecimalValue(P.charAt(P.length - 1))
            }
            return N
        },
        browser: (function() {
            var U = {
                name: "",
                version: "",
                canFlash: function() {
                    var Y = false,
                    b = K.plugins;
                    if (G.ActiveXObject) {
                        try {
                            new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                            Y = true
                        } catch(Z) {}
                    } else {
                        if (b) {
                            for (var X = 0,
                            a = b.length; X < a; X++) {
                                if (b[X].name.toLowerCase().indexOf("shockwave flash") !== -1) {
                                    Y = true;
                                    break
                                }
                            }
                        }
                    }
                    return Y
                },
                setHome: function() {
                    try {
                        F.body.style.behavior = "url(#default#homepage)";
                        F.body.setHomePage(J.href)
                    } catch(Y) {
                        var X = confirm("\u60a8\u7684\u6d4f\u89c8\u5668\u9700\u8981\u624b\u52a8\u8bbe\u7f6e\u9996\u9875\u3002\u5982\u9700\u83b7\u53d6\u5e2e\u52a9\uff0c\u8bf7\u53c2\u89c1\u201c\u5982\u4f55\u628a\u767e\u5ea6\u8bbe\u4e3a\u60a8\u7684\u4e0a\u7f51\u4e3b\u9875\u201d\uff01");
                        if (X) {
                            G.open("http://www.baidu.com/cache/sethelp/index.html", "_blank")
                        }
                    }
                },
                addFavorite: function() {
                    try {
                        G.external.addFavorite(J.href, F.title)
                    } catch(X) {
                        try {
                            G.sidebar.addPanel(F.title, J.href, "")
                        } catch(X) {
                            alert("\u6dfb\u52a0\u6536\u85cf\u6ca1\u6709\u6210\u529f\uff0c\u53ef\u4f7f\u7528Ctrl+D\u7ee7\u7eed\u5b8c\u6210\u64cd\u4f5c\uff01")
                        }
                    }
                }
            },
            T = K.userAgent.toLowerCase(),
            P = /ms(ie) ([\d.]+)/.exec(T) || /(firefox)\/([\d.]+)/.exec(T) || /(opera).*version\/([\d.]+)/.exec(T) || /(chrome)\/([\d.]+) safari\/([\d.]+)/.exec(T) || /apple(webkit).*version\/([\d.]+) safari/.exec(T) || [],
            N = P[1] || "",
            Q = P[2] || "",
            S = false,
            O,
            V,
            W,
            R;
            if (N !== "chrome" && N === "webkit") {
                N = "safari"
            }
            if (G.ActiveXObject) {
                N = "ie";
                U.isIE = true;
                U.lessIE9 = true;
                if (!G.XMLHttpRequest) {
                    Q = "6.0";
                    U.isIE6 = true
                } else {
                    if (G.XMLHttpRequest && !("hasAttribute" in F.createElement("div"))) {
                        Q = "7.0";
                        U.isIE7 = true
                    } else {
                        if (!F.getSelection && ("hasAttribute" in F.createElement("div"))) {
                            Q = "8.0";
                            U.isIE8 = true
                        } else {
                            U.lessIE9 = false
                        }
                    }
                }
            } else {
                if (G.opera) {
                    N = "opera"
                }
            }
            if (U.lessIE9) {
                W = "header,footer,aside,article,section,hgroup,nav,menu,canvas,output,dialog,datalist,details,figure,figcaption,audio,video,progress,mark,time".split(",");
                for (R = 0, len = W.length; R < len; R++) {
                    F.createElement(W[R])
                }
            }
            if (U.isIE6) {
                try {
                    F.execCommand("BackgroundImageCache", false, true)
                } catch(M) {}
            }
            U.name = N;
            U.version = Q;
            return U
        } ())
    },
    true);
    D.each(A,
    function(M, N) {
        D.fn[N] = function(P, O) {
            this.bind(N, P, O)
        }
    });
    if (! ("indexOf" in Array.prototype)) {
        Array.prototype.indexOf = function(P) {
            var N = -1,
            O = this.length,
            M = 0;
            for (; M < O; M++) {
                if (this[M] === P) {
                    N = M;
                    break
                }
            }
            return N
        }
    }
    Array.prototype.remove = function(N) {
        var M = this.indexOf(N);
        if (M !== -1) {
            this.splice(M, 1)
        }
    };
    Array.prototype.removeAll = function(N) {
        var M;
        while ((M = this.indexOf(N)) !== -1) {
            this.splice(M, 1)
        }
    };
    if (!F.querySelectorAll) {
        var L = F.createElement("style");
        L.setAttribute("id", "jsApp_selectorStyle");
        F.getElementsByTagName("head")[0].appendChild(L)
    }
    G.jsApp = G.$$ = D
})(window);