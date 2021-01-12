let app = require('../app');

app.set("PORT", 3000 || process.env.PORT);       

app.listen(app.get("PORT"), () => {
    console.log("Server on port " + app.get('PORT'));
});