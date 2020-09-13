/* global np, session */

window.Student = class Student {
  constructor (fullName) {
    this.fullName = fullName

    this.firstNames = []
    this.names = []

    this.firstName = this.fullName.split(' ')[0]
    this.lastName = this.fullName.split(' ')[this.fullName.split(' ').length - 1]

    this.initFirstNames()
    this.initNames()
  }

  initFirstNames () {
    this.fullName.split(' ').forEach((item, i) => {
      if (i !== this.fullName.split(' ').length - 1) {
        this.firstNames.push(item)
      }
    })
  }

  initNames () {
    this.fullName.split(' ').forEach((item, i) => {
      if (i !== this.fullName.split(' ').length) {
        this.names.push(item)
      }
    })
  }
}

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
    var adduser = np.hash() === '#adduser'

    var stdview = '<ul class="users">'

    if (adduser) {
      np.popup(`

      `)
    }

    session.students.forEach((std, i) => {
      stdview += `
        <li><div class="student">
          <input data-student-id="${i}" oninput="session.students[this.getAttribute('data-student-id')]=new Student(this.value)" type="text" value="${std.fullName}" placeholder="Name des Schülers" />
          <span class="danger delete"><button class="fas fa-trash" title="Schüler löschen"></button></span>
        </div></li>
      `
    })

    stdview += '</ul>'

    return `
      <div class="adduser fas fa-plus-circle" onclick="np.hashTo('adduser')"></div>
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
    reload: function () {
      window.location = window.location.href
    },
    newUser: function (std) {
      session.students.push(std)
      np.reload()
    },
    currentPage: session['np-currentPage'] || 0,
    main: document.querySelector('body main'),
    popup: function (text) {

    },
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
    encode: function (a, key = 42) {
      a = a.toString()
      a = a.split('')
      a.forEach(function (item, i) {
        a[i] = (item.charCodeAt(0) * parseInt(key)).toString()
      })
      a = a.join(';')
      a = window.btoa(a)
      return a
    },
    decode: function (a, key = 42) {
      a = window.atob(a.toString())
      a = a.split(';')
      a.forEach(function (item, i) {
        item = item.endsWith(';') ? item.substr(item.length - 1) : item
        a[i] = String.fromCharCode(parseInt(item) / key)
      })
      a = a.join('')
      return a
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
    return window.location.hash
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
