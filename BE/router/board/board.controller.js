const fs = require('fs');
const path = require('path');
const Board = require('../../models/groupInfo');
const Comment = require('../../models/comment');
const User = require('../../models/user');
const config = require('../../config/server.config');
const upload = require('../../middlewares/uploadPost');
var mongoose = require('mongoose');

const npage = 6; // 페이지당 6개 게시글 불러오기

// 게시글 상세보기
exports.getPost = (req, res) => {
  Board.findOneAndUpdate({_id: req.params.id},{$inc : {hits : 1}}, (err, board) => {
    if (err) return res.status(500).send(err); // 500 error
    return res.json(board);
  })
  .populate({path : 'host', select: '_id name avatar_path gender age'})
  .populate('comments')
  .populate({
    path: 'comments',
    populate: { path: 'member', select: '_id  name avatar_path createdAt' },
  })
  .populate('waiting')
  .populate('guest')
  .populate({
    path: 'comments',
    populate: {
        path: 'childComment', select: 'member _id content createdAt depth',
        populate: {path : 'member', select : '_id name avatar_path'
      }
    },
  })
  .populate({
    path: 'category',
    select: 'name',
  })
  .populate({
    path: 'subCategory',
    select: 'name',
  })
  .exec(function(error, comments) {
  });
};

// 한 페이지당 5개의 log 정보를 불러와서 return. sort 는 id 순으로.
exports.getMore = (req, res) => {
    var page = req.params.page;
    Board.find({subCategory: req.params.category}, function (err, result) {
        if (err) return res.json({result: "fail"});
        return res.json(result);
    }).sort({_id: -1}).skip((page) * npage).limit(npage);
};

// //post create edit delete
// // 게시글 생성하기
exports.create = (req, res) => {
    Board.create(req.body, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }// 500 error
        return res.json(result);
    });
};

// 모든 게시글 상세보기
exports.getAllPost = (req, res) => {
    Board.find({}, (err, board) => {
        if (err) return res.status(500).send(err); // 500 error
        return res.json(board);
    });
};

// 게시글에 딸린 사진 저장하기
exports.uploadFile = (req, res) => {
    upload(req, res)
        .then((files) => {
            for (var i = 0; i < req.files.postFile.length; i++) {
                Board.findOneAndUpdate({_id: req.params.id}, {$push: {images: `${config.serverUrl()}files/${req.files.postFile[i].destination.match(/[^/]+/g).pop()}/${req.files.postFile[i].filename}`}})
                    .catch((err) => {
                        return res.json({result: "db fail"});
                    })
                    .then((result) => {
                        return res.json(result);
                    })

            }
        })
        .catch((err) => {
            res.status(500).send('Upload middlewares error');
        });
};

// 게시글 수정하기
exports.updatePost = (req, res) => {
    Board.findOneAndUpdate(
        {_id: req.params.id}, {$set: req.body}, (err, result) => {
            if (!err) {
                return res.json({result: "ok"});
            } else return res.json({result: "fail"});
        });
};

// 게시글 지우기
exports.deletePost = (req, res) => {
    Board.findOneAndRemove({_id: req.params.id}, (err, result) => {
        if (!err && result) {
            fs.unlink(path.join(__dirname, `../../files/${result.img_path}`), (fsErr) => {
                if (fsErr) console.warn({err: 'not removed on Server'});
            }); // db에 저장된 img_path와 함께 해당 파일 삭제
            return res.json(result);
        }
        return res.status(404).send({message: 'No data found to delete'});
    });
};


exports.searchPost = (req, res) => {
  var page = req.params.page
  Board.find(req.body, (err,result) => {
    if(err) {
      console.log(err);
      return res.json({ result : "fail"});}
    else {
      console.log(result)
      return res.json(result);}
  }).sort({_id: -1}).skip((page) * npage).limit(npage);;
};

exports.searchUser = (req, res) => {
  User.find(req.body, (err, result) => {
    if(!err) {
      return res.json(result)
    } else return res.json({result: "fail"});
  })

}

