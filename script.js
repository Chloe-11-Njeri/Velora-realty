  // ----- Data (edit these to change your listings and team) -----
  var listings = [
    { id: 'a', image: 'images/property-1.jpg', mode: 'buy',  title: 'Luxury apartment',       area: 'Downtown Dubai',     tone: '#DDE5DA' },
    { id: 'b', image: 'images/property-2.jpg', mode: 'buy',  title: 'Waterfront villa',       area: 'Palm Jumeirah',      tone: '#EFE7D1' },
    { id: 'c', image: 'images/property-3.jpg', mode: 'buy',  title: 'Family townhouse',       area: 'Dubai Hills Estate', tone: '#DDE5DA' },
    { id: 'd', image: 'images/property-4.jpg', mode: 'rent', title: 'Marina view apartment',  area: 'Dubai Marina',       tone: '#EFE7D1' },
    { id: 'e', image: 'images/property-5.jpg', mode: 'rent', title: 'Modern studio',          area: 'Business Bay',       tone: '#DDE5DA' },
    { id: 'f', image: 'images/property-6.jpg', mode: 'rent', title: 'Two-bedroom residence',  area: 'Downtown Dubai',     tone: '#EFE7D1' }
  ];
  var agents = [
    { initials: 'MN', photo: 'images/agent-1.jpg', name: 'Mary Njeri', role: 'Senior Property Advisor', languages: 'English', phone: '+254745135785'},
    { initials: 'BT', photo: 'images/agent-2.jpg', name: ' Carl Berl', role: 'Sales Advisor', languages: 'English', phone:'+254181309898'},
    
  ];

  // ----- State -----
  var mode = 'buy';
  var saved = {};

  var grid = document.getElementById('listing-grid');
  var heading = document.getElementById('listings-heading');

  function renderListings() {
    heading.textContent = mode === 'buy' ? 'Properties for sale' : 'Properties for rent';
    grid.innerHTML = '';
    listings.filter(function (l) { return l.mode === mode; }).forEach(function (l) {
      var isSaved = !!saved[l.id];
      var card = document.createElement('article');
      card.className = 'card';
      card.innerHTML =
        '<div class="card-img" style="background:' + l.tone + '">' +
          '<svg class="sky" viewBox="0 0 320 230" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
            '<g fill="#1E3D2F" opacity=".18"><rect x="30" y="110" width="50" height="120"/><rect x="95" y="70" width="42" height="160"/><rect x="152" y="130" width="60" height="100"/><rect x="228" y="90" width="46" height="140"/></g>' +
          '</svg>' +
          '<img class="photo" src="' + l.image + '" alt="' + l.title + ' in ' + l.area + ', Dubai" loading="lazy" onerror="this.remove()">' +
          '<span class="badge">' + (l.mode === 'buy' ? 'For sale' : 'For rent') + '</span>' +
          '<button type="button" class="save" aria-pressed="' + isSaved + '" aria-label="' + (isSaved ? 'Remove from saved: ' : 'Save: ') + l.title + '">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-4.6-9.3-9.1C1.2 8.8 3 5.5 6.3 5.5c2 0 3.2 1 3.7 1.9.5-.9 1.7-1.9 3.7-1.9 3.3 0 5.1 3.3 3.6 6.4C19 16.4 12 21 12 21z"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="card-body">' +
          '<div class="price">' + (l.mode === 'buy' ? 'AED price' : 'AED per year') + '</div>' +
          '<div class="card-title">' + l.title + '</div>' +
          '<div class="muted">' + l.area + ', Dubai</div>' +
          '<div class="card-meta"><span> beds</span><span> baths</span><span> sq ft</span></div>' +
        '</div>';
      card.querySelector('.save').addEventListener('click', function () {
        saved[l.id] = !saved[l.id];
        renderListings();
      });
      grid.appendChild(card);
    });
  }

  function setMode(newMode) {
    mode = newMode;
    document.querySelectorAll('.tab').forEach(function (t) {
      t.setAttribute('aria-pressed', String(t.dataset.mode === mode));
    });
    renderListings();
  }

  document.querySelectorAll('.tab').forEach(function (t) {
    t.addEventListener('click', function () { setMode(t.dataset.mode); });
  });
  document.querySelectorAll('a[data-mode]').forEach(function (a) {
    a.addEventListener('click', function () { setMode(a.dataset.mode); });
  });

  // Agents
  var agentGrid = document.getElementById('agent-grid');
  agents.forEach(function (a) {
    var el = document.createElement('div');
    el.className = 'agent';
    el.innerHTML =
      '<div class="avatar">' + a.initials + '<img src="' + a.photo + '" alt="" loading="lazy" onerror="this.remove()"></div>' +
      '<b>' + a.name + '</b>' +
      '<div class="muted">' + a.role + '</div>' +
      '<div class="muted">' + a.languages + '</div>' +
      '<a href="https://wa.me/' + a.phone.replace('+', '') + '" class="link">Whatsapp ' + a.name + '</a>';
    agentGrid.appendChild(el);
  });

  // Contact form: sends to Formspree (see README.txt to set your form ID)
  var FORM_ENDPOINT = 'https://formspree.io/f/xyeezqqr';
  var form = document.getElementById('contact-form');
  var note = document.getElementById('thanks');

  function showNote(text, isError) {
    note.textContent = text;
    note.className = 'thanks' + (isError ? ' error' : '');
    note.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      showNote('Please enter your name and a valid email address.', true);
      return;
    }
    if (FORM_ENDPOINT.indexOf('YOUR_FORM_ID') !== -1) {
      showNote('The form is not connected yet. Please email or call us instead.', true);
      return;
    }
    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function (res) {
      if (res.ok) {
        form.reset();
        showNote('Thank you. We will be in touch soon.', false);
      } else {
        showNote('Sorry, something went wrong. Please email or call us instead.', true);
      }
    }).catch(function () {
      showNote('Sorry, something went wrong. Please email or call us instead.', true);
    }).then(function () { button.disabled = false; });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
  renderListings();
