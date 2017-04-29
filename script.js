
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
        loadStories(data.results);
      });  
    }  
  )  
  .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
  });
});

function category(data){
  // console.log(data);
  var myList = document.getElementById("myList");
  const section = data.map(x=> x.section);
  const filteredSection = section.reduce((acc,val) => {
    return(acc.includes(val)) ? acc : acc.concat(val);
  },[]);
   var allNews = "All News";
  filteredSection.unshift(allNews);
  // console.log(filteredSection);
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
    img = filteredPost.multimedia[4].url;
    var postWrapper = document.createElement("div");
    postWrapper.setAttribute("class","postWrapper");
    postWrapper.style.background = "url('" + img + "')";
    var postWrapperTitle = document.createElement("div");
    postWrapperTitle.setAttribute("class","postWrapperTitle");
    postWrapper.appendChild(postWrapperTitle);
    myDiv.appendChild(postWrapper);
    postWrapperTitle.insertAdjacentHTML('beforeend','<p>'+filteredPost.abstract+'<p>');
    postWrapper.addEventListener("click", function(){
    window.open(filteredPost.url);
    });
  });
}

function loadStories(data){
  var myDiv = document.getElementById("sectionsWrapper");
  var dataIm = data.filter(function (x){
    return x.multimedia[4];
  });
  var posts =[];
  for(i=0; i < dataIm.length; i++){
    var post = dataIm[i];
    posts.push(post);
  }
    var slicedPosts = posts.slice(0, 12);
    slicedPosts.forEach(function(slicedPost){
    var img = slicedPost.multimedia[4].url;
    var postWrapper = document.createElement("div");
    postWrapper.setAttribute("class","postWrapper");
    postWrapper.style.background = "url('" + img + "')";
    var postWrapperTitle = document.createElement("div");
    postWrapperTitle.setAttribute("class","postWrapperTitle");
    postWrapper.appendChild(postWrapperTitle);
    myDiv.appendChild(postWrapper);
    postWrapperTitle.insertAdjacentHTML('beforeend','<p>'+slicedPost.abstract+'<p>');
    postWrapper.addEventListener("click", function(){
    window.open(slicedPost.url);
    });
  });
}

  






	

 
