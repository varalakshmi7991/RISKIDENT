import * as express from 'express';
import { AddressInfo } from "net";
import * as path from 'path';

import indexRoute from './routes/index';
import transactionsRouter from './routes/transactions';

const debug = require('debug')('my express app');
const bodyParser = require('body-parser');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRoute);
app.use('/transactions', transactionsRouter);

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
    const err: Error = new Error('Not Found');
    err['name'] = "404 Not Found";
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        res.status(500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    res.status(500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
    debug(`Fraud Detection app server is listening on port ${(server.address() as AddressInfo).port}`);
});