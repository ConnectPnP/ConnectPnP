const router = require('express').Router();
const board = require('./board');
const user = require('./user');
const category = require('./category');
const GroupInfo  = require('../models/groupInfo');

router.use('/board', board);
router.use('/user', user);
router.use('/category', category);

router.get('/home', (req, res) => {
    //groupInfo의 guest 별점평균 + 조회수 + 신청자수
    GroupInfo.find({}).populate('guest.user_id').exec((err, data) => {
        
        var rank5GroupList = [];

        for(var i=0; i<data.length; i++){
            var hitsApplicantsRate = 0;
            var starRate = 0;
            
            
            var C = 5;   // C 가 클수록 원래 값에서 멀어짐
            // star rate
            var m_star = 7;   // m 은 거의 리뷰가 없는 그룹의 평균 리뷰를 조정할 값
            // 조회수 대비 신청자수 
            var m_hitapplicant = 0.5;

            var guestnum = data[i].guest.length;
            
            // 참여자 별점 평균 bayesian_rating
            if((guestnum) > 0){
                for(var j=0; j<guestnum; j++){
                    starRate += data[i].guest[j].user_id.star_rate;
                }
                starRate /= guestnum;            
            }
            starRate = ((C*m_star) + (starRate*guestnum)) / (C + guestnum);
            console.log('starRate               ' + starRate); // log



            // 조회수 대비 신청자수 bayesian_rating
            hitsApplicantsRate = (data[i].applicants)/(data[i].hits);
            hitsApplicantsRate = ((C*m_hitapplicant) + (hitsApplicantsRate*data[i].hits)) / (C + data[i].hits);
            console.log('hitsApplicantsRate     ' + hitsApplicantsRate); // log
            


            data[i].evaluationIndex = starRate + hitsApplicantsRate;

            rank5GroupList.push(data[i]); 
        }
        rank5GroupList.sort(function(a, b) { // 내림차순 정렬
            return a.evaluationIndex > b.evaluationIndex ? -1 : a.evaluationIndex < b.evaluationIndex ? 1 : 0;
        });
        console.log(rank5GroupList.slice(0,5));
        res.json(rank5GroupList.slice(0,5));
    });
});

module.exports = router;
