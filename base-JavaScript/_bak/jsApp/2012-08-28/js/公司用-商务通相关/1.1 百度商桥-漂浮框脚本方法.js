/*邀请框“在线咨询”按钮点击事件*/
function(){
	var p = {}, o = {};
	p.subid = b.inviteSubid;
	p.groupid = b.inviteGroupId;
	p.groupname = b.inviteGroupName;
	p.subname = b.inviteSubname;
	if (d.__detecSub()) {
		BDBridge.Lib.webim.accept(p);
		if (b.manualInvited == 1) {
			var m = j.HOLMES_REPORT_URL;
			d._reportInvite(m)
		}
	} else {
		var n = BDBridge.invite.__getHandleList();
		if (n && n.length > 0) {
			for (var l in n) {
				n[l]("")
			}
		}
	}
	BDBridge.invite.__hide();
	BDBridge.invite.__doClear();
}

/*邀请框“稍后再说”按钮点击事件*/
function bridgeInviteClose(){ BDBridge.invite.__ignore(); }

/*邀请框“关闭”按钮点击事件*/
function (p){var p=p||window.event;if(p.stopPropagation){p.stopPropagation()}else{p.cancelBubble=true}BDBridge.Lib.stopDefault(p);bridgeInviteClose()}

/*漂浮框点击事件*/
function(){ k._bridgeClick(); }