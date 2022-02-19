

async function likeButton(event) {
  event.preventDefault();

  let currentArticle = $(this)[0].dataset.article_num;

  const res = await fetch("/api/articles/upvote", {
    method: "PUT",
    body: JSON.stringify({
      article_id: currentArticle,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    likeNumEl = document.querySelector(
      'p[data-like_num="' + currentArticle + '"]'
    );
    likeNumEl.innerHTML = parseInt(likeNumEl.innerHTML) + 1;

    iconEl = document.querySelector(
      'svg[data-icon_num="' + currentArticle + '"]'
    );

    iconEl.classList.remove("far");
    iconEl.classList.add("fas");
    
  } else {
    alert("you already have voted on this");
  }
}

async function commentButton(event) {
  event.preventDefault();
  $(".hero").remove();
  let article_id = $(this)[0].dataset.modal_num;
  $.ajax({
    type: 'GET',
    url: `/articles/comments/${article_id}`
  }).done(function(data) {

    let first = 0;
    let beforeHero = data.indexOf("<body>");
    let firstIndex = data.indexOf("<main");
    let noFooter1 = data.indexOf("</main>");
    let firstNewData = data.slice(first, beforeHero);
    let newData = data.slice(firstIndex, noFooter1);
    let finalHtml = firstNewData + newData;
    
let cmntModal = $('#comment-modal');



cmntModal.addClass('is-active')
    cmntModal.html(finalHtml);

    let cmntModalClose = $('.comment-modal-close');
  
cmntModalClose.click(function() {
  cmntModal.removeClass("is-active");
});
 
  })
  };




async function postCommentButton(event) {
  event.preventDefault();

  let article_id = $(this)[0].dataset.article_num;
  console.log(article_id);
  var comment_text = document.querySelector(`input[data-comment-num="${article_id}"]`).value.trim();

console.log(comment_text)
    if(comment_text) {
        const res = await fetch('/api/comments', {
            method: 'post',
            body: JSON.stringify({
              comment_text,
               article_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(res.ok) {
            document.location.reload();
            console.log("Posted comment!")
            
        } else {
            alert(res.statusText);
        }
    }
};

async function saveButton(event) {
  event.preventDefault();
  console.log("save button info", $(this));
}
$(document).ready(function() {
  $(".navbar-burger").click(function() {

      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
});

// when user clicks like button run function
$(".likeBtn").click(likeButton);
$(".commentBtn").click(commentButton);
$(".postCommentBtn").click(postCommentButton);
$(".saveBtn").click(saveButton);

