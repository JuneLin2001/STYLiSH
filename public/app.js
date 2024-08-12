const requestOptions = {
  method: "GET",
  redirect: "follow",
};
const baseUrl = "https://api.appworks-school.tw/api/1.0/products";
const categoriesUrl = {
  women: `${baseUrl}/women`,
  men: `${baseUrl}/men`,
  accessories: `${baseUrl}/accessories`,
  logo: `${baseUrl}/all`,
};
const productList = document.querySelector(".products-list");
const searchBtnMobile = document.getElementById("search-btn-mobile");
const searchBarMobile = document.querySelector(".search");
const logoMobile = document.querySelector("#logo");
const headerRight = document.querySelector(".header-right");
let currentPage = 0;
let hasMoreData = true;
document.getElementById("women").addEventListener("click", handleClick);
document.getElementById("men").addEventListener("click", handleClick);
document.getElementById("accessories").addEventListener("click", handleClick);
document.querySelector("#logo").addEventListener("click", handleClick);
document.getElementById("search-btn").addEventListener("click", searchClick);
document
  .getElementById("search-btn-mobile")
  .addEventListener("click", searchClickMobile);
document.addEventListener("click", searchClickMobile);

// 點擊分類
function handleClick(event) {
  hasMoreData = true;
  const target = event.target;
  const id = target.id;
  const url = categoriesUrl[id];
  history.pushState({ url }, "", id === "logo" ? "." : `?category=${id}`);
  document.querySelector(".products-list").innerHTML = "";
  fetchData(url, false);
}

// 獲取當前頁面的 URL
function getCurrentUrl() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category") || "logo";
  const keyword = params.get("search");
  let url;
  if (keyword) {
    url = `${baseUrl}/search?keyword=${keyword}`;
  } else {
    url = categoriesUrl[category] || categoriesUrl.logo;
  }
  return url;
}

// 載入資料
function fetchData(url, usePaging = true) {
  const fullUrl = usePaging ? `${url}?paging=${currentPage}` : url;
  console.log("Fetching data from:", fullUrl);
  productList.insertAdjacentHTML(
    "beforeend",
    `<div class="loading-message"><h1>Loading</h1><br /><img src="./images/loading.gif" style="width:200px" /></div>`
  );

  if (hasMoreData) {
    ajax(fullUrl).then((data) => {
      if (data.data.length === 0) {
        hasMoreData = false;
        productList.insertAdjacentHTML(
          "beforeend",
          `<h1 style="grid-column: 1 / -1; margin: 0 auto;">查無結果</h1>`
        );
        document
          .querySelectorAll(".loading-message")
          .forEach((message) => message.remove());
        productList.insertAdjacentHTML();
      } else {
        render(data);
        document
          .querySelectorAll(".loading-message")
          .forEach((message) => message.remove());
        if (data.next_paging === undefined) {
          hasMoreData = false;
        } else {
          currentPage = data.next_paging;
        }
      }
    });
  }
}

// 加載頁面時根據 URL 參數顯示相應內容
window.addEventListener("load", () => {
  const url = getCurrentUrl();
  fetchData(url, !url.includes("search") && !url.includes("category"));
  updateCartDisplay();
});

window.addEventListener("popstate", (event) => {
  if (event.state && event.state.url) {
    fetchData(
      event.state.url,
      !event.state.url.includes("search") &&
        !event.state.url.includes("category")
    );
  }
});
function searchClick() {
  const keyword = document.getElementById("search-value").value.trim();
  if (keyword === "") {
    alert("請輸入關鍵字！");
    return;
  } else {
    const url = `${baseUrl}/search?keyword=${keyword}`;
    history.pushState({}, "", `?search=${keyword}`);
    fetchData(url, false); // 現在搜尋商品結果不會出現超過兩頁，所以就不使用paging
  }
}

function searchClickMobile(event) {
  const target = event.target;
  if (target === searchBtnMobile) {
    searchBarMobile.style.display = "block";
    searchBtnMobile.style.display = "none";
    logoMobile.style.display = "none";
    headerRight.style.display = "flex";
    searchBarMobile.classList.toggle("search-mobile");
  } else {
    // 點擊的不是search-mobile
    if (
      window.matchMedia("(max-width: 1279px)").matches &&
      !searchBarMobile.contains(event.target)
    ) {
      searchBarMobile.classList.remove("search-mobile");
      searchBarMobile.style.display = "none";
      searchBtnMobile.style.display = "flex";
      logoMobile.style.display = "flex";
      headerRight.style.display = "none";
    }
  }
}

