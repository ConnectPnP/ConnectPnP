const router = require('express').Router();
const board = require('./board');
const user = require('./user');

router.use('/board', board);
router.use('/user', user);

///////////////////// (여기서 추천.. 접속하자마자 FE에서 '/' get 요청으로 받아와야함)
router.get('/', (req, res) => {
    //groupInfo의 guest 별점평균 + 조회수 + 신청자수
    GroupInfo.find({}).populate('guest').exec((err, data) => {
        
        var rank5GroupList = [];

        for(var i=0; i<data.length; i++){
            var rate = 0;
            var starRate = 0;

            rate += data[i].applicants; // 스키마에 추가해야함
            rate += data[i].hits; // 스키마에 추가해야함

            for(var j=0; j<data[i].guest.length; j++){
                starRate += data[i].guest[j].star_rate;
            }

            if((data[i].guest.length) > 0){
                starRate /= data[i].guest.length;
                console.log(starRate); // log
            }
            rate += starRate;

            data[i].evaluationIndex = rate;

            rank5GroupList.push(data[i]); 
        }
        rank5GroupList.sort(function(a, b) { // 내림차순 정렬
            return a.evaluationIndex > b.evaluationIndex ? -1 : a.evaluationIndex < b.evaluationIndex ? 1 : 0;
        });
        console.log(rank5GroupList.slice(0,5));
        res.json(rank5GroupList.slice(0,5));
    });
});

//test register
router.post('/registergroup', (req, res) => {
    var groupInfo = new GroupInfo();
    groupInfo.hits = req.body.hits; 
    groupInfo.applicants = req.body.applicants;

    groupInfo.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0}); /////// 실패
            return;
        }
        console.error({result: 1});
        res.json({result: 1}); ////////// 성공
    })
});
router.post('/registeruser', (req, res) => {
    var user = new User();
    user.user_code = req.body.user_code; 
    user.star_rate = req.body.star_rate;

    user.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0}); /////// 실패
            return;
        }
        console.error({result: 1});
        res.json({result: 1}); ////////// 성공
    })

});

module.exports = router;
