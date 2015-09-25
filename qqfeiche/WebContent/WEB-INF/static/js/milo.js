/**
 * @author cathzhang 
 * @version 0.1.0.0 
 * @date 2011-05-12 
 * @demo http://gameact.qq.com/milo/core/base.html
 * @class milo.base  
 * <p>
 * 方法集主要包括：namespace、extend相关方法、is判断对象系列<br/>
 * 本类中所有方法被绑定到window对象中，可直接对方法名进行调用。<br/>
 * </p>
 * <p>
 * Example code:
 * <pre><code>
var a;
console.log(isUndefined(a));    //true
var b= new Array(1,2);
console.log(isUndefined(b));    //false
console.log(isUndefined(b[4])); //true
 *</code></pre>
 * </p>
 * <p>
 * 创建子类：
 * <pre><code>
var cal1 = cloneClass(Calendar);
var cal2 = cloneClass(Calendar);
 * </code></pre>
 * </p> 
 */
 
/**
 * 处理命名空间
 * @param {string} 空间名称，可多个 
 * @return {object} 对象
 */	 
namespace = function(){
    var argus = arguments;
    for(var i = 0; i < argus.length; i++){
        var objs = argus[i].split(".");
		var obj = window;
        for(var j = 0; j < objs.length; j++){
            obj[objs[j]] = obj[objs[j]] || {};
            obj = obj[objs[j]];
        }
    }
    return obj;
};

namespace("milo.base");

(function(){
	/**
	 * 为对象进行扩展属性和方法
	 * @param {object} object 对象
	 * @return {bool} 是/否
	 */	 
	milo.base.extend = function(destination, source) {
		if (destination == null) {
			destination = source
		}
		else {
			for (var property in source){		
				if ( getParamType(source[property]).toLowerCase() === "object" && 
					getParamType(destination[property]).toLowerCase() === "object" )
						extend(destination[property], source[property])
				else
					destination[property] = source[property];
			}
		}
		return destination;
	}
	
	milo.base.extendLess = function(destination, source) {
		var newopt = source;
		for (var i in destination) {
			if (isObject(source) && typeof(source[i]) != 'undefined') {
				destination[i] = newopt[i]
			}
		}
		return destination
	}
	
	/**
	 * 类式继承类
	 * @param {object} subClass 子类
	 * @param {object} superClass 基础类
	 * @return {undefined} 
	 */	
	milo.base.extendClass = function(subClass,superClass){
		var F = function(){};
		F.prototype = superClass.prototype;
		subClass.prototype = new F();
		subClass.prototype.constructor = subClass;
		subClass.superclass = superClass.prototype;
		if (superClass.prototype.constructor == Object.prototype.constructor){
			superClass.prototype.constructor = superClass
		}
	}
	
	/**
	 * 原型继承类
	 * @param {object} object 基类
	 * @return {object} 生成的子类
	 */	 
	milo.base.cloneClass = function(object){		
		if(!isObject(object)) return object;
		if(object == null) return object;
		var F = new Object();
		for(var i in object)
			F[i] = cloneClass(object[i]);
		return F; 		
	}
	/**
	 * 绑定上下文
	 * @param {function,context} object
	 * @return {object}
	 */	 
	milo.base.bind = function(fn,context){		
		 return function(){
			 return fn.apply(context,arguments);
		 };		
	}

	milo.base.extend( milo.base, {
		/**
		 * 判断对象是否定义
		 * 其实只对对象中的元素判断有效，如是纯变量，此方法会无法调用，需要外面加try
		 * @param {object} object 对象
		 * @return {bool} 是/否
		 */
		isUndefined : function(o){ 
    		 	return o === undefined && typeof o == "undefined";
    	},
		/**
		 * 判断对象是否数组
		 * @param {object} object 对象
		 * @return {bool} 是/否
		 */
		isArray : function(obj) {
			return getParamType(obj).toLowerCase() === "array";
		},		
		/**
		 * 判断对象是否函数
		 * @param {object} object 对象
		 * @return {bool} 是/否
		 */
		isFunction : function(obj){
			return getParamType(obj).toLowerCase() === "function";
		},		
		/**
		 * 判断对象是否对象
		 * @param {object} object 对象
		 * @return {bool} 是/否
		 */
		isObject : function(obj) {
			return getParamType(obj).toLowerCase() === "object";
		},
		/**
		 * 判断对象是否数值
		 * @param {object} object 对象
		 * @return {bool} 是/否
		 */
		isNumber : function(obj) {
			return getParamType(obj).toLowerCase() === "number";
		},
		/**
		 * 判断对象是否字符串
		 * @param {object} object 对象
		 * @return {bool} 是/否
		 */
		isString : function(obj) {
			return getParamType(obj).toLowerCase() === "string";
		},
		/**
		 * 判断是否布尔值
		 * @param {object} object 对象
		 * @return {bool} 是/否
		 */
		isBoolean : function(obj) {
			return getParamType(obj).toLowerCase() === "boolean";
		},
		/**
		 * 判断对象是否日期
		 * @param {object} object 对象
		 * @return {bool} 是/否
		 */
		isDate : function(obj){
			return getParamType(obj).toLowerCase() === "date";
		},
		
		/**
		 * 判断对象是否DOM元素
		 * @param {object} obj DOM对象
		 * @return {bool} 是/否
		 */
		isDom : function(obj){
    		try{
    			return obj && typeof obj === "object" && !isUndefined(obj.nodeType) && obj.nodeType==1 && !isUndefined(obj.nodeName) && typeof obj.nodeName == "string";
    		}
    		catch(e){
    			//console.log(e)
    			return false;
    		}
    	},
    	
		/**
		 * 获取DOM对象的值
		 * @param {object} obj DOM对象
		 * @return {string} 取value或innerHTML
		 */
    	getDomVal : function(obj){
    		return obj.value || obj.innerHTML;
    	},
		/**
		 * 索引序列
		 * @param {serial,function} 数组或对象集合
		 * @return {undefined}
		 */
    	forEach : function(haystack, callback) {
			var i = 0,
				length = haystack.length,
				name;

			if (length !== undefined) {
				for (; i < length;) {
					if (callback.call(haystack[i], i, haystack[i++]) === false) {
						break;
					}
				}
			} else {
				for (name in haystack) {
					callback.call(haystack[name], name, haystack[name]);
				}
			}
		},
    	/**
		 * 获取dom对象
		 * @param {string|dom} dom的id或对象k
		 * @return {dom} 
		 */
		g : function(obj){
			return (typeof obj=='object')?obj:document.getElementById(obj);
		}
	});
	
	/**
	 * 获取对象类型
	 * @private
	 * @param {object} object 对象
	 * @return {string} 类型
	 * 可判断类型：Boolean Number String Function Array Date RegExp Object
	 */	
	function getParamType(obj){
		return obj == null ? String(obj) : 
			Object.prototype.toString.call(obj).replace(/\[object\s+(\w+)\]/i,"$1") || "object";
	}	
})();

milo.base.extend(window, milo.base); 
/**
 * @author cathzhang
 * @version 0.1.0.0
 * @date 2011-11-21
 * @class milo.config
 * 通用配置设置
 */

namespace("milo.config");

(function(){
	var config = {
		loaderPath : "http://ossweb-img.qq.com/images/js/milo/",//
		version : "20130701",
		expires : 30000
	}
	extend(milo.config, config);
})();
/**
 * @author cathzhang
 * @version 0.1.0.0 
 * @date 2011-05-12  
 * @class milo.loader
 * 按需加载js/css的基础模块<br/>
 * 本类中所有方法被绑定到window对象中，可直接对方法名进行调用。<br/>
 * modified by cathzhang on 2011-08-11 <br/>
 * modified content 优化了loadscript方法使之可被独立调用<br/>
 * ajax跨域问题尚未解决（暂不处理）<br/>
 * includer对象的parent及dep属性总是看不太顺眼（modified on 2011-10-10 卖萌日啊）<br/>
 * modified by cathzhang on 2011-10-11 <br/>
 * modified content 调整模块化调用方案 <br/> 
 * <p>
 * 加载person类:
 * <pre><code>
need(["person"], function(person){
	alert("name:" + person.name);
});
 *</code></pre>
 * </p>
 * <p>
 * person类的定义：(直接返回匿名对象)
 * <pre><code>
define({
	name : 'angel',
	age : 1000
});
 * </code></pre>
 * </p>
 * <p>
 * person类的定义完整写法：
 * <pre><code>
define('person',[], function(){
	return {
		name : 'angel',
		age : 1000
	}
});
 * </code></pre>
 * </p>
 * <p>
 * 定义模块类有依赖的时候：
 * <pre><code>
define(["animal"],function(animal) {
        return {
			paw : animal.paw,
			play : function() {
				animal.play();
                return "miao";
            },
            eat: function() {
                console.log("fish");
            }
        }
    }
);

TODO:
//	var $ = require('lib/jquery');
//	var LOG = require('./log');
milo的加载可以考虑这种情况
第一行调用库的url，第二行调用当前脚本/页面的相对url


 * </code></pre>
 * </p>
 * <p>
 * 各模块的路径会定义到：<b>http://ossweb-img.qq.com/images/js/milo/biz</b>
 * </p>
 * @demo http://gameact.qq.com/milo/core/load.html
 */
 
 
