
module.exports = {

    devServer: {
        host: 'localhost',
        port: 8086,//本地运行的端口
        open: true, //配置自动启动浏览器 
        hotOnly: false,
        //接口代理
        proxy: {
            '/menu': {
                target: 'http://10.195.102.81:9001',
                changOrigin: false,
                secure: false,
                logLevel: 'debug',
            },
            '/kbqa': {
                target: 'http://10.195.102.81:5000',
                changOrigin: true,
                secure: false,
                logLevel: 'debug'
            }
        }
    },

}

