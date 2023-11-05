const slider = document.getElementById('slider');
const sliderValue = document.getElementById('sliderValue');

function updateSliderValue() {
    sliderValue.textContent = slider.value;
}

slider.addEventListener('input', updateSliderValue);

updateSliderValue();
