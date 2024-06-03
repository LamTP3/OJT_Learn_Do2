import express from 'express';

let configViewEngine = (app) => {
    // static là gì, sau này ta muốn lấy ảnh 
    //thì chỉ định chỉ được lấy trong thư mục public
    app.use(express.static('./src/public'));

    app.set('view engine', 'ejs');
    // set đường link để ta lấy được view engine
    app.set('views', './src/views');
}

module.exports = configViewEngine;