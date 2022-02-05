async function articlePost(event) {
    event.preventDefault();

    const title = document.querySelector('input[id="articleTitle"]').value.trim();
    const post_url = document.querySelector('input[id="articleUrl"]').value.trim();
    const catId = document.querySelector('.catNo');


    const category_id = catId.dataset.cat;

    console.log(catId);
   // console.log(post_url);
    console.log("Data: " , title, post_url, category_id)
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
        document.location.replace('/dashboard');
        console.log('hello')
    }else {
        alert(res.statusText)
    }

};

document.querySelector('#articleBtn').addEventListener('click', articlePost);