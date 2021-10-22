const resultNode = document.querySelector('.result');
	const btnNode = document.querySelector('.btn');

	btnNode.addEventListener('click', function () {      
		const valueWidth = document.querySelector('.input_width').value;
		const valueHeight = document.querySelector('.input_height').value;
     
		if (valueWidth < 100 || valueWidth > 300 || valueHeight < 100 || valueHeight > 300) {
			resultNode.innerHTML = 'одно из чисел вне диапазона от 100 до 300';
		} else {
			fetch(`https://picsum.photos/${valueWidth}/${valueHeight}`)
				.then(function (response) {
					const cardBlock = `
				<div class="card">
				<img
				src="${response.url}"
				class="card-image"
				/>
				</div>
				`;					
					resultNode.innerHTML = cardBlock
				})
				.catch(function() { console.log('error'); })
		}
	})




