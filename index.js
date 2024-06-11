// All the selectors
const addToCart = document.getElementsByClassName('addButton')
const incrementDecrementButton = document.getElementsByClassName('sign')
const itemQuantity = document.getElementsByClassName('itemQuantity')
const cartNotification = document.getElementsByClassName('cartNotification')
const cartImg = document.getElementsByClassName('cartImg')
const exitCard = document.getElementsByClassName('exitCard')
const overlay = document.getElementsByClassName('overlay')
const userPart = document.getElementsByClassName('userPart')
const exitCardContainer = document.getElementsByClassName('exitCardContainer')
const thumbnailImg = document.getElementsByClassName('thumbnailImg')
const imageTodisplay = document.getElementsByClassName('imageTodisplay')
const iconClose = document.getElementsByClassName('iconClose')
const menuIcon = document.querySelector('.menuIcon')
const navCart = document.querySelector('.navCart')
const closeNav = document.querySelector('.closeNav')
const mainImg = document.querySelector('.mainImg')
const previousImage = document.querySelector('.previousImage')
const nextImage = document.querySelector('.nextImage')

let quantity = 0

let imgArray = [
  'images/image-product-1.jpg',
  'images/image-product-2.jpg',
  'images/image-product-3.jpg',
  'images/image-product-4.jpg',
]

// Evenlisteners for increasing and decreasing quantity
incrementDecrementButton[0].addEventListener('click', () => {
  let quantityToShow = --quantity
  if (quantityToShow < 0) {
    quantity = 0
  } else {
    itemQuantity[0].innerText = quantityToShow
  }
})
incrementDecrementButton[1].addEventListener('click', () => {
  let quantityToShow = ++quantity
  itemQuantity[0].innerText = quantityToShow
})

// Adding eventListener to add to cart button
addToCart[0].addEventListener('click', () => {
  cartNotification[0].innerText = itemQuantity[0].innerText
  cartNotification[0].style.display = 'block'
})

//Function to add eventListener to cart Image
cartImg[0].addEventListener('click', () => {
  if (cartNotification[0].innerText != 0) {
    exitCardContainer[0].innerHTML = `<div class="exitCard">
                        <div class="cartheading">Cart</div>
                        <div class="productDetail">
                            <img src="images/image-product-1-thumbnail.jpg" alt="imageLogo" class="imgproduct">
                            <div>
                            <p>Fall Limited Edition Sneakers</p>
                            <p>$125.00 * <span class="quantityNo">3</span> <span class="totalCost">$375.00</span></p>
                            </div>
                            <img src="images/icon-delete.svg" alt="" class= "iconDelete">
                        </div>
                        <button>Checkout</button>
                    </div>
      `
    const quantityNo = document.getElementsByClassName('quantityNo')
    const totalCost = document.getElementsByClassName('totalCost')
    quantityNo[0].innerText = itemQuantity[0].innerText
    totalCost[0].innerText = `$${250 * itemQuantity[0].innerText}`

    exitCard[0].style.display = 'block'
    overlay[0].classList.remove('hidden')
    // Adding event-Listener to delete button
    document
      .getElementsByClassName('iconDelete')[0]
      .addEventListener('click', (event) => {
        // Preventing the click event from bubbling up to the overlay
        event.stopPropagation()

        // Replacing the cart content with the empty cart message
        exitCardContainer[0].innerHTML = `<div class="exitCard">
                      <div class="cartheading">Cart</div>
                      <p class="emptyClass">Your card is empty</p>
                  </div>
    `

        exitCard[0].style.display = 'block'
        overlay[0].classList.remove('hidden')

        cartNotification[0].innerText = 0
      })
  } else {
    exitCardContainer[0].innerHTML = `<div class="exitCard">
                        <div class="cartheading">Cart</div>
                        <p class="emptyClass">Your card is empty</p>
                    </div>
      `

    exitCard[0].style.display = 'block'
    overlay[0].classList.remove('hidden')
  }

  // adding eventListener to overlay div
  overlay[0].addEventListener('click', () => {
    if (exitCard[0].style.display === 'block') {
      exitCard[0].style.display = 'none'
      overlay[0].classList.add('hidden')
    } else return
  })
})

