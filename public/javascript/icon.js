const like = document.getElementById("likeBtn");
const comment = document.getElementById("commentBtn");
const postComment = document.getElementById("postCommentBtn")

async function likeButton(event) { 
  event.preventDefault();
  
  console.log('like clicked', like);
  // need to add like to article model? and user cannot like again
}

async function commentButton(event) { 
  event.preventDefault();
  

  console.log('comment clicked', comment)
  // user can see all previous comments on article on a new page.
}

async function postCommentButton(event) { 
  event.preventDefault();
  

  console.log('send clicked', postComment);

  // need to log what user put in input bar.
  // user can see all previous comments on article on a new page.
}

postComment.addEventListener("click", postCommentButton);
like.addEventListener("click", likeButton);
comment.addEventListener("click", commentButton);