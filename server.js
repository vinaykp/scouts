import app from './app/index.js';

const port = process.env.PORT || 3000;
const server = app.listen(port, err => {
    if (err) {
        process.exit(1);
    }
    console.log(`Scouts server listening on port ${port}`);
});
