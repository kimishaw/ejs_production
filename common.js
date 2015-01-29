/**
 * Created by shaokaiming on 14-4-25.
 * 通用函数.
 */
var $ = window.$;
window.com = common = {
    UA : window.navigator.userAgent,
    toString : {}.toString,
    isFunction: function (it) {
        return com.toString.call(it) == "[object Function]";
    },
    isString: function (it) {
        return com.toString.call(it) == "[object String]";
    },
    isArray: function (it) {
        return com.toString.call(it) == "[object Array]";
    },
    isObject: function (it) {
        return com.toString.call(it) == "[object Object]";
    },
    render: function (source, data, dest) {
        dest = dest ? dest : source + "Dest";
        new EJS({element: source}).update(dest, {md: data});
    },
    getRender: function (source, data) {
        return new EJS({element: source}).render({md: data});
    },
    renderByUrl:function(url,data,dest){
        url = 'tpl/'+url+'.ejs?v='+Date.now();
        var html = new EJS({url: url}).render({md: data});
        dest ='#'+dest+'Dest';
        $(dest).html(html);
    },
    /**
     * 弹出警告
     * @param config
     */
    alert: function (text,config) {
        config = config || {};

        if (config.className) {
            config.className += ' alert'
        } else {
            config.className = 'alert';
        }

        if(!config.tpl){
            config.url='alert';
        }

        config.content=text;


        dialog(config);
    },
    gather: {},
    queryArray: [],
    getParam: function (name) {
        if (!name) {
            return false;
        }

        if (this.queryArray.length) {
            return this.queryArray[name];
        } else {
            var href = window.location.href;
            href = href.replace(/#[^&]*$/, '');//去除锚点

            var reg = /\?(.+)/,
                m = href.match(reg);

            if (m && m[1]) {
                var s = m[1].split('&');
                for (a in s) {
                    var b = s[a].split('='),
                        k = b[0],
                        v = b[1];

                    this.queryArray[k] = v;
                }

                return this.queryArray[name];

            } else {
                return '';
            }
        }
    },
    isPhoneNum:function(val){
        if(!/^1\d{10}$/.test(val)){
            return false;
        }else{
            return true;
        }
    },
    isIpad:function(){
        return com.os.ipad.test(com.UA);
    },
    isIphone:function(){
       return  com.os.iphone.test(com.UA);
    },
    isIos:function(){
        return (this.isIpad() || this.isIphone());
    },
    isAndroid:function(){
        return com.os.android.test(com.UA);
    },
    isMobile:function(){
        return (this.isIos() || this.isAndroid());
    },
    isWeiXin: function(){
        if(/MicroMessenger/.test(com.UA)){
            return true;
        }else{
            return false;
        }
    },
    isQQ:function() {
        return (/QQ/i.test(common.UA));
    },
    isUC: function(){
        if(/UCBrowser/.test(com.UA)){
            return true;
        }else{
            return false;
        }
    },
    getDeviceWidth: function() {
        return window.innerWidth||document.documentElement.clientWidth;
    },
    downloadUrls: {
        koudai:'http://a.app.qq.com/o/simple.jsp?pkgname=com.geili.koudai&g_f=996608',
        banjia:'http://a.app.qq.com/o/simple.jsp?pkgname=com.chunfen.brand5&g_f=991653',
        wdBuyer:'http://a.app.qq.com/o/simple.jsp?pkgname=com.koudai.weidian.buyer',
        haidai:'http://a.app.qq.com/o/simple.jsp?pkgname=com.koudai.haidai'
    },
    protocols: {
        koudai: 'ishopping2://?',
        banjia: 'jinribanjia://?',
        wdBuyer: 'weidianbuyer://?',
        haidai: 'dgxc://?'
    },
    openApp : function (config, appName) {
        var appUrl = '', h5url = '';
        if (appName != 'koudai' && appName != 'banjia') {
            //alert('appName参数不匹配');
            return false;
        }
        if (config['search']) {
            appUrl = this.protocols[appName] + config['search'];
        }
        h5url = config['h5'] || this.downloadUrls[appName];
        if (!/platH5/i.test(window.location.search)) {
            window.location.href = appUrl;
        } else {
            this.openAppIframe(appUrl);
            setTimeout(function () {
                window.location.href = h5url;
            }, 500);
        }
    },
    openAppIframe: function (src) {
        var iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = src;
        document.body.appendChild(iframe);
    },
    jsonp: function(src) {
        var script=document.createElement('script');
        script.setAttribute('src', src);
        document.body.appendChild(script);
    }
};