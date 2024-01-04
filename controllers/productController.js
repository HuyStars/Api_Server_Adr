const Item = require("../models/productModel");
const isEmpty = require("lodash/isEmpty");

var options = ["Acer", "Apple", "MSI"];

exports.getList = (req, res) => {
  Item.find()
    .then((item) => {
      res.render("products/index", { item, layout: "layouts/main" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getListApi = (req, res) => {
  Item.find()
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAdd = (req, res) => {
  res.render("products/add", { layout: "layouts/main" });
};

exports.postAdd = (req, res) => {
  const newItem = new Item({
    ten_may: req.body.ten_may,
    hang_sx: req.body.hang_sx,
    gia_tien: req.body.gia_tien,
    binh_luan: req.body.binh_luan,
    anh_sp: req.file.path,
  });
  newItem
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddApi = (req, res) => {
  const newItem = new Item({
    ten_may: req.body.ten_may,
    hang_sx: req.body.hang_sx,
    gia_tien: req.body.gia_tien,
    binh_luan: req.body.binh_luan,
    anh_sp: req.file.path,
  });
  newItem
    .save()
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEdit = (req, res) => {
  const itemId = req.params.id;
  Item.findById(itemId)
    .then((item) => {
      const optionsEdit = options.filter((option) => {
        return option !== item.hang_sx;
      });
      res.render("products/edit", {
        optionsEdit,
        item,
        layout: "layouts/main",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDetail = (req, res) => {
  const itemId = req.params.id;
  Item.findById(itemId)
    .then((item) => {
      res.render("products/detail", { item, layout: "layouts/main" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEdit = (req, res) => {
  const itemId = req.params.id;
  const updateItem = {
    ten_may: req.body.ten_may,
    hang_sx: req.body.hang_sx,
    gia_tien: req.body.gia_tien,
    binh_luan: req.body.binh_luan,
  };
  if (req.file) {
    updateItem.anh_sp = req.file.path;
  }
  Item.findByIdAndUpdate(itemId, updateItem)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditApi = (req, res) => {
  const itemId = req.params.id;
  const updateItem = {
    ten_may: req.body.ten_may,
    hang_sx: req.body.hang_sx,
    gia_tien: req.body.gia_tien,
    binh_luan: req.body.binh_luan,
  };
  if (req.file) {
    updateItem.anh_sp = req.file.path;
  }
  Item.findByIdAndUpdate(itemId, updateItem)
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDelete = (req, res) => {
  const itemId = req.params.id;
  Item.findByIdAndDelete(itemId)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDeleteApi = (req, res) => {
  const itemId = req.params.id;
  Item.findByIdAndDelete(itemId)
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSearch = (req, res) => {
  if (!isEmpty(req.query.search)) {
    const query = req.query.search;
    const regex = new RegExp(query, "i");
    const searchQuery = {
        $or: [{
            hang_sx: {$regex: regex}
        }]
    };
    Item.find(searchQuery)
      .then((item) => {
        res.render("products/index", { item, layout: "layouts/main" });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    Item.find()
      .then((item) => {
        res.render("products/index", { item, layout: "layouts/main" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.getSearchApi = (req, res) => {
    if (!isEmpty(req.body.hang_sx)) {
      const query = req.body.hang_sx;
      const regex = new RegExp(query, "i");
      const searchQuery = {
          $or: [{
              hang_sx: {$regex: regex}
          }]
      };
      Item.find(searchQuery)
        .then((item) => {
          res.json(item);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Item.find()
        .then((item) => {
            res.json(item);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
