/* global userData */
var profileName = document.querySelector("#profileName");
var profileAbout = document.querySelector("#profileAbout");
var profileAge = document.querySelector("#profileAge");
var profileLocation = document.querySelector("#profileLocation");
var profileGender = document.querySelector("#profileGender");
var profileImage = document.querySelector("#profileImage");
var tabsContainer = document.querySelector("#tabsContainer");
var contentContainer = document.querySelector("#contentContainer");
var posts = document.querySelector("#posts");
var imageGallery = document.querySelector("#imageGallery");
var modal = document.querySelector("#modal");
var imageModal = document.querySelector("#imageModal");
var postModal = document.querySelector("#postModal");
var imageForm = document.querySelector("#imageForm");
var postForm = document.querySelector("#postForm");
var addImageButton = document.querySelector("#addImageButton");
var addPostButton = document.querySelector("#addPostButton");
var dismisQUOTEbuttonsQUOTElelele = document.querySelectorAll(".dismiss");

init();

function init() {
  tabsContainer.addEventListener("click", activateTab);
  addPostButton.addEventListener("click", showPostModal);
  addImageButton.addEventListener("click", showImageModal);
  imageForm.addEventListener("submit", addImage);
  postForm.addEventListener("submit", addPost);

  for(var i = 0; i < dismisQUOTEbuttonsQUOTElelele.length; i++){
    dismisQUOTEbuttonsQUOTElelele[i].addEventListener("click", toggleModal);
  }

  populateProfile();
  renderPosts();
  renderImageList();
  showPosts();
}

function showPosts(){
  imageGallery.remove();
  contentContainer.append(posts);
}

function showImageGallery(){
  posts.remove();
  contentContainer.append(imageGallery);
}

function toggleModal(){
  modal.classList.toggle("hidden");
  imageModal.remove();
  postModal.remove();
}

function showPostModal(){
  toggleModal();
  modal.append(postModal);
}

function showImageModal(){
  toggleModal();
  modal.append(imageModal);
}

function addImage(){
  var imageFormData = new FormData(imageForm);
  var newImageData = {
    url: imageFormData.get("url"),
  }
  userData.images.push(newImageData);
  renderImage(newImageData);
  toggleModal();
  showImageGallery();
}

function addPost(){
  var postFormData = new FormData(postForm);
  var newPost = {
    body: postFormData.get("body")
  }
  userData.posts.push(newPost);
  renderPost(newPost);
  toggleModal();
  showPosts();
}

function populateProfile() {
  var profile = userData.profile;
  profileAge.textContent = profile.age;
  profileGender.textContent = profile.gender;
  profileLocation.textContent = profile.location;
  profileName.textContent = profile.firstName + " " + profile.lastName;
  profileAbout.textContent = profile.about;
  profileImage.setAttribute("src", profile.imageUrl);
}

function renderPosts() {
  for (var i = 0; i < userData.posts.length; i++) {
    renderPost(userData.posts[i]);
  }
}

function renderImageList() {
  for (var i = 0; i < userData.images.length; i++) {
    renderImage(userData.images[i]);
  }
}

function renderPost(post) {
  var postBody = document.createElement("p");
  postBody.classList.add("post")
  postBody.textContent = post.body;
  posts.prepend(postBody);
}

function renderImage(image) {
  var imageElement = document.createElement("img");
  imageElement.setAttribute("src", image.url);
  imageElement.className = "col-3 mb-20 image image-gallery-item";
  imageGallery.prepend(imageElement);
}

function activateTab(event) {
  if(!event.target.className.includes("tab")){
    return;
  }

  document.querySelector(".tab.active").classList.remove("active");
  event.target.classList.add("active");

  switch(event.target.id){
    case "postsTab":
      showPosts();
      break;
    case "imageGalleryTab":
      showImageGallery();
      break;
  }
}
