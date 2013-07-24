﻿/*
*工具模块
*/
KISSY.add("Project/Tool",function(S,Str){
    var Tool = {};
    
    Tool.Str = Str;
    
    return Tool;    
},{
    requires:["Project/Tool/Str"]
});
/*
*字符串处理工具
*方法：FormatDateTime（时间字符串格式化）
       PingY（中文字符转拼音）
*/
KISSY.add("Project/Tool/Str",function(S,FormatDateTime,PingY){
    var Str = {};
    
    Str.FormatDateTime = FormatDateTime;
    Str.PingY = PingY;
    
    return Str;
},{
	requires: [
		"Project/Tool/Str/FormatDateTime",
		"Project/Tool/Str/PingY"
	]
})
/*
*格式化时间字符串
*参数：FomatString（格式化模板）例如："yyyy-MM-dd"
       DateTimeString（时间）   可以是时间字符串或者Date类型 
*返回值：格式化时间字符串
*/
KISSY.add("Project/Tool/Str/FormatDateTime",function(S){
	var $ = S;
	return function(FomatString,DateTimeString){
        var DateObj = new Date();
        if($.type(DateTimeString) == "string") {
            DateObj = new Date(DateTimeString);
        }
        if($.type(DateTimeString) == "date") {
            DateObj = DateTimeString;
        }
        var o = {        
          "M+": DateObj.getMonth()+1, //月份        
          "d+": DateObj.getDate(), //日        
          "h+": DateObj.getHours()%12 == 0 ? 12 : DateObj.getHours()%12, //小时                 
          "H+": DateObj.getHours(), //小时        
          "m+": DateObj.getMinutes(), //分        
          "s+": DateObj.getSeconds(), //秒        
          "q+": Math.floor((DateObj.getMonth()+3)/3), //季度        
          "S": DateObj.getMilliseconds() ,//毫秒 
          "tt": DateObj.getHours() < 12 ? "\u4e0a\u5348" : "\u4e0b\u5348"//上午下午        
        };        
        var week = {        
          "0": "\u65e5",        
          "1": "\u4e00",        
          "2": "\u4e8c",        
          "3": "\u4e09",        
          "4": "\u56db",        
          "5": "\u4e94",        
          "6": "\u516d"       
        };        
        if(/(y+)/.test(FomatString)) {        
            FomatString=FomatString.replace(RegExp.$1, (DateObj.getFullYear()+"").substr(4 - RegExp.$1.length));        
        }        
        if(/(E+)/.test(FomatString)) {        
            FomatString=FomatString.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[DateObj.getDay()+""]);        
        }        
        for(var k in o) {        
            if(new RegExp("("+ k +")").test(FomatString)){        
                FomatString = FomatString.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));        
            }        
        }        
        return FomatString;        
    };
	
})
/*
*中文字符转拼音
参数：PingYString（中文字符）
返回值：拼音字符串
*/
KISSY.add("Project/Tool/Str/PingY",function(S){
    var a = "\u5416\u54ce\u5b89\u80ae\u51f9\u516b\u6300\u6273\u90a6\u52f9\u9642\u5954\u4f3b\u7680\u8fb9"
           + "\u706c\u618b\u6c43\u51ab\u7676\u5cec\u5693\u5072\u53c2\u4ed3\u64a1\u518a\u5d7e\u564c\u53c9"
           + "\u72b2\u8fbf\u4f25\u6284\u8f66\u62bb\u9637\u5403\u5145\u62bd\u51fa\u8197\u5ddb\u5205\u5439"
           + "\u65fe\u8e14\u5472\u4ece\u51d1\u7c97\u6c46\u9569\u8e7f\u5d14\u90a8\u6413\u5491\u5446\u4e39"
           + "\u5f53\u5200\u6074\u63fc\u706f\u4efe\u55f2\u6541\u5201\u7239\u4e01\u4e1f\u4e1c\u543a\u5262"
           + "\u8011\u53fe\u5428\u591a\u59b8\u5940\u97a5\u4ed2\u53d1\u5e06\u531a\u98de\u5206\u4e30\u8985"
           + "\u4ecf\u57ba\u592b\u65ee\u4f85\u5e72\u5188\u768b\u6208\u7ed9\u6839\u66f4\u5de5\u52fe\u4f30"
           + "\u74dc\u4e56\u5173\u5149\u5f52\u4e28\u5459\u598e\u548d\u516f\u592f\u8320\u8bc3\u9ed2\u62eb"
           + "\u4ea8\u4e4a\u53ff\u9f41\u4e4e\u82b1\u6000\u6b22\u5ddf\u7070\u660f\u5419\u4e0c\u52a0\u620b"
           + "\u6c5f\u827d\u9636\u5dfe\u5755\u5182\u4e29\u51e5\u59e2\u5658\u519b\u5494\u5f00\u520a\u5ffc"
           + "\u5c3b\u533c\u808e\u52a5\u7a7a\u5ee4\u625d\u5938\u84af\u5bbd\u5321\u4e8f\u5764\u6269\u5783"
           + "\u6765\u5170\u5577\u635e\u4ec2\u96f7\u5844\u550e\u4fe9\u5afe\u7c17\u8e7d\u54a7\u53b8\u4f36"
           + "\u6e9c\u54af\u9f99\u5a04\u565c\u9a74\u5b6a\u63a0\u62a1\u634b\u5638\u5988\u57cb\u989f\u7264"
           + "\u732b\u5e85\u5445\u691a\u63b9\u8e0e\u5b80\u55b5\u4e5c\u6c11\u540d\u8c2c\u6478\u54de\u67d0"
           + "\u6bcd\u62cf\u8149\u56e1\u56d4\u5b6c\u7592\u5a1e\u5ae9\u83bb\u59ae\u62c8\u5a18\u9e1f\u634f"
           + "\u810c\u5b81\u599e\u519c\u7fba\u5974\u5973\u759f\u597b\u7878\u5662\u5991\u62cd\u7705\u4e53"
           + "\u629b\u5478\u55b7\u5309\u4e15\u7247\u527d\u6c15\u59d8\u4e52\u948b\u5256\u4ec6\u4e03\u6390"
           + "\u5343\u545b\u6084\u5207\u4eb2\u9751\u5b86\u4e18\u533a\u5cd1\u7094\u590b\u4ebd\u5465\u7a63"
           + "\u835b\u60f9\u4eba\u6254\u65e5\u620e\u53b9\u5dbf\u5827\u6875\u95f0\u633c\u4ee8\u6be2\u4e09"
           + "\u6852\u63bb\u8272\u6740\u7b5b\u5c71\u4f24\u5f30\u5962\u7533\u5347\u5c38\u53ce\u4e66\u5237"
           + "\u8870\u95e9\u53cc\u8c01\u5981\u53b6\u5fea\u51c1\u82cf\u72fb\u590a\u5b59\u5506\u4ed6\u56fc"
           + "\u574d\u6c64\u4ed0\u5fd1\u81af\u5254\u5929\u65eb\u6017\u5385\u56f2\u5077\u51f8\u6e4d\u63a8"
           + "\u541e\u4e47\u5c72\u6b6a\u4e5b\u5c23\u5371\u586d\u7fc1\u631d\u4e4c\u5915\u5477\u4ed9\u4e61"
           + "\u7071\u4e9b\u5fc4\u5174\u51f6\u4f11\u620c\u5405\u75b6\u5743\u4e2b\u54bd\u592e\u5e7a\u503b"
           + "\u81b6\u4e00\u4e5a\u5e94\u54df\u4f63\u4f18\u625c\u56e6\u66f0\u8480\u5e00\u707d\u5142\u7242"
           + "\u50ae\u556b\u8d3c\u600e\u66fd\u5412\u5908\u6cbe\u5f20\u4f4b\u8707\u8d1e\u51e7\u4e4b\u4e2d"
           + "\u5dde\u6731\u6293\u62fd\u4e13\u5986\u96b9\u5b92\u5353\u4ed4\u5b56\u5b97\u90b9\u79df\u5297\u539c\u5c0a\u6628".split(""), 
           b = "AAiAnAngAoBaBaiBanBangBaoBeiBenBengBiBianBiaoBieBinBingBoBuCaCaiCanCangCaoCeCenCengChaChaiChanChangChaoCheChenChengChiChongChouChuChuaiChuan"
           + "ChuangChuiChunChuoCiCongCouCuCuanChuanCuanCuiCunCuoDaDaiDanDangDaoDeDenDengDiDiaDianDiaoDieDingDiuDongDouDuDuanDuiDunDuoEEnEngErFaFanFangFeiFen"
           + "FengFiaoFoFouFuGaGaiGanGangGaoGeGeiGenGengGongGouGuGuaGuaiGuanGuangGuiGunGuoHaHaiHanHangHaoHeHeiHenHengHoHongHouHuHuaHuaiHuanHuangHuiHunHuoJiJia"
           + "JianJiangJiaoJieJinJingJiongJiuJuJuanJueJunKaKaiKanKangKaoKeKenKengKongKouKuKuaKuaiKuanKuangKuiKunKuoLaLaiLanLangLaoLeLeiLengLiLiaLianLiangLiaoLie"
           + "LinLingLiuLoLongLouLuLvLuanLveLunLuoMMaMaiManMangMaoMeMeiMenMengMiMianMiaoMieMinMingMiuMoMouMeiMuNaNaiNanNangNaoNeNeiNenNNiNianNiangNiaoNieNinNing"
           + "NiuNongNouNuNvNveNuanNuoOuPaPaiPanPangPaoPeiPenPengPiPianPiaoPiePinPingPoPouPuQiQiaQianQiangQiaoQieQinQingQiongQiuQuQuanQueQunRaRanRangRaoReRenReng"
           + "RiRongRouRuRuanRuiRunRuoSaSaiSanSangSaoSeShaShaiShanShangShaoSheShenShengShiShouShuShuaShuaiShuanShuangShuiShuoSiSongSouSuSuanSuiSunSuoTaTaiTanTangTao"
           + "TeTengTiTianTiaoTieTingTongTouTuTuanTuiTunTuoWaWaiWanWangWeiWenWengWoWuXiXiaXianXiangXiaoXieXinXingXiongXiuXuXuanXueXunYaYanYangYaoYeYenYiYinYingYoYong"
           + "YouYuYuanYueYunZaZaiZanZangZaoZeZeiZenZengZhaZhaiZhanZhangZhaoZheZhenZhengZhiZhongZhouZhuZhuaZhuaiZhuanZhuangZhuiZhunZhuoZaiZiZongZouZuZuanZuiZunZuo".split(/(?=[A-Z])/g), 
           c = {}, d = a.length - 1;

    return function PingY(PingYString) {
        if (f.length > 1) {
            for (var g = "", h = 0; h < f.length; h++)
                g += e(f.charAt(h));
            return g
        }
        if (!/[\u4e00-\u9fa5]/.test(f))
            return f;
        if (c[f])
            return c[f];
        for (var i = 0, j = d; j >= i; ) {
            var k = Math.floor((i + j) / 2);
            f.localeCompare(a[k]) < 0 ? j = k - 1 : i = k + 1
        }
        return c[f] = b[j]
    }
})