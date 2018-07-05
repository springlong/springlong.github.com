package gs
{
    import flash.filters.*;

    public class TweenFilterLite extends TweenLite
    {
        private var _endMatrix:Array;
        private var _hf:Boolean = false;
        private var _matrix:Array;
        private var _cmf:ColorMatrixFilter;
        private var _clrsa:Array;
        private var _filters:Array;
        public static var defaultEase:Function = TweenLite.defaultEase;
        private static var _idMatrix:Array = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
        private static var _lumB:Number = 0.072169;
        public static var version:Number = 7.14;
        public static var delayedCall:Function = TweenLite.delayedCall;
        public static var killTweensOf:Function = TweenLite.killTweensOf;
        private static var _lumG:Number = 0.71516;
        public static var killDelayedCallsTo:Function = TweenLite.killTweensOf;
        private static var _lumR:Number = 0.212671;

        public function TweenFilterLite(param1:Object, param2:Number, param3:Object)
        {
            _hf = false;
            _filters = [];
            super(param1, param2, param3);
            if (TweenLite.version < 6.23 || isNaN(TweenLite.version))
            {
                trace("ERROR! Please update your TweenLite class or try deleting your ASO files. TweenFilterLite requires a more recent version. Download updates at http://www.TweenLite.com.");
            }
            if (param3.type != undefined)
            {
                trace("TweenFilterLite error: " + param1 + " is using deprecated syntax. Please update to the new syntax. See http://www.TweenFilterLite.com for details.");
            }
            return;
        }// end function

        override public function initTweenVals(param1:Boolean = false, param2:String = "") : void
        {
            var _loc_3:int = 0;
            var _loc_4:Object = null;
            var _loc_5:Object = null;
            var _loc_6:Object = null;
            _clrsa = [];
            _filters = [];
            _matrix = _idMatrix.slice();
            param2 = param2 + " blurFilter glowFilter colorMatrixFilter dropShadowFilter bevelFilter ";
            if (this.target is DisplayObject)
            {
                if (this.vars.blurFilter != undefined)
                {
                    _loc_4 = this.vars.blurFilter;
                    addFilter("blur", _loc_4, BlurFilter, ["blurX", "blurY", "quality"], new BlurFilter(0, 0, _loc_4.quality || 2));
                }
                if (this.vars.glowFilter != undefined)
                {
                    _loc_4 = this.vars.glowFilter;
                    addFilter("glow", _loc_4, GlowFilter, ["alpha", "blurX", "blurY", "color", "quality", "strength", "inner", "knockout"], new GlowFilter(16777215, 0, 0, 0, _loc_4.strength || 1, _loc_4.quality || 2, _loc_4.inner, _loc_4.knockout));
                }
                if (this.vars.colorMatrixFilter != undefined)
                {
                    _loc_4 = this.vars.colorMatrixFilter;
                    _loc_5 = addFilter("colorMatrix", _loc_4, ColorMatrixFilter, [], new ColorMatrixFilter(_matrix));
                    _cmf = _loc_5.filter;
                    _matrix = ColorMatrixFilter(_cmf).matrix;
                    if (_loc_4.matrix != undefined && _loc_4.matrix is Array)
                    {
                        _endMatrix = _loc_4.matrix;
                    }
                    else
                    {
                        if (_loc_4.relative == true)
                        {
                            _endMatrix = _matrix.slice();
                        }
                        else
                        {
                            _endMatrix = _idMatrix.slice();
                        }
                        _endMatrix = setBrightness(_endMatrix, _loc_4.brightness);
                        _endMatrix = setContrast(_endMatrix, _loc_4.contrast);
                        _endMatrix = setHue(_endMatrix, _loc_4.hue);
                        _endMatrix = setSaturation(_endMatrix, _loc_4.saturation);
                        _endMatrix = setThreshold(_endMatrix, _loc_4.threshold);
                        if (!isNaN(_loc_4.colorize))
                        {
                            _endMatrix = colorize(_endMatrix, _loc_4.colorize, _loc_4.amount);
                        }
                        else if (!isNaN(_loc_4.color))
                        {
                            _endMatrix = colorize(_endMatrix, _loc_4.color, _loc_4.amount);
                        }
                    }
                    _loc_3 = 0;
                    while (_loc_3 < _endMatrix.length)
                    {
                        
                        if (_matrix[_loc_3] != _endMatrix[_loc_3] && _matrix[_loc_3] != undefined)
                        {
                            this.tweens.push({o:_matrix, p:_loc_3.toString(), s:_matrix[_loc_3], c:_endMatrix[_loc_3] - _matrix[_loc_3]});
                        }
                        _loc_3++;
                    }
                }
                if (this.vars.dropShadowFilter != undefined)
                {
                    _loc_4 = this.vars.dropShadowFilter;
                    addFilter("dropShadow", _loc_4, DropShadowFilter, ["alpha", "angle", "blurX", "blurY", "color", "distance", "quality", "strength", "inner", "knockout", "hideObject"], new DropShadowFilter(0, 45, 0, 0, 0, 0, 1, _loc_4.quality || 2, _loc_4.inner, _loc_4.knockout, _loc_4.hideObject));
                }
                if (this.vars.bevelFilter != undefined)
                {
                    _loc_4 = this.vars.bevelFilter;
                    addFilter("bevel", _loc_4, BevelFilter, ["angle", "blurX", "blurY", "distance", "highlightAlpha", "highlightColor", "quality", "shadowAlpha", "shadowColor", "strength"], new BevelFilter(0, 0, 16777215, 0.5, 0, 0.5, 2, 2, 0, _loc_4.quality || 2));
                }
                if (this.vars.runBackwards == true)
                {
                    _loc_3 = _clrsa.length - 1;
                    while (_loc_3 > -1)
                    {
                        
                        _loc_6 = _clrsa[_loc_3];
                        _clrsa[_loc_3].sr = _loc_6.sr + _loc_6.cr;
                        _loc_6.cr = _loc_6.cr * -1;
                        _loc_6.sg = _loc_6.sg + _loc_6.cg;
                        _loc_6.cg = _loc_6.cg * -1;
                        _loc_6.sb = _loc_6.sb + _loc_6.cb;
                        _loc_6.cb = _loc_6.cb * -1;
                        _loc_6.f[_loc_6.p] = _loc_6.sr << 16 | _loc_6.sg << 8 | _loc_6.sb;
                        _loc_3 = _loc_3 - 1;
                    }
                }
                super.initTweenVals(true, param2);
            }
            else
            {
                super.initTweenVals(param1, param2);
            }
            return;
        }// end function

        override public function render(param1:uint) : void
        {
            var _loc_2:Number = NaN;
            var _loc_3:Number = NaN;
            var _loc_4:Object = null;
            var _loc_5:int = 0;
            var _loc_6:Number = NaN;
            var _loc_7:Number = NaN;
            var _loc_8:Number = NaN;
            var _loc_9:int = 0;
            var _loc_10:Array = null;
            _loc_2 = (param1 - this.startTime) / 1000;
            if (_loc_2 >= this.duration)
            {
                _loc_2 = this.duration;
                _loc_3 = 1;
            }
            else
            {
                _loc_3 = this.vars.ease(_loc_2, 0, 1, this.duration);
            }
            _loc_5 = this.tweens.length - 1;
            while (_loc_5 > -1)
            {
                
                _loc_4 = this.tweens[_loc_5];
                _loc_4.o[_loc_4.p] = _loc_4.s + _loc_3 * _loc_4.c;
                _loc_5 = _loc_5 - 1;
            }
            if (_hf)
            {
                _loc_5 = _clrsa.length - 1;
                while (_loc_5 > -1)
                {
                    
                    _loc_4 = _clrsa[_loc_5];
                    _loc_6 = _loc_4.sr + _loc_3 * _loc_4.cr;
                    _loc_7 = _loc_4.sg + _loc_3 * _loc_4.cg;
                    _loc_8 = _loc_4.sb + _loc_3 * _loc_4.cb;
                    _loc_4.f[_loc_4.p] = _loc_6 << 16 | _loc_7 << 8 | _loc_8;
                    _loc_5 = _loc_5 - 1;
                }
                if (_cmf != null)
                {
                    ColorMatrixFilter(_cmf).matrix = _matrix;
                }
                _loc_10 = this.target.filters;
                _loc_5 = 0;
                while (_loc_5 < _filters.length)
                {
                    
                    _loc_9 = _loc_10.length - 1;
                    while (_loc_9 > -1)
                    {
                        
                        if (_loc_10[_loc_9] is _filters[_loc_5].type)
                        {
                            _loc_10.splice(_loc_9, 1, _filters[_loc_5].filter);
                            break;
                        }
                        _loc_9 = _loc_9 - 1;
                    }
                    _loc_5++;
                }
                this.target.filters = _loc_10;
            }
            if (_hst)
            {
                _loc_5 = _subTweens.length - 1;
                while (_loc_5 > -1)
                {
                    
                    _subTweens[_loc_5].proxy(_subTweens[_loc_5]);
                    _loc_5 = _loc_5 - 1;
                }
            }
            if (this.vars.onUpdate != null)
            {
                this.vars.onUpdate.apply(this.vars.onUpdateScope, this.vars.onUpdateParams);
            }
            if (_loc_2 == this.duration)
            {
                super.complete(true);
            }
            return;
        }// end function

        private function addFilter(param1:String, param2:Object, param3:Class, param4:Array, param5:BitmapFilter) : Object
        {
            var _loc_6:Object = null;
            var _loc_7:Array = null;
            var _loc_8:int = 0;
            var _loc_9:String = null;
            var _loc_10:Number = NaN;
            var _loc_11:Object = null;
            var _loc_12:Object = null;
            _loc_6 = {type:param3};
            _loc_7 = this.target.filters;
            _loc_8 = 0;
            while (_loc_8 < _loc_7.length)
            {
                
                if (_loc_7[_loc_8] is param3)
                {
                    _loc_6.filter = _loc_7[_loc_8];
                    break;
                }
                _loc_8++;
            }
            if (_loc_6.filter == undefined)
            {
                _loc_6.filter = param5;
                _loc_7.push(_loc_6.filter);
                this.target.filters = _loc_7;
            }
            _loc_8 = 0;
            while (_loc_8 < param4.length)
            {
                
                _loc_9 = param4[_loc_8];
                if (param2[_loc_9] != undefined)
                {
                    if (_loc_9 == "color" || _loc_9 == "highlightColor" || _loc_9 == "shadowColor")
                    {
                        _loc_11 = HEXtoRGB(_loc_6.filter[_loc_9]);
                        _loc_12 = HEXtoRGB(param2[_loc_9]);
                        _clrsa.push({f:_loc_6.filter, p:_loc_9, sr:_loc_11.rb, cr:_loc_12.rb - _loc_11.rb, sg:_loc_11.gb, cg:_loc_12.gb - _loc_11.gb, sb:_loc_11.bb, cb:_loc_12.bb - _loc_11.bb});
                    }
                    else if (_loc_9 == "quality" || _loc_9 == "inner" || _loc_9 == "knockout" || _loc_9 == "hideObject")
                    {
                        _loc_6.filter[_loc_9] = param2[_loc_9];
                    }
                    else
                    {
                        if (typeof(param2[_loc_9]) == "number")
                        {
                            _loc_10 = param2[_loc_9] - _loc_6.filter[_loc_9];
                        }
                        else
                        {
                            _loc_10 = Number(param2[_loc_9]);
                        }
                        this.tweens.push({o:_loc_6.filter, p:_loc_9, s:_loc_6.filter[_loc_9], c:_loc_10});
                    }
                }
                _loc_8++;
            }
            _filters.push(_loc_6);
            _hf = true;
            return _loc_6;
        }// end function

        public function HEXtoRGB(param1:Number) : Object
        {
            return {rb:param1 >> 16, gb:param1 >> 8 & 255, bb:param1 & 255};
        }// end function

        public static function setContrast(param1:Array, param2:Number) : Array
        {
            var _loc_3:Array = null;
            if (isNaN(param2))
            {
                return param1;
            }
            param2 = param2 + 0.01;
            _loc_3 = [param2, 0, 0, 0, 128 * (1 - param2), 0, param2, 0, 0, 128 * (1 - param2), 0, 0, param2, 0, 128 * (1 - param2), 0, 0, 0, 1, 0];
            return applyMatrix(_loc_3, param1);
        }// end function

        public static function colorize(param1:Array, param2:Number, param3:Number = 100) : Array
        {
            var _loc_4:Number = NaN;
            var _loc_5:Number = NaN;
            var _loc_6:Number = NaN;
            var _loc_7:Number = NaN;
            var _loc_8:Array = null;
            if (isNaN(param2))
            {
                return param1;
            }
            if (isNaN(param3))
            {
                param3 = 1;
            }
            _loc_4 = (param2 >> 16 & 255) / 255;
            _loc_5 = (param2 >> 8 & 255) / 255;
            _loc_6 = (param2 & 255) / 255;
            _loc_7 = 1 - param3;
            _loc_8 = [_loc_7 + param3 * _loc_4 * _lumR, param3 * _loc_4 * _lumG, param3 * _loc_4 * _lumB, 0, 0, param3 * _loc_5 * _lumR, _loc_7 + param3 * _loc_5 * _lumG, param3 * _loc_5 * _lumB, 0, 0, param3 * _loc_6 * _lumR, param3 * _loc_6 * _lumG, _loc_7 + param3 * _loc_6 * _lumB, 0, 0, 0, 0, 0, 1, 0];
            return applyMatrix(_loc_8, param1);
        }// end function

        public static function setBrightness(param1:Array, param2:Number) : Array
        {
            if (isNaN(param2))
            {
                return param1;
            }
            param2 = param2 * 100 - 100;
            return applyMatrix([1, 0, 0, 0, param2, 0, 1, 0, 0, param2, 0, 0, 1, 0, param2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], param1);
        }// end function

        public static function setSaturation(param1:Array, param2:Number) : Array
        {
            var _loc_3:Number = NaN;
            var _loc_4:Number = NaN;
            var _loc_5:Number = NaN;
            var _loc_6:Number = NaN;
            var _loc_7:Array = null;
            if (isNaN(param2))
            {
                return param1;
            }
            _loc_3 = 1 - param2;
            _loc_4 = _loc_3 * _lumR;
            _loc_5 = _loc_3 * _lumG;
            _loc_6 = _loc_3 * _lumB;
            _loc_7 = [_loc_4 + param2, _loc_5, _loc_6, 0, 0, _loc_4, _loc_5 + param2, _loc_6, 0, 0, _loc_4, _loc_5, _loc_6 + param2, 0, 0, 0, 0, 0, 1, 0];
            return applyMatrix(_loc_7, param1);
        }// end function

        public static function applyMatrix(param1:Array, param2:Array) : Array
        {
            var _loc_3:Array = null;
            var _loc_4:int = 0;
            var _loc_5:int = 0;
            var _loc_6:int = 0;
            var _loc_7:int = 0;
            if (!(param1 is Array) || !(param2 is Array))
            {
                return param2;
            }
            _loc_3 = [];
            _loc_4 = 0;
            _loc_5 = 0;
            _loc_6 = 0;
            while (_loc_6 < 4)
            {
                
                _loc_7 = 0;
                while (_loc_7 < 5)
                {
                    
                    if (_loc_7 == 4)
                    {
                        _loc_5 = param1[_loc_4 + 4];
                    }
                    else
                    {
                        _loc_5 = 0;
                    }
                    _loc_3[_loc_4 + _loc_7] = param1[_loc_4] * param2[_loc_7] + param1[(_loc_4 + 1)] * param2[_loc_7 + 5] + param1[_loc_4 + 2] * param2[_loc_7 + 10] + param1[_loc_4 + 3] * param2[_loc_7 + 15] + _loc_5;
                    _loc_7++;
                }
                _loc_4 = _loc_4 + 5;
                _loc_6++;
            }
            return _loc_3;
        }// end function

        public static function from(param1:Object, param2:Number, param3:Object) : TweenFilterLite
        {
            param3.runBackwards = true;
            return new TweenFilterLite(param1, param2, param3);
        }// end function

        public static function setThreshold(param1:Array, param2:Number) : Array
        {
            var _loc_3:Array = null;
            if (isNaN(param2))
            {
                return param1;
            }
            _loc_3 = [_lumR * 256, _lumG * 256, _lumB * 256, 0, -256 * param2, _lumR * 256, _lumG * 256, _lumB * 256, 0, -256 * param2, _lumR * 256, _lumG * 256, _lumB * 256, 0, -256 * param2, 0, 0, 0, 1, 0];
            return applyMatrix(_loc_3, param1);
        }// end function

        public static function setHue(param1:Array, param2:Number) : Array
        {
            var _loc_3:Number = NaN;
            var _loc_4:Number = NaN;
            var _loc_5:Array = null;
            if (isNaN(param2))
            {
                return param1;
            }
            param2 = param2 * (Math.PI / 180);
            _loc_3 = Math.cos(param2);
            _loc_4 = Math.sin(param2);
            _loc_5 = [_lumR + _loc_3 * (1 - _lumR) + _loc_4 * (-_lumR), _lumG + _loc_3 * (-_lumG) + _loc_4 * (-_lumG), _lumB + _loc_3 * (-_lumB) + _loc_4 * (1 - _lumB), 0, 0, _lumR + _loc_3 * (-_lumR) + _loc_4 * 0.143, _lumG + _loc_3 * (1 - _lumG) + _loc_4 * 0.14, _lumB + _loc_3 * (-_lumB) + _loc_4 * -0.283, 0, 0, _lumR + _loc_3 * (-_lumR) + _loc_4 * (-(1 - _lumR)), _lumG + _loc_3 * (-_lumG) + _loc_4 * _lumG, _lumB + _loc_3 * (1 - _lumB) + _loc_4 * _lumB, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
            return applyMatrix(_loc_5, param1);
        }// end function

        public static function to(param1:Object, param2:Number, param3:Object) : TweenFilterLite
        {
            return new TweenFilterLite(param1, param2, param3);
        }// end function

    }
}
