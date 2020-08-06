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
var modalContainer = document.querySelector("#modalContainer");
var imageForm = document.querySelector("#imageForm");
var postForm = document.querySelector("#postForm");
var addImageButton = document.querySelector("#addImageButton");
var addPostButton = document.querySelector("#addPostButton");

init();

function init() {
  tabsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("tab")) {
      activateTab(event.target.dataset.content);
    }
  });
  addPostButton.addEventListener("click", function () {
    showModal("postModal");
  });
  addImageButton.addEventListener("click", function () {
    showModal("imageModal");
  });
  postForm.addEventListener("submit", addPost);
  imageForm.addEventListener("submit", addImage);
  modalContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("dismiss")) {
      hideModal();
    }
  });
  populateProfile();
  renderAllPosts();
  renderAllImages();
  activateTab("posts");
}

function addImage(event) {
  event.preventDefault();
  var imageFormData = new FormData(event.target);
  var newImageData = {
    url: imageFormData.get("url"),
  };
  userData.images.push(newImageData);
  var imageElement = renderImage(newImageData);
  imageGallery.prepend(imageElement);
  event.target.reset();
  hideModal();
  activateTab("imageGallery");
}

function addPost(event) {
  event.preventDefault();
  var postFormData = new FormData(event.target);
  var postData = {
    body: postFormData.get("body")
  };
  userData.posts.push(postData);
  var postElement = renderPost(postData);
  posts.prepend(postElement);
  event.target.reset();
  hideModal();
  activateTab("posts");
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

function renderAllPosts() {
  for (var i = 0; i < userData.posts.length; i++) {
    var postElement = renderPost(userData.posts[i]);
    posts.prepend(postElement);
  }
}

function renderAllImages() {
  for (var i = 0; i < userData.images.length; i++) {
    var imageElement = renderImage(userData.images[i]);
    imageGallery.prepend(imageElement);
  }
}

function renderPost(post) {
  var postElement = document.createElement("p");
  postElement.classList.add("post");
  postElement.textContent = post.body;
  return postElement;
}

function renderImage(image) {
  var imageElement = document.createElement("img");
  imageElement.setAttribute("src", image.url);
  imageElement.className = "col-3 mb-20 image image-gallery-item";
  return imageElement;
}

function activateTab(type) {
  for (var i = 0; i < tabsContainer.children.length; i++) {
    var tabsChild = tabsContainer.children[i];
    var contentChild = contentContainer.children[i];
    if (tabsChild.dataset.content === type) {
      tabsChild.classList.add("active");
      contentChild.classList.remove("hidden");
    } else {
      tabsChild.classList.remove("active");
      contentChild.classList.add("hidden");
    }
  }
}

function showModal(type) {
  modalContainer.classList.remove("hidden");
  for (var i = 0; i < modalContainer.children.length; i++) {
    var child = modalContainer.children[i];
    if (child.id === type) {
      child.classList.remove("hidden");
    } else {
      child.classList.add("hidden");
    }
  }
}

function hideModal() {
  modalContainer.classList.add("hidden");
}
