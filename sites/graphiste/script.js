const input = document.querySelectorAll(".drop-zone-input");
const deleteButton = document.querySelector(".delete-thumbnail");
const thumbnailPreview = document.querySelectorAll(".thumbnails")
const thubnameTitle = document.querySelectorAll(".info-title");

function reset() {
  let thumbnailElement = document.querySelector(".drop-zone-dropping");
  document.querySelector(".title-thumbnail").value = '';
  for (var i = 0; i < thubnameTitle.length; i++) {
    thubnameTitle[i].innerHTML = "This is the title of your video ! Put anything here !";
  }
  thumbnailElement.remove();
  document.querySelector(".drop-zone-promt").style.display = "flex";
  for (var i = 0; i < thumbnailPreview.length; i++) {
    thumbnailPreview[i].style.backgroundImage = null;
  }
}

function thumbnailTitle(input) {
  for (var i = 0; i < thubnameTitle.length; i++) {
    thubnameTitle[i].innerHTML = input.value;
  };

  if(input.value === ""){
    for (var i = 0; i < thubnameTitle.length; i++) {
      thubnameTitle[i].innerHTML = "This is the title of your video ! Put anything here !";
    };
  }

  if(input.value.length === 100){
    input.disabled = true;
  }
}


input.forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");
  
  dropZoneElement.addEventListener("click", (e) => { 
      inputElement.click();
  });
  
  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });
  
  dropZoneElement.addEventListener("dragover", (e) => { 
    e.preventDefault(); 
    dropZoneElement.classList.add("drop-zone-hover");
  });
    
  ["dragleave", "dragend"].forEach((type) => { 
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone-hover");
      });
  });
  
  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }
    dropZoneElement.classList.remove("drop-zone-hover");
  });
});

/*----------------------------------------------------------------*/

function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone-dropping");

  if (dropZoneElement.querySelector(".drop-zone-promt")) {
    dropZoneElement.querySelector(".drop-zone-promt").style.display = "none";
  }
  
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone-dropping");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = "Name : " + file.name;
  
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();reader.readAsDataURL(file);



    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;

      for (var i = 0; i < thumbnailPreview.length; i++) {
        thumbnailPreview[i].style.backgroundImage = `url('${reader.result}')`;
      }
    };
  }else {
    thumbnailElement.style.backgroundImage = null;
  }
}

/*----------------------------------------------------------------*/

function thumbnailBackground() {

  const backgroudMode = document.querySelectorAll(".web-content");
  const thumbnailsInfoTitle = document.querySelectorAll(".info-title");
  const thumbnailsInfoUser = document.querySelectorAll(".info-user");
  const thumbnailsInfoVideo = document.querySelectorAll(".info-video");
  const thumbnailCertif = document.querySelectorAll(".svg-certif");

  if (document.querySelector(".fa-moon").style.display === "flex") {
    document.querySelector(".fa-moon").style.display = "none";
    document.querySelector(".fa-lightbulb").style.display = "flex";

    thumbnailsInfoTitle.forEach((element1) =>{
      element1.style.color = "#030303";
    });

    thumbnailsInfoUser.forEach((element2) =>{
      element2.style.color = "#606060";
    }); 

    thumbnailsInfoVideo.forEach((element3) =>{
      element3.style.color = "#606060";
    }); 

    backgroudMode.forEach((element4) =>{
      element4.style.backgroundColor = "#fff"
    });

    thumbnailCertif.forEach((element5) =>{
      element5.style.fill = "#606060"
    });

    thumbnailPreview.forEach((element6) =>{
      element6.style.backgroundColor = "#e0e0e0"
    });

  }else {
    document.querySelector(".fa-moon").style.display = "flex";
    document.querySelector(".fa-lightbulb").style.display = "none";

    thumbnailsInfoTitle.forEach((element1) =>{
      element1.style.color = "#fff";
    });

    thumbnailsInfoUser.forEach((element2) =>{
      element2.style.color = "#acacac";
    }); 

    thumbnailsInfoVideo.forEach((element3) =>{
      element3.style.color = "#acacac";
    }); 

    backgroudMode.forEach((element4) =>{
      element4.style.backgroundColor = "#181818"
    });

    thumbnailCertif.forEach((element5) =>{
      element5.style.fill = "#acacac"
    });

    thumbnailPreview.forEach((element6) =>{
      element6.style.backgroundColor = "#303030"
    });
  }
}

/*------------------------------*/

function NavThumbnail(element) {
  document.querySelector('.ThumbnailTester').style.display = '';  
  document.querySelector('.EmotesTester').style.display = 'none';
  document.querySelector('.BannerAndLogoTester').style.display = 'none';
}

function NavBannerLogo(element) {
  document.querySelector('.ThumbnailTester').style.display = 'none';
  document.querySelector('.EmotesTester').style.display = 'none';
  document.querySelector('.BannerAndLogoTester').style.display = '';
}

function NavEmotes(element) {
  document.querySelector('.ThumbnailTester').style.display = 'none';
  document.querySelector('.BannerAndLogoTester').style.display = 'none';
  document.querySelector('.EmotesTester').style.display = '';
}