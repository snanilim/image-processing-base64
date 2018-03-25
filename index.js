const Jimp = require("jimp");
const base64Img = require('base64-img');
const childProcess = require('child_process');
const fs = require('fs');



const testFolder = './images/';




function imgProcessing(){
    var img_arr = [];

    // read directory
    fs.readdir(testFolder, (err, files) => {

      // get every file from directory
      files.forEach((file, index) => {

        // check dot file
        if(file.charAt(0) !== '.'){

            // image process
            Jimp.read('images/'+file).then(function (image) {
                image.resize(50, 70)                 // resize
                     .quality(70)                    // quality
                     .write('./small-images/'+file); // save


                 // Image Base 64
                 base64Img.base64('small-images/'+file, function(err, data) {

                   // image create obj and push on array
                   var img_obj = {};
                   img_obj.name = file;
                   img_obj.base64 = data;
                   img_arr.push(img_obj);

                   if (index == (files.length-1)){

                    console.log('Image Processing Done');
                    json = JSON.stringify(img_arr);

                    // after finish all array then write
                    fs.writeFile('image_data.json', json, 'utf8', function(err, json){});
                    return img_arr;

                   }
                 })


            }).catch(function (err) {
                console.error(err);
            });

        }

      })

    })
}

// call function
imgProcessing()
