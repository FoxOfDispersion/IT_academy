var lists = [
	{
		class: 'list-icon1',
		text: 'Автомобили в наличии <br>с ПТС',
	},
	{
		class: 'list-icon2',
		text: 'Сервисная поддержка <br>до 5 лет / 150 000 км',
	},
	{
		class: 'list-icon3',
		text: 'Улучшим любое <br> предложение',
	},
	{
		class: 'list-icon4',
		text: 'Кредит 0,01%',
	},
]
var list = document.getElementById('list')
var htmlElems = ''
for (var i = 0; i < lists.length; i++) {
	htmlElems += `
        <li>
            <div class="list-icon ${lists[i].class}"></div>
            <p>${lists[i].text}</p>
        </li>
    `
}
list.innerHTML = htmlElems