// Adding function to close the exitcard if user press escape key
document.addEventListener('keydown', (e) => {
  if (e.key == 'Escape' && !overlay[0].classList.contains('hidden')) {
    overlay[0].classList.add('hidden')
    exitCard[0].style.display = 'none'
  }
})

// Function to add eventListener to thumbnail Images to show big pictures--
thumbnailImg[0].addEventListener('click', (e) => {
  overlay[0].classList.remove('hidden')
  e.preventDefault()
  imageTodisplay[0].innerHTML = `
  <div class="imagePartDisplay">
  <img src="images/icon-close.svg" alt="" class= "iconClose">
  <img src="images/icon-previous.svg" alt="" class="iconPrevious">
  <img src="images/icon-next.svg" alt="" class="iconNext">
                <div class="fgDisplay">
                 <div class="mainImage">
                   <img src="${e.target.alt}" class= "mainImageimagePart">
                 </div>
                 <div class="thumbnailImgDisplay">
                 <img src="images/image-product-1-thumbnail.jpg" alt="/images/image-product-1.jpg">
                 <img src="images/image-product-2-thumbnail.jpg" alt="/images/image-product-2.jpg">
                 <img src="images/image-product-3-thumbnail.jpg" alt="/images/image-product-3.jpg">
                 <img src="images/image-product-4-thumbnail.jpg" alt="/images/image-product-4.jpg">
                 </div>
                </div>
            
            </div>
            `

  //Adding event Listener to closeButton-
  document.querySelector('.iconClose').addEventListener('click', () => {
    const imagePartDisplay = document.querySelector('.imagePartDisplay')
    imagePartDisplay.style.display = 'none'
    overlay[0].classList.add('hidden')
  })

  let mainImageimagePart = document.querySelector('.mainImageimagePart')
  let thumbnailImgDisplay = document.querySelector('.thumbnailImgDisplay')

  //Added eventListener to thumbnails to change mainDisplay when clicked
  thumbnailImgDisplay.addEventListener('click', (e) => {
    mainImageimagePart.src = e.target.alt
  })

  //Adding eventListener to next button
  document.querySelector('.iconNext').addEventListener('click', () => {
    let slicedUrl = mainImageimagePart.src.slice(-20)
    let properUrl = `images${slicedUrl}`
    let currIndex = imgArray.indexOf(properUrl)
    if (currIndex === 3) {
      mainImageimagePart.src = imgArray[0]
    } else {
      mainImageimagePart.src = imgArray[currIndex + 1]
    }
  })

  //Adding eventListeners to previous button when clicked
  document.querySelector('.iconPrevious').addEventListener('click', () => {
    let slicedUrl = mainImageimagePart.src.slice(-20)
    let properUrl = `images${slicedUrl}`
    let currIndex = imgArray.indexOf(properUrl)
    if (currIndex === 0) {
      mainImageimagePart.src = imgArray[3]
    } else {
      mainImageimagePart.src = imgArray[currIndex - 1]
    }
  })
})

//Adding eventListener to menuIcon
menuIcon.addEventListener('click', () => {
  navCart.classList.add('showCard')
})

//Adding eventListener to closeNav
closeNav.addEventListener('click', () => {
  navCart.classList.remove('showCard')
})

//Adding eventlistener to the previous image when viewing mobile device
previousImage.addEventListener('click', () => {
  let slicedUrl = mainImg.src.slice(-20)
  let properUrl = `images${slicedUrl}`
  let currIndex = imgArray.indexOf(properUrl)
  if (currIndex === 0) {
    mainImg.src = imgArray[3]
  } else {
    mainImg.src = imgArray[currIndex - 1]
  }
})

//Adding eventlistener to the next image when viewing mobile device
nextImage.addEventListener('click', () => {
  let slicedUrl = mainImg.src.slice(-20)
  let properUrl = `images${slicedUrl}`
  let currIndex = imgArray.indexOf(properUrl)
  if (currIndex === 3) {
    mainImg.src = imgArray[0]
  } else {
    mainImg.src = imgArray[currIndex + 1]
  }
})
