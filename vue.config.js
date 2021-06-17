  // If your port is set to 80,
  // use administrator privileges to execute the command line.
  // For example, Mac: sudo npm run
  // You can change the port by the following methods:
  // port = 9528 npm run dev OR npm run dev --port = 9528
  const port = process.env.port || process.env.npm_config_port || 3000 // dev port
  
  module.exports = {
	//publicPath: process.env.NODE_ENV === 'production' ? '/sigma-vue' : '/'
	publicPath: '/',
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: process.env.NODE_ENV === 'development',
	productionSourceMap: false,
	devServer: {
	  //host:  '192.168.254.1', //'0.0.0.0' default: localhost
	  host: '0.0.0.0',
	  disableHostCheck: true,
	  port: port,
	  open: true,
	  overlay: {
		warnings: false,
		errors: true
	  },
	  //before: require('./mock/mock-server.js')
	},
}