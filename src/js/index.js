/* global $$, $, np */

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
      name: 'Fächer',
      href: 'subjects',
      icon: {
        type: 's',
        name: 'boxes'
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
navigation.items.forEach((item, i) => {
  nav += `<div data-nav-index="${i}" class="nav-item fa${item.icon.type} fa-${item.icon.name}" onclick="np.loadContent(this.getAttribute('data-nav-index'))" title="${item.name}"></div>`
})

// ####################################

$$(document)(() => {
  $.loadStyle(`
    /* Colors: */
    :root {
      --main: #910c0c;
      --bg: #fff;
      --text: #000;
      --mtxt: #fff;
      --a-color: #c4c2c2;
    }
  `)

  const body = $$('body')
  body.innerHTML += `
    <main></main>
    <nav>${nav}</nav>
  `

  // ####################################

  window.np = {
    currentPage: $.storage.local.get('np-currentPage') || 0,
    main: $$('body main'),
    loadContent: function (navId) {
      np.currentPage = navId

      $$('body nav div.nav-item').removeClass('active')
      $$(`body nav div.nav-item[data-nav-index="${navId}"]`).addClass('active')

      $.storage.local.set('np-currentPage', navId)

      np.loadContentInToMain()
    },
    loadContentInToMain: function () {
      const cp = navigation.items[np.currentPage]
      np.main.innerHTML = `
        <h1>${cp.name}</h1>
      `
    }
  }

  // ####################################

  np.loadContent(np.currentPage)
})
