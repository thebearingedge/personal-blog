/* eslint-disable no-undef */
var userNameElem = document.querySelector("#userName");
var aboutElem = document.querySelector("#about");
var ageElem = document.querySelector("#age");
var locationElem = document.querySelector("#location");
var genderElem = document.querySelector("#gender");
var profileImage = document.querySelector("#profileImage");
var imagesTab = document.querySelector("#imagesTab");
var blogTab = document.querySelector("#blogTab");
var soloImage = document.querySelector("#soloImage");
var soloImageDesc = document.querySelector("#soloImageDesc");
var soloBlogTitle = document.querySelector("#soloBlogTitle");
var soloBlogText = document.querySelector("#soloBlogText");
var contentContainer = document.querySelector("#contentContainer");
var blogListContainer = document.querySelector("#blogListContainer");
var soloBlogContainer = document.querySelector("#soloBlogContainer");
var soloImageContainer = document.querySelector("#soloImageContainer");
var imageListContainer = document.querySelector("#imageListContainer");
var modalElem = document.querySelector("#modal");
var imageModal = document.querySelector("#imageModal");
var blogModal = document.querySelector("#blogModal");
var imageForm = document.querySelector("#imageForm");
var blogForm = document.querySelector("#blogForm");
var addImageButton = document.querySelector("#addImageButton");
var addBlogButton = document.querySelector("#addBlogButton");
var dismissElems = document.querySelectorAll(".dismiss");

var appState = {
  currentView: "blogList",
  currentSoloImage: null,
  currentSoloBlog: null
}

function init() {
  blogTab.addEventListener("click", toggleTab);
  imagesTab.addEventListener("click", toggleTab);
  addBlogButton.addEventListener("click", showBlogModal);
  addImageButton.addEventListener("click", showImageModal);
  imageForm.addEventListener("submit", addImage);
  blogForm.addEventListener("submit", addBlog);

  for(var i = 0; i < dismissElems.length; i++){
    dismissElems[i].addEventListener("click", toggleModal);
  }
  updateProfile();
  updateView();
}

init();

function toggleModal(){
  modalElem.classList.toggle("hidden");
  imageModal.remove();
  blogModal.remove();
}

function showBlogModal(){
  toggleModal();
  modalElem.append(blogModal);
}

function showImageModal(){
  toggleModal();
  modalElem.append(imageModal);
}

function addImage(){
  var imageFormData = new FormData(imageForm);
  var newImageData = {
    url: imageFormData.get("url"),
    description: imageFormData.get("description")
  }

  userData.images.unshift(newImageData);

  toggleModal();

  updateState({
    currentView: "imageList"
  })
}

function addBlog(){
  var blogFormData = new FormData(blogForm);
  var newBlogData = {
    title: blogFormData.get("title"),
    body: blogFormData.get("body")
  }

  userData.blogs.unshift(newBlogData);

  toggleModal();

  updateState({
    currentView: "blogList"
  })
}

function updateProfile() {
  var user = userData.profile;
  ageElem.textContent = user.age;
  genderElem.textContent = user.gender;
  locationElem.textContent = user.location;
  userNameElem.textContent = user.firstName + " " + user.lastName;
  aboutElem.textContent = user.about;
  profileImage.setAttribute("src", user.imageUrl);
}

function updateState(newData) {
  for (var key in newData) {
    appState[key] = newData[key];
  }
  updateView();
}

function emptyViewContainer() {
  blogListContainer.remove();
  imageListContainer.remove();
  soloBlogContainer.remove();
  soloImageContainer.remove();
}

function removeChildElements(element) {
  while (element.lastChild) {
    element.lastChild.remove();
  }
}

function updateView() {
  emptyViewContainer();
  switch (appState.currentView) {
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
  removeChildElements(blogListContainer)
  for (var i = 0; i < userData.blogs.length; i++) {
    createBlogListItem(i);
  }
  contentContainer.append(blogListContainer);
}

function createBlogListItem(index) {
  var currentBlog = userData.blogs[index];
  var blogElem = document.createElement("p");
  blogElem.setAttribute("data-index", index);
  blogElem.textContent = truncateBlogEntry(currentBlog.body, 20) + " ";
  var soloBlogLink = document.createElement("span");
  soloBlogLink.classList.add("link");
  soloBlogLink.textContent = "See More";
  soloBlogLink.addEventListener("click", function (event) {
    updateState({
      currentSoloBlog: userData.blogs[event.currentTarget.parentElement.dataset.index],
      currentView: "soloBlog"
    })
  })
  blogElem.append(soloBlogLink);
  blogListContainer.append(blogElem);
}

function imageListView() {
  removeChildElements(imageListContainer)
  for (var i = 0; i < userData.images.length; i++) {
    createImageListItem(i);
  }
  contentContainer.append(imageListContainer);
}

function createImageListItem(index) {
  var currentImage = userData.images[index];
  var imageElem = document.createElement("img");
  imageElem.setAttribute("src", currentImage.url);
  imageElem.setAttribute("alt", currentImage.description);
  imageElem.setAttribute("data-index", index);
  imageElem.className = "col-3 mb-20 image image-list-item";
  imageElem.addEventListener("click", function (event) {
    updateState({
      currentView: "soloImage",
      currentSoloImage: userData.images[event.currentTarget.dataset.index]
    })
  })
  imageListContainer.append(imageElem);
}

function soloBlogView() {
  soloBlogTitle.textContent = appState.currentSoloBlog.title;
  soloBlogText.textContent = appState.currentSoloBlog.body;
  contentContainer.append(soloBlogContainer);
}

function soloImageView() {
  soloImage.setAttribute("src", appState.currentSoloImage.url);
  soloImageDesc.textContent = appState.currentSoloImage.description;
  contentContainer.append(soloImageContainer);
}

function toggleTab(event) {
  var targetView = null;
  switch (event.currentTarget.id) {
    case "blogTab":
      targetView = "blogList";
      break;
    case "imagesTab":
      targetView = "imageList"
      break;
    default:
      throw new Error("Specified tab name does not correlate to any known view");
  }
  updateState({ currentView: targetView });
}

function truncateBlogEntry(blogText, numWords) {
  var blogWordsArr = blogText.split(" ");
  if (blogWordsArr.length > numWords) {
    return blogWordsArr.slice(0, numWords).join(" ") + "...";
  }
  return blogWordsArr.join(" ");
}
