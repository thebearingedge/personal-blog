/* eslint-disable no-undef */
var userNameElem = document.querySelector("#userName");
var aboutElem = document.querySelector("#about");
var ageElem = document.querySelector("#age");
var locationElem = document.querySelector("#location");
var genderElem = document.querySelector("#gender");
var profileImage = document.querySelector("#profileImage");
var tabNav = document.querySelector("#tabNav");
var contentContainer = document.querySelector("#contentContainer");
var blogListContainer = document.querySelector("#blogListContainer");
var imageListContainer = document.querySelector("#imageListContainer");
var modalElem = document.querySelector("#modal");
var imageModal = document.querySelector("#imageModal");
var blogModal = document.querySelector("#blogModal");
var imageForm = document.querySelector("#imageForm");
var blogForm = document.querySelector("#blogForm");
var addImageButton = document.querySelector("#addImageButton");
var addBlogButton = document.querySelector("#addBlogButton");
var dismissElems = document.querySelectorAll(".dismiss");

init();

function init() {
  tabNav.addEventListener("click", toggleTab);
  addBlogButton.addEventListener("click", showBlogModal);
  addImageButton.addEventListener("click", showImageModal);
  imageForm.addEventListener("submit", addImage);
  blogForm.addEventListener("submit", addBlog);

  for(var i = 0; i < dismissElems.length; i++){
    dismissElems[i].addEventListener("click", toggleModal);
  }
  updateProfile();
  createBlogList();
  createImageList();
  showBlogList();
}

function showBlogList(){
  imageListContainer.remove();
  contentContainer.append(blogListContainer);
}

function showImageList(){
  blogListContainer.remove();
  contentContainer.append(imageListContainer);
}

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
  }
  userData.images.push(newImageData);
  createImageListItem(newImageData);
  toggleModal();
  showImageList();
}

function addBlog(){
  var blogFormData = new FormData(blogForm);
  var newBlogData = {
    body: blogFormData.get("body")
  }
  userData.blogs.push(newBlogData);
  createBlogListItem(newBlogData);
  toggleModal();
  showBlogList();
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

function createBlogList() {
  for (var i = 0; i < userData.blogs.length; i++) {
    createBlogListItem(userData.blogs[i]);
  }
}

function createImageList() {
  for (var i = 0; i < userData.images.length; i++) {
    createImageListItem(userData.images[i]);
  }
}

function createBlogListItem(blog) {
  var blogElem = document.createElement("p");
  blogElem.classList.add("blog-list-entry")
  blogElem.textContent = blog.body;
  blogListContainer.prepend(blogElem);
}

function createImageListItem(image) {
  var imageElem = document.createElement("img");
  imageElem.setAttribute("src", image.url);
  imageElem.className = "col-3 mb-20 image image-list-item";
  imageListContainer.prepend(imageElem);
}

function toggleTab(event) {
  if(!event.target.className.includes("tab")){
    return;
  }

  document.querySelector(".active").classList.remove("active");
  event.target.classList.add("active");

  if(event.target.textContent === "Blog"){
    showBlogList();
  } else {
    showImageList();
  }
}
