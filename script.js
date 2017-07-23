
window.addEventListener("load",function(){
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json" + '?' + $.param({'api-key': "740f26efb11c408fb3a66ea3ea9fd2ae"});
  fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' +  
          response.status);  
        return;  
      }
      response.json().then(function(data) {  
        renderHTML(data.results);
        category(data.results);
        onloadStories(data.results);
      });  
    }  
  )  
  .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
  });
});

function category(data){
  var myList = document.getElementById("myList");
  const section = data.map(x=> x.section);
  const filteredSection = sectionFilter(section);
  function sectionFilter(arr){
    let noDuplicatesArr = [];
    for(let i=0; i<arr.length; i++){
      if(!noDuplicatesArr.includes(arr[i])){
        noDuplicatesArr.push(arr[i]);
      }
    }
    return noDuplicatesArr;
  };
   var allNews = "All News";
   filteredSection.unshift(allNews);
  myList.addEventListener("change",function(e){
    var elementClicked = event.target.selectedOptions[0].id;
    renderHTML(data,elementClicked);
  });
  for ( var i = 0; i < filteredSection.length; i++){
    var newOption = document.createElement("option");
    newOption.setAttribute("id",filteredSection[i]);
    newContent = document.createTextNode(filteredSection[i]);
    newOption.appendChild(newContent);
    myList.appendChild(newOption);
  }
}

function renderHTML(data,elementClicked){
  var myDiv = document.getElementById("sectionsWrapper");
  myDiv.innerHTML = "";
  var dataIm = data.filter(function (x){
    return x.multimedia[4];
  });
  var posts =[];
  for(i=0; i < dataIm.length; i++){
    var post = dataIm[i];
    posts.push(post);
  }
  var elementClicked = elementClicked;

  var filteredPosts = posts.filter(function(post){
    if(elementClicked === "All News"){
      return post;
    }else{
      return post.section === elementClicked;
    }
    });
  filteredPosts.forEach(function(filteredPost){
    var img = filteredPost.multimedia[4].url;
    sectionsWrapper = document.getElementById("sectionsWrapper");
    var postWrapper = document.createElement("div");
    postWrapper.setAttribute("class","postWrapper");
    var postImg = document.createElement('img');
    postImg.setAttribute('src', img);
    postImg.setAttribute('alt', filteredPost.title);
    postImg.setAttribute("class","postPicture");
    postWrapper.appendChild(postImg);
    var postWrapperTitle = document.createElement("div");
    postWrapperTitle.setAttribute("class","postWrapperTitle");
    postWrapper.appendChild(postWrapperTitle);
    myDiv.appendChild(postWrapper);
    postWrapperTitle.insertAdjacentHTML('beforeend','<p>'+filteredPost.title+'<p>');
    postWrapper.addEventListener("click", function(){
    window.open(filteredPost.url);
    });
  });
}

function onloadStories(data){
  var myDiv = document.getElementById("sectionsWrapper");
  var dataIm = data.filter(function (x){
    return x.multimedia[4];
  });
  var posts =[];
  var addImages = dataIm.forEach(function(x){
    posts.push(x);
  }); 
  var slicedPosts = posts.slice(0, 12);
  slicedPosts.forEach(function(slicedPost){
    var img = slicedPost.multimedia[4].url;
    var postWrapper = document.createElement("div");
    postWrapper.setAttribute("class","postWrapper");
    var postImg = document.createElement('img');
    postImg.setAttribute('src', img);
    postImg.setAttribute('alt', slicedPost.title);
    postImg.setAttribute("class","postPicture");
    postWrapper.appendChild(postImg);
    var postWrapperTitle = document.createElement("div");
    postWrapperTitle.setAttribute("class","postWrapperTitle");
    postWrapper.appendChild(postWrapperTitle);
    myDiv.appendChild(postWrapper);
    postWrapperTitle.insertAdjacentHTML('beforeend','<p>'+slicedPost.title+'<p>');
    postWrapper.addEventListener("click", function(){
    window.open(slicedPost.url);
    });
  });
}

  






	

 
