package gs
{
    import flash.utils.*;

    public class TweenMax extends TweenFilterLite
    {
        protected var _pauseTime:int;
        public static var removeTween:Function = TweenLite.removeTween;
        public static var defaultEase:Function = TweenLite.defaultEase;
        public static var version:Number = 1.17;
        public static var killTweensOf:Function = TweenLite.killTweensOf;
        static const _RAD2DEG:Number = 57.2958;
        public static var killDelayedCallsTo:Function = TweenLite.killDelayedCallsTo;

        public function TweenMax(param1:Object, param2:Number, param3:Object)
        {
            super(param1, param2, param3);
            _pauseTime = -1;
            if (TweenFilterLite.version < 7.14 || isNaN(TweenFilterLite.version))
            {
                trace("TweenMax error! Please update your TweenFilterLite class or try deleting your ASO files. TweenMax requires a more recent version. Download updates at http://www.TweenMax.com.");
            }
            return;
        }// end function

        override public function initTweenVals(param1:Boolean = false, param2:String = "") : void
        {
            var _loc_3:String = null;
            var _loc_4:int = 0;
            var _loc_5:Object = null;
            var _loc_6:Object = null;
            var _loc_7:Array = null;
            var _loc_8:Function = null;
            param2 = param2 + " hexColors bezier bezierThrough orientToBezier quaternions onCompleteAll onCompleteAllParams ";
            _loc_8 = bezierProxy;
            if (this.vars.orientToBezier == true)
            {
                this.vars.orientToBezier = [["x", "y", "rotation", 0]];
                _loc_8 = bezierProxy2;
            }
            else if (this.vars.orientToBezier is Array)
            {
                _loc_8 = bezierProxy2;
            }
            if (this.vars.bezier != undefined && this.vars.bezier is Array)
            {
                _loc_6 = {};
                _loc_7 = this.vars.bezier;
                _loc_4 = 0;
                while (_loc_4 < _loc_7.length)
                {
                    
                    for (_loc_3 in _loc_7[_loc_4])
                    {
                        
                        if (_loc_6[_loc_3] == undefined)
                        {
                            _loc_6[_loc_3] = [this.target[_loc_3]];
                        }
                        if (typeof(_loc_7[_loc_4][_loc_3]) == "number")
                        {
                            _loc_6[_loc_3].push(_loc_7[_loc_4][_loc_3]);
                            continue;
                        }
                        _loc_6[_loc_3].push(this.target[_loc_3] + Number(_loc_7[_loc_4][_loc_3]));
                    }
                    _loc_4++;
                }
                for (_loc_3 in _loc_6)
                {
                    
                    if (typeof(this.vars[_loc_3]) == "number")
                    {
                        _loc_6[_loc_3].push(this.vars[_loc_3]);
                    }
                    else
                    {
                        _loc_6[_loc_3].push(this.target[_loc_3] + Number(this.vars[_loc_3]));
                    }
                    delete this.vars[_loc_3];
                }
                addSubTween(_loc_8, {t:0}, {t:1}, {props:parseBeziers(_loc_6, false), target:this.target, orientToBezier:this.vars.orientToBezier});
            }
            if (this.vars.bezierThrough != undefined && this.vars.bezierThrough is Array)
            {
                _loc_6 = {};
                _loc_7 = this.vars.bezierThrough;
                _loc_4 = 0;
                while (_loc_4 < _loc_7.length)
                {
                    
                    for (_loc_3 in _loc_7[_loc_4])
                    {
                        
                        if (_loc_6[_loc_3] == undefined)
                        {
                            _loc_6[_loc_3] = [this.target[_loc_3]];
                        }
                        if (typeof(_loc_7[_loc_4][_loc_3]) == "number")
                        {
                            _loc_6[_loc_3].push(_loc_7[_loc_4][_loc_3]);
                            continue;
                        }
                        _loc_6[_loc_3].push(this.target[_loc_3] + Number(_loc_7[_loc_4][_loc_3]));
                    }
                    _loc_4++;
                }
                for (_loc_3 in _loc_6)
                {
                    
                    if (typeof(this.vars[_loc_3]) == "number")
                    {
                        _loc_6[_loc_3].push(this.vars[_loc_3]);
                    }
                    else
                    {
                        _loc_6[_loc_3].push(this.target[_loc_3] + Number(this.vars[_loc_3]));
                    }
                    delete this.vars[_loc_3];
                }
                addSubTween(_loc_8, {t:0}, {t:1}, {props:parseBeziers(_loc_6, true), target:this.target, orientToBezier:this.vars.orientToBezier});
            }
            if (this.vars.hexColors != undefined && typeof(this.vars.hexColors) == "object")
            {
                for (_loc_3 in this.vars.hexColors)
                {
                    
                    addSubTween(hexColorsProxy, {r:this.target[_loc_3] >> 16, g:this.target[_loc_3] >> 8 & 255, b:this.target[_loc_3] & 255}, {r:this.vars.hexColors[_loc_3] >> 16, g:this.vars.hexColors[_loc_3] >> 8 & 255, b:this.vars.hexColors[_loc_3] & 255}, {prop:_loc_3, target:this.target});
                }
            }
            super.initTweenVals(true, param2);
            return;
        }// end function

        override public function get active() : Boolean
        {
            if (_active)
            {
                return true;
            }
            if (_pauseTime != -1)
            {
                return false;
            }
            if ((_curTime - this.initTime) / 1000 > this.delay)
            {
                _active = true;
                this.startTime = this.initTime + this.delay * 1000;
                if (!_initted)
                {
                    initTweenVals();
                }
                else if (typeof(this.vars.autoAlpha) == "number")
                {
                    this.target.visible = true;
                }
                if (this.vars.onStart != null)
                {
                    this.vars.onStart.apply(null, this.vars.onStartParams);
                }
                if (this.duration == 0.001)
                {
                    (this.startTime - 1);
                }
                return true;
            }
            else
            {
                return false;
            }
        }// end function

        public function set progress(param1:Number) : void
        {
            var _loc_2:Number = NaN;
            var _loc_3:Boolean = false;
            _loc_2 = _curTime - this.duration * param1 * 1000;
            this.initTime = _loc_2 - this.delay * 1000;
            _loc_3 = this.active;
            this.startTime = _loc_2;
            render(_curTime);
            return;
        }// end function

        public function set paused(param1:Boolean) : void
        {
            if (param1)
            {
                this.pause();
            }
            else
            {
                this.resume();
            }
            return;
        }// end function

        public function resume() : void
        {
            var _loc_1:Number = NaN;
            if (_pauseTime != -1)
            {
                _loc_1 = _curTime - _pauseTime;
                this.initTime = this.initTime + _loc_1;
                if (!isNaN(this.startTime))
                {
                    this.startTime = this.startTime + _loc_1;
                }
                _pauseTime = -1;
                if ((_curTime - this.initTime) / 1000 > this.delay)
                {
                    _active = true;
                }
            }
            return;
        }// end function

        public function get paused() : Boolean
        {
            if (_pauseTime != -1)
            {
                return true;
            }
            return false;
        }// end function

        public function get progress() : Number
        {
            var _loc_1:Number = NaN;
            _loc_1 = (_curTime - this.startTime) / 1000 / this.duration || 0;
            if (_loc_1 > 1)
            {
                return 1;
            }
            return _loc_1;
        }// end function

        public function pause() : void
        {
            if (_pauseTime == -1)
            {
                _pauseTime = _curTime;
                _active = false;
            }
            return;
        }// end function

        public static function sequence(param1:Object, param2:Array) : Array
        {
            var _loc_3:Boolean = false;
            var _loc_4:Array = null;
            var _loc_5:Number = NaN;
            var _loc_6:Number = NaN;
            var _loc_7:Number = NaN;
            var _loc_8:uint = 0;
            var _loc_9:Object = null;
            var _loc_10:String = null;
            var _loc_11:Object = null;
            _loc_3 = true;
            if (param2[0].overwrite == false)
            {
                _loc_3 = false;
            }
            _loc_4 = [];
            _loc_5 = 0;
            _loc_8 = 0;
            while (_loc_8 < param2.length)
            {
                
                _loc_11 = param2[_loc_8];
                _loc_7 = _loc_11.time || 0;
                _loc_9 = {};
                for (_loc_10 in _loc_11)
                {
                    
                    _loc_9[_loc_10] = _loc_11[_loc_10];
                }
                delete _loc_9.time;
                _loc_6 = _loc_9.delay || 0;
                _loc_9.delay = _loc_5 + _loc_6;
                _loc_9.overwrite = _loc_3;
                _loc_4.push(new TweenMax(param1, _loc_7, _loc_9));
                _loc_5 = _loc_5 + (_loc_7 + _loc_6);
                _loc_3 = false;
                _loc_8 = _loc_8 + 1;
            }
            return _loc_4;
        }// end function

        public static function hexColorsProxy(param1:Object) : void
        {
            param1.info.target[param1.info.prop] = param1.target.r << 16 | param1.target.g << 8 | param1.target.b;
            return;
        }// end function

        public static function parseBeziers(param1:Object, param2:Boolean = false) : Object
        {
            var _loc_3:int = 0;
            var _loc_4:Array = null;
            var _loc_5:Object = null;
            var _loc_6:String = null;
            var _loc_7:Object = null;
            _loc_7 = {};
            if (param2)
            {
                for (_loc_6 in param1)
                {
                    
                    _loc_4 = param1[_loc_6];
                    var _loc_10:* = [];
                    _loc_5 = [];
                    _loc_7[_loc_6] = _loc_10;
                    if (_loc_4.length > 2)
                    {
                        _loc_5.push({s:_loc_4[0], cp:_loc_4[1] - (_loc_4[2] - _loc_4[0]) / 4, e:_loc_4[1]});
                        _loc_3 = 1;
                        while (_loc_3 < (_loc_4.length - 1))
                        {
                            
                            _loc_5.push({s:_loc_4[_loc_3], cp:_loc_4[_loc_3] + (_loc_4[_loc_3] - _loc_5[(_loc_3 - 1)].cp), e:_loc_4[(_loc_3 + 1)]});
                            _loc_3++;
                        }
                        continue;
                    }
                    _loc_5.push({s:_loc_4[0], cp:(_loc_4[0] + _loc_4[1]) / 2, e:_loc_4[1]});
                }
            }
            else
            {
                for (_loc_6 in param1)
                {
                    
                    _loc_4 = param1[_loc_6];
                    var _loc_10:* = [];
                    _loc_5 = [];
                    _loc_7[_loc_6] = _loc_10;
                    if (_loc_4.length > 3)
                    {
                        _loc_5.push({s:_loc_4[0], cp:_loc_4[1], e:(_loc_4[1] + _loc_4[2]) / 2});
                        _loc_3 = 2;
                        while (_loc_3 < _loc_4.length - 2)
                        {
                            
                            _loc_5.push({s:_loc_5[_loc_3 - 2].e, cp:_loc_4[_loc_3], e:(_loc_4[_loc_3] + _loc_4[(_loc_3 + 1)]) / 2});
                            _loc_3++;
                        }
                        _loc_5.push({s:_loc_5[(_loc_5.length - 1)].e, cp:_loc_4[_loc_4.length - 2], e:_loc_4[(_loc_4.length - 1)]});
                        continue;
                    }
                    if (_loc_4.length == 3)
                    {
                        _loc_5.push({s:_loc_4[0], cp:_loc_4[1], e:_loc_4[2]});
                        continue;
                    }
                    if (_loc_4.length == 2)
                    {
                        _loc_5.push({s:_loc_4[0], cp:(_loc_4[0] + _loc_4[1]) / 2, e:_loc_4[1]});
                    }
                }
            }
            return _loc_7;
        }// end function

        public static function bezierProxy2(param1:Object) : void
        {
            var _loc_2:Object = null;
            var _loc_3:Object = null;
            var _loc_4:Array = null;
            var _loc_5:Number = NaN;
            var _loc_6:Number = NaN;
            var _loc_7:Number = NaN;
            var _loc_8:Array = null;
            var _loc_9:Number = NaN;
            var _loc_10:uint = 0;
            bezierProxy(param1);
            _loc_2 = {};
            _loc_3 = param1.info.target;
            param1.info.target = _loc_2;
            param1.target.t = param1.target.t + 0.01;
            bezierProxy(param1);
            _loc_4 = param1.info.orientToBezier;
            _loc_10 = 0;
            while (_loc_10 < _loc_4.length)
            {
                
                _loc_8 = _loc_4[_loc_10];
                _loc_9 = _loc_8[3] || 0;
                _loc_6 = _loc_2[_loc_8[0]] - _loc_3[_loc_8[0]];
                _loc_7 = _loc_2[_loc_8[1]] - _loc_3[_loc_8[1]];
                _loc_3[_loc_8[2]] = Math.atan2(_loc_7, _loc_6) * _RAD2DEG + _loc_9;
                _loc_10 = _loc_10 + 1;
            }
            param1.info.target = _loc_3;
            param1.target.t = param1.target.t - 0.01;
            return;
        }// end function

        public static function pauseAll(param1:Boolean = true, param2:Boolean = false) : void
        {
            changePause(true, param1, param2);
            return;
        }// end function

        public static function getTweensOf(param1:Object) : Array
        {
            var _loc_2:Dictionary = null;
            var _loc_3:Array = null;
            var _loc_4:Object = null;
            _loc_2 = _all[param1];
            _loc_3 = [];
            if (_loc_2 != null)
            {
                for (_loc_4 in _loc_2)
                {
                    
                    if (_loc_2[_loc_4].tweens != undefined)
                    {
                        _loc_3.push(_loc_2[_loc_4]);
                    }
                }
            }
            return _loc_3;
        }// end function

        public static function killAllDelayedCalls(param1:Boolean = false) : void
        {
            killAll(param1, false, true);
            return;
        }// end function

        public static function delayedCall(param1:Number, param2:Function, param3:Array = null, param4 = null) : TweenMax
        {
            return new TweenMax(param2, 0, {delay:param1, onComplete:param2, onCompleteParams:param3, onCompleteScope:param4, overwrite:false});
        }// end function

        public static function isTweening(param1:Object) : Boolean
        {
            var _loc_2:Array = null;
            var _loc_3:int = 0;
            _loc_2 = getTweensOf(param1);
            _loc_3 = _loc_2.length - 1;
            while (_loc_3 > -1)
            {
                
                if (_loc_2[_loc_3].active)
                {
                    return true;
                }
                _loc_3 = _loc_3 - 1;
            }
            return false;
        }// end function

        public static function killAll(param1:Boolean = false, param2:Boolean = true, param3:Boolean = true) : void
        {
            var _loc_4:Array = null;
            var _loc_5:int = 0;
            _loc_4 = getAllTweens();
            _loc_5 = _loc_4.length - 1;
            while (_loc_5 > -1)
            {
                
                if (_loc_4[_loc_5].target is Function == param3 || _loc_4[_loc_5].target is Function != param2)
                {
                    if (param1)
                    {
                        _loc_4[_loc_5].complete();
                    }
                    else
                    {
                        TweenLite.removeTween(_loc_4[_loc_5]);
                    }
                }
                _loc_5 = _loc_5 - 1;
            }
            return;
        }// end function

        public static function changePause(param1:Boolean, param2:Boolean = true, param3:Boolean = false) : void
        {
            var _loc_4:Array = null;
            var _loc_5:int = 0;
            _loc_4 = getAllTweens();
            _loc_5 = _loc_4.length - 1;
            while (_loc_5 > -1)
            {
                
                if (_loc_4[_loc_5].target is Function == param3 || _loc_4[_loc_5].target is Function != param2)
                {
                    _loc_4[_loc_5].paused = param1;
                }
                _loc_5 = _loc_5 - 1;
            }
            return;
        }// end function

        public static function bezierProxy(param1:Object) : void
        {
            var _loc_2:Number = NaN;
            var _loc_3:Object = null;
            var _loc_4:Object = null;
            var _loc_5:int = 0;
            var _loc_6:String = null;
            var _loc_7:Object = null;
            var _loc_8:Number = NaN;
            var _loc_9:uint = 0;
            _loc_2 = param1.target.t;
            _loc_3 = param1.info.props;
            _loc_4 = param1.info.target;
            for (_loc_6 in _loc_3)
            {
                
                _loc_9 = _loc_3[_loc_6].length;
                if (_loc_2 < 0)
                {
                    _loc_5 = 0;
                }
                else if (_loc_2 >= 1)
                {
                    _loc_5 = _loc_9 - 1;
                }
                else
                {
                    _loc_5 = int(_loc_9 * _loc_2);
                }
                _loc_8 = (_loc_2 - _loc_5 * (1 / _loc_9)) * _loc_9;
                _loc_7 = _loc_3[_loc_6][_loc_5];
                _loc_4[_loc_6] = _loc_7.s + _loc_8 * (2 * (1 - _loc_8) * (_loc_7.cp - _loc_7.s) + _loc_8 * (_loc_7.e - _loc_7.s));
            }
            return;
        }// end function

        public static function callbackProxy(param1:Array, param2:Array = null) : void
        {
            var _loc_3:uint = 0;
            _loc_3 = 0;
            while (_loc_3 < param1.length)
            {
                
                if (param1[_loc_3] != undefined)
                {
                    param1[_loc_3].apply(null, param2[_loc_3]);
                }
                _loc_3 = _loc_3 + 1;
            }
            return;
        }// end function

        public static function allFrom(param1:Array, param2:Number, param3:Object) : Array
        {
            param3.runBackwards = true;
            return allTo(param1, param2, param3);
        }// end function

        public static function from(param1:Object, param2:Number, param3:Object) : TweenMax
        {
            param3.runBackwards = true;
            return new TweenMax(param1, param2, param3);
        }// end function

        public static function killAllTweens(param1:Boolean = false) : void
        {
            killAll(param1, true, false);
            return;
        }// end function

        public static function getAllTweens() : Array
        {
            var _loc_1:Dictionary = null;
            var _loc_2:Array = null;
            var _loc_3:Object = null;
            var _loc_4:Object = null;
            _loc_1 = _all;
            _loc_2 = [];
            for (_loc_3 in _loc_1)
            {
                
                for (_loc_4 in _loc_1[_loc_3])
                {
                    
                    if (_loc_1[_loc_3][_loc_4] != undefined)
                    {
                        _loc_2.push(_loc_1[_loc_3][_loc_4]);
                    }
                }
            }
            return _loc_2;
        }// end function

        public static function resumeAll(param1:Boolean = true, param2:Boolean = false) : void
        {
            changePause(false, param1, param2);
            return;
        }// end function

        public static function to(param1:Object, param2:Number, param3:Object) : TweenMax
        {
            return new TweenMax(param1, param2, param3);
        }// end function

        public static function allTo(param1:Array, param2:Number, param3:Object) : Array
        {
            var _loc_4:int = 0;
            var _loc_5:Object = null;
            var _loc_6:String = null;
            var _loc_7:Number = NaN;
            var _loc_8:Object = null;
            var _loc_9:Array = null;
            var _loc_10:Number = NaN;
            if (param1.length == 0)
            {
                return [];
            }
            _loc_9 = [];
            _loc_10 = param3.delayIncrement || 0;
            delete param3.delayIncrement;
            if (param3.onCompleteAll == undefined)
            {
                _loc_8 = param3;
            }
            else
            {
                _loc_8 = {};
                for (_loc_6 in param3)
                {
                    
                    _loc_8[_loc_6] = param3[_loc_6];
                }
                _loc_8.onCompleteParams = [[param3.onComplete, param3.onCompleteAll], [param3.onCompleteParams, param3.onCompleteAllParams]];
                _loc_8.onComplete = TweenMax.callbackProxy;
                delete param3.onCompleteAll;
            }
            delete param3.onCompleteAllParams;
            if (_loc_10 == 0)
            {
                _loc_4 = 0;
                while (_loc_4 < (param1.length - 1))
                {
                    
                    _loc_5 = {};
                    for (_loc_6 in param3)
                    {
                        
                        _loc_5[_loc_6] = param3[_loc_6];
                    }
                    _loc_9.push(new TweenMax(param1[_loc_4], param2, _loc_5));
                    _loc_4++;
                }
            }
            else
            {
                _loc_7 = param3.delay || 0;
                _loc_4 = 0;
                while (_loc_4 < (param1.length - 1))
                {
                    
                    _loc_5 = {};
                    for (_loc_6 in param3)
                    {
                        
                        _loc_5[_loc_6] = param3[_loc_6];
                    }
                    _loc_5.delay = _loc_7 + _loc_4 * _loc_10;
                    _loc_9.push(new TweenMax(param1[_loc_4], param2, _loc_5));
                    _loc_4++;
                }
                _loc_8.delay = _loc_7 + (param1.length - 1) * _loc_10;
            }
            _loc_9.push(new TweenMax(param1[(param1.length - 1)], param2, _loc_8));
            return _loc_9;
        }// end function

    }
}
