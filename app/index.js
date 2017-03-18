import $ from '../node_modules/jquery/dist/jquery';
import S3Query from './s3query';
import co from '../node_modules/co/index';

const setChangeFileEvent = (callback) => {
  $('#file').on('change',(e) => {
    const files = e.target.files;
    if (files.length === 0){
      return ;
    }
    const file = files[0];
    callback(file);
  })
};

$(() => {
  const preview = (data) => {
      document.getElementById('img-preview').src = data.url;
      document.getElementById('url-preview').innerHTML = `<b>url:</b> ${data.url}`;
      document.getElementById('filename-preview').innerHTML = `<b>filename:</b> ${data.filename}`;
  };

  const onChangeFile = (file) => {
    co(function* (){
      const data = yield S3Query.upload(file);
      console.log(data);
      alert('Upload success');
      preview(data);
    }).catch((err) => {
      alert('Upload failed');
      console.log(err);
    })
  }
  setChangeFileEvent(onChangeFile);
});
