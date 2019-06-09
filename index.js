var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');
    var fs = require('fs');
    var formidable = require('formidable');
    
    var multer  = require('multer')

    var app = express();
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port = 3300;
    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/index.html');
    });
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, '')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname )
      }
    })
    var upload = multer({ storage: storage });


    //'/uploadfile', upload.single('myFile'), (req, res, next) =>
 //   app.post('/send-email', function (req, res) {
      // copying file this Images folder
          
        var queue = require('queue');

        var q = queue();

         function extraSlowJob(cb) {
             console.log("hi");
	     setTimeout(function() {
            //'/uploadfile', upload.single('myFile'), (req, res, next) =>
         //   app.post('/send-email', function (req, res) {
              // copying file this Images folder
              console.log("hi2");
              app.post('/send-email', upload.single('myFile'), (req, res, next) => {
                const file = req.file;
                console.log(file.originalname);
                if (!file) {
                  const error = new Error('Please upload a file')
                  error.httpStatusCode = 400
                  return next(error)
                }
                  res.send(file);
            
                
            //  })  
        
              
                // var newpath = path.join(__dirname, 'Images');
                // console.log(newpath);
                console.log("to ="+req.body.to);
                console.log("subject = "+req.body.subject);
                console.log("body = "+req.body.body);
                console.log("Image = "+req.file.originalname);
            //    console.lo
        
              let transporter = nodeMailer.createTransport({
                  service: 'gmail',
                //   host: 'smtp.gmail.com',
                //   port: 465,
                //   secure: true,
                  auth: {
                      user: 'complicated.kumar14@gmail.com',
                      pass: 'Gtavicecity@1235'
                  }
                  
              });
            //  console.log("the body = "+req);
           //  console.log("the value = "+req.body.Courses);
              let mailOptions = {
                  from: '"Arush Kumar" <complicated.kumar14@gmail.com>', // sender address
                  to: req.body.to, // list of receivers
                  subject: req.body.subject, // Subject line
                 // text: req.body.body, // plain text body
                  html: req.body.body, // html body
                  attachments : [
                    {
                   // filename: req.file.originalname,
        //            content:data,
            //        content: fs.createReadStream(__dirname + '\Images'+req.file.originalname)
                        filename:req.file.originalname,
                        content: fs.createReadStream(req.file.originalname)
                  },
                  {
                    filename: 'textfile.html',
                    content: fs.createReadStream('textfile.html')
                  }
                ]
              };
        
              transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      return console.log(error);
                  }
                  console.log('Message %s sent: %s', info.messageId, info.response);
                  });
              });
	      }, 10000)
         }

        q.push(extraSlowJob);
        // begin processing, get notified on end / failure
        q.start(function (err) {
        if (err) throw err
        console.log('all done:', results)
        })
        
    //  })  

      
        // var newpath = path.join(__dirname, 'Images');
        // console.log(newpath);
        

          app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });





