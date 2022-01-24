function betterTiles () {
	const copyToClipboard = copyable => {
		if (navigator.clipboard && window.isSecureContext) {
			return navigator.clipboard.writeText(copyable)
		} else {
			// Sneaky text area method via: https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined/65996386
			let textArea = document.createElement("textarea")
			textArea.value = copyable
			// Make the textarea be out of the viewport
			textArea.style.position = 'fixed'
			textArea.style.left = '-999999px'
			textArea.style.top = '-999999px'
			document.body.appendChild(textArea)
			textArea.focus()
			textArea.select()
			return new Promise((resolve, reject) => {
				document.execCommand('copy') ? resolve() : reject()
				textArea.remove()
			})
		}
	}

	// Grab the guesses from the app
	let guesses = []
	window.document
		.querySelector('game-app').shadowRoot
		.querySelectorAll('game-row')
		.forEach(element => guesses.push(element.attributes.letters.textContent))
	// Example guesses:
	// const guesses = [ 'crabs', 'windy', 'jowly', 'loads', 'kites', 'knoll' ]

	// Grabbing the puzzle number requires popping open the settings overlay
	const getSettings = () => window.document
		.querySelector('game-app').shadowRoot
		.querySelector('game-page')
		.querySelector('game-settings')
	if (!getSettings()) {
		// If the settings overlay is not showing, we'll pop it up.
		window.document
			.querySelector('game-app').shadowRoot
			.querySelector('#settings-button')
			.click()
	}
	const puzzleNumber = getSettings().shadowRoot
		.querySelector('#puzzle-number').textContent
		.replace('#', '')

	const numbers = [ '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣' ]

	const answer = guesses.pop().split('')
	const tiles = guesses
			.reverse()
			.map(word => word
				.split('')
				.map(letter => {
					const index = answer.indexOf(letter)
					return index >= 0 ? numbers[index] : '⬛'
				})
				.join(''),
			)
			.reverse()
			.join('\n')
		+ '\n'
		+ answer.map(() => '🟩').join('')

	const string = `Wordle ${puzzleNumber} ${guesses.length + 1}/6` + '\n' + tiles
	console.log(string)
	copyToClipboard(string)
}
betterTiles()
