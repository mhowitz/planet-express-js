

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

function blah (){
  console.log($(this));
};

// when user clicks like button run function
$(".likeBtn").click(blah);

