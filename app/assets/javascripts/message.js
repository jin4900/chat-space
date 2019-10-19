$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="main__messages__message"data-id="${message.id}">
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
      $('#new_message')[0].reset(); 
        var target = $('.messages').last();
        $('.main__messages').animate({scrollTop: $('.main__messages')[0].scrollHeight}, 'fast');
      $('.main__form__new__message__submit').prop('disabled', false);
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })

   var reloadMessages = function() {
     if (window.location.href.match(/\/groups\/\d+\/messages/)){
       last_message_id = $('.main__messages__message:last').data("id");
       $.ajax({
         url: "api/messages",
         type: 'GET',
         dataType: 'json',
         data: {id: last_message_id}
       })
       .done(function(messages) {
         var insertHTML = '';
         messages.forEach(function(message){
           insertHTML = buildHTML(message);
           $('.main__messages').append(insertHTML);
           $('.main__messages').animate({scrollTop: $('.main__messages')[0].scrollHeight}, 'fast');
         })
       })
       .fail(function() {
         alert('自動更新に失敗しました');
       });
     }
   };
   setInterval(reloadMessages, 5000);
});
