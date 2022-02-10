

async function likeButton(event) { 
  event.preventDefault();

  let currentArticle = $(this)[0].dataset.article_num;

  const res = await fetch('/api/articles/upvote', {
    method: 'PUT',
    body: JSON.stringify({
        article_id: currentArticle
    }),
    headers: {
        'Content-Type': 'application/json'
    }
  }); 

  if(res.ok){
      // document.location.replace('profile');
      // articleSuccess.classList.remove('is-invisible');
      // frm.reset();
      console.log("i think it upvoted");
      likeNumEl = document.querySelector('div[data-article_num="' + currentArticle + '"]').children;
      console.log(likeNumEl);
      likeNumEl[1].outerText = likeNumEl[1].outerText++;
      // window.location.href = ("/");

    
  }else {
      // invalidPost.classList.remove('is-invisible')
      alert("you already have voted on this");
  }

  // console.log('like button info',$(this));
  // need to add like to article model? and user cannot like again
}

async function commentButton(event) { 
  event.preventDefault();
  console.log('comment button info',$(this));

  // user can see all previous comments on article on a new page.
}

async function postCommentButton(event) { 
  event.preventDefault();
  console.log('post button info',$(this));
}

async function saveButton(event) { 
  event.preventDefault();
  console.log('save button info',$(this));
}

// when user clicks like button run function
$(".likeBtn").click(likeButton);
$(".commentBtn").click(commentButton);
$(".postCommentBtn").click(postCommentButton);
$(".saveBtn").click(saveButton);