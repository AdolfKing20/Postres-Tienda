fetch('/data.json')
  .then(res => res.json())
  .then(data => {
    const containProduct = document.getElementById("productos");

    data.forEach(product => {
      const article = document.createElement("article");

      article.innerHTML = `
 <div class="img-group">
            <img src="${product.image.mobile}" alt="${product.name}" class="img-contain">
            <button class="add-to-cart">
              <img src="assets/images/icon-add-to-cart.svg" alt="">
              Add to Cart</button>
          </div>
          <div class="text-group">
            <p>${product.category}</p>
            <h3>${product.name}</h3>
            <h4>${product.price.toFixed(2)}</h4>
          </div>
      `;

      containProduct.appendChild(article);
    });
  })
  .catch(error => console.error("Error al cargar los productos:", error));
