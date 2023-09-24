//javascriptpro_
let fromSelect = document.querySelector('.container .from .select input');
let toSelect = document.querySelector('.container .to .select input');
let fromSelectBox = document.querySelector('.container .from .select');
let toSelectBox = document.querySelector('.container .to .select');
let fromOptionsBox = document.querySelector('.container .from .options');
let toOptionsBox = document.querySelector('.container .to .options');
let fromAmount = document.querySelector('.container .from .from-input');
let toAmount = document.querySelector('.container .to .to-input');
let switchBtn = document.querySelector('.container .switch');

let currFromValue, currToValue;

fromSelectBox.addEventListener('click', () => {
        fromOptionsBox.classList.toggle('from-options-active');
        if (toOptionsBox.classList.contains('to-options-active')) {
                toOptionsBox.classList.remove('to-options-active');
        }
})

toSelectBox.addEventListener('click', () => {
        toOptionsBox.classList.toggle('to-options-active');
        if (fromOptionsBox.classList.contains('from-options-active')) {
                fromOptionsBox.classList.remove('from-options-active');
        }
})

let symbolsApiUrl = 'https://api.exchangerate.host/symbols';

let getSymbols = () => {
        fetch(symbolsApiUrl).then(res => res.json()).then(data => {
                let symbols = Object.keys(data.symbols);
                console.log(data.symbols)
                let fromLi = '';
                let toLi = '';
                symbols.forEach((symbol) => {
                        fromLi += `<li onclick="setFromValue('${symbol}')">${symbol}</li>`;
                        toLi += `<li onclick="setToValue('${symbol}')">${symbol}</li>`;
                })
                fromOptionsBox.innerHTML = fromLi;
                toOptionsBox.innerHTML = toLi;
        })
}

let setFromValue = (symbol) => {
        fromSelect.value = symbol;
        fromOptionsBox.classList.remove('from-options-active');
        getConvertRate();
}

let setToValue = (symbol) => {
        toSelect.value = symbol;
        toOptionsBox.classList.remove('to-options-active');
        getConvertRate();
}

let getConvertRate = () => {
        let url = `https://api.exchangerate.host/convert?from=${fromSelect.value}&to=${toSelect.value}&amount=${fromAmount.value}`;
        fetch(url).then(res => res.json()).then(data => {
                toAmount.value = data.result.toFixed(2);
                if (fromAmount.value == 0) {
                        fromAmount.value = 1;
                }
        })
}

switchBtn.addEventListener('click', () => {
        currFromValue = fromSelect.value;
        currToValue = toSelect.value;
        fromSelect.value = currToValue;
        toSelect.value = currFromValue;
        getConvertRate();
})

fromAmount.addEventListener('input', getConvertRate)
getSymbols();
