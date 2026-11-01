// index.js
const app = require('./src/app');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`notes-app listening on :${PORT}`));
