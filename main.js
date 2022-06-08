const getImages = (location, callback) => {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", location, true);
  xhr.responseType = 'document';
  xhr.onload = () => {
    const images = [];
    if (xhr.status === 200) {
      var elements = xhr.response.getElementsByTagName("a");
      for (x of elements) {
        if ( x.href.match(/\.(jpe?g|png|gif)$/) ) { 
            images.push(x.href);
        } 
      };

      callback(images);
    } 
    else {
      alert('Request failed. Returned status of ' + xhr.status);
    }
  }
  xhr.send()
}
  
const folder = '/img/Automotive';
getImages(folder, imgs => {
  const imgElement = document.querySelector('.img-grid');

  imgs.forEach(img => {
    const file = img.slice(img.indexOf(folder));
    imgElement.insertAdjacentHTML('afterbegin', `<img src=${file}>`);
  });

  console.log(document.querySelectorAll(".img-grid img"));

  document.querySelectorAll(".img-grid img").forEach(img => {
    img.addEventListener("mouseenter", () => {
      img.classList.add("hovered-img");
      img.parentElement.classList.add("hovered-child");
    });
    img.addEventListener("mouseleave", () => {
      img.classList.remove("hovered-img");
      img.parentElement.classList.remove("hovered-child");
    });
  });
});
