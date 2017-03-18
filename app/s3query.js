
const uuid =  require('../node_modules/node-uuid/uuid');
import co from '../node_modules/co';
const baseURL = 'http://localhost:5000';

class S3Query  {

  static uploadFile(file,filename,signedRequest,url,callback){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT',signedRequest);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                console.log('updloaded');
                callback(null,{
                    url: url,
                    filename: filename
                });
            } else{
                callback('Could not upload file',null);
            }
        }
    };
    xhr.send(file);
}
  static getSignedRequest(file){
    const self = this;
      return new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        const url = `${baseURL}/api/s3/sign`
        // generate unique filename
        let uniqFileName = uuid() + '.' + file.type.split('/').pop();

        xhr.open('GET', `${url}?file-name=${uniqFileName}&file-type=${file.type}`);
        xhr.onreadystatechange = () => {
          if(xhr.readyState === 4){
            if(xhr.status === 200){
              const response = JSON.parse(xhr.responseText);
              const onUploadFile = (err,data) => {
                if (err){
                  return reject(err)
                }
                return resolve(data);
              };
              self.uploadFile(file,uniqFileName,response.signedRequest,response.url,onUploadFile);
            }
            else{
              return reject();
            }
          }
        };
        xhr.send();
    });
  }


  static upload(file){
    const self = this;
    return new Promise((resolve,reject) => {
      co(function *(){
        const data = yield self.getSignedRequest(file);
        return resolve(data);
      }).catch((err) => {
        return reject(err);
      })
    });
  }

}

export default S3Query
