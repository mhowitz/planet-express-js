
let cmntModal = document.querySelector('#comment-modal');
let cmntModalClose = document.querySelector('.comment-modal-close');

// cmntModalClose.onclick = function() {
//   cmntModal.style.display="none";
// }


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
    // invalidPost.classList.remove('is-invisible')
    alert("you already have voted on this");
  }

  // console.log('like button info',$(this));
  // need to add like to article model? and user cannot like again
}

async function commentButton(event) {
  event.preventDefault();
  console.log("comment button info", $(this));
  $(".hero").remove();
  let article_id = $(this)[0].dataset.modal_num;
  console.log(article_id);
  $.ajax({
    type: 'GET',
    url: `/articles/comments/${article_id}`
  }).done(function(data) {
    console.log(data);
    let first = 0;
    let beforeHero = data.indexOf("<body>");
    let firstIndex = data.indexOf("<main");
    let lastIndex = data.length;
    let firstNewData = data.slice(first, beforeHero);
    let newData = data.slice(firstIndex,lastIndex);
    let finalHtml = firstNewData + newData;
  cmntModal.style.display ="flex";
    $(cmntModal).html(finalHtml);

  });
 
};



async function postCommentButton(event) {
  event.preventDefault();
  console.log("post button info", $(this));
  // let commentId = $(this).dataset.comment-num;

  let article_id = $(this)[0].dataset.article_num;
  console.log(article_id);
  var comment_text = document.querySelector(`input[data-comment-num="${article_id}"]`).value.trim();

    // console.log(window.location);

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

// navbar hamburger functionality 
$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
});

// when user clicks like button run function
$(".likeBtn").click(likeButton);
$(".commentBtn").click(commentButton);
$(".postCommentBtn").click(postCommentButton);
$(".saveBtn").click(saveButton);

