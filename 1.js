/**
 * 
 * @file 构建fis-config文件
 *  构建开始命令 fis3 release -wL
 *  开启服务 fis3 server start
 *
 * 1.git clone项目
 * 2.本地机器必须安装fis3,nodejs
 * 3.执行node install
 * 然后才可以测试项目
 */

// <<<<<<<
// fis.hook('commonjs', {
// });

fis.hook('commonjs', {
    packages: [
        {
            name: 'jquery',
            location: './statics/common/js',
            main: 'jquery-2.0.3.js'
        },
        {
            name: 'iSlider',
            location: './statics/common/js/iSlider',
            main: 'iSlider.js'
        },
        {
            name: 'zoompic',
            location: './statics/common/js/iSlider',
            main: 'iSlider.plugin.zoompic.js'
        }
    ]
});


// fis.config.set('modules.postpackager', 'autoload');

// fis.config.set('settings.postpackager.autoload.scriptTag', '<!--SCRIPT_PLACEHOLDER-->');
// fis.config.set('settings.postpackager.autoload.styleTag', '<!--STYLE_PLACEHOLDER-->');
// fis.config.set('settings.postpackager.autoload.resourceMapTag', '<!--RESOURCEMAP_PLACEHOLDER-->');
// >>>>>>>
fis.match('::package', {

    postpackager: fis.plugin('loader', {
        allInOne: {
            js: function (file) {
                return '/statics/js/'  + file.filename + '_aio.js';
            },
            css: function (file) {
                return '/statics/css/' + file.filename + '_aio.css';
            }
        }
    })

});

fis.match('/html/**.html', {
    useMap: true
});

// 启用 fis-spriter-csssprites 插件
fis.match('::packager', {
    spriter: fis.plugin('csssprites')
});

fis.match('/statics/**.js', {
    optimizer: fis.plugin('uglify-js'),
    isMod: true,
    useSameNameRequire: true
});

fis.match('/statics/**/mod.js', {
    isMod: false
});

fis.match('/statics/**.css', {
    useSprite: true,
    optimizer: fis.plugin('clean-css')
});

fis.match('/statics/**.{png,jpg,gif}', {
    optimizer: fis.plugin('png-compressor')
});

var url = 'http://img3sw.baidu.com/fis/zthuyan';

fis.media('prod').match('**.js', {
    domain: url
}).match('**.css', {
    domain: url
}).match('**.{png,jpg,gif}', {
    domain: url
});
// 终端里输入 fis3 release prod -d output
