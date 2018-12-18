import memberCtrl from '../controllers/member.js';

export default (app) => {
    app.route('/members')
        .get(memberCtrl.retieveAll)
        .post(memberCtrl.create);
    
    app.route('/members/:id')
        .get(memberCtrl.retrieve)
        .put(memberCtrl.update)
        .delete(memberCtrl.delete);

    //Health Check
    app.route('/').get((req, res)=> {
        res.status(200).send('OK');
    });
};


