fetch("/data.json")
  .then((res) => res.json())
  .then((data) => {
    const containProduct = document.getElementById("productos");

    data.forEach((product, index) => {
      const article = document.createElement("article");

      product.id = index;

      article.innerHTML = `
    <div class="img-group">
                <img src="${product.image.mobile}" alt="${
        product.name
      }" class="img-contain">
                <button class="add-to-cart" data-id="${product.id}" id="add-to-cart">
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
    const addCart = document.querySelectorAll(".add-to-cart");
      const cart = [];

      addCart.forEach((boton) => {
        boton.addEventListener("click", () => {
          const productId = parseInt(boton.getAttribute("data-id"));
          const producto = data.find((p) => p.id === productId);

          if (producto) {
            cart.push(producto);
            redenderCart();
            console.log(cart);
          }
        });
      });

      function redenderCart() {
       const cartList = document.getElementById("cart-list")
       cartList.innerHTML = ""

      cart.forEach((item) =>{
        const lista = document.createElement("li");
        lista.classList.add("li-group");

        const contador = document.getElementById("contador")

        const cantidad = cart.reduce((acc, actual) => acc + 1, 0);

        contador.innerHTML = `(${cantidad})`


        const sumaprice = cart.reduce((acc, actual) => acc + item.price, item.price)
        document.getElementById("total-price").innerHTML = `$${sumaprice.toFixed(2)}`;
        lista.innerHTML = `
          <div class="tabla">
            <h3>${item.name}</h3>
            <h4><span>1x</span> @ $${item.price.toFixed(2)} <span class="price-total">$${sumaprice}</span></h4>
          </div>
          <button class="remove">x</button>
        `;

        cartList.appendChild(lista)
      })

      }
  })
  .catch((error) => console.error("Error al cargar los productos:", error));
