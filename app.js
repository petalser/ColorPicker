const columns = document.querySelectorAll(".col")

document.addEventListener("keydown", (event) => {
    event.preventDefault()
    if (event.code.toLowerCase() === "space") {
        setColors()
    }
})

document.addEventListener("click", (event) => {
    const datatype = event.target.dataset.type

    if (datatype === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0]
        node.classList.toggle("fa-lock")
        node.classList.toggle("fa-lock-open")
    } else if (datatype === "text") {
        navigator.clipboard.writeText(event.target.textContent)
    }  
})

function setColors(isInitial) {
    const colors = isInitial ? readHash() : []
    columns.forEach((item, index) => {
        const locked = item.querySelector("i").classList.contains("fa-lock")
        const name = item.querySelector("h2");
        const btn = item.querySelector("button");
        if (locked) {
            colors.push(name.textContent)
            return
        }
        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random();
        
        if (!isInitial) {
            colors.push(color)
        }
        name.textContent = color
        name.style.color = chroma(color).luminance() > 0.3
            ? chroma(color).darken(2)
            : color
        btn.style.color = chroma(color).luminance() > 0.3
            ? chroma(color).darken(2)
            : color
        item.style.background = color;   
    })
    buildHash(colors)
}

function buildHash(colors = []) {
    document.location.hash = colors
        .map((col) => {
            return col.toString().substring(1)
        })
        .join("-")
}

function readHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split("-")
            .map((color) => "#" + color)
    }
    return []
}

setColors(true)