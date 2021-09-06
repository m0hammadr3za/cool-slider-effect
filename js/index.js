const colorMatrix = document.querySelector("#svg-animation").children[0].children[2]
const slider = document.querySelector(".slider")
const sliderPrev = document.querySelector("#slider-prev")
const sliderPlay = document.querySelector("#slider-play")
const sliderStop = document.querySelector("#slider-stop")
const sliderNext = document.querySelector("#slider-next")
const singInUp = document.querySelector(".sign-in-up")
const headerDescriptionBtn = document.querySelector("header .description button")
const menuIcon = document.querySelector(".menu-icon")
const goBackIcon = document.querySelector(".go-back-icon")
const nav = document.querySelector("nav")

let transforming = false
let sliderState = "play"
let touchStartPosition
let menuState = "close"

const tanjiroThemeColor = "#32d489",
    nezukoThemeColor = "#FF65C7",
    zenitsuThemeColor = "#FADA6F",
    inosukeThemeColor = "#659FD6"
const controlsInactiveOpacity = "0.7",
    controlsActiveOpacity = "1"

setSlidesPosition()
sliderOnPlay()
sliderNext.addEventListener("click", () => {
    if (sliderState === "play") {
        sliderPlay.children[0].style.opacity = controlsInactiveOpacity
        sliderStop.children[0].style.opacity = controlsActiveOpacity
        sliderState = "pause"
    }
    slideNext()
})
sliderPrev.addEventListener("click", () => {
    if (sliderState === "play") {
        sliderPlay.children[0].style.opacity = controlsInactiveOpacity
        sliderStop.children[0].style.opacity = controlsActiveOpacity
        sliderState = "pause"
    }
    slidePrev()
})
sliderPlay.addEventListener("click", () => {
    if (sliderState === "play") return
    else {
        sliderState = "play"
        sliderOnPlay()
    }
})
sliderStop.addEventListener("click", () => {
    if (sliderState === "pause") return
    sliderPlay.children[0].style.opacity = controlsInactiveOpacity
    sliderStop.children[0].style.opacity = controlsActiveOpacity
    sliderState = "pause"
})
menuIcon.addEventListener("click", openMenu)
goBackIcon.addEventListener("click", closeMenu)
slider.addEventListener("touchstart", handleTouchStart)
slider.addEventListener("touchend", handleTouchEnd)
window.addEventListener("resize", setChangesOnResize)

function setChangesOnResize() {
    if (window.innerWidth < 900) {
        if (menuState === "open") nav.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
        nav.style.display = "none"
        nav.style.position = "fixed"
        nav.children[1].style.transform = "translateX(-100%)"
        chooseThemeColor(slider.children[1].className)
    } else {
        nav.style.backgroundColor = "transparent"
        nav.style.display = "flex"
        nav.style.position = "static"
        nav.children[1].style.transform = "translateX(0)"
        if (sliderState === "pause") {
            sliderPlay.children[0].style.opacity = controlsInactiveOpacity
            sliderStop.children[0].style.opacity = controlsActiveOpacity
        }
        chooseThemeColor(slider.children[1].className)
        singInUp.children[0].children[0].style.color = "#fff"
        singInUp.children[0].children[1].style.color = "#fff"
    }
}

function sliderOnPlay() {
    if (transforming) return
    sliderStop.children[0].style.opacity = controlsInactiveOpacity
    sliderPlay.children[0].style.opacity = controlsActiveOpacity
    const autoSlide = setInterval(() => {
        if (sliderState === "pause") clearInterval(autoSlide)
        else slideNext()
    }, 3000)
}

function setSlidesPosition() {
    let slideLeftPosition = -100
    const lastSlide = slider.children[slider.children.length - 1]
    slider.removeChild(lastSlide)
    slider.insertBefore(lastSlide, slider.children[0])
    slider.children[1].style.opacity = "1"
    for (let slide of slider.children) {
        slide.style.left = `${slideLeftPosition}%`
        slideLeftPosition += 100
    }
}

function openMenu() {
    menuState = "open"
    nav.style.display = "block"
    const fadeInNavBg = setTimeout(() => {
        nav.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
        nav.children[1].style.transform = "translateX(0)"
        clearTimeout(fadeInNavBg)
    }, 0)
}

function closeMenu() {
    menuState = "close"
    nav.children[1].style.transform = "translateX(-100%)"
    const fadeOutNavBg = setTimeout(() => {
        nav.style.backgroundColor = "rgba(0, 0, 0, 0)"
        clearTimeout(fadeOutNavBg)

        const closeMenu = setTimeout(() => {
            nav.style.display = "none"
            clearTimeout(closeMenu)
        }, 450)
    }, 50)
}

