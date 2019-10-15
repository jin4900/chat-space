$(function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="main__messages" data-id="${message.id}">
                  <div class="main__messages__message">
                    <div class="main__messages__message__info">
                      <div class="main__messages__message__info__user">
                        ${message.user_name}
                      </div>
                      <div class="main__messages__message__info__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="main__messages__message__text">
                      <p class="main__messages__message__text__content">
                        ${content}
                      </p>
                      ${img}
                  </div>
               </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__messages').append(html);
      $('#message_content').reset(); 
        var target = $('.messages').last();
        var position = $('.messages').scrollTop();
        $('.messages').animate({
          scrollTop: position
        }, 300, 'swing');
      $('.main__form__new__message__submit').prop('disabled', false);
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })
})