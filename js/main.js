/* global userData */
var profileName = document.querySelector("#profileName");
var profileAbout = document.querySelector("#profileAbout");
var profileAge = document.querySelector("#profileAge");
var profileLocation = document.querySelector("#profileLocation");
var profileGender = document.querySelector("#profileGender");
var profileImage = document.querySelector("#profileImage");
var tabsContainer = document.querySelector("#tabsContainer");
var contentContainer = document.querySelector("#contentContainer");
var articles = document.querySelector("#articles");
var imageGallery = document.querySelector("#imageGallery");
var modal = document.querySelector("#modal");
var imageModal = document.querySelector("#imageModal");
var articleModal = document.querySelector("#articleModal");
var imageForm = document.querySelector("#imageForm");
var articleForm = document.querySelector("#articleForm");
var addImageButton = document.querySelector("#addImageButton");
var addArticleButton = document.querySelector("#addArticleButton");
var dismisQUOTEbuttonsQUOTElelele = document.querySelectorAll(".dismiss");

init();

function init() {
  tabsContainer.addEventListener("click", activateTab);
  addArticleButton.addEventListener("click", showArticleModal);
  addImageButton.addEventListener("click", showImageModal);
  imageForm.addEventListener("submit", addImage);
  articleForm.addEventListener("submit", addArticle);

  for(var i = 0; i < dismisQUOTEbuttonsQUOTElelele.length; i++){
    dismisQUOTEbuttonsQUOTElelele[i].addEventListener("click", toggleModal);
  }

  populateProfile();
  renderArticles();
  renderImageList();
  showArticles();
}

function showArticles(){
  imageGallery.remove();
  contentContainer.append(articles);
}

function showImageGallery(){
  articles.remove();
  contentContainer.append(imageGallery);
}

function toggleModal(){
  modal.classList.toggle("hidden");
  imageModal.remove();
  articleModal.remove();
}

function showArticleModal(){
  toggleModal();
  modal.append(articleModal);
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

function addArticle(){
  var articleFormData = new FormData(articleForm);
  var newArticle = {
    body: articleFormData.get("body")
  }
  userData.articles.push(newArticle);
  renderArticle(newArticle);
  toggleModal();
  showArticles();
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

function renderArticles() {
  for (var i = 0; i < userData.articles.length; i++) {
    renderArticle(userData.articles[i]);
  }
}

function renderImageList() {
  for (var i = 0; i < userData.images.length; i++) {
    renderImage(userData.images[i]);
  }
}

function renderArticle(article) {
  var articleBody = document.createElement("p");
  articleBody.classList.add("article")
  articleBody.textContent = article.body;
  articles.prepend(articleBody);
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
    case "articlesTab":
      showArticles();
      break;
    case "imageGalleryTab":
      showImageGallery();
      break;
  }
}
