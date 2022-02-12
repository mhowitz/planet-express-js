const btn = document.getElementById('articleModal');
const modal = document.getElementById('article-modal');
const close = document.querySelector('.modal-close');

let invalidModal = document.querySelector('.invalidModal');
let successModal = document.querySelector('.successModal');
btn.onclick = function() {
  modal.style.display="flex";
};
close.onclick = function() {
 modal.style.display="none"
};
window.onclick = function(e) {
  if(e.target.className ==='modal-background') {
    modal.style.display='none'
  } 
};

async function articlePost(event) {
    event.preventDefault();
    invalidModal.classList.add('is-invisible');
    successModal.classList.add('is-invisible');
    const frm = document.querySelector('.formPost');
    const title = document.querySelector('input[id="articleTitle"]').value.trim();
    const post_url = document.querySelector('input[id="articleUrl"]').value.trim();
    let cat_id = document.querySelector('#catNo').value;
    console.log(cat_id);
    const category_id = cat_id === 'HTML' ? 1 : cat_id === 'css' ? 2 : cat_id === 'JavaScript'? 3 : cat_id === 'MYSQL' ? 4 : cat_id === 'Express' ? 5 : 6;
    
    const res = await fetch('/api/articles', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_url,
            category_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(res.ok){
        document.location.replace('/');
        successModal.classList.remove('is-invisible');
        frm.reset();
        console.log('it worked!!!! posted')
       
    }else {
        invalidModal.classList.remove('is-invisible')
        alert(res.statusText)
    }

};

document.querySelector('#articleBtn').addEventListener('click', articlePost);