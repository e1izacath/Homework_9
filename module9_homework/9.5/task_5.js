function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);

      let latestData = localStorage.setItem('myJSON', xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ошибки: ', xhr.status);
  };
  
  xhr.send();
};


const resultNode = document.querySelector('.result');
const btnNode = document.querySelector('.btn');


function displayResult(apiData) {
  let cards = '';
  
  apiData.forEach(function(item) {
    const cardBlock = `
    <div class="card">
    <img
    src="${item.download_url}"
    class="card"
    />
    </div>
    `;			
    cards = cards + cardBlock;
  });
    
  resultNode.innerHTML = cards;
}



btnNode.addEventListener('click', function() {
  const valuePage = document.querySelector('.input_page').value;
	const valueLimit = document.querySelector('.input_limit').value;

if ((valuePage < 0 || valuePage > 10 || isNaN(+valuePage)) && (valueLimit < 0 || valueLimit > 10 || isNaN(+valueLimit))) {
  resultNode.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10 10';
  return;
} else if (valueLimit < 0 || valueLimit > 10|| isNaN(+valueLimit)) {
  resultNode.innerHTML = 'Лимит вне диапазона от 1 до 10';
  return;
} else if (valuePage < 0 || valuePage > 10|| isNaN(+valuePage)) {
  resultNode.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
  return;
} else {
  let linkPhoto= `https://picsum.photos/v2/list?page=${valuePage}&limit=${valueLimit}`;
  useRequest(linkPhoto, displayResult);
} 
});


window.onload = function () {

	let latestData = localStorage.getItem('myJSON');
	
	if (latestData !== null) {
		displayResult(JSON.parse(latestData));
	}
}