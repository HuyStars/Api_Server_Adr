const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    ten_may: String,
    hang_sx: String,
    anh_sp: String,
    gia_tien: String,
    binh_luan: String
});

const Item = mongoose.model('computers', itemSchema);
module.exports = Item;