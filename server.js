const express = require('express');
const co = require('co');
const app = express();
const PROFILE = 'AWS PROFILE NAME';
const BUCKET_NAME = 'S3 BUCKE NAME';

// Cross origin
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/s3/sign',(req,res) => {
  const AWS = require('aws-sdk');
  const credentials = new AWS.SharedIniFileCredentials({profile: PROFILE});
  const bucketName = BUCKET_NAME;
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];

  AWS.config.credentials = credentials;
  AWS.config.update({
    region: 'ap-northeast-1'
  });
  const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
  const s3Params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${bucketName}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
})


app.get('/',(req,res) => {
  return res.json('initialff');
})

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'),  () => {
  console.log('Express server listening on port ' + server.address().port);
});