//comment create edit delete
// 댓글 생성하기
exports.createComment = (req, res) => {
    var newComment = new Comment({
        member: req.body.user_id,
        content: req.body.content,
        depth: 0,
    });
    newComment.save(function (err) {
        if (err) return res.json(err);
        Board.findOneAndUpdate({_id: req.params.id}, {$push: {comments: newComment._id}}, {new: true},
            (err, board) => {
                if (!err) {
                    return res.json(board);
                } else return res.json(err);
            })
            .populate('comments')
            .populate({
                path: 'comments',
                populate: {path: 'member', select: '_id  name avatar_path'},
            })
    });
};

exports.getAllComment = (req, res) => {
    Comment.find({}, (err, result) => {
        if (!err) {
            return res.json(result);
        } else return res.json({result: "fail"});
    });
};

// 댓글 수정하기
exports.updateComment = (req, res) => {
    Comment.findOneAndUpdate({_id: req.params.comment},
        {content: req.body.content}, (err, result) => {
            if (!err) {
                return res.json({result: "ok"});
            } else return res.json({result: "fail"});
        });
};

// 댓글 삭제하기
exports.deleteComment = (req, res) => {
    Board.findOneAndUpdate({_id: req.params.id}, {$pull: {comments: req.params.comment}}, {new: true}, (err, result) => {
        if (!err) {
            Comment.findOneAndRemove({_id: req.params.comment}, (err, result) => {
                if (!err && result) {
                    return res.json(result);
                }
            })
        } else return res.json({result: "fail"});
    });
};

exports.createCommentReply = (req, res) => {
    var newComment = new Comment({
        member: req.body.user_id,
        content: req.body.content,
        depth: 1,
    });
    newComment.save(function (err) {
        if (err) return res.json(err);
        Comment.findOneAndUpdate({_id: req.params.id}, {$push: {childComment: newComment._id}}, {new: true}, (err, result) => {
            if (!err) {
                return res.json(result);
            } else return res.json({result: "fail"});
        });
    });

}

exports.deleteCommentReply = (req, res) => {

    Comment.findOneAndUpdate({_id: req.params.comment}, {$pull: {childParent: req.params.reply}}, {new: true}, (err, result) => {
        if (!err) {
            Comment.findOneAndRemove({_id: req.params.reply}, (err, result) => {
                if (!err && result) {
                    return res.json(result);
                }
            })
        } else return res.json({result: "fail"});
    });
}

exports.waitGroup = (req, res) => {
  Board.findOneAndUpdate({_id : req.body.group}, {$push : {waiting : req.body.user}, $inc : {applicants : 1}}, {new:true}, (err, result) => {
    if(!err && result) {
      return res.json(result);
    };
    return res.json(err);
  })
}

exports.cancelGroup = (req, res) => {
    Board.findOneAndUpdate({_id: req.body.group}, {$pull: {waiting: req.body.user}}, {new: true}, (err, result) => {
        if (!err && result) {
            return res.json(result);
        } else {
            return res.json(err);
        }
    })
}

exports.joinGroup = (req, res) => {
    Board.findOneAndUpdate({_id: req.body.group}, {
        $pull: {waiting: req.body.user},
        $push: {guest: req.body.user}
    }, {new: true}, (err, result) => {
        if (!err && result) {
           return User.findOneAndUpdate({_id: req.body.user}, {$push: {group_log: {group_id: req.body.group}}}, (err, userJoin) => {
                if (!err)
                    return res.json(userJoin);
                else
                    return res.json(err);
            })
        } else {
            return res.json(err);
        }
    })
}

exports.exitGroup = (req, res) => {
    Board.findOneAndUpdate({_id: req.body.group}, {$pull: {guest: req.body.user}}, {new: true}, (err, result) => {
        if (!err && result) {
            return User.findOneAndUpdate({_id: req.body.user}, {$pull: {group_log: {group_id: req.body.group}}}, {new: true}, (err, userExit) => {
                if (!err) {
                    return res.json(userExit);
                } else {
                    return res.json(err);
                }
            })
        }
        return res.json(err);
    })
}

exports.checkState = (req, res) => {
    Board.find({_id: req.body.group, waiting: req.body.user}, (err, waiting) => {
        if (waiting.length != 0) {
            return res.json({isWaiting: true, isJoined: false})
        } else {
            Board.find({_id: req.body.group, guest: req.body.user}, (err, joined) => {
                if (joined.length != 0) {
                    return res.json({isWaiting: false, isJoined: true})
                } else {
                    res.json({isWating: false, isJoined: false})
                }
            })
        }
    })
}
