var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var data = require('./routes/data');

// 生成一个express实例 app。
var app = express();

// view engine setup
/**app.set(name, value) */
// 设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('views', path.join(__dirname, 'views'));
// 设置视图模板引擎为 ejs。
app.set('view engine', 'ejs');

// 设置/public/favicon.ico为favicon图标
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(logger('dev'));   // 加载日志中间件。
app.use(bodyParser.json());  //加载解析json的中间件。
app.use(bodyParser.urlencoded({ extended: false }));  //加载解析urlencoded请求体的中间件。
app.use(cookieParser());  //加载解析cookie的中间件。
app.use(express.static(path.join(__dirname, 'public'))); //设置public文件夹为存放静态文件的目录。


// 路由控制器。
app.use("/data/swiper", data.swiper);
app.use("/data/otherapp", data.otherapp);
app.use("/data/spike", data.spike);
app.use("/data/more", data.more);
app.use("/data/like", data.like);


// catch 404 and forward to error handler
// 捕获404错误，并转发到错误处理器
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// 开发环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中。
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// 生产环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//导出实例app供其它模块使用
module.exports = app;
