$(document).ready(function(){

	var progressbar = $('#progressbar'), progress = $('#progress');

  $('form').submit(function(e){
    e.preventDefault();

    $('.alert, label').remove();

    $(progress).show();
    var fd = new FormData(this);

    $.ajax({
      url: $(this).attr('action'),
      xhr: function(){
        var xhr = new XMLHttpRequest();
        var total = document.getElementById('file').files[0].size;

        xhr.upload.addEventListener('progress', function(e){
          var loaded = Math.round((e.loaded / total) * 100);
          $(progressbar).text(loaded + '%').width(loaded+'%');
        });
        return xhr;
      },
      type: 'post',
      processData: false,
      contentType: false,
      data: fd,
      dataType: 'json',
      success: function(response){
        if(response.message){
          $('#upload').prepend('<div class="alert alert-success">'+response.message+'</div>');
          $(progress).fadeOut();
        }
        else{
          $('#file').after('<span class="label label-danger">'+response.error+'</span>');
          $(progress).hide();
        }
      }
    });
  });

});


