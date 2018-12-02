const path = require('path');
const category  = require('../../models/category');
const config = require('../../config/server.config');


// 대분류

// 대분류 카테고리 생성 
exports.createCategory = (req, res) => {
  category.create( req.body , (err, result) => {
    if (err) return res.status(500).send(err); // 500 error
    return res.json(result);
  });
};

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
    if(!err && result) { fs.unlink(path.join(__dirname, `../../files/${result.img_path}`), (fsErr) => {
      if (fsErr) console.warn({ err: 'not removed on Server' });
    }); // db에 저장된 img_path와 함께 해당 파일 삭제
    return res.json(result);
  };
  return res.status(404).send({ message: 'No data found to delete' });
  });
};


// 소분류

// 소분류 카테고리 생성 
exports.createSubCategory = (req, res) => {
  category.create( req.body , (err, result) => {
    if (err) return res.status(500).send(err); // 500 error
    return res.json(result);
  });
};

// 대분류의 모든 소분류 카테고리 보기
exports.getAllSubCategory = (req, res) => {
  category.find({}, (err, category) => {
    if (err) return res.status(500).send(err); // 500 error
      return res.json(category);
  });
};

// 소분류 카테고리 수정
exports.updateSubCategory = (req, res) => {
  category.findOneAndUpdate(
    {_id: req.params.id}, { $set:req.body }, (err, result) => {
      if(!err) {
        return res.json({result : "ok"});
      }
      else return res.json({ result : "fail"});
    });
};

// 소분류 카테고리 삭제
exports.deleteSubCategory = (req, res) => {
  category.findOneAndRemove({_id: req.params.id}, (err, result) => {
    if(!err && result) { fs.unlink(path.join(__dirname, `../../files/${result.img_path}`), (fsErr) => {
      if (fsErr) console.warn({ err: 'not removed on Server' });
    }); // db에 저장된 img_path와 함께 해당 파일 삭제
    return res.json(result);
  };
  return res.status(404).send({ message: 'No data found to delete' });
  });
};
