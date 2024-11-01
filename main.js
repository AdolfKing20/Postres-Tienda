fetch("/data.json")
  .then((res) => res.json())
  .then((data) => {
    const containProduct = document.getElementById("productos");

    data.forEach((product, index) => {
      const article = document.createElement("article");

      product.id = index;
      product.quantity = 1; // Inicializa la cantidad

      article.innerHTML = `
      <div class="img-group">
        <img src="${product.image.mobile}" alt="${product.name}" class="img-contain">
        <button class="add-to-cart" data-id="${product.id}" id="add-to-cart">
          <img src="assets/images/icon-add-to-cart.svg" alt="">
          Add to Cart
        </button>
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
    const opcion1 = document.getElementById("opcion1")
        const opcion2 = document.getElementById("opcion2")
   
    addCart.forEach((boton) => {
      boton.addEventListener("click", () => {
        const productId = parseInt(boton.getAttribute("data-id"));
        const producto = data.find((p) => p.id === productId);
        
    

        if (producto) {
          // Verifica si el producto ya está en el carrito
          const itemInCart = cart.find((item) => item.id === producto.id);

          if (itemInCart) {
            // Si ya está en el carrito, incrementa la cantidad
            itemInCart.quantity += 1;
          } else {
            // Si no está, agrégalo con cantidad inicial de 1
            cart.push({ ...producto });
          }

          renderCart();
        }
        
      });
    });

    function renderCart() {
      const cartList = document.getElementById("cart-list");
      cartList.innerHTML = "";
      
      let totalQuantity = 0;
      let totalPrice = 0;
     

   
      cart.forEach((item) => {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;

        const lista = document.createElement("li");
        lista.classList.add("li-group");

        lista.innerHTML = `
          <div class="tabla">
            <h3>${item.name}</h3>
            <h4><span>${item.quantity}x</span> @ $${item.price.toFixed(2)} <span class="price-total">$${(item.price * item.quantity).toFixed(2)}</span></h4>
          </div>
          <button class="remove" data-id="${item.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
          </button>
        `;

        lista.querySelector(".remove").addEventListener("click", () => {
          removedorDelItem(item.id);
        });
        cartList.appendChild(lista);
      });

      document.getElementById("contador").innerHTML = `(${totalQuantity})`;
      document.getElementById("total-price").innerHTML = `$${totalPrice.toFixed(2)}`;
      if(cart.length < 1){
        opcion1.classList.add("active")
        opcion2.classList.add("inactive")
      } else{
        opcion1.classList.add("inactive")
        opcion2.classList.remove("inactive")
      }
    }

    function removedorDelItem(productId){
      
      const productIndex = cart.findIndex((item) => item.id === productId);


      if (productIndex !== -1){
        const product = cart[productIndex]
        if(product.quantity > 1){
          product.quantity -= 1
        } else {
          cart.splice(productIndex, 1)
        }
        renderCart()
      }
    }
  })
  .catch((error) => console.error("Error al cargar los productos:", error));
