
  const API_URL = "https://picsum.photos/v2/list?page=1&limit=5";

  document.addEventListener("DOMContentLoaded", async () => {
    const mainImage = document.getElementById("mainImage");
    const thumbnails = document.getElementById("thumbnails");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const addToCartButton = document.getElementById("addToCart"); 
    const toast = document.getElementById("toast"); 
  

    let images = [];
    let currentIndex = 0;

    try {
      const response = await fetch(API_URL);
      images = await response.json();

      if (images.length) {
        mainImage.src = images[0].download_url;

        images.forEach((image, index) => {
          const thumbnail = document.createElement("img");
          thumbnail.src = image.download_url;
          thumbnail.alt = `Thumbnail ${index + 1}`;
          thumbnail.dataset.index = index;
          thumbnail.addEventListener("click", () => updateMainImage(index));
          thumbnails.appendChild(thumbnail);
        });

        updateThumbnails();
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }

    const updateMainImage = (index) => {
      currentIndex = index;
      mainImage.src = images[currentIndex].download_url;
      updateThumbnails();
    };

    const updateThumbnails = () => {
      [...thumbnails.children].forEach((thumb, index) => {
        thumb.classList.toggle("active", index === currentIndex);
      });
    };

    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateMainImage(currentIndex);
    });

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateMainImage(currentIndex);
    });
      
  addToCartButton.addEventListener("click", () => {
    showToast("Item added to cart!");
  });

  
  function showToast(message) {
    toast.textContent = message;

   
    toast.classList.remove("hidden");
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
      toast.classList.add("hidden");
    }, 3000);
  }
});
  

