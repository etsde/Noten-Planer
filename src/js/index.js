/* global np, session */

/* eslint no-unused-vars:1,one-var:0,space-before-function-paren:0,padded-blocks:0,no-trailing-spaces:0,no-multiple-empty-lines:0 */

var html = a => a.join('')

// const $$ = document.querySelectorAll
const $ = document.querySelector

class Icon {
  constructor (name, type = 's') {
    this.iconType = type
    this.iconName = name
  }

  getHTML () {
    return `<i class="${this.getClasses()}"></i>`
  }

  getClasses () {
    return `fa${this.iconType || 's'} fa-${this.iconName || 'icons'}`
  }
}

window.Subject = class Subject {
  constructor (name, preset = {}) {
    this.name = name
    this.icon = this.getIcon()

    this.preset = preset

    this.members = preset.members || []
  }

  getIcon () {
    if (this.name.toLowerCase().includes('kunst')) {
      return new Icon('palette')
    } else if (this.name.toLowerCase().includes('mathe')) {
      return new Icon('calculator')
    } else if (this.name.toLowerCase().includes('deutsch')) {
      return new Icon('book')
    } else if (this.name.toLowerCase().includes('religion')) {
      return new Icon('church')
    } else if (this.name.toLowerCase().includes('chemie')) {
      return new Icon('atom')
    } else if (this.name.toLowerCase().includes('informatik')) {
      return new Icon('file-code', 'r')
    } else if (this.name.toLowerCase().includes('sport')) {
      return new Icon('futball')
    } else if (this.name.toLowerCase().includes('geschichte')) {
      return new Icon('landmark')
    } else if (this.name.toLowerCase().includes('physik')) {
      return new Icon('magnet')
    } else if (this.name.toLowerCase().includes('werk')) {
      return new Icon('hammer')
    } else if (this.name.toLowerCase().includes('wirtschaft')) {
      return new Icon('money-bill-wave')
    } else if (this.name.toLowerCase().includes('englisch')) {
      return new Icon('flag-usa')
    } else if (this.name.toLowerCase().includes('musik')) {
      return new Icon('music')
    } else if (this.name.toLowerCase().includes('sach')) {
      return new Icon('microscope')
    }

    // Else:
    return new Icon('box')
  }
}