namespace("milo.loader");

(function(loader){	
	var __loading = null,
		loaded = {}, //是否下载
		loading = {}, //正在下载  下载前就建立，以处理同时多次请求，但此处写了，就对不住loaded了，需重构
		queue = [],  //define的deps队列 
		modulemap = {};//加载队列	
		charset = "gb2312";
	loader.set = function(obj){
		charset = obj.charset;		
	}
	/**
	 * 加载对象方法 对应模块需有define方法定义，否则返回中无法使用
	 * @param {array} modules 模块名称 
	 * @param {function} callback 回调 回调方法中的参数为加载模块的返回
	 * @return {undefined} undefined 
	 */
	loader.need = function(modules,callback){
		//参数不作长度判断，由回调时自动对应，如多则undefined，如缺则无法使用
		//**如callback不是function或不存在则不进行回调
		//**modules只作数组判断。
		if (!isArray(modules) ) { 
			modules = new Array(modules)
        } 
		
		var mc = moduleContainer("", modules, callback);
		start(mc);
		//**考虑是否增咖中间过渡层，以增加通用性及可移值性
		//**下一期考虑扩展，允许本方法return得到一个对象，以直接使用对象的方法（talk）
		//**确实，需要如var myobj = need("....");这样的形式
		return undefined;
	}
	
	/**
	 * 模块定义方法
	 * @param {string} name 下载对象
	 * @param {array} modules 下载对象
	 * @param {function} callback 下载对象
	 * @return {undefined} undefined 
	 */
	loader.define = function(name,deps,callback){
		//无name参数时从文件名取name（urlcb回调中处理）
		//无deps，则[]		
		if (!isString(name)){
			callback = deps;
			deps = name;			
			name = null;			
		}
		
		if (!isArray(deps)){
			callback = deps;
			deps = [];
		}	

		//**callback非function 为object时，直接为name返回object（cb回调中）
		queue.push([name, deps, callback]);
		return undefined;
	}
	
	//jquery支持
	loader.define.amd = {
        //multiversion: true,
        //plugins: true,
        jQuery: true
    };
	
	/**
	 * 加载文件方法(多个文件)
	 * 适合进行跨域请求
	 * @public
	 * @param {array} filepaths 需要加载脚本
	 * @param {function} callback 回调方法中带有一参数表明加载是否成功。
	 * @return {undefined} 无
	 */
	loader.include = function(filepaths, callback){
		//refactoring
		//filepaths && deps对于类型需要增加判断string形式并相应处理
		var files = new Array();
		files = files.concat(filepaths);
		if (!isFunction(callback)) {callback = function(){}}
		var ic = includerContainer(files, callback);
		start(ic);
	}
	
	/**
	 * 加载脚本基础方法（单一文件）
	 * @param {string} url 路径 url路径不做任何验证
	 * @param {function} callback 回调方法  方法参数表明是否加载成功
	 * @return {undefined} undefined 
	 */
	loader.loadScript = function(url, callback){
		if (!isFunction(callback)) callback = function(){};
		loadScript(url, callback);
	}
	
	/**
	 * 加载CSS基础样式 
	 * @param {string} url 路径 url如以http开头，则按模块名相同规则，添加path及css，如不是css结尾，则不予加载
	 * @param {function} callback 回调方法  方法参数表明是否加载成功
	 * @return {undefined} undefined 
	 */
	loader.loadCSS = function(url, callback){
		if (url.search(/^http:\/\//i) == -1){
			url = milo.config.loaderPath + url.replace(/\./g, "index.html") + ".css"
					 + "?" + milo.config.version; 
		}
		var isCSS = /\.css(\?|$)/i.test(url);		
		if (!isFunction(callback)) callback = function(){};
		if (isCSS & !loaded[url]) {
			loadCSS(url, callback);
			loaded[url] = true;
		}
	}
	
	/**
	 * 内容加载器
	 * @private
	 * @param {string} name 下载名称
	 * @param {array} modules 依赖模块对象
	 * @param {function} callback 回调方法
	 * @return {object} object 
	 * 每一个命令对需要下载的文件即增加一个加载器
	 */
	function moduleContainer(name, modules, callback){	
		var needown = 0,
			hasdown = 0,
			hasmaped = 0,
			need = {};
		for(var i=0 ; i < modules.length; i++){
			var url = getModulePath(modules[i]);
			needown ++;
			modules[i] = modules[i].replace(/\//g, ".");
			//已下载过的模块进行处理，表明已下载
			//但不处理maped情况，由回调统一处理			
			if (loaded[modules[i]] || loading[modules[i]]) {
				hasdown ++;
				continue;
			}
			need[modules[i]] = url;			
		}

		return {
			name : name, //模块名
			modules : modules, //依赖模块名
			need : need,   //依赖对象数组(用于load下载)
			res : new Array(), //依赖对象结果 结果集
			//对于对象的时间处理还需要调整
			expires : (modules.length) * milo.config.expires, //过期时间
			callback : callback, //模块加载完成后的回调
			needown : needown,  //需要下载数
			hasdown : hasdown,	//已下载数
			hasmaped : hasmaped, //已成功定义数

			/**
			 * 单文件下载成功后回调
			 * @private
			 * @param {bool} ret 下载情况
			 * @param {string} name 模块名称
			 * @return {undefined} undefined 
			 * 获取文件内的define对象，创建新mc
			 */
			loadUrlCallback : function(ret, name){
				//无论是否成功都增加已下载数，表明已处理
				this.hasdown ++;	
				if(ret){					
					loaded[name] = true;
				 	while (1){
						var deps = queue.splice(0,1).pop();
						if (deps==null) {
							modulemap[name] = ret;
							break;
						}
						//**如deps名字与name名字不一致时。。。那么。。。那么。。
						if (deps[0] 
							&& deps[0].toLowerCase() != name.substr(name.lastIndexOf(".")+1).toLowerCase()
							&& deps[0].toLowerCase().indexOf(name.substr(name.lastIndexOf(".")+1).toLowerCase()) <0 
							&& name.toLowerCase().indexOf(deps[0].toLowerCase()) <0){
						}
						else{
							deps[0] = name;
							//每新建一个deps则处理					
							var mc = moduleContainer.apply(null,deps);
							start(mc);
							break;
						}
					}							
				}
				else{
					//失败提前处理结果	
					//this.res[name] = "undefined"; 	
					modulemap[name] = "undefined"; 	
				}
			},		
			
			/**
			 * mc所有文件下载成功后回调
			 * @private
			 * @param {bool} ret 下载情况
			 * @param {string} name 模块名称
			 * @return {undefined} undefined 
			 * 等待maped成功后
			 */
			loadInluderCallback : function(ret){		
				if (!ret){
					//**看失败是否可提前处理结果
					//失败处理	
					//给模块中未定义模块置为undefined
					//并置maped数量					
				}				
				this.checkMaped();
			},
			
			/**
			 * mc所有文件下载成功后回调
			 * @private
			 * @param {bool} ret 下载情况
			 * @param {string} name 模块名称
			 * @return {undefined} undefined 
			 * 等待maped成功后
			 */
			completeLoad : function(maped){	
				var ret = [];
				//**取content的deps对应查modulemap存在与否
				for(var i=0 ; i < this.modules.length; i++){
					ret.push(this.res[this.modules[i]]);
				}
				
				if (!isFunction(this.callback) && !isObject(this.callback)) return false;
				if (this.name == "")
					this.callback.apply(null,ret)
				else{	
					isObject(this.callback) 
					? modulemap[this.name] = this.callback
					: modulemap[this.name] = this.callback.apply(null,ret);
				}	
			},
			
			/**
			 * 检查是否已有maped的对象
			 * @private
			 * @return {undefined} undefined 
			 * 在限定时间内检查modulemap
			 */
			checkMaped : function(){
				//如modulemap存在maped对象，则为res添加。
				for(var i=0 ; i < this.modules.length; i++){
					if (isUndefined(this.res[this.modules[i]]) 
					  && !isUndefined(modulemap[this.modules[i]])
					  ){
						this.res[this.modules[i]] = modulemap[this.modules[i]];
						this.hasmaped ++ ;
					}
				}
				//加载完成
				if (this.hasmaped == this.needown){
					this.completeLoad.apply(this, [true]);
					return;
				}
				
				//加载超时
				if (this.hasmaped < this.needown && this.expires<=0){
					for(var i=0 ; i < this.modules.length; i++){
						if (!isObject(modulemap[this.modules[i]])){
							this.res[this.modules[i]] = "undefined";
							this.hasmaped ++ ;
						}
					}
					this.completeLoad.apply(this, [false]);
					return;
				}
								
				//继续监听
				if (this.hasmaped < this.needown  && this.expires>0){			
					this.expires = this.expires - 50;
					var mc = this
					setTimeout(
					function (){
						mc.checkMaped();
					},50);
				}			
			}
		};
	}
	
	/**
	 * load加载开始
	 * @private
	 * @param {object} mc 下载对象
	 * @return {undefined} undefined 
	 */
	function start(mc){	
		var need = mc.need;

		//for(var key=0 ; key < need.length; key++){
	    for(var key in need){
			load(need[key],key,mc);				
		}
		//检查加载状态
		checkloaded(mc);	
	}
	
	/**
	 * 下载文件
	 * @private
	 * @param {object} mc 下载对象
	 * @return {undefined} undefined 
	 */
	function load(url, name, mc){
		var isCSS = /\.css(\?|$)/i.test(url);
		loading[name] = true;
		isCSS ? loadCSS(url, function(ret){
				mc.loadUrlCallback.call(mc, [ret, name]);
			}) 
		  	: loadScript(url, function(ret){
				mc.loadUrlCallback.apply(mc, [ret, name]);
			}) ;		
	}
	
	/**
	 * 检查加载情况
	 * @private
	 * @param {object} mc 下载对象
	 * @return {undefined} undefined 
	 */
	function checkloaded(mc){
		//加载完成
		if (mc.hasdown == mc.needown){
			mc.loadInluderCallback.apply(mc, [true]);
			return;
		}
		
		//加载超时
		if (mc.hasdown < mc.needown && mc.expires<=0){
			//**不用等expires,对单个文件失败的可以提前判断
			mc.loadInluderCallback.apply(mc, [false]);
			return;
		}
		
		//继续监听
		if (mc.hasdown < mc.needown  && mc.expires>0){			
			mc.expires = mc.expires - 50;
			setTimeout(
			function (){
				checkloaded(mc);
			},50);
		}
	}
	
	/**
	 * 获取脚本路径
	 * 以http://开头的，为fullpath
	 * 其它的均视为相对路径
	 * 组合路径或模块方式考虑中
	 * @private
	 * @param {string} filepath 路径
	 * @return {string} fullpath 全局路径 
	 */
	function getModulePath(filepath){
		if (filepath.search(/^http:\/\//i) == -1){
			//var loc = window.location.href,    //extend
			//	path = loc.substr(0,loc.lastIndexOf("/"));
			//filepath = filepath.replace(/\./g, "/");
			filepath = milo.config.loaderPath + filepath.replace(/\./g, "index.html") + ".js"
					 + "?" + milo.config.version;
		}
		return filepath;
	}
	
	/**
	 * 获取模块名称
	 * 以http://开头的，为fullpath
	 * 其它的均视为相对路径
	 * 组合路径或模块方式考虑中
	 * @private
	 * @param {string} filepath 路径
	 * @return {string} fullpath 全局路径 
	 */
	function getModuleName(){
		return null;
	}
	

	/**
	 * includer内容加载器
	 * @private
	 * @param {string} name 下载名称
	 * @param {array} files 依赖模块对象
	 * @param {function} callback 回调方法
	 * @return {object} object 
	 */
	function includerContainer(files, callback){	
		var needown = 0,
			hasdown = 0,
			need = {};

		for(var i=0 ; i < files.length; i++){
			var url = getModulePath(files[i]);			
			needown ++;
			if (loaded[files[i]]) {
				hasdown ++;
				break;
			}
			need[files[i]] = url;			
		}

		return {
			files : files,
			need : need,   //依赖对象数组(用于load下载)
			res : new Array(), //依赖对象结果 结果集
			expires : needown * milo.config.expires, //过期时间
			callback : callback, //模块加载完成后的回调
			needown : needown,  //需要下载数
			hasdown : hasdown,	//已下载数

			/**
			 * 单文件下载成功后回调
			 * @private
			 * @param {bool} ret 下载情况
			 * @param {string} name 模块名称
			 * @return {undefined} undefined 
			 * 获取文件内的define对象，创建新mc
			 */
			loadUrlCallback : function(ret, name){
				if(ret)	this.hasdown ++;
				loaded[name] = ret;				
			},		
			
			/**
			 * 所有文件下载成功后回调
			 * @private
			 */
			loadInluderCallback : function(ret){
				var res = [];
				for(var i=0 ; i < this.files.length; i++){
					res.push(loaded[this.files[i]]);
				}
				this.callback.apply(null,res);
			}
		};
	}
	
	/**
	 * 加载脚本基础方法
	 * @private
	 * @param {string} filepath 路径
	 * @param {function} callback 回调方法
	 * @return {undefined} undefined 
	 */
	function loadScript(url, callback){
		var head = document.getElementsByTagName("head")[0];
		var script = document.createElement("script");			
		script.type = "text/javascript";
		script.charset = charset;
		script.src = url;
		var timeout = setTimeout(
			function (){
				head.removeChild(script);
				callback.call(this,false);	
			},
			milo.config.expires
		);
		
		onload(
			script,
			function(Ins){
				head.removeChild(script);
				clearTimeout(timeout);
				callback(true);
			}
		);
		head.appendChild(script);
		return true;
	}
	
	/**
	 * 加载样式基础方法
	 * 暂不处理加载的情况，均认为加载成功。
	 * @private
	 */
	function loadCSS(url, callback){
		var head = document.getElementsByTagName("head")[0];
		var link = head.appendChild(
			document.createElement("link")
		);
		link.href = url;
	    link.rel = 'stylesheet';
		callback.call(this,true);
	}
	
	/**
	 * 加载脚本完成后的处理
	 * @private
	 * @param {dom} node script DOM
	 * @param {function} callback 回调方法
	 * @return {undefined} undefined 
	 */
	function onload(node, callback){		
		var isImpOnLoad = ('onload' in node) ? true :
			(function(){
				node.setAttribute('onload','');
				return typeof node.onload == 'function' ; 
			})();
	
		if(document.addEventListener){
			node.addEventListener('load', function(){
				callback.call(this,node);
			}, false);	
		}
		else if (!isImpOnLoad){
			node.attachEvent ('onreadystatechange', function(){
				var rs = node.readyState.toLowerCase();
				if (rs === 'loaded' || rs === 'complete') {
					node.detachEvent('onreadystatechange');
					callback.call(this,node.innerHTML);
				}
			});
		}
		else{
			//maybe someother browser
		}
	}
	
})(milo.loader);

extend(window, milo.loader);
/**
 * @author cathzhang
 * @version 0.1.0.0 
 * @date 2011-08-01
 * @class milo.dom  
 * 本类中所有方法被绑定到milo对象中，通过对milo.方法名进行调用。<br/> 
 * modified:2011-12-27 增加tt,chrome等浏览器的判断
 * modified:2011-12-27 增加getX,getY方法
 * <p>
 * Example:
 * <pre><code>
console.log(milo.browser.version) //1.9.2.23
console.log(milo.browser.msie)    //false
 *</code></pre>
 * </p>
 */
 
namespace("milo.dom");

(function(){
var dom = milo.dom;

var userAgent = navigator.userAgent.toLowerCase();

extend( dom, {
	/**
	 * 判断浏览器类型
	 */
	browser : {
		/**
		 * 获取版本号
		 */
		version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
		/**
		 * 是否webkit浏览器
		 */
		webkit: /webkit/.test( userAgent ),
		/**
		 * 是否opera浏览器
		 */
		opera: /opera/.test( userAgent ),
		/**
		 * 是否IE浏览器
		 */
		msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
		/**
		 * 是否mozilla浏览器
		 */
		mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ),
		/**
		 * 是否TT浏览器
		 */
		tt: /tencenttraveler/.test( userAgent ),
		/**
		 * 是否chrome浏览器
		 */
		chrome: /chrome/.test( userAgent ),
		/**
		 * 是否firefox浏览器
		 */
		firefox: /firefox/.test( userAgent ),
		/**
		 * 是否safari浏览器
		 */
		safari: /safari/.test( userAgent ),
		/**
		 * 是否gecko浏览器
		 */
		gecko: /gecko/.test( userAgent ),
		/**
		 * 是否IE6
		 */
		ie6: this.msie && this.version.substr(0,1) == '6'
	
	},
	
	/**
	 * 获取dom对象
	 * @param {string|dom} dom的id或对象
	 * @return {dom} 
	 */
	g : function(obj){
		return (typeof obj=='object')?obj:document.getElementById(obj);
	},
	
	/**
	 * 判断DOM对象是否存在样式类名称
	 * @param {dom} element dom对象
	 * @param {string} className 样式名称
	 * @return {bool} 
	 */	 
	hasClassName : function(element, className) {
        var elementClassName = element.className;
        return (elementClassName.length > 0 && (elementClassName == className ||
      new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
    },
	
	/**
	 * 为DOM对象增加样式类名称
	 * @param {dom} element dom对象
	 * @param {string} className 样式名称
	 * @return {dom} 
	 */
    addClassName : function(element, className) {
        if (!milo.hasClassName(element, className))
            element.className += (element.className ? ' ' : '') + className;
        return element;
    },
	
	/**
	 * 为DOM对象删除样式类名称
	 * @param {dom} element dom对象
	 * @param {string} className 样式名称
	 * @return {dom} 
	 */
    removeClassName : function(element, className) {
        element.className = milo.trim(element.className.replace(
			new RegExp("(^|\\s+)" + className + "(\\s+|$)") , ' '));
        return element;	
    },
	
	/**
	 * 为dom对象设置样式
	 * @param {dom} ele dom对象
	 * @param {object} styles 样式对象 like:{width:100,height:100}
	 * @return undefined
	 */
	setStyle: function(ele, styles){
		for (var i in styles) {
			ele.style[i] = styles[i];
		}
	},
	
	/**
	 * 为dom对象获取选定属性的样式
	 * @param {dom} ele dom对象
	 * @param {string} prop 属性名称
	 * @return 属性样式
	 */
	getStyle: function(el, prop){
		var viewCSS = isFunction(document.defaultView) //(typeof document.defaultView == 'function') 
			? document.defaultView() 
			: document.defaultView;
		if (viewCSS && viewCSS.getComputedStyle) {
			var s = viewCSS.getComputedStyle(el, null);
			return s && s.getPropertyValue(prop);
		}
		return (el.currentStyle && (el.currentStyle[prop] || null) || null);
	},
	
	/**
	 * 获取页面最大高度
	 * @return 属性样式
	 */
	getMaxH: function(){
		return (this.getPageHeight() > this.getWinHeight() ? this.getPageHeight() : this.getWinHeight())
	},
	
	/**
	 * 获取页面最大宽度
	 * @return 属性样式
	 */
	getMaxW: function(){
		return (this.getPageWidth() > this.getWinWidth() ? this.getPageWidth() : this.getWinWidth())
	},
	
	/**
	 * 网页内容高度
	 * @return {int} 网页内容高度
	 */
	getPageHeight: function(){
		var h = (window.innerHeight && window.scrollMaxY) ? (window.innerHeight + window.scrollMaxY) : (document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight);
		return h > document.documentElement.scrollHeight ? h : document.documentElement.scrollHeight
	},
	
	/**
	 * 网页内容宽度
	 * @return {int} 网页内容宽度
	 */
	getPageWidth: function(){
		return (window.innerWidth && window.scrollMaxX) ? (window.innerWidth + window.scrollMaxX) : (document.body.scrollWidth > document.body.offsetWidth ? document.body.scrollWidth : document.body.offsetWidth);
	},
	
	/**
	 * 浏览器可视区域高度
	 * @return {int} 网可视区域高度
	 */
	getWinHeight: function(){
		return (window.innerHeight) ? window.innerHeight : 
		(document.documentElement && document.documentElement.clientHeight) 
		? document.documentElement.clientHeight 
		: document.body.offsetHeight
	},
	
	/**
	 * 浏览器可视区域宽度
	 * @return {int} 网可视区域宽度
	 */
	getWinWidth: function(){
		return (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth
	},
	
	/**
	 * 设置dom透明度
	 * @param {dom} ele dom对象
	 * @param {int} level 透明度值（0-100的整数）
	 * @return {undefined} 
	 */	
	setOpacity: function(ele, level){
		//level = Math.min(1,Math.max(level,0));
		if(this.browser.msie && (!document.documentMode || document.documentMode < 9)){
			ele.style.filter = 'Alpha(opacity=' + level + ')'
		}else{
			ele.style.opacity = level / 100
		 }
    },
	/**
	 * 获取页面中对象的绝对X位置
	 * @param {dom} e dom对象
	 * @return {int} 
	 */	
	getX: function(e) {
		var t = e.offsetLeft;
		while (e = e.offsetParent) t += e.offsetLeft;
		return t
	},
	/**
	 * 获取页面中对象的绝对Y位置
	 * @param {dom} e dom对象
	 * @return {int} 
	 */	
	getY: function(e) {
		var t = e.offsetTop;
		while (e = e.offsetParent) t += e.offsetTop;
		return t
	},
	
	/**
	 * 获取url中的参数值
	 * @param {string} pa 参数名称
	 * @return {string} 参数值
	 */	
	request: function(pa){ 
		var url = window.location.href.replace(/#+.*$/, ''),
			params = url.substring(url.indexOf("?")+1,url.length).split("&"),
			param = {} ;
		for (var i=0; i<params.length; i++){  
			var pos = params[i].indexOf('='),//查找name=value  
				key = params[i].substring(0,pos),
				val = params[i].substring(pos+1);//提取value 
			param[key] = val;
		} 
		return (typeof(param[pa])=="undefined") ? "" : param[pa];
	} 
})
})();/**
 * @author cathzhang
 * @version 0.1.0.0 
 * @date 2011-07-21
 * @demo http://gameact.qq.com/milo/core/bases.html
 * @class milo.array 
 * 方法集主体来自于原有oss_base.js中为array对象添加的部分原型方法，<br/>
 * 修改情况如下：<br/>
 * 增加方法getLength,getArrayKey,hasValue,filter,unique<br/>
 * 本类中所有方法被绑定到milo对象中，通过对milo.方法名进行调用。<br/> 
 * <p>
 * Example:
 * <pre><code>
var a=['1','2','3','4'] ;
var b=['1','2','5','23432',2] ;
alert(milo.filter(a,b))  //["3","4"] 
var c = milo.unique(a,b)
alert(c);				 //输出["3","4",'5','23432'] 
 *</code></pre>
 * </p>
 
 */
 
namespace("milo.array");

(function(){
var array = milo.array;
extend( array, {
	/**
	 * 判断数组内容个数
	 * @param {array} array 对象
	 * @return {int} 长度
	 */
	getLength : function(arr){
		var l = 0;
		for(var key in arr){
			l ++;
		}	
		return l;
	},
	/**
	 * 复制数组
	 * @param {array} array 对象
	 * @return {array} 新数组对象
	 */
	clone : function(arr){
		var a = [];
		for(var i=0; i<arr.length; ++i) {
			a.push(arr[i]);
		}
		return a;
	},
	/**
	 * 判断数组中是否存在这个值
	 * @param {array} arr 数组对象
	 * @param {object} value 对象
	 * @return {bool} 是/否
	 */
	hasValue : function(arr, value){
		var find = false;
		if (isArray(arr) || isObject(arr))
			for(var key in arr){
				if (arr[key] == value) find = true;
			}
		return find;
	},
	/**
	 * 根据值获得数组中的key
	 * @param {array} arr 数组对象
	 * @param {object} value 对象
	 * @return {string} key
	 */
	getArrayKey : function(arr, value){
		var findKey = -1;
		if (isArray(arr) || isObject(arr))
			for(var key in arr){
				if (arr[key] == value) findKey = key;
			}
		return findKey;
	},
	/**
	 * 返回a1数组有a2没有的值
	 * @param {array} a1 数组对象
	 * @param {array} a2 数组对象
	 * @return {array} key
	 */
	filter : function (a1, a2) {
		var res = [];
		for(var i=0;i<a1.length;i++) {
			if(!milo.hasValue(a2, a1[i]))
				res.push(a1[i]);
		}
		return res;
	},
	/**
	 * 两个数组的值的交集
	 * @param {array} arr 数组
	 * @param {array} arr 数组
	 * @return {array} key
	 */
	unique : function (a1, a2) {
		return milo.filter(a1,a2).concat(milo.filter(a2,a1))
	} 
});
})();/**
 * @author cathzhang
 * @version 0.1.0.0 
 * @date 2011-07-21
 * @class milo.string 字符串类
 * 方法集主体来自于原有oss_base.js中为string对象添加的原型方法<br/>
 * 修改情况如下：<br/>
 * 删除方法replaceAll：使用正则/g可以搜出全部<br/>
 * 修改方法replacePairs：调用的replaceAll方法改为用replace方法，正则方法<br/>
 * 删除方法encode：编码直接可用escape<br/>
 * 删除方法unencode：解码直接可用unescape<br/>
 * 删除方法toInputValue: 与toHTML相差不大<br/>
 * 删除方法toTextArea: 与toHTML相差不大<br/>
 * 删除方法isEmpty: 意义不大，是否需要trim后判断length，这个需要实际需要来检验<br/>
 * 更名方法isAllNum为isNumberString<br/>
 * 移除方法isInt至milo.number类<br/>
 * 移除方法isFloat至milo.number类<br/>
 * 移除方法isQQ至milo.number类<br/>
 * 本类中所有方法被绑定到milo对象中，通过对milo.方法名进行调用。<br/> 
 * <p>
 * Example:
 * <pre><code>
milo.trim(" test ")
 *</code></pre>
 * </p> 
 */
 
namespace("milo.string");

(function(){

var string = milo.string;
extend( string, {
	/**
	 * 查找字符串的字节长度<br/>
	 * 中文算2 英文算1<br/>
	 * @param {string} str 字符串
	 * @return {int}
	 */
	getByteLength : function(str){
		var bytes=0,i=0;
		for (; i<str.length; ++i,++bytes) {
			if ( str.charCodeAt(i) > 255 ) {
					++bytes;
			}
		}
		return bytes;
	},
	/**
	 * 查找有多少个双字节字符
	 * @param {string} str 字符串
	 * @return {int}
	 */
	getDwordNum : function(str){
		return string.getByteLength(str) - str.length;
	},
	/**
	 * 查找有多少个汉字字符
	 * @param {string} str 字符串
	 * @return {int}
	 */
	getChineseNum : function(str){
		return str.length - str.replace(/[\u4e00-\u9fa5]/g,"").length;
	},
	/**
	 * 截取中文字符串<br/>
	 * 取iMaxBytes 或最后一个中文字符出现的地方替换字符<br/>
	 * @param {string} str 字符串
	 * @param {int} iMaxBytes 字符串
	 * @param {string} sSuffix 替补字符串
	 * @return {string}
	 */
	cutChinese : function(str, iMaxBytes, sSuffix){
		if(isNaN(iMaxBytes)) return str;
		if(string.getByteLength(str)<=iMaxBytes) return str;
		var i=0, bytes=0;
		for (; i<str.length && bytes<iMaxBytes; ++i,++bytes) {
			if ( str.charCodeAt(i) > 255 ) {
					++bytes;
			}
		}
		sSuffix = sSuffix || "";
		return (bytes-iMaxBytes == 1 ? str.substr(0,i-1) : str.substr(0,i) ) + sSuffix;
	},
	/**
	 * 去掉字符串左边的非空字符
	 * @param {string} str 字符串
	 * @return {string}
	 */
	trimLeft : function(str){
		return str.replace(/^\s+/,"");
	},
	/**
	 * 去掉字符串右边的非空字符
	 * @param {string} str 字符串
	 * @return {string}
	 */
	trimRight : function(str){
		return str.replace(/\s+$/,"");
	},
	/**
	 * 去掉字符串左右两边的非空字符
	 * @param {string} str 字符串
	 * @return {string}
	 */
	trim : function(str){
		return milo.trimRight(milo.trimLeft(str));
	},
	/**
	 * 成对字符串替换
	 * @param {string} str 字符串
	 * @param {array} str 字符串<br/>
	      array包含两个 [0] 查找内容，[1] 替换内容<br/>
		  array可以出现多次<br/>
	 * @return {string}
	 */
	replacePairs : function(){
		var str = arguments[0];
		for (var i=1; i<arguments.length; ++i) {
			var re = new RegExp(arguments[i][0], "g"); 
			str = str.replace(re, arguments[i][1]);
		}
		return str;
	},
	/**
	 * 字符串替换为HTML编码形式
	 * @param {string} str 字符串
	 * @return {string}
	 */
	toHtml : function(str){
		var CONVERT_ARRAY =
		[
			["&", "&#38;"],
			[" ", "&#32;"],
			["'", "&#39;"], 
			["\"", "&#34;"],
			["/", "&#47;"],
			["<", "&#60;"],
			[">", "&#62;"],
			["\\\\", "&#92;"],
			["\n", "<br />"],
			["\r", ""]
		];
		return milo.replacePairs.apply(this, [str].concat(CONVERT_ARRAY));
	},
	/**
	 * 校验邮箱地址
	 * @param {string} str 字符串
	 * @return {bool}
	 */
	isMail : function(str){
		return /^(?:[\w-]+\.?)*[\w-]+@(?:[\w-]+\.)+[\w]{2,3}$/.test(str);    
	},
	/**
	 * 校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
	 * @param {string} str 字符串
	 * @return {bool}
	 */
	isTel : function(str){
		return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(str);
	},
	/**
	 * 校验手机号码：必须以数字开头
	 * @param {string} str 字符串
	 * @return {bool}
	 */
	isMobile : function(str){
		return /^1[34578]\d{9}$/.test(str);
	},
	/**
	 * 校验邮政编码
	 * @param {string} str 字符串
	 * @return {bool}
	 */
	isZipCode : function(str){
		return /^(\d){6}$/.test(str);
	},
	/**
	 * 是否身份证号码
	 * @param {string} str 字符串
	 * @return {bool}
	 */
	isIDCard : function(str){
		var C15ToC18 = function(c15) {
			var cId=c15.substring(0,6)+"19"+c15.substring(6,15);
			var strJiaoYan  =[  "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
			var intQuan =[7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			var intTemp=0;
			for(i = 0; i < cId.length ; i++)
			intTemp +=  cId.substring(i, i + 1)  * intQuan[i];  
			intTemp %= 11;
			cId+=strJiaoYan[intTemp];
			return cId; 
		}
		var Is18IDCard = function(IDNum) {
			var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
		
			var iSum=0, info="", sID=IDNum;
			if(!/^\d{17}(\d|x)$/i.test(sID)) {
				return false;
			}
			sID=sID.replace(/x$/i,"a");
		
			if(aCity[parseInt(sID.substr(0,2))]==null) {
				return false;
			}
			
			var sBirthday=sID.substr(6,4)+"-"+Number(sID.substr(10,2))+"-"+Number(sID.substr(12,2));
			var d=new Date(sBirthday.replace(/-/g,"index.html"))
			
			if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return false;
			
			for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sID.charAt(17 - i),11)
			
			if(iSum%11!=1)return false;
			return true;
		}
		
		return str.length==15 ? Is18IDCard(C15ToC18(str)) : Is18IDCard(str);
	},	
	/**
	 * 是否全部是中文
	 * @param {string} str 字符串
	 * @return {bool}
	 */
	isChinese : function(str){
		return milo.getChineseNum(str)==str.length ? true : false;
	},
	/**
	 * 是否全部是英文
	 * @param {string} str 字符串
	 * @return {bool}
	 */
	isEnglish : function(str){
		return /^[A-Za-z]+$/.test(str);
	},
	/**
	 * 是否链接地址
	 * @param {string} str 字符串
	 * @return {bool}
	 */
	isURL : function(str){
		return /^http:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(str);
	},
	/**
	 * 是否数字字符串
	 * @param {string} str 字符串
	 * @return {bool}
	 */
	isNumberString : function(str){
		return /^\d+$/.test(str);
	}
})
})();/**
 * @author cathzhang
 * @version 0.1.0.0 
 * @date 2011-08-01
 * @class milo.cookie  
 * 方法集主体来自于原有oss_base.js中的Cookie对象<br/>
 * 修改情况如下：<br/>
 * 对clear方法增加sDomain, sPath方法，否则方法无效。<br/> 
 * <p>
 * Example:
 * <pre><code>
milo.cookie.set("abc","345",3600,"localhost.qq.com","/",false);
alert("当前值为：" + milo.cookie.get("abc") + "\n 开始清理\n");//345
milo.cookie.clear("abc","localhost.qq.com","/")
alert("清理后为：" + milo.cookie.get("abc"));  //null
 *</code></pre>
 * </p>
 */
 
namespace("milo.cookie");

(function(){
var cookie = milo.cookie;
extend( cookie, {
	/**
	 * 设置cookie
	 * @param {string} sName cookie名
	 * @param {string} sValue cookie值
	 * @param {int} iExpireSec 失效时间（秒）
	 * @param {string} sDomain 作用域
	 * @param {string} sPath 作用路径
	 * @param {bool} bSecure 是否加密
	 * @return {void}
	 */
	set : function(sName,sValue,iExpireSec,sDomain,sPath,bSecure){
		if(sName==undefined) {
			return;
		}
		if(sValue==undefined) {
			sValue="";
		}
		var oCookieArray = [sName+"="+escape(sValue)];
		if(!isNaN(iExpireSec)){
			var oDate = new Date();
			oDate.setTime(oDate.getTime()+iExpireSec*1000);
			iExpireSec==0 ? '' : oCookieArray.push("expires=" + oDate.toGMTString()) ;
		}
		if(sDomain!=undefined){
			oCookieArray.push("domain="+sDomain);
		}
		if(sPath!=undefined){
			oCookieArray.push("path="+sPath);
		}
		if(bSecure){
			oCookieArray.push("secure");
		}
		document.cookie=oCookieArray.join("; ");
	},
	/**
	 * 获取cookie
	 * @param {string} sName cookie名
	 * @param {string} sValue 默认值
	 * @return {string} cookie值
	 */
	get : function(sName,sDefaultValue){
		var sRE = "(?:; |^)" + sName + "=([^;]*);?";
		var oRE = new RegExp(sRE);
		
		if (oRE.test(document.cookie)) {
			return unescape(RegExp["$1"]);
		} else {
			return sDefaultValue||null;
		}
	},
	/**
	 * 获取cookie
	 * @param {string} sName cookie名
	 * @param {string} sDomain 作用域
	 * @param {sPath} sPath 作用路径
	 * @return {void} 
	 */
	clear : function(sName, sDomain, sPath){
		var oDate = new Date();
		cookie.set(sName,"", -oDate.getTime()/1000, sDomain, sPath);
	}	
});
})();

/**
 * @author cathzhang
 * @version 0.1.0.0 
 * @date 2011-07-21
 * @class milo.date
 * 方法集主体来自于原有oss_base.js中为date对象添加的部分原型方法<br/>
 * 修改情况如下：<br/>
 * 重命名toShortDateString为toDateString<br/>
 * 重命名toShortString为toDateTimeString<br/> 
 * 本类中所有方法被绑定到milo对象中，通过对milo.方法名进行调用。<br/> 
 * <p>
 * Example:
 * <pre><code>
console.log(milo.toDateString('/')) // 2011/10/21
 *</code></pre>
 * </p>
 */
 
namespace("milo.date");
(function(){
var date = milo.date;
var _d = new Date();
extend( date, {
	/**
	 * 获取日期
	 * @param {string} sep 分隔符 默认为-
	 * @return {string} yyyy-mm-dd
	 */
	toDateString : function(nd){	
		var a=[],
			dt = isDate(nd) ? nd : _d;
			m = dt.getMonth()+1,
			d = dt.getDate(),
			sep = arguments[1] ? arguments[1] : (isString(arguments[0]) ? arguments[0] : "-"); 
		a.push(dt.getFullYear());
		a.push( m.toString().length < 2 ? "0" + m : m);
		a.push( d.toString().length < 2 ? "0" + d : d);
		return a.join(sep);
	},
	/**
	 * 获取日期和时间
	 * @param {string} sep 分隔符 默认为-
	 * @return {string} yyyy-mm-dd hh:ii:ss
	 */
	toDateTimeString : function(nd){
	    var dt = isDate(nd) ? nd : _d,
			h = dt.getHours(),
			i = dt.getMinutes(),
			s = dt.getSeconds(),
			a = [];
		a.push(h.toString().length < 2 ? "0" + h : h);
		a.push(i.toString().length < 2 ? "0" + i : i);
		a.push(s.toString().length < 2 ? "0" + s : s);
		return date.toDateString.apply(this,arguments) + " " + a.join(":");
	},
	/**
	 * 是否润年
	 * @param {int} year 年份
	 * @return {bool} 是/否
	 */
	isLeapYear : function(year) {
		return (0 == year % 4 && ((year % 100 != 0) || (year % 400 == 0)))
	},
	/**
	 * 获取服务器时间
	 * @return {date} Date
	 */
	getSeverDateTime : function(){
		var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		xhr.open("head.html", window.location.href, false);
		xhr.send();	
		var d= new Date(xhr.getResponseHeader("Date"));
		return d;
	}	
});
})();/**
 * @author cathzhang
 * @version 0.1.0.0 
 * @date 2011-07-21
 * @class milo.number 
 * 方法集主体来自于原有oss_base.js中为string对象添加的部分原型方法<br/>
 * 本类中所有方法被绑定到milo对象中，通过对milo.方法名进行调用。<br/> 
 * <p>
 * Example:
 * <pre><code>
milo.isQQ(12345456)
 *</code></pre>
 * </p> 
 */
 
namespace("milo.number");

(function(){

var number = milo.number;
extend( number, {
	/**
	 * 是否某一范围的整数
	 * @param {int} n 数值
	 * @param {int} iMin 范围低值
	 * @param {int} iMax 范围高值
	 * @return {bool} 
	 */
	isInt : function(n, iMin, iMax){
		if(!isFinite(n)) {
			return false;
		}
		if(!/^[+-]?\d+$/.test(n)) {
			return false;   
		}
		if(iMin!=undefined && parseInt(n)<parseInt(iMin)) {
			return false;
		}
		if(iMax!=undefined && parseInt(n)>parseInt(iMax)) {
			return false;
		}    
		return true;
	},
	/**
	 * 是否某一范围浮点数
	 * @param {float} n 数值
	 * @param {float} fMin 范围低值
	 * @param {float} fMax 范围高值
	 * @return {bool} 
	 */
	isFloat : function(n, fMin, fMax){
		if(!isFinite(n)) {
			return false;
		}
		if(fMin!=undefined && parseFloat(n)<parseFloat(fMin)) {
			return false;
		}
		if(fMax!=undefined && parseFloat(n)>parseFloat(fMax)) {
			return false;
		}
		return true;
	},
	/**
	 * 是否QQ号码
	 * @param {int} qq qq号
	 * @return {bool} 
	 */
	isQQ : function(qq){
		return /^[1-9]{1}\d{4,11}$/.test(qq); 
		// /^[1-9]\d{4,11}$/.test(qq) && parseInt(qq)<=4294967294;   
	},
	/**
	 * 取随机整数
	 * @param {int} n 整数
	 * @return {int} 0~n间的随机整数
	 */
	randomInt : function(n){
		return Math.floor(Math.random() * n);
	}
});
})();/**
 * @author cathzhang
 * @version 0.1.0.0 
 * @date 2011-08-01
 * @demo http://gameact.qq.com/milo/core/ready.html
 * @class milo.event 
 * 本类中所有方法被绑定到milo对象中，通过对milo.方法名进行调用。<br/> 
 * <p>
 * Example:
 * <pre><code>
milo.addEvent(g('getString'),'click',function(e){
	alert(isString(g('string').value))
})
 *</code></pre>
 * </p>
 */
 
namespace("milo.event");

(function(){
var event = milo.event;
extend( event, {
	/**
	 * 停止事件继续进行
	 * @param {event} e 事件
	 * @return {dom} 
	 */
	preventDefault : function(e){
		if (e.preventDefault){
			e.preventDefault();
		}
		else{
			e.returnValue = false;
		}
	},
	/**
	 * 阻止事件冒泡传递
	 * @param {event} e 事件
	 * @return {dom} 
	 */
	stopPropagation : function(e){
		if (e.stopPropagation){
			e.stopPropagation();			
		}
		else{
			e.cancelBubble = true;
		}
	},
	/**
	 * 为DOM对象增加事件
	 * @param {dom} element dom对象
	 * @param {string} type 事件名称
	 * @param {function} type 事件方法
	 * @return {undefined} 
	 */
	addEvent : function(el, type, fn){
		if (window.addEventListener){
			el['e'+type+fn] = fn;
			el[type+fn] = function(e){
				var _e = e || window.event,
					_r = el['e'+type+fn](_e);
				if (_r==false) {
					milo.preventDefault(_e);
					milo.stopPropagation(_e);
				}				
			}			
			el.addEventListener(type, el[type+fn], false);	
		}
		else if (window.attachEvent){
			el['e'+type+fn] = fn;
			el[type+fn] = function(e){
				var _r = el['e'+type+fn](window.event);
				if (_r==false) milo.preventDefault(window.event);
			}
			el.attachEvent( 'on'+type, el[type+fn] );
			return;
		}
		else{
			el['on' + type] = fn;
		}
	},	
	/**
	 * 为DOM对象移除事件
	 * @param {dom} element dom对象
	 * @param {string} type 事件名称
	 * @param {function} type 事件方法
	 * @return {undefined} 
	 */
	removeEvent : function (el, type, fn){
		if (window.removeEventListener){
			el.removeEventListener(type, el[type+fn], false);
			el[type+fn] = null;	
		}
		else if (window.detachEvent){		
			el.detachEvent( 'on'+type, el[type+fn] );			
			el[type+fn] = null;			
			return;
		}
		else{
			el['on' + type] = null;
		}
	},
	isReady : false,
	readyFn : [],
	/**
	 * dom ready事件
	 * @param {dom} element dom对象
	 * @param {string} type 事件名称
	 * @param {function} type 事件方法
	 * @return {undefined} 
	 */
	ready : function (fn){	
		bindReadyEvent();	
		if ( milo.isReady ){
			fn.call();
		}
		else {
			if (isFunction(fn)){
				milo.readyFn.push(fn);
			}
		}
	}
});

function bindReadyEvent(){
	if(document.readyState === 'complete'){
		return ready();
	}
	if(document.addEventListener){
		document.addEventListener("DOMContentLoaded", function(){
			document.removeEventListener("DOMContentLoaded", arguments.callee, false);
			ready();
		},false);
		window.addEventListener("load", ready, false);
	}
	else if(document.attachEvent){
		document.attachEvent("onreadystatechange", function(){
			if (document.readyState === "complete"){
				document.detachEvent("onreadystatechange", arguments.callee);
				ready();
			}
		});
		window.attachEvent("onload",ready);
		if(document.documentElement.doScroll && window == window.top){
			if(milo.isReady) return;
			try{
				document.documentElement.doScroll("left");
			}catch(e){
				setTimeout(arguments.callee, 0);
				return;
			}
			ready();
		}
	}
}

function ready(){
	if(!milo.isReady){
		if(!document.body){
			return setTimeout(ready,13);
		}
		milo.isReady = true;
		
		if(milo.readyFn.length >0){
			var i=0,fn;
			while(fn = milo.readyFn[i++])
				fn.call();
			milo.readyFn.length = 0;
		}
			
	}
}

})();/**
 * @author cathzhang
 * @version 0.1.0.0 
 * @date 2012-06-01
 * @class milo.object  
 * 对象处理通用方法
 */
 
namespace("milo.object");

(function(){

extend( milo.object, {
	/**
	 * 序列化JSON对象
	 * 对object转化为url参数字符串，各属性间以&分隔，如a=1&b=2&c=3
	 * 对象属性为string 则进行encodeURIComponent编码
	 * 对象属性为bool 则以0代表false 1代表true
	 * 对象属性为对象，则会继续进行递归序列化
	 * 对象属性为function 则返回function.toString
	 * @param {object} jsonObj json对象
	 * @return {string}
	 */
	serialize : function(jsonObj){
		var newJsonObj = null;
		if (typeof(jsonObj) == 'undefined' || typeof(jsonObj) == 'function') 
			newJsonObj = '';
		if (typeof(jsonObj) == 'number') 
			newJsonObj = jsonObj.toString();			
		if (typeof(jsonObj) == 'boolean') 
			newJsonObj = (jsonObj) ? '1' : '0';
		if (typeof(jsonObj) == 'object') {
			if (!jsonObj) newJsonObj = '';
			if (jsonObj instanceof RegExp) newJsonObj = jsonObj.toString();
		}
		if (typeof(jsonObj) == 'string') 
			newJsonObj = jsonObj;		
		if (typeof(newJsonObj) == 'string') 
			return encodeURIComponent(newJsonObj);
			
		var ret = [];
		if (jsonObj instanceof Array) {
			for (var i = 0; i < jsonObj.length; i++) {
				if (typeof(jsonObj[i]) == 'undefined') 	continue;
				ret.push(typeof(jsonObj[i]) == 'object' ? '' : milo.serialize(jsonObj[i]))
			}
			return ret.join('|')
		} 
		else {
			for (var i in jsonObj) {				
				if (typeof(jsonObj[i]) == 'undefined') 	continue;
				newJsonObj = null;
				if (typeof(jsonObj[i]) == 'object') {
					if (jsonObj[i] instanceof Array) {
						newJsonObj = jsonObj[i];
						ret.push(i + '=' + milo.serialize(newJsonObj));
					} else {
						ret.push(i + '=')
					}
				} else {
					newJsonObj = jsonObj[i];
					ret.push(i + '=' + milo.serialize(newJsonObj));
				}
			}
			return ret.join('&')
		}
	},
	/**
	 * 反序列化为JSON对象
	 * 对url参形形式的对象反序列化成为JSON对象
	 * 与serialize相对应
	 * @param {object} jsonObj json对象
	 * @return {string}
	 */
	unSerialize : function(jsonStr, de){
		de = de || 0;
		jsonStr = jsonStr.toString();
		if (!jsonStr) return {};
		var retObj = {}, 
			obj1Ret = jsonStr.split('&');
		if (obj1Ret.length == 0) return retObj
		for (var i = 0; i < obj1Ret.length; i++) {
			if (!obj1Ret[i]) continue;
			var ret2 = obj1Ret[i].split('=');
			if (ret2.length >= 2) {
				var ret0 = obj1Ret[i].substr(0, obj1Ret[i].indexOf('=')),
					ret1 = obj1Ret[i].substr(obj1Ret[i].indexOf('=') + 1);
				if (!ret1) ret1 = '';
				if (ret0) retObj[ret0] = de == 0? decodeURIComponent(ret1) : ret1;
			}
		}
		return retObj;
	},
	/**
	 * 对整个object进行utf8格式的url解码
	 * @param {object} newopt 解码对象
	 * @return {object} 已解码对象
	 */
	decode : function(newopt) {
		if (typeof(newopt) == 'string') {
			try {
				return decodeURIComponent(newopt)
			} catch(e) {}
			return newopt
		}
		if (typeof(newopt) == 'object') {
			if (newopt == null) {
				return null
			}
			if (newopt instanceof Array) {
				for (var i = 0; i < newopt.length; i++) {
					newopt[i] = milo.decode(newopt[i])
				}
				return newopt
			} else if (newopt instanceof RegExp) {
				return newopt
			} else {
				for (var i in newopt) {
					newopt[i] = milo.decode(newopt[i])
				}
				return newopt
			}
		}
		return newopt
	}
	
});
})();/**
 * @author cathzhang
 * @version 0.1.0.0 2011-08-12
 */

milo.base.extend(milo, milo.dom); 
milo.base.extend(milo, milo.array); 
milo.base.extend(milo, milo.string); 
milo.base.extend(milo, milo.date); 
milo.base.extend(milo, milo.number); 
milo.base.extend(milo, milo.event); 
milo.base.extend(milo, milo.object); /**
 * @author willpanyang
 * @version 0.1.0.0 
 * @date 2012-05-21
 * @class milo.ams
 * ams通用处理方法
 */
 
namespace("milo.ams");
(function(){
	/**
	 * 获取ams的初始信息
	 * @param {number} amsActivityId 活动号
	 * @param {function} callback 回调方法
	 * @return {undefined}
	 */
	function getAmsFile(amsActivityId,flowId, callback){
		if(!isFunction(callback)) callback = function(obj){};
		
		var cur_actdesc = window["ams_actdesc_"+amsActivityId];
		
		if(isObject(cur_actdesc)){
			callback(cur_actdesc);
			return;
		}
		if (!amsActivityId || isNaN(amsActivityId) || amsActivityId<=0) return;
			
		var _url = "http://" + window.location.host + "/comm-htdocs/js/ams/v0.2R02/act/" + amsActivityId + "/act.desc.js";
		//_url = "http://gw.qq.com/comm-htdocs/js/ams/v0.2R02/act/" + amsActivityId + "/act.desc.js";
		include(_url, function(loaded){
			if (!loaded) return;
			//if (!isObject(window["ams_actdesc_"+amsActivityId])) return;
			callback(window["ams_actdesc_"+amsActivityId]);
			return;
		});		
	}
	
	/*
	 * init,submit 更新
	 */
	function getDesc(obj, callback){
		
		var actDesc = window["ams_actdesc_" + obj.actId],
			_url = "http://" + window.location.host + "/comm-htdocs/js/ams/v0.2R02/act/" + obj.actId + "/act.desc.js";
		
		if(isObject(actDesc)){
			callback(obj,actDesc);
			return;
		}
		
		include(_url, function(loaded){
		
			callback(obj,window["ams_actdesc_" + obj.actId]);
			return;
		});		
		
	}
	
	function init(obj){
	
		getDesc(obj, function(obj, descData){
			var flows = descData.flows,
				flow = null,
				cfg = obj;

			// 根据流程号匹配到流程
			for(fid in flows){
				if (fid == "f_" + obj.flowId){
					flow = flows[fid];
					break
				}
			}
			
			// 没有匹配到 
			if(flow == null){
				return;
			}
			
			// 判断是否为自定义流程
			if(flow.functions[0].sExtModuleId == null){
			
				need("ams.flowengine",function(FlowEngine){
				
					// 提交数据
					FlowEngine.submit(window['amsCfg_' + obj.flowId]);
					
				});
			}else{
				
				var modName = flow.functions[0].method;
				
				// 完整模块名称(包括相对路径)
				if(obj.modJsPath && obj.modJsPath.indexOf('http') === -1){
					
				}else if(obj.modJsPath){
					
				}
				
			
				need("ams." + modName, function(){
					var module = modName.split("."),
						mn = module[module.length-1],
						newObj = window[mn+"_" + obj.flowId];
					
					if(isObject(newObj) && isFunction(obj.modSubmit)){
						if(!isFunction(newObj.submit)){
							newObj.init(cfg);
							return false;
						}else if(cfg._everyRead && isFunction(newObj.submit)){
							newObj.init(cfg);
							obj.modSubmit(window[mn+"_" + obj.flowId]);
							return false;
						}else{
							obj.modSubmit(newObj);
							return false;
						}
					}
					
					window[mn+"_" + obj.flowId] = cloneClass(arguments[0]);
					window[mn+"_" + obj.flowId].init(cfg);
					
					// 如果是调用amsSubmit
					if (isFunction(obj.modSubmit)){
						obj.modSubmit(window[mn+"_" + obj.flowId]);
					}
				});
			}
		});
	}
	
	function submit(obj){
		
		// 添加模块submit方法 
		obj.modSubmit = function(modObj){
			if(isFunction(modObj.submit)){
				modObj.submit(obj.flowId);
			}
		};
		
		init(obj);	
	}
	
	extend( milo.ams, {
		/**
		 * 获取ams的初始信息
		 * @param {number} amsActivityId 活动号
		 * @param {function} callback 回调方法
		 * @return {undefined}
		 */
		
		amsInit : function(amsActivityId,flowId,callback){
		
			if(arguments.length === 1){
				init(amsActivityId); // amsActivityId 实际上是一个object
				return;
			}
		
			getAmsFile(amsActivityId,flowId, function(ams_actdesc){
				var flows = ams_actdesc.flows,
					flow = null,
					cfg = window["amsCfg_" + flowId] || {};			
				
				for(fid in flows){
					if (fid == "f_" + flowId){
						flow = flows[fid];
						break
					}
				}
				
				if (flow == null) return;
				
				//公共判断
				//如在此进行，会影响前期不需要提交只需要展示的功能			
				//可以考虑区分展示性模块和提交性模块
				
				cfg.iAMSActivityId = amsActivityId;
				cfg.iFlowId = flowId;
				
				if(flow.functions[0].sExtModuleId == null){
					need("ams.flowengine",function(FlowEngine){
						FlowEngine.submit(window['amsCfg_'+flowId]);
					});
				}else{
					var modName = flow.functions[0].method;
					
					if((amsActivityId > 6686 ) && (amsActivityId != 6688) && (amsActivityId != 6701) && (amsActivityId != 6731) && ( modName ==  'share.microblogFix' || modName ==  'share.microblogUser' || modName ==  'share.qqgameFeed' || modName ==  'share.qqSignButton' || modName ==  'share.qqSignQueryTime' || modName ==  'share.qqSignRadio'  || modName ==  'share.qzoneFix'  || modName ==  'share.qzoneUser' || modName ==  'share.shareQueryHistory')){
						flow.functions[0].method = 'share.commShare';
					}
					
					if((amsActivityId == 6370 || amsActivityId == 6241 || amsActivityId == 3733  ) && ( modName ==  'share.microblogFix' || modName ==  'share.microblogUser' || modName ==  'share.qqgameFeed' || modName ==  'share.qqSignButton' || modName ==  'share.qqSignQueryTime' || modName ==  'share.qqSignRadio'  || modName ==  'share.qzoneFix'  || modName ==  'share.qzoneUser' || modName ==  'share.shareQueryHistory')){
						flow.functions[0].method = 'share.commShare';
					}
				
					need("ams." + flow.functions[0].method, function(){
						var module = flow.functions[0].method.split("."),
							mn = module[module.length-1],
							newObj = window[mn+"_"+flowId];
						
						if(isObject(newObj) && isFunction(callback)){
							if(!isFunction(newObj.submit)){
								newObj.init(cfg, flow);
								return false;
							}else if(cfg._everyRead && isFunction(newObj.submit)){
								newObj.init(cfg, flow);
								callback(window[mn+"_"+flowId]);
								return false;
							}else{
								callback(newObj);
								return false;
							}
							
						}
						
						window[mn+"_"+flowId] = cloneClass(arguments[0]);
						window[mn+"_"+flowId].init(cfg, flow);
						if (isFunction(callback)){
							callback(window[mn+"_"+flowId]);
						}
					});
				}		
			});	
			
		},
		/**
		 * 获取ams的初始信息
		 * @param {number} amsActivityId 活动号
		 * @param {function} callback 回调方法
		 * @return {undefined}
		 */
		amsSubmit : function(amsActivityId, flowId){
			
			if(arguments.length === 1){
				submit(amsActivityId); // amsActivityId 实际上是一个object
				return;
			}
		
			//获取触发元素上action-data属性存放在window["amsCfg_" + flowId].triggerSourceData
			var caller = arguments.callee.caller;
			if((window.event && window.event.srcElement && window.event.srcElement != document) || (caller && caller.arguments[0])){
				var ev = window.event || caller.arguments[0];
				if(ev[0]){
					var target = ev[0];
				}else{
					var target = ev.srcElement || ev.target;
				}
				if(target){
					var data = (target.getAttribute && target.getAttribute('action-data')) || {}
						_amsCFG = window["amsCfg_" + flowId];
					
					try{
						_amsCFG.triggerSourceData = eval("(" + data + ")");
					}catch(e){
						_amsCFG.triggerSourceData = data;
					}
				}
			}
		
			amsInit(amsActivityId,flowId, function(obj){
				if(isFunction(obj.submit)){
					obj.submit(flowId);
				}
			});	
		}
	});
})();

milo.base.extend(window, milo.ams); 



/**
 * @author willpanyang
 * @version 0.1.0.0 
 * @date 2013-10-09
 * @class milo.ui
 * milo.ui 全局方法(临时)
 */

namespace("milo.ui");

(function(){
	/**
	 * milo.ui初始信息
	 * @param {msg} strgin 需要弹出的字符串内容
	 * @return {undefined}
	 */
	extend( milo.ui, {
		'alert' : function(msg){
			alert(msg);
		}
	});
})();

/*  |xGv00|e85a91d3a09fe4e73ad8f6ceaf92c84d */