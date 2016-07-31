function loadExData() {
    var _cx75bm5i7 = function (lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    };
    var _i54He38H = function (lX, lY) {
        var _f367xZh, _utY46, _pOlN34A, _F1Z4B3q, _f4x37;
        _pOlN34A = (lX & 0x80000000);
        _F1Z4B3q = (lY & 0x80000000);
        _f367xZh = (lX & 0x40000000);
        _utY46 = (lY & 0x40000000);
        _f4x37 = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (_f367xZh & _utY46) return (_f4x37 ^ 0x80000000 ^ _pOlN34A ^ _F1Z4B3q);
        if (_f367xZh | _utY46) {
            if (_f4x37 & 0x40000000) return (_f4x37 ^ 0xC0000000 ^ _pOlN34A ^ _F1Z4B3q);
            else return (_f4x37 ^ 0x40000000 ^ _pOlN34A ^ _F1Z4B3q);
        } else {
            return (_f4x37 ^ _pOlN34A ^ _F1Z4B3q);
        }
    };
    var F = function (x, y, z) {
        return (x & y) | ((~x) & z);
    };
    var G = function (x, y, z) {
        return (x & z) | (y & (~z));
    };
    var H = function (x, y, z) {
        return (x ^ y ^ z);
    };
    var I = function (x, y, z) {
        return (y ^ (x | (~z)));
    };
    var FF = function (a, b, c, d, x, s, ac) {
        a = _i54He38H(a, _i54He38H(_i54He38H(F(b, c, d), x), ac));
        return _i54He38H(_cx75bm5i7(a, s), b);
    };
    var GG = function (a, b, c, d, x, s, ac) {
        a = _i54He38H(a, _i54He38H(_i54He38H(G(b, c, d), x), ac));
        return _i54He38H(_cx75bm5i7(a, s), b);
    };
    var HH = function (a, b, c, d, x, s, ac) {
        a = _i54He38H(a, _i54He38H(_i54He38H(H(b, c, d), x), ac));
        return _i54He38H(_cx75bm5i7(a, s), b);
    };
    var II = function (a, b, c, d, x, s, ac) {
        a = _i54He38H(a, _i54He38H(_i54He38H(I(b, c, d), x), ac));
        return _i54He38H(_cx75bm5i7(a, s), b);
    };
    var _xJwXRs5N0 = function (string) {
        var _JMX1$f;
        var _JMX1$d = string.length;
        var _JMX1$z = _JMX1$d + 8;
        var _JMX1$l = (_JMX1$z - (_JMX1$z % 64)) / 64;
        var _JMX1$t1 = (_JMX1$l + 1) * 16;
        var _JMX1$f1 = Array(_JMX1$t1 - 1);
        var _JMX1$k6 = 0;
        var _JMX1$vx = 0;
        while (_JMX1$vx < _JMX1$d) {
            _JMX1$f = (_JMX1$vx - (_JMX1$vx % 4)) / 4;
            _JMX1$k6 = (_JMX1$vx % 4) * 8;
            _JMX1$f1[_JMX1$f] = (_JMX1$f1[_JMX1$f] | (string.charCodeAt(_JMX1$vx) << _JMX1$k6));
            _JMX1$vx++;
        }
        _JMX1$f = (_JMX1$vx - (_JMX1$vx % 4)) / 4;
        _JMX1$k6 = (_JMX1$vx % 4) * 8;
        _JMX1$f1[_JMX1$f] = _JMX1$f1[_JMX1$f] | (0x80 << _JMX1$k6);
        _JMX1$f1[_JMX1$t1 - 2] = _JMX1$d << 3;
        _JMX1$f1[_JMX1$t1 - 1] = _JMX1$d >>> 29;
        return _JMX1$f1;
    };
    var _ff0TztH = function (lValue) {
        var _fZ2 = "", _fZt = "", _fZY, _fZbh;
        for (_fZbh = 0; _fZbh <= 3; _fZbh++) {
            _fZY = (lValue >>> (_fZbh * 8)) & 255;
            _fZt = "0" + _fZY.toString(16);
            _fZ2 = _fZ2 + _fZt.substr(_fZt.length - 2, 2);
        }
        return _fZ2;
    };
    var _Uf2bX_fa = function (_Lb6sA) {
        _Lb6sA = _Lb6sA.replace(/\x0d\x0a/g, "\x0a");
        var _oo9xF1 = "";
        for (var n = 0; n < _Lb6sA.length; n++) {
            var c = _Lb6sA.charCodeAt(n);
            if (c < 128) {
                _oo9xF1 += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                _oo9xF1 += String.fromCharCode((c >> 6) | 192);
                _oo9xF1 += String.fromCharCode((c & 63) | 128);
            } else {
                _oo9xF1 += String.fromCharCode((c >> 12) | 224);
                _oo9xF1 += String.fromCharCode(((c >> 6) & 63) | 128);
                _oo9xF1 += String.fromCharCode((c & 63) | 128);
            }
        }
        return _oo9xF1;
    };
    function _65T18YT(string) {
        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
        var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
        string = _Uf2bX_fa(string);
        x = _xJwXRs5N0(string);
        a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
        for (k = 0; k < x.length; k += 16) {
            AA = a; BB = b; CC = c; DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = _i54He38H(a, AA);
            b = _i54He38H(b, BB);
            c = _i54He38H(c, CC);
            d = _i54He38H(d, DD);
        }
        var _36TX = _ff0TztH(a) + _ff0TztH(b) + _ff0TztH(c) + _ff0TztH(d);
        return _36TX.toLowerCase();
    }

    function _StbL0t(str) {
        var ch, st, re = [];
        for (var i = 0; i < str.length; i++) {
            ch = str.charCodeAt(i);  
            //st = [];                 
            //do {
            //    st.push(ch & 0xFF);  
            //    ch = ch >> 8;          
            //}
            //while (ch);            
            //re = re.concat(st.reverse());
            re.push(ch);
        }        
        return re;
    }

    return {
        loadData: _65T18YT,
        loadDatas:_StbL0t
    };
}