let wheel = []
let n = 12
let deg = 360
for(let i=0; i<n; i++){
  wheel.push(`hsl(${i*deg/n},100%,50%)`)
}
let arr = ['#fff', ...wheel, '#000']
let sample = color => {
  let div = document.createElement('div')
  div.classList.add('color-sample')
  div.style.backgroundColor = color
  div.addEventListener('click', () => changeColor(color))
  return div
}

arr.forEach(color => {
  let el = sample(color);
  let colorsBody = document.querySelector('.colors-body')
  colorsBody.appendChild(el)
})