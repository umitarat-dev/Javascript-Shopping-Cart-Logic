
const taxRate = 0.18;
const shippingPrice = 15.00;

//! sabit verilerin (token, api key)localStorage ve sessionStorage'a key/value olarak kaydedilmesi
window.addEventListener("load", () => {
    // set item ile localStorage, süresiz, silinene kadar..
    localStorage.setItem('taxRate', taxRate);
    localStorage.setItem('shippingPrice', shippingPrice);
    // set item ile sessionStorage, oturum/browser süresince..
    sessionStorage.setItem('taxRate', taxRate);
    sessionStorage.setItem('shippingPrice', shippingPrice);
    
    //! add after func. coding
    calculateCartTotal();
})

//! capturing method
let productsDiv = document.querySelector(".products");
productsDiv.addEventListener("click", (e) => {
    // console.log(e.target);
    // console.log(e.target.className);
    // console.log(e.target.classList);

    // minus button clicked
    if (e.target.className == "minus"){
        if (e.target.nextElementSibling.innerText > 1) {
            // console.log("minus button clicked");
            e.target.nextElementSibling.innerText--;

            // calculate Product and Cart Total
            // passing selectedProductInfo as parameter
            calculateProductAndCartTotal(e.target.parentElement.parentElement);
        } 
        else {
            if (confirm("Are you sure you want to remove this product?")) {
            //* e.target.parentElement.parentElement.parentElement.remove();
            //! closest() ile kısa yoldan parent element'e erişim
            e.target.closest(".product").remove();
            calculateCartTotal();
            }
        }
    }

    // plus button clicked
    else if (e.target.classList.contains("plus")) {
        // console.log("plus button clicked");
        e.target.previousElementSibling.innerText++;
        calculateProductAndCartTotal(e.target.parentElement.parentElement);
    }

    // remove button clicked
    else if (e.target.classList.contains("remove-product")) {
        if (confirm("Are you sure you want to remove this product?")) {
            // console.log("remove button clicked");
            //* e.target.parentElement.parentElement.parentElement.remove();
            //! closest() ile kısa yoldan parent element'e erişim
            e.target.closest(".product").remove();
            calculateCartTotal();
        }
    }

    // other element clicked
    else {
        console.log("other button clicked");
    }
});


//! calculate product and cart totals;
const calculateProductAndCartTotal = (productInfoDiv) => {
    // product calculation
    // console.log(productInfoDiv);
    let price = productInfoDiv.querySelector("strong").innerText;
    let quantity = productInfoDiv.querySelector("#product-quantity").innerText;
    let productTotalDiv = productInfoDiv.querySelector(".product-line-price");
    productTotalDiv.innerText = (price * quantity).toFixed(2)

    // cart calculation
    calculateCartTotal()
}

//! calculate cart totals;
const calculateCartTotal = () => {
    let productTotalPriceDivs = document.querySelectorAll(".product-line-price")
    // console.log(productTotalPriceDivs);
    let subtotal = 0;
    productTotalPriceDivs.forEach((productTotalPriceDiv) => {
        subtotal += parseFloat(productTotalPriceDiv.innerText);
    });
    // console.log(subtotal);
    
    // tax calculation
    let taxPrice = subtotal * localStorage.getItem('taxRate');
    // console.log(taxPrice);
    
    // shipping calculation - subtotal > 0 ise shippingPrice, aksi halde 0
    // localStorage'dan shippingPrice'ı al ve parseFloat ile sayıya çevir
    let shippingPrice = subtotal > 0 ? parseFloat(localStorage.getItem('shippingPrice')) : 0 ;
    // console.log(shippingPrice);
    
    // cart total calculation
    let cartTotal = subtotal + taxPrice + parseFloat(shippingPrice);
    // console.log(cartTotal)

    //! hesaplanan değerlerin DOM'a yazdırılması; 
    // update the cart total in the DOM
    document.querySelector('#card-subtotal p:nth-child(2)').innerText = subtotal.toFixed(2);

    // update the tax total in the DOM
    document.querySelector('#card-tax p:nth-child(2)').innerText = taxPrice.toFixed(2);
    
    // update the shipping total in the DOM
    document.querySelector('#card-shipping p:nth-child(2)').innerText = shippingPrice.toFixed(2);
    
    // update the cart total in the DOM
    document.querySelector('#card-total').lastElementChild.innerText = cartTotal.toFixed(2);

}

