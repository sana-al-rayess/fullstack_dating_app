const home_container = document.getElementById("home-container");
const photo_container = document.getElementById("photo-container");
const addphotos_btn = document.getElementById("add-photos-btn");
const back_btn = document.getElementById("back-btn");

const editProfile_content = () => {
    home_container.classList.toggle("hide");
    photo_container.classList.toggle("hide");
}

addphotos_btn.addEventListener("click", editProfile_content);
back_btn.addEventListener("click", editProfile_content);

const galleryInput = document.getElementById("gallery");
const photoPreview = document.getElementById("photo-preview");

galleryInput.addEventListener("change", function() {
  // remove existing preview images
  while (photoPreview.firstChild) {
    photoPreview.removeChild(photoPreview.firstChild);
  }

  // loop through all selected files
  for (const file of this.files) {
    // create new image element
    const img = document.createElement("img");
    img.classList.add("preview-img");

    // set image source to file object URL
    img.src = URL.createObjectURL(file);

    // append image element to preview container
    photoPreview.appendChild(img);
  }
});
