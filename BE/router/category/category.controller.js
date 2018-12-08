const path = require('path');
const Category  = require('../../models/category');
const config = require('../../config/server.config');
const upload = require('../../middlewares/uploadCategory');
const npage = 5;

// 대분류

// 대분류 카테고리 생성 
exports.createCategory = (req, res) => {
    category.create(req.body, (err, result) => {
        if (err) return res.status(500).send(err); // 500 error
        return res.json(result);
        var newCategory = new Category({
            name: req.body.name,
            depth: 0
        });
        newCategory.save(function (err) {
            if (err) return res.json(err);
            return res.json(newCategory)
        })
    });

// depth : 0 인것 home - 5개씩 보기
    exports.getMoreCategory = (req, res) => {
        var page = req.params.page;
        Category.find({depth: 0}, function (err, result) {
            if (err) return res.json({result: "fail"});
            return res.json(result);
        }).sort({_id: 1}).skip((page) * npage).limit(npage);
    }

    exports.uploadImage = (req, res) => {
        upload(req, res)
            .then((files) => {
                console.log(req.files.categoryFile[req.files.categoryFile.length - 1]);
                Category.findOneAndUpdate({_id: req.params.id}, {img_path: `${config.serverUrl()}files/${req.files.categoryFile[req.files.categoryFile.length - 1].destination.match(/[^/]+/g).pop()}/${req.files.categoryFile[req.files.categoryFile.length - 1].filename}`},{new: true})
                    .then((result) => {
                        console.log(result);
                        return res.json(result);
                    })
                    .catch((err) => {
                        return res.json({result: "db fail"});
                    });
            })
            .catch((err) => {
                res.status(500).send('Upload middlewares error');
            });
    }

// 모든 카테고리 보기
    exports.getAllCategory = (req, res) => {
        Category.find({depth: 0}, (err, category) => {
            if (err) return res.status(500).send(err); // 500 error
            return res.json(category);
        }).populate('sub_category')
            .exec(function (error, category) {
                console.log(category)
            });
        ;
    };

// 카테고리 수정
    exports.updateCategory = (req, res) => {
        Category.findOneAndUpdate(
            {_id: req.params.id}, {$set: {name: req.body.name, img_path: req.body.img_path}}, (err, result) => {
                if (!err) {
                    return res.json({result: "ok"});
                }
                else return res.json({result: "fail"});
            });
    };

// 카테고리 삭제
    exports.deleteCategory = (req, res) => {
        Category.findOneAndRemove({_id: req.params.id}, (err, result) => {
            if (!err && result) {
                return res.json(result);
            }
            ;
            return res.status(404).send({message: 'No data found to delete'});
        });
    };


// 소분류
// 소분류 카테고리 생성 
    exports.createSubCategory = (req, res) => {
        category.findOneAndUpdate({_id: req.params.cat}, {
            $push: {
                sub_category: {
                    name: req.body.name,
                    description: req.body.description
                }
            }
        }, {new: true}, (err, result) => {
            if (err) return res.status(500).send(err); // 500 error
            return res.json(result);

            var newCategory = new Category({
                name: req.body.name,
                depth: 1
            });
            newCategory.save(function (err) {
                if (err) return res.json(err);
                Category.findOneAndUpdate({
                    _id: req.params.cat,
                    depth: 0
                }, {$push: {sub_category: newCategory._id}}, (err, result) => {
                    if (err) return res.status(500).send(err); // 500 error
                    return res.json(result);
                });
            })
        });

// 모든 소분류 카테고리 보기
        exports.getAllSubCategory = (req, res) => {
            Category.find({depth: 1}, (err, category) => {
                if (err) return res.status(500).send(err); // 500 error
                return res.json(category);
            });
        };

// 소분류 카테고리 수정
        exports.updateSubCategory = (req, res) => {
            category.findOneAndUpdate(
                {
                    'sub_category.id': req.params.id,
                    _id: req.params.cat
                }, {$set: {'sub_category.$': req.body}}, {upsert: true}, (err, result) => {
                    if (!err) {
                        return res.json({result: "ok"});
                    }
                    else return res.json({result: "fail"});
                });
        };

// 소분류 카테고리 삭제
        exports.deleteSubCategory = (req, res) => {
            category.findOneAndUpdate({_id: req.params.cat}, {$pull: {sub_category: {_id: req.params.id}}}
                , (err, result) => {
                    if (!err && result) {
                        return res.json(result);
                    }
                    return res.status(404).send({message: 'No data found to delete'});
                });
        };
    };
}
