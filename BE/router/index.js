const router = require('express').Router();
const board = require('./board');
const user = require('./user');
const category = require('./category');
const GroupInfo  = require('../models/groupInfo');

router.use('/board', board);
router.use('/user', user);
router.use('/category', category);

router.get('/home', (req, res) => {

    // 오늘 날짜 가져오기 -> 날짜 지난 모임은 랭킹에서 제외
    var today = new Date();

    var year = today.getFullYear();

    var month = (1 + today.getMonth());
    month = month >= 10 ? month : '0' + month;

    var day = today.getDate();
    day = day >= 10 ? day : '0' + day;

    var changeDateFormat = year+'-'+month+'-'+day;
    console.log(changeDateFormat);

    //groupInfo의 guest 별점평균 + 조회수 + 신청자수
    GroupInfo.find({due_date : { $gt : changeDateFormat }}).populate('guest', 'star_rate').exec((err, data) => {

        // console.log(data);

        var rank5GroupList = [];

        // 모임 랭킹 평가 지수 = 참가자 수 대비 별점 평균 + 조회수 대비 신청자수
        for(var i=0; i<data.length; i++){

            // 날짜 지난 모임은 제외
            if(data[i].due_date <= changeDateFormat) {
                continue;
            }

            var hitsApplicantsRate = 0;
            var starRate = 0;

            var C = 5;   // C 가 클수록 원래 값에서 멀어짐
            // star rate
            var m_star = 7;   // m 은 거의 리뷰가 없는 그룹의 평균 리뷰를 조정할 값
            // 조회수 대비 신청자수
            var m_hitapplicant = 0.5;

            var guestnum = data[i].guest.length;

            var dueDate = data[i].due_date;

            console.log();
            console.log('due date           '+dueDate);
            console.log(data[i].title);
            console.log(guestnum);

            // 참여자 별점 평균 bayesian_rating
            if((guestnum) > 0){
                for(var j=0; j<guestnum; j++){
                    if(data[i].guest[j].star_rate.divider != 0) {
                        starRate = starRate + (data[i].guest[j].star_rate.totalScore / data[i].guest[j].star_rate.divider);  //data[i].guest[j].user_id.star_rate;
                    }
                    else {
                        starRate = 0;
                    }
                }
                starRate /= guestnum;
                starRate = ((C*m_star) + (starRate*guestnum)) / (C + guestnum);
                starRate /= 10;
            }
            else if((guestnum) == 0){
                starRate = 0;
            }

            console.log('starRate               ' + starRate); // log



            // 조회수 대비 신청자수 bayesian_rating
            if(data[i].applicants != 0) {
                hitsApplicantsRate = (data[i].applicants)/(data[i].hits);
                hitsApplicantsRate = ((C*m_hitapplicant) + (hitsApplicantsRate*data[i].hits)) / (C + data[i].hits);
            }
            else {
                hitsApplicantsRate = 0;
            }
            console.log('hitsApplicantsRate     ' + hitsApplicantsRate); // log

            console.log(starRate + hitsApplicantsRate);

            data[i].evaluationIndex = starRate + hitsApplicantsRate;

            rank5GroupList.push(data[i]);
        }
        rank5GroupList.sort(function(a, b) { // 내림차순 정렬
            return a.evaluationIndex > b.evaluationIndex ? -1 : a.evaluationIndex < b.evaluationIndex ? 1 : 0;
        });
        // console.log(rank5GroupList);
        res.json(rank5GroupList);
    });
});


module.exports = router;
