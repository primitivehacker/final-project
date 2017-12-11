const app = require('./server/server');

//app.listen(4000, () => {
  //console.log('Listening');
//});


app.listen(process.env.PORT || 3000, function(){
  console.log('listening on', http.address().port);
});
