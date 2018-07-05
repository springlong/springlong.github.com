package gs
{
    import flash.display.*;
    import flash.events.*;
    import flash.geom.*;
    import flash.utils.*;

    public class TweenLite extends Object
    {
        public var delay:Number;
        protected var _initted:Boolean;
        protected var _subTweens:Array;
        public var startTime:int;
        public var target:Object;
        public var duration:Number;
        protected var _hst:Boolean;
        protected var _active:Boolean;
        public var vars:Object;
        public var tweens:Array;
        public var initTime:int;
        private static var _timer:Timer = new Timer(2000);
        private static var _classInitted:Boolean;
        public static var defaultEase:Function = TweenLite.easeOut;
        public static var version:Number = 6.23;
        private static var _sprite:Sprite = new Sprite();
        static var _all:Dictionary = new Dictionary();
        public static var killDelayedCallsTo:Function = killTweensOf;
        static var _curTime:uint;
        private static var _listening:Boolean;

        public function TweenLite(param1:Object, param2:Number, param3:Object)
        {
            if (param1 == null)
            {
                return;
            }
            if (param3.overwrite != false && param1 != null || _all[param1] == undefined)
            {
                delete _all[param1];
                _all[param1] = new Dictionary();
            }
            _all[param1][this] = this;
            this.vars = param3;
            this.duration = param2 || 0.001;
            this.delay = param3.delay || 0;
            this.target = param1;
            if (!(this.vars.ease is Function))
            {
                this.vars.ease = defaultEase;
            }
            if (this.vars.easeParams != null)
            {
                this.vars.proxiedEase = this.vars.ease;
                this.vars.ease = easeProxy;
            }
            if (!isNaN(Number(this.vars.autoAlpha)))
            {
                this.vars.alpha = Number(this.vars.autoAlpha);
            }
            this.tweens = [];
            _subTweens = [];
            var _loc_4:Boolean = false;
            _initted = false;
            _hst = _loc_4;
            _active = param2 == 0 && this.delay == 0;
            if (!_classInitted)
            {
                _curTime = getTimer();
                _sprite.addEventListener(Event.ENTER_FRAME, executeAll);
                _classInitted = true;
            }
            this.initTime = _curTime;
            if (this.vars.runBackwards == true && this.vars.renderOnStart != true || _active)
            {
                initTweenVals();
                this.startTime = _curTime;
                if (_active)
                {
                    render((this.startTime + 1));
                }
                else
                {
                    render(this.startTime);
                }
            }
            if (!_listening && !_active)
            {
                _timer.addEventListener("timer", killGarbage);
                _timer.start();
                _listening = true;
            }
            return;
        }// end function

        protected function addSubTween(param1:Function, param2:Object, param3:Object, param4:Object = null) : void
        {
            var _loc_5:Object = null;
            var _loc_6:String = null;
            _loc_5 = {proxy:param1, target:param2, info:param4};
            _subTweens.push(_loc_5);
            for (_loc_6 in param3)
            {
                
                if (typeof(param3[_loc_6]) == "number")
                {
                    this.tweens.push({o:param2, p:_loc_6, s:param2[_loc_6], c:param3[_loc_6] - param2[_loc_6], sub:_loc_5});
                    continue;
                }
                this.tweens.push({o:param2, p:_loc_6, s:param2[_loc_6], c:Number(param3[_loc_6]), sub:_loc_5});
            }
            _hst = true;
            return;
        }// end function

        public function initTweenVals(param1:Boolean = false, param2:String = "") : void
        {
            var _loc_3:Boolean = false;
            var _loc_4:String = null;
            var _loc_5:int = 0;
            var _loc_6:Array = null;
            var _loc_7:ColorTransform = null;
            var _loc_8:ColorTransform = null;
            var _loc_9:Object = null;
            _loc_3 = this.target is DisplayObject;
            if (this.target is Array)
            {
                _loc_6 = this.vars.endArray || [];
                _loc_5 = 0;
                while (_loc_5 < _loc_6.length)
                {
                    
                    if (this.target[_loc_5] != _loc_6[_loc_5] && this.target[_loc_5] != undefined)
                    {
                        this.tweens.push({o:this.target, p:_loc_5.toString(), s:this.target[_loc_5], c:_loc_6[_loc_5] - this.target[_loc_5]});
                    }
                    _loc_5++;
                }
            }
            else
            {
                for (_loc_4 in this.vars)
                {
                    
                    if (_loc_4 == "ease" || _loc_4 == "delay" || _loc_4 == "overwrite" || _loc_4 == "onComplete" || _loc_4 == "onCompleteParams" || _loc_4 == "onCompleteScope" || _loc_4 == "runBackwards" || _loc_4 == "onUpdate" || _loc_4 == "onUpdateParams" || _loc_4 == "onUpdateScope" || _loc_4 == "autoAlpha" || _loc_4 == "onStart" || _loc_4 == "onStartParams" || _loc_4 == "onStartScope" || _loc_4 == "renderOnStart" || _loc_4 == "proxiedEase" || _loc_4 == "easeParams" || param1 && param2.indexOf(" " + _loc_4 + " ") != -1)
                    {
                        continue;
                    }
                    if (_loc_4 == "tint" && _loc_3)
                    {
                        _loc_7 = this.target.transform.colorTransform;
                        _loc_8 = new ColorTransform();
                        if (this.vars.alpha != undefined)
                        {
                            _loc_8.alphaMultiplier = this.vars.alpha;
                            delete this.vars.alpha;
                            _loc_5 = this.tweens.length - 1;
                            while (_loc_5 > -1)
                            {
                                
                                if (this.tweens[_loc_5].p == "alpha")
                                {
                                    this.tweens.splice(_loc_5, 1);
                                    break;
                                }
                                _loc_5 = _loc_5 - 1;
                            }
                        }
                        else
                        {
                            _loc_8.alphaMultiplier = this.target.alpha;
                        }
                        if (this.vars[_loc_4] != null && this.vars[_loc_4] != "" || this.vars[_loc_4] == 0)
                        {
                            _loc_8.color = this.vars[_loc_4];
                        }
                        addSubTween(tintProxy, {progress:0}, {progress:1}, {target:this.target, color:_loc_7, endColor:_loc_8});
                        continue;
                    }
                    if (_loc_4 == "frame" && _loc_3)
                    {
                        addSubTween(frameProxy, {frame:this.target.currentFrame}, {frame:this.vars[_loc_4]}, {target:this.target});
                        continue;
                    }
                    if (_loc_4 == "volume" && (_loc_3 || this.target is SoundChannel))
                    {
                        addSubTween(volumeProxy, this.target.soundTransform, {volume:this.vars[_loc_4]}, {target:this.target});
                        continue;
                    }
                    if (typeof(this.vars[_loc_4]) == "number")
                    {
                        this.tweens.push({o:this.target, p:_loc_4, s:this.target[_loc_4], c:this.vars[_loc_4] - this.target[_loc_4]});
                        continue;
                    }
                    this.tweens.push({o:this.target, p:_loc_4, s:this.target[_loc_4], c:Number(this.vars[_loc_4])});
                }
            }
            if (this.vars.runBackwards == true)
            {
                _loc_5 = this.tweens.length - 1;
                while (_loc_5 > -1)
                {
                    
                    _loc_9 = this.tweens[_loc_5];
                    this.tweens[_loc_5].s = _loc_9.s + _loc_9.c;
                    _loc_9.c = _loc_9.c * -1;
                    _loc_5 = _loc_5 - 1;
                }
            }
            if (typeof(this.vars.autoAlpha) == "number")
            {
                this.target.visible = !(this.vars.runBackwards == true && this.target.alpha == 0);
            }
            _initted = true;
            return;
        }// end function

        public function get active() : Boolean
        {
            if (_active)
            {
                return true;
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
                    this.vars.onStart.apply(this.vars.onStartScope, this.vars.onStartParams);
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

        public function render(param1:uint) : void
        {
            var _loc_2:Number = NaN;
            var _loc_3:Number = NaN;
            var _loc_4:Object = null;
            var _loc_5:int = 0;
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
                complete(true);
            }
            return;
        }// end function

        protected function easeProxy(param1:Number, param2:Number, param3:Number, param4:Number) : Number
        {
            return this.vars.proxiedEase.apply(null, arguments.concat(this.vars.easeParams));
        }// end function

        public function complete(param1:Boolean = false) : void
        {
            if (!param1)
            {
                if (!_initted)
                {
                    initTweenVals();
                }
                this.startTime = _curTime - this.duration * 1000;
                render(_curTime);
                return;
            }
            if (typeof(this.vars.autoAlpha) == "number" && this.target.alpha == 0)
            {
                this.target.visible = false;
            }
            if (this.vars.onComplete != null)
            {
                this.vars.onComplete.apply(this.vars.onCompleteScope, this.vars.onCompleteParams);
            }
            removeTween(this);
            return;
        }// end function

        public static function easeOut(param1:Number, param2:Number, param3:Number, param4:Number) : Number
        {
            var _loc_5:* = param1 / param4;
            param1 = param1 / param4;
            return (-param3) * _loc_5 * (param1 - 2) + param2;
        }// end function

        public static function frameProxy(param1:Object) : void
        {
            param1.info.target.gotoAndStop(Math.round(param1.target.frame));
            return;
        }// end function

        public static function removeTween(param1:TweenLite = null) : void
        {
            if (param1 != null && _all[param1.target] != undefined)
            {
                delete _all[param1.target][param1];
            }
            return;
        }// end function

        public static function killTweensOf(param1:Object = null, param2:Boolean = false) : void
        {
            var _loc_3:Object = null;
            var _loc_4:* = undefined;
            if (param1 != null && _all[param1] != undefined)
            {
                if (param2)
                {
                    _loc_3 = _all[param1];
                    for (_loc_4 in _loc_3)
                    {
                        
                        _loc_3[_loc_4].complete(false);
                    }
                }
                delete _all[param1];
            }
            return;
        }// end function

        public static function delayedCall(param1:Number, param2:Function, param3:Array = null, param4 = null) : TweenLite
        {
            return new TweenLite(param2, 0, {delay:param1, onComplete:param2, onCompleteParams:param3, onCompleteScope:param4, overwrite:false});
        }// end function

        public static function from(param1:Object, param2:Number, param3:Object) : TweenLite
        {
            param3.runBackwards = true;
            return new TweenLite(param1, param2, param3);
        }// end function

        public static function executeAll(event:Event = null) : void
        {
            var _loc_2:uint = 0;
            var _loc_3:Dictionary = null;
            var _loc_4:Object = null;
            var _loc_5:Object = null;
            var _loc_6:* = getTimer();
            _curTime = getTimer();
            _loc_2 = _loc_6;
            if (_listening)
            {
                _loc_3 = _all;
                for each (_loc_4 in _loc_3)
                {
                    
                    for (_loc_5 in _loc_4)
                    {
                        
                        if (_loc_4[_loc_5] != undefined && _loc_4[_loc_5].active)
                        {
                            _loc_4[_loc_5].render(_loc_2);
                        }
                    }
                }
            }
            return;
        }// end function

        public static function volumeProxy(param1:Object) : void
        {
            param1.info.target.soundTransform = param1.target;
            return;
        }// end function

        public static function killGarbage(event:TimerEvent) : void
        {
            var _loc_2:uint = 0;
            var _loc_3:Boolean = false;
            var _loc_4:Object = null;
            var _loc_5:Object = null;
            var _loc_6:Object = null;
            _loc_2 = 0;
            for (_loc_4 in _all)
            {
                
                _loc_3 = false;
                for (_loc_5 in _all[_loc_4])
                {
                    
                    _loc_3 = true;
                    break;
                }
                if (!_loc_3)
                {
                    delete _all[_loc_4];
                    continue;
                }
                _loc_2 = _loc_2 + 1;
            }
            if (_loc_2 == 0)
            {
                _timer.removeEventListener("timer", killGarbage);
                _timer.stop();
                _listening = false;
            }
            return;
        }// end function

        public static function tintProxy(param1:Object) : void
        {
            var _loc_2:Number = NaN;
            var _loc_3:Number = NaN;
            var _loc_4:Object = null;
            var _loc_5:Object = null;
            _loc_2 = param1.target.progress;
            _loc_3 = 1 - _loc_2;
            _loc_4 = param1.info.color;
            _loc_5 = param1.info.endColor;
            param1.info.target.transform.colorTransform = new ColorTransform(_loc_4.redMultiplier * _loc_3 + _loc_5.redMultiplier * _loc_2, _loc_4.greenMultiplier * _loc_3 + _loc_5.greenMultiplier * _loc_2, _loc_4.blueMultiplier * _loc_3 + _loc_5.blueMultiplier * _loc_2, _loc_4.alphaMultiplier * _loc_3 + _loc_5.alphaMultiplier * _loc_2, _loc_4.redOffset * _loc_3 + _loc_5.redOffset * _loc_2, _loc_4.greenOffset * _loc_3 + _loc_5.greenOffset * _loc_2, _loc_4.blueOffset * _loc_3 + _loc_5.blueOffset * _loc_2, _loc_4.alphaOffset * _loc_3 + _loc_5.alphaOffset * _loc_2);
            return;
        }// end function

        public static function to(param1:Object, param2:Number, param3:Object) : TweenLite
        {
            return new TweenLite(param1, param2, param3);
        }// end function

    }
}
