/* global $$, $ */

document.write(`<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Noten Planer</title>`) // HTML Head

// ####################################

var nav = ''
var navigation = {
  items: [
    {
      name: 'Home',
      href: 'home',
      icon: {
        type: 's',
        name: 'home'
      }
    },
    {
      name: 'Schüler',
      href: 'students',
      icon: {
        type: 's',
        name: 'users'
      }
    },
    {
      name: 'Deine Klasse',
      href: 'classroom',
      icon: {
        type: 's',
        name: 'university'
      }
    }
  ]
}
navigation.items.forEach((item) => {
  nav += `<div class="nav-item" onclick="${item.href}" title="${item.name}"><i class="fa${item.icon.type} fa-${item.icon.name}"></i></div>`
})

// ####################################

$$(document)(() => {
  $.loadStyle(`
    /* Colors: */
    :root {
      --main: #f23434;
      --bg: #fff;
      --text: #000;
      --mtxt: #fff;
    }
  `)

  const body = $$('body')
  body.innerHTML += `
    <main></main>
    <nav>${nav}</nav>
  `
})
