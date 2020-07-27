var elements = {
  userName: document.querySelector("#userName"),
  about: document.querySelector("#about"),
  age: document.querySelector("#age"),
  location: document.querySelector("#location"),
  gender: document.querySelector("#gender"),
  profileImage: document.querySelector("#profileImage"),
  imagesTab: document.querySelector("#imagesTab"),
  blogTab: document.querySelector("#blogTab"),
  soloImage: document.querySelector("#soloImage"),
  soloImageDesc: document.querySelector("#soloImageDesc"),
  soloBlogTitle: document.querySelector("#soloBlogTitle"),
  soloBlogText: document.querySelector("#soloBlogText"),
  contentContainer: document.querySelector("#contentContainer"),
  blogListContainer: document.querySelector("#blogListContainer"),
  soloBlogContainer: document.querySelector("#soloBlogContainer"),
  soloImageContainer: document.querySelector("#soloImageContainer"),
  imageListContainer: document.querySelector("#imageListContainer")
}

var appState = {
  currentView: "blogList",
  previousView: null,
  currentSoloImage: null,
  currentSoloBlog: null
}

elements.blogTab.addEventListener("click", toggleTab);
elements.imagesTab.addEventListener("click", toggleTab);

function updateProfile(){
  var user = userData.profile;
  elements.age.textContent = user.age;
  elements.gender.textContent = user.gender;
  elements.location.textContent = user.location;
  elements.userName.textContent = user.firstName + " " + user.lastName;
  elements.about.textContent = user.about;
  elements.profileImage.setAttribute("src", user.imageUrl);
}

function updateState(newData) {
  for(var key in newData){
    appState[key] = newData[key];
  }
  updateView();
}

function emptyViewContainer(){
  elements.blogListContainer.remove();
  elements.imageListContainer.remove();
  elements.soloBlogContainer.remove();
  elements.soloImageContainer.remove();
}

function removeChildElements(element){
  while(element.lastChild){
    element.lastChild.remove();
  }
}

function updateView() {
  emptyViewContainer();
  switch(appState.currentView){
    case "blogList":
      blogListView();
      break;
    case "soloBlog":
      soloBlogView();
      break;
    case "imageList":
      imageListView();
      break;
    case "soloImage":
      soloImageView();
      break;
    default:
      throw new Error("View specified does not exist");
  }
}

function blogListView() {
  removeChildElements(elements.blogListContainer)
  for(var i = 0; i < userData.blogs.length; i++){
    createBlogListItem(i);
  }
  elements.contentContainer.append(elements.blogListContainer);
}

function createBlogListItem(index){
  var currentBlog = userData.blogs[index];
  var blogElem = document.createElement("p");
  blogElem.setAttribute("data-index", index);
  blogElem.textContent = truncateBlogEntry(currentBlog.body, 20) + " ";
  var soloBlogLink = document.createElement("span");
  soloBlogLink.classList.add("link");
  soloBlogLink.textContent = "See More";
  soloBlogLink.addEventListener("click", function(event){
    updateState({
      currentSoloBlog: userData.blogs[event.currentTarget.parentElement.dataset.index],
      currentView: "soloBlog"
    })
  })
  blogElem.append(soloBlogLink);
  elements.blogListContainer.append(blogElem);
}

function imageListView() {
  removeChildElements(elements.imageListContainer)
  for(var i = 0; i < userData.images.length; i++){
    createImageListItem(i);
  }
  elements.contentContainer.append(elements.imageListContainer);
}

function createImageListItem(index){
  var currentImage = userData.images[index];
  var imageElem = document.createElement("img");
  imageElem.setAttribute("src", currentImage.url);
  imageElem.setAttribute("alt", currentImage.description);
  imageElem.setAttribute("data-index", index);
  imageElem.className = "col-3 mb-20 image image-list-item";
  imageElem.addEventListener("click", function(event){
    updateState({
      currentView: "soloImage",
      currentSoloImage: userData.images[event.currentTarget.dataset.index]
    })
  })
  elements.imageListContainer.append(imageElem);
}

function soloBlogView() {
  elements.soloBlogTitle.textContent = appState.currentSoloBlog.title;
  elements.soloBlogText.textContent = appState.currentSoloBlog.body;
  elements.contentContainer.append(elements.soloBlogContainer);
}

function soloImageView() {
  elements.soloImage.setAttribute("src", appState.currentSoloImage.url);
  elements.soloImageDesc.textContent = appState.currentSoloImage.description;
  elements.contentContainer.append(elements.soloImageContainer);
}

function toggleTab(event) {
  var targetView = null;
  switch(event.currentTarget.id){
    case "blogTab":
      targetView = "blogList";
      break;
    case "imagesTab":
      targetView = "imageList"
      break;
    default:
      throw new Error("Specified tab name does not correlate to any known view");
  }
  updateState({currentView: targetView});
}

function truncateBlogEntry(blogText, numWords) {
  var blogWordsArr = blogText.split(" ");
  if(blogWordsArr.length > numWords){
    return blogWordsArr.slice(0, numWords).join(" ") + "...";
  }
  return blogWordsArr.join(" ");
}

function init() {
  updateProfile();
  updateView();
}

init();
