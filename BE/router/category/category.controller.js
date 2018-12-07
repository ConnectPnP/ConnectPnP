const path = require('path');
const category  = require('../../models/category');
const config = require('../../config/server.config');
const upload = require('../../middlewares/uploadCategory');
const npage = 5;

// 대분류

// 대분류 카테고리 생성 
exports.createCategory = (req, res) => {
  category.create( req.body , (err, result) => {
    if (err) return res.status(500).send(err); // 500 error
    return res.json(result);
  });
};

// home - 5개씩 보기

exports.getMoreCategory = (req, res) => {
  var page = req.params.page;
  category.find({}, function (err, result) {
    if(err)  return res.json({result : "fail"});
    return res.json(result);
  }).sort({_id: 1 }).skip((page)*npage).limit(npage);
}

exports.uploadImage = (req, res) => {
  upload(req, res)
  .then((files) => {
    category.findOneAndUpdate({_id : req.params.id}, {img_path : `${config.serverUrl()}files/${req.files.categoryFile[0].destination.match(/[^/]+/g).pop()}/${req.files.categoryFile[0].filename}`})
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return res.json({result : "db fail"});
    });
  })
  .catch((err) => {
    res.status(500).send('Upload middlewares error');
  });
}

// 모든 카테고리 보기
exports.getAllCategory = (req, res) => {
  category.find({}, (err, category) => {
    if (err) return res.status(500).send(err); // 500 error
      return res.json(category);
  });
};

// 카테고리 수정
exports.updateCategory = (req, res) => {
  category.findOneAndUpdate(
    {_id: req.params.id}, { $set:req.body }, (err, result) => {
      if(!err) {
        return res.json({result : "ok"});
      }
      else return res.json({ result : "fail"});
    });
};

// 카테고리 삭제
exports.deleteCategory = (req, res) => {
  category.findOneAndRemove({_id: req.params.id}, (err, result) => {
    if(!err && result) { 
    return res.json(result);
  };
  return res.status(404).send({ message: 'No data found to delete' });
  });
};


// 소분류

// 소분류 카테고리 생성 
exports.createSubCategory = (req, res) => {
  category.findOneAndUpdate( {_id: req.params.cat} ,{ $push : { sub_category: {name : req.body.name, description : req.body.description}}} ,(err, result) => {
    if (err) return res.status(500).send(err); // 500 error
    return res.json(result);
  });
};

// 모든 소분류 카테고리 보기
exports.getAllSubCategory = (req, res) => {
  category.find({},{ "sub_category": 1,"_id": 0 }, (err, category) => {
    if (err) return res.status(500).send(err); // 500 error
    console.log(category)
      return res.json(category);
  });
};

// 소분류 카테고리 수정
exports.updateSubCategory = (req, res) => {
  category.findOneAndUpdate(
    { 'sub_category.id': req.params.id, _id: req.params.cat}, { $set:{'sub_category.$': req.body} }, (err, result) => {
      if(!err) {
        return res.json({result : "ok"});
      }
      else return res.json({ result : "fail"});
    });
};

// 소분류 카테고리 삭제
exports.deleteSubCategory = (req, res) => {
  category.findOneAndUpdate({_id: req.params.cat}, {$pull : {sub_category : {_id: req.params.id}}}
  ,(err, result) => {
    if(!err && result) { 
    return res.json(result);
  };
  return res.status(404).send({ message: 'No data found to delete' });
  });
};
