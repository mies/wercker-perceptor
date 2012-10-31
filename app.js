var express = require('express')
  , fs = require('fs');
  var path = require('path');

var marked = require('marked')
var highlightJs = require('highlight.js');

marked.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: false,
  highlight:  function(code, lang) {

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
  
  //if(cache[path]){
  //  console.log('cache hit');
  //  return fn(null,cache[path]);
  //} 

  fs.readFile(path, 'utf8', function(err, str){
    if (err) return fn(err);
    try {
      var html = marked(str);
      
      //html = html.replace(/\{\{([^}]+)\}\}/g, function(_, name){
      //  return options[name] || '';
      //})
      html = layoutHtml.replace('{{content}}', html);
      //cache[path] = layoutHtml;
      fn(null, html);
    } catch(err) {
      fn(err);
    }
  });
})

app.set('views', __dirname + '/views');

// make it the default so we dont need .md
app.set('view engine', 'md');

app.get('/', function(req, res){
  res.render('index', { title: 'Markdown Example', layout : true });
})

app.get('/articles/:article', function(req, res){ 
  res.render(req.params.article, { title: 'Markdown Example', layout : true });
})

if (!module.parent) {
  app.listen(process.env.PORT || 4000);
  console.log('Express started on port ' + process.env.PORT || 4000);
}