window.Student = class Student {
  constructor (fullName, id) {
    this.fullName = fullName
    this.stdID = parseInt(id || 0)

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
    return html`
      <div class="impex hard center">
        <ul>
          <li class="no-li">
            <div class="import container">
              <h3>Importieren</h3>
              <input class="large input" type="text" placeholder="Bitte bei Export erhaltenes Backup einfügen." /><br />
              <button onclick="np.imp(this.parentNode)">Importieren</button>
            </div>
          </li>` + html`
          <li class="no-li">
            <div class="import container">
              <h3>Exportieren</h3>
              <button onclick="np.exp(this.parentNode)">Exportieren</button>
            </div>
          </li>` + `
        </ul>
      </div>
    `
  },
  students: function () {
    var stdview = html`<ul class="users">`

    session.students.forEach((std, i) => {
      stdview += html`
        <li><div class="student">
          <i onclick="np.viewStudent(this.parentNode.querySelector('input[data-student-id]').getAttribute('data-student-id'))" class="fas green larger-icon point fa-caret-square-down"></i>
          <input data-student-id="` + i + '" oninput="session.students[this.getAttribute(\'data-student-id\')]=new Student(this.value)" type="text" value="' + std.fullName + `" placeholder="Name des Schülers" />
          ` + html`<span class="danger delete"><button class="fas fa-trash" title="Schüler löschen" onclick="session.students = np.remove(session.students, parseInt(this.parentNode.parentNode.querySelector('input[data-student-id]').getAttribute('data-student-id'))); np.reload()"></button></span>` + `
        </div></li>
      `
    })

    stdview += '</ul>'

    return html`
      <div class="adduser fas fa-plus-circle" onclick="session.students.push(new Student('Neuer Schüler'));np.reload()"></div>
      <div class="hard center">
        ` + stdview + `
      </div>
    `
  },
  subjects: function () {
    var subview = html`<ul class="subjects">`

    session.subjects.forEach((sub, i) => {
      subview += html`
        <li><div class="subject">
          <i onclick="np.viewSubject(this.parentNode.querySelector('input[data-sub-id]').getAttribute('data-sub-id'))" class="fas green larger-icon point fa-caret-square-down"></i>
          <input data-sub-id="` + i + '" oninput="session.subjects[this.getAttribute(\'data-sub-id\')]=new Subject(this.value, this.preset||{})" type="text" value="' + sub.name + `" placeholder="Name des Faches" />
          ` + html`<span class="danger delete"><button class="fas fa-trash" title="Fach löschen" onclick="session.subjects = np.remove(session.subjects, parseInt(this.parentNode.parentNode.querySelector('input[data-sub-id]').getAttribute('data-sub-id'))); np.reload()"></button></span>` + `
        </div></li>
      `
    })

    subview += '</ul>'

    return html`
      <div class="adduser fas fa-plus-circle" onclick="session.subjects.push(new Subject('Neues Fach'));np.reload()"></div>
      <div class="hard center">
        ` + subview + `
      </div>
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
      --btn-color: #404040;
      --green: #1f6243;
    }
  </style>`

  const body = document.querySelector('body')
  body.innerHTML += `
    <main></main>
    <nav class="border">${nav}</nav>
  `

  // ####################################

  window.np = {
    viewSubject: function (id) {
      const sub = session.subjects[id]
      const icon = new Icon(sub.icon.iconName, sub.icon.iconType)

      const members = (function () {
        var members = ''
        sub.members.forEach((member, i) => {
          members += `
            <tr>
              <td>${member.fullName}</td>
              <td>${new Icon('caret-square-down').getHTML()}</td>
              <td class="danger delete point" onclick="session.subjects[${id}].members=np.remove(session.subjects[${id}].members,${i});np.viewSubject(${id})">${new Icon('trash').getHTML()}</td>
            </tr>
          `
        })
        return members
      })()

      np.main.innerHTML = `
        <h1 class="center">${icon.getHTML()} ${sub.name}</h1>
        <div class="hard center">
          <div class="members">
            <div id="memberAdd">
              ${(function () {
                const p = 'addMemberToSubject__am2s__amts'
                var a = ''

                session.students.forEach((std, i) => {
                  a += `<input type="radio" name="${p}" data-student-id="${i}"/><span> ${session.students[i].fullName}</span><br />`
                })

                return a
              })()}
            </div>
            <div class="adduser fas fa-plus-circle" onclick="session.subjects[${id}].members.push(session.students[document.querySelector('#memberAdd').querySelector('input:checked').getAttribute('data-student-id')]);np.viewSubject(${id})"></div>
            <table>
              <thead>
                <tr>
                  <th>Schüler</th>
                  <th>Details</th>
                  <th>Entfernen</th>
                </tr>
              </thead>
              <tbody>
                ${members}
              </tbody>
            </table>
          </div>
          ${'<br />'.repeat(40)}
        </div>
      `
    },
    viewStudent: function (id) {
      const std = session.students[id]

      np.main.innerHTML = `
        <h1 class="center">${new Icon('user').getHTML()} ${std.fullName}</h1>
      `
    },
    move: function (arr, oldIndex, newIndex) {
      if (newIndex >= arr.length) {
        var k = newIndex - arr.length + 1
        while (k--) {
          arr.push(undefined)
        }
      }
      arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
      return arr
    },
    remove: function (arr, value) {
      var index = value
      if (index > -1) {
        arr.splice(index, 1)
      }
      return arr
    },
    onHash: [],
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
    random: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    imp: function (elem) {
      try {
        window.session = JSON.parse(np.decode(elem.querySelector('input').value))
      } catch {
        window.alert('ERROR: Can\'t import! Please try it again.')
      }
      np.reload()
    },
    exp: function () {
      try {
        navigator.clipboard.writeText(np.encode(JSON.stringify(session)))
        window.alert('Export in Zwischenablage kopiert.')
      } catch {
        window.alert('ERROR: Can\'t export! Please try it again.')
      }
    },
    reload: function () {
      window.location = window.location.href
    },
    newUser: function (std) {
      session.students.push(std)
      np.reload()
    },
    currentPage: session['np-currentPage'] || 0,
    main: document.querySelector('body main'),
    popup: function () {
      $('html body .popup').innerHTML = ''
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
      document.querySelector('main').innerHTML = `
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
    io: {},
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
    np.onHash.forEach((handler) => {
      handler(a)
    })
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
  session.subjects = !session.subjects ? [] : session.subjects

  np.loadContent(np.currentPage)
})

// Pin Lock:

const lock = () => {
  // Lock:
  console.log('lock')
  document.body.innerHTML = `
    <h1 class="center bold">Gesperrt</h1>
    <h5 class="center">Bitte Pin eingeben</h5>
    <div class="pin">
      <b class="hard center" id="pin_io">_ _ _ _</b>
      <div class="grid-container">
        <div class="pin-1" onclick="np.enterPinCode(this.innerHTML)">1</div>
        <div class="pin-2" onclick="np.enterPinCode(this.innerHTML)">2</div>
        <div class="pin-3" onclick="np.enterPinCode(this.innerHTML)">3</div>
        <div class="pin-4" onclick="np.enterPinCode(this.innerHTML)">4</div>
        <div class="pin-5" onclick="np.enterPinCode(this.innerHTML)">5</div>
        <div class="pin-6" onclick="np.enterPinCode(this.innerHTML)">6</div>
        <div class="pin-7" onclick="np.enterPinCode(this.innerHTML)">7</div>
        <div class="pin-8" onclick="np.enterPinCode(this.innerHTML)">8</div>
        <div class="pin-9" onclick="np.enterPinCode(this.innerHTML)">9</div>
        <div class="pin-0" onclick="np.enterPinCode(this.innerHTML)">0</div>
      </div>
    </div>
  `
  document.body.classList.add('locked')
}

setTimeout(() => {
  setInterval(() => {
    if (!document.hasFocus()) {
      if (session.noLock !== true && session.noLock !== 1) {
        lock()
      }
    }
  }, 300)
}, 2000)

// Default Pin:
if (typeof session.pin !== 'string') {
  session.pin = '0000'
}

// Lock on open:
window.addEventListener('load', () => {
  if (session.noLock !== true && session.noLock !== 1) {
    if (np.io.unlocked !== true) {
      lock()
    }
  }

  // Unlock
  np.enterPinCode = num => {
    const io = document.querySelector('#pin_io')
    io.innerHTML = (p => {
      function count (a, b) {
        var c = a
        var i = 0
        while (c.includes(b)) {
          c = c.replace(b, '')
          i++
        }
        return i
      }



      const onlyThisOne = count(io.innerHTML, '_') === 1

      if (onlyThisOne) {
        const previewPIN = io.innerHTML.replace('_', `${p}`)
        if (previewPIN.replace(/ /g, '') === session.pin) {
          // Unlocked
          const body = document.querySelector('body')
          body.classList.remove('locked')
          body.innerHTML = `
            <main></main>
            <nav class="border">${nav}</nav>
          `
          np.loadContent(np.currentPage)
          window.navigator.vibrate(50)
        } else {
          // Error
          window.navigator.vibrate([100, 30, 100, 30, 100, 30])
          setTimeout(() => {
            lock()
          }, 390)
        }
      }

      return io.innerHTML.replace('_', `${p}`)
    })(num)
  }
})
