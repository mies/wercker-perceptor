var express = require('express');
var fs = require('fs');
var path = require('path');
var marked = require('marked');
var highlightJs = require('highlight.js');


process.on('uncaughtException', function(err) {
  'use strict';
  var error = err;
  if(err && err.stack){
    error = {error : err.stack};
  }
  console.error('uncaughtException', error);
});

var cachePages = false;

if(!process.env){
  cachePages = true;
}


marked.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: false,
  highlight:  function(code, lang) {
  'use strict';

  var result = code;
    try{
      if(!lang){
        result = highlightJs.highlightAuto(code).value;
      }
      else{
        result =  highlightJs.highlight(lang, code).value;
      }
    }
    catch(error){
      console.error(error);
      result =  'Coulde not parse this block with language ' + lang + '<br/>' + code;
    }
    return result;
  }
});


var app = express();

app.use("/public", express.static(path.join(__dirname, 'public')));

var cache = {};
var layout = fs.readFileSync(__dirname + '/views/layout.html').toString();
//var layoutHtml = md(layout);
var layoutHtml = layout;

app.engine('md', function(path, options, fn){
  'use strict';
  console.log('parse ' + path);

  if(cachePages && cache[path]){
    console.log('cache hit');
    return fn(null,cache[path]);
  }
  if(!cachePages){
    layoutHtml = fs.readFileSync(__dirname + '/views/layout.html').toString();
  }

  fs.readFile(path, 'utf8', function(err, str){
    if (err){
      return fn(err);
    }
    try {
      var html = marked(str);

      //html = html.replace(/\{\{([^}]+)\}\}/g, function(_, name){
      //  return options[name] || '';
      //})
      html = layoutHtml.replace('{{content}}', html);
      if(cachePages){
        cache[path] = html;
      }
      fn(null, html);
    } catch(err) {
      fn(err);
    }
  });
});

app.set('views', __dirname + '/views');

// make it the default so we dont need .md
app.set('view engine', 'md');

app.get('/', function(req, res){
  'use strict';
  res.render('index');
});

app.get('/articles/:article', function(req, res){
  'use strict';
  res.render(req.params.article);
});

if (!module.parent) {
  app.listen(process.env.PORT || 4000);
  console.log('Express started on port ' + (process.env.PORT || 4000));
}
