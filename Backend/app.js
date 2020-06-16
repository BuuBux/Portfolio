const app = require('./index');

app.set('port', 8080);

const server = app.listen(app.get('port'), () => {
    console.log(`App is working on port ${server.address().port}`);
});