function handleTouchStart(e) {
    touchStartPosition = e.touches[0].screenX
}

function handleTouchEnd(e) {
    positionChange = e.changedTouches[0].screenX - touchStartPosition
    if (positionChange <= -50) {
        sliderState = "pause"
        slideNext()
    } else if (positionChange >= 50) {
        sliderState = "pause"
        slidePrev()
    }
}

function slideNext() {
    if (transforming) return
    transforming = true

    const changeColorsDelay = setTimeout(() => {
        changeThemeColor("next")
        clearTimeout(changeColorsDelay)
    }, 250)

    slider.children[1].style.animation = "next-slide-out 1s forwards"
    slider.children[2].style.animation = "next-slide-in 1s forwards"

    setStartAnimation()

    const startSecondaryAnimation = setTimeout(() => {
        setFinishAnimation()
        clearTimeout(startSecondaryAnimation)
    }, 250)

    const transformFinished = setTimeout(() => {
        slider.children[1].style.left = "-100%"
        slider.children[1].style.opacity = "0"
        slider.children[1].style.animation = null

        slider.children[2].style.left = "0"
        slider.children[2].style.opacity = "1"
        slider.children[2].style.animation = null

        const firstSlide = slider.children[0]
        firstSlide.remove()
        slider.append(firstSlide)

        transforming = false
        clearTimeout(transformFinished)
    }, 1000)
}

function slidePrev() {
    if (transforming) return
    transforming = true

    const changeColorsDelay = setTimeout(() => {
        changeThemeColor("prev")
        clearTimeout(changeColorsDelay)
    }, 250)

    slider.children[1].style.animation = "prev-slide-out 1s forwards"
    slider.children[0].style.animation = "prev-slide-in 1s forwards"

    setStartAnimation()

    const startSecondaryAnimation = setTimeout(() => {
        setFinishAnimation()
        clearTimeout(startSecondaryAnimation)
    }, 250)

    const transformFinished = setTimeout(() => {
        slider.children[1].style.left = "100%"
        slider.children[1].style.opacity = "0"
        slider.children[1].style.animation = null

        slider.children[0].style.left = "0"
        slider.children[0].style.opacity = "1"
        slider.children[0].style.animation = null

        const lastSlide = slider.children[slider.children.length - 1]
        lastSlide.remove()
        slider.insertBefore(lastSlide, slider.children[0])

        transforming = false
        clearTimeout(transformFinished)
    }, 1000)
}

function setStartAnimation() {
    window.requestAnimationFrame(step)

    let start
    let colorMatrixAlpha = 10
    function step(timestamp) {
        if (start === undefined) start = timestamp
        const elapsed = timestamp - start
        colorMatrix.setAttribute(
            "values",
            `1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 ${colorMatrixAlpha} -30`
        )
        colorMatrixAlpha += 10
        if (elapsed <= 250) window.requestAnimationFrame(step)
    }
}

function setFinishAnimation() {
    window.requestAnimationFrame(step)

    let start
    let colorMatrixAlpha = 150
    function step(timestamp) {
        if (start === undefined) start = timestamp
        const elapsed = timestamp - start
        colorMatrix.setAttribute(
            "values",
            `1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 ${colorMatrixAlpha} -30`
        )
        colorMatrixAlpha -= 3.333
        if (elapsed <= 750) window.requestAnimationFrame(step)
    }
}

function changeThemeColor(slideDirection) {
    const slideClass = slideDirection === "next" ? slider.children[2].className : slider.children[0].className
    chooseThemeColor(slideClass)
}

function chooseThemeColor(slideClass) {
    if (slideClass === "tanjiro") setTheme(tanjiroThemeColor)
    if (slideClass === "nezuko") setTheme(nezukoThemeColor)
    if (slideClass === "zenitsu") setTheme(zenitsuThemeColor)
    if (slideClass === "inosuke") setTheme(inosukeThemeColor)
}

function setTheme(themeColor) {
    if (window.innerWidth >= 900) singInUp.style.backgroundColor = themeColor
    headerDescriptionBtn.style.backgroundColor = themeColor
    sliderNext.children[0].style.fill = themeColor
    sliderPlay.children[0].style.fill = themeColor
    sliderStop.children[0].style.fill = themeColor
    sliderPrev.children[0].style.fill = themeColor
    if (window.innerWidth < 900) {
        singInUp.style.backgroundColor = "transparent"
        menuIcon.children[0].style.fill = themeColor
        singInUp.children[0].children[0].style.color = themeColor
        singInUp.children[0].children[1].style.color = themeColor
        goBackIcon.children[0].style.fill = themeColor
    }
}