function ajax(url) {
  return fetch(url, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function render(data) {
  const productData = data.data;
  let apiResult = "";

  productData.forEach((product) => {
    let colorHTML = "";
    product.colors.forEach((color) => {
      colorHTML += `<li style="background-color: #${color.code};"></li>`;
    });
    apiResult += `
      <li class="products ${product.category}">
      <a href= /product.html?id=${product.id}>
          <img class="product-img" src="${product.main_image}" alt="${product.title}"/>
          <ul class="product-color">${colorHTML}</ul>
          <p class="product-name">${product.title}</p>
          <p class="product-price">TWD.${product.price}</p>
          </a>
      </li>`;
  });

  productList.insertAdjacentHTML("beforeend", apiResult);
}

// Infinite Scroll
function checkScroll() {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    hasMoreData
  ) {
    const url = getCurrentUrl();
    fetchData(url, !url.includes("search") && !url.includes("category")); // 根據URL決定是否使用分頁
  }
}
setInterval(checkScroll, 500); // 每 0.5 秒檢查一次，讓網站不要一次渲染十次甚至九次

// Carousel
let currentIndex = 0; // Carousel初始為第一個

function startCarousel(totalItems) {
  showNextItem();
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalItems;
    showNextItem();
  }, 5000); // 每 5 秒切換一次
}

function showNextItem() {
  const items = document.querySelectorAll(".carousel-item");
  const dots = document.querySelectorAll(".carousel-dot");

  items.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.style.backgroundColor = "#8B572A";
      dot.style.opacity = "1";
    } else {
      dot.style.backgroundColor = "#FFFFFF";
      dot.style.opacity = "0.4";
    }
  });
}

// 確保在 DOM 加載完成後啟動輪播圖
document.addEventListener("DOMContentLoaded", () => {
  const totalItems = document.querySelectorAll(".carousel-item").length;
  if (totalItems > 0) {
    startCarousel(totalItems);
  }
});

window.addEventListener("popstate", (event) => {
  if (event.state && event.state.url) {
    fetchData(event.state.url, false);
  }
});

function renderCarousel(data) {
  let apiResult = "";
  const carouselData = data.data;

  carouselData.forEach((product, index) => {
    // 使用正則表達式將最後一行獨立出來
    const storyParts = product.story.split(/\r\n|\n/);
    const storyText = storyParts.slice(0, -1).join("<br />"); // 取除最後一行外的內容
    const lastLine = storyParts[storyParts.length - 1]; // 最後一行

    apiResult += `<div class="carousel-item" id="item-${index}">
      <a href= /product.html?id=${product.product_id}>
      <img src="${product.picture}" />
      <div class="carousel-title-container">
        <p class="carousel-title">
          ${storyText}
          <br />
          <span class="carousel-subtitle">${lastLine}</span>
        </p>
      </div>
      </a>
    </div>`;
  });
  // 生成對應數量的 li
  let dots = `<ul class="carousel-dots">`;
  for (let i = 0; i < carouselData.length; i++) {
    dots += `<li class="carousel-dot"></li>`;
  }
  dots += `</ul>`;

  // 將 carousel 項目和 dots 合併到最終結果中
  apiResult += dots;

  const carouselContainer = document.querySelector("#carousel");
  carouselContainer.insertAdjacentHTML("beforeend", apiResult);

  // 當點擊圓點時，切換相對應的圖片
  const carouselDots = document.querySelectorAll(".carousel-dot");
  carouselDots.forEach((carouselDots, index) => {
    carouselDots.addEventListener("click", () => {
      currentIndex = index;
      showNextItem();
    });
  });

  startCarousel(carouselData.length);
}

function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  document.querySelector(".cart-num").textContent = totalQuantity;
  document.querySelector(".footer-cart-num").textContent = totalQuantity;
}

const url = "https://api.appworks-school.tw/api/1.0/marketing/campaigns";

ajax(url).then((data) => {
  renderCarousel(data);
});
