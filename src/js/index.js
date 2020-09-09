/* global np, session */

var content = {
  home: function () {
    return `
      <div class="impex">
        <div class="import">
          <h3>Importieren</h3>
        </div>
        <div class="export">
          <h3>Exportieren</h3>
        </div>
      </div>
    `
  },
  students: function () {
    var stdview = ''
    session.students.forEach((std) => {
      stdview += `
        <div class="student">
          <h5 class="name">${std.fullName}</h5>
          <button class="delete fas fa-trash" title="Schüler löschen"></button>
        </div>
      `
    })

    return `
      <div class="hard center">
        ${stdview}
      </div>
    `
  },
  subjects: function () {
    return `

    `
  }
}

var nav = ''
const navigation = {
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
    }/* ,
    {
      name: 'Deine Klasse',
      href: 'classroom',
      icon: {
        type: 's',
        name: 'school'
      }
    } */
  ]
}
navigation.items.forEach((item, i) => {
  nav += `<div data-nav-index="${i}" class="nav-item fa${item.icon.type} fa-${item.icon.name}" onclick="np.loadContent(this.getAttribute('data-nav-index'))" title="${item.name}"></div>`
})

// ####################################

window.addEventListener('load', () => {
  document.querySelector('head').innerHTML += `<style type="text/css">
    /* Colors: */
    :root {
      --main: #910c0c;
      --bg: #fff;
      --text: #000;
      --mtxt: #fff;
      --a-color: #c4c2c2;
    }
  </style>`

  const body = document.querySelector('body')
  body.innerHTML += `
    <main></main>
    <nav>${nav}</nav>
  `

  // ####################################

  window.np = {
    colors: [
      '#ff0000',
      '#4579de',
      '#f7f60f',
      '#631717',
      '#11e71e',
      '#11821f',
      '#ba1a9c',
      '#a1a1a1',
      '#f4830d'
    ],
    currentPage: session['np-currentPage'] || 0,
    main: document.querySelector('body main'),
    loadContent: function (navId) {
      np.currentPage = navId

      document.querySelectorAll('body nav div.nav-item').forEach((item) => {
        item.classList.remove('active')
      })
      document.querySelector(`body nav div.nav-item[data-nav-index="${navId}"]`).classList.add('active')

      session['np-currentPage'] = navId

      np.loadContentInToMain()
    },
    loadContentInToMain: function () {
      const cp = navigation.items[np.currentPage]
      np.main.innerHTML = `
        <h1 class="center">${cp.name}</h1>
        ${content[cp.href]()}
      `
    },
    querystring: function () {
      var p = {}

      var a = window.location.search.startsWith('?') ? window.location.search.replace('?', '') : window.location.search

      for (const b of a.split('&')) {
        try {
          p[decodeURIComponent(b.split('=')[0])] = JSON.parse(decodeURIComponent(b.split('=')[1]))
        } catch {
          p[decodeURIComponent(b.split('=')[0])] = decodeURIComponent(b.split('=')[1])
        }
      }

      return p
    }
  }

  np.hash = function () {
    var p = {}

    var a = window.location.hash.startsWith('#') ? window.location.hash.replace('#', '') : window.location.hash

    for (const b of a.split('&')) {
      try {
        p[decodeURIComponent(b.split('=')[0])] = JSON.parse(decodeURIComponent(b.split('=')[1]))
      } catch {
        p[decodeURIComponent(b.split('=')[0])] = decodeURIComponent(b.split('=')[1])
      }
    }

    return p
  }

  np.hashTo = function (a) {
    window.location.hash = '#' + a
  }

  np.colorpicker = (function () {
    var a = ''

    np.colors.forEach((item) => {
      a += `<div onclick="alert(this.getAttribute('data-color-hex'))" class="color" data-color-hex="${item}" style="background:${item};border:2px solid var(--a-color);border-radius:500px;height:${(100 / np.colors.length) / 2}vw;width:${(100 / np.colors.length) / 2}vw"></div>`
    })

    return a
  })()

  // ####################################

  session.students = !session.students ? [] : session.students

  np.loadContent(np.currentPage)
})
