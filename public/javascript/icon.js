

async function likeButton(event) { 
  event.preventDefault();
  console.log('like button info',$(this));
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