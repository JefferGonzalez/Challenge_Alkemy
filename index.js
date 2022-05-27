import app from "./app";

const main = () => {
  app.listen(app.get('port'));
  console.log(`Listening on port : ${app.get('port')}`)
} 
main()