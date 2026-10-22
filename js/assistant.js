/*
  Karma assistant: a scripted helper, not AI.
  It matches what the visitor types against js/knowledge.js and answers only from there.
  It sends nothing anywhere: no network requests, no storage.
*/
(() => {
  'use strict';
  const root = document.getElementById('assistant');
  if (!root) return;
  // the knowledge base is a separate file: if it failed to load, still offer the human routes
  const kb = window.KARMA_KB || {
    contact: { phone: '+91 95061 54321', tel: '+919506154321', whatsapp: '919506154321' },
    faqs: [], programmes: [], centres: [], goals: [], medical: [], links: {}, broken: true
  };

  const fab = root.querySelector('.as-fab');
  const panel = root.querySelector('.as-panel');
  const log = root.querySelector('.as-log');
  const form = root.querySelector('.as-form');
  const input = form.elements.q;
  const closeButton = root.querySelector('.as-close');
  const calm = matchMedia('(prefers-reduced-motion: reduce)');
  const touch = matchMedia('(pointer: coarse)');
  const phone = matchMedia('(max-width: 560px)');
  const waLink = text => `https://wa.me/${kb.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  let started = false, thinking = false;

  /* ---------- open and close ---------- */
  const setOpen = (state, restoreFocus = true) => {
    panel.hidden = !state;
    fab.setAttribute('aria-expanded', String(state));
    tuck();
    if (state) {
      if (!started) { started = true; kb.broken ? unavailable() : greet(); }
      // on touch screens, focusing the input would raise the keyboard over the quick replies
      setTimeout(() => (touch.matches ? closeButton : input).focus(), 30);
    } else if (restoreFocus) fab.focus();
  };
  fab.addEventListener('click', () => setOpen(panel.hidden));
  closeButton.addEventListener('click', () => setOpen(false));
  root.addEventListener('keydown', event => { if (event.key === 'Escape' && !panel.hidden) { event.stopPropagation(); setOpen(false); } });
  // on phones the button waits until the first screen has scrolled away, so it never covers the opening buttons
  function tuck() { root.toggleAttribute('data-tucked', phone.matches && panel.hidden && scrollY < innerHeight * .6); }
  addEventListener('scroll', tuck, { passive: true });
  phone.addEventListener('change', tuck);

  /* ---------- rendering ---------- */
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };
  const scrollDown = () => { log.scrollTop = log.scrollHeight; };
  const addUser = text => { log.append(el('li', 'as-msg as-msg--user', text)); scrollDown(); };
  const chip = (label, onClick, primary = false) => {
    const button = el('button', `as-chip${primary ? ' as-chip--primary' : ''}`, label);
    button.type = 'button';
    button.addEventListener('click', onClick);
    return button;
  };
  const linkChip = (label, href, primary = false) => {
    const link = el('a', `as-chip${primary ? ' as-chip--primary' : ''}`, label);
    link.href = href;
    if (/^https?:/.test(href)) { link.target = '_blank'; link.rel = 'noopener'; }
    return link;
  };
  // say(): bot message with optional programme/centre cards and action chips.
  // Replies queue up, so quick taps on several chips never interleave.
  let queue = Promise.resolve();
  const say = (text, options) => (queue = queue.then(() => render(text, options)));
  const render = (text, { cards = [], actions = [] } = {}) => new Promise(resolve => {
    thinking = true;
    const typing = el('li', 'as-typing');
    typing.setAttribute('aria-hidden', 'true');
    typing.append(el('i'), el('i'), el('i'));
    log.append(typing); scrollDown();
    setTimeout(() => {
      typing.remove();
      const message = el('li', 'as-msg as-msg--bot', text);
      cards.forEach(card => message.append(card));
      log.append(message);
      if (actions.length) {
        const row = el('li', 'as-actions');
        actions.forEach(action => action && row.append(action));
        log.append(row);
      }
      scrollDown(); thinking = false; resolve();
    }, calm.matches ? 0 : 420);
  });

  /* ---------- actions ---------- */
  const book = (programme, centre) => {
    const trial = document.querySelector('#trial .tr-form');
    if (trial) {
      if (programme) trial.elements.programme.value = programme;
      if (centre) trial.elements.centre.value = centre;
    }
    setOpen(false, false);
    const target = document.getElementById('trial');
    if (window.lenis) window.lenis.scrollTo(target);
    else target.scrollIntoView({ behavior: calm.matches ? 'auto' : 'smooth' });
    setTimeout(() => trial?.elements.name.focus({ preventScroll: true }), 120);
  };
  const actionChips = {
    book: (programme, centre) => chip(programme ? `Try ${programme} free` : 'Book a free trial', () => book(programme, centre), true),
    whatsapp: () => linkChip('WhatsApp the team', waLink('Hi Karma by Satwik! I have a question:')),
    call: () => linkChip(`Call ${kb.contact.phone}`, `tel:${kb.contact.tel}`),
    finder: () => chip('Help me choose', startFinder),
    centres: () => chip('Show all centres', showCentres),
    programmes: () => chip('See programmes', () => { setOpen(false, false); const target = document.getElementById('programmes'); window.lenis ? window.lenis.scrollTo(target) : target.scrollIntoView(); }),
    menu: () => chip('More options', () => say('What else can I help with?', { actions: menuChips() })),
    wedding: () => linkChip('Wedding choreography ↗', kb.links.wedding),
    franchise: () => chip('Franchise enquiry', () => { setOpen(false, false); const target = document.getElementById('franchise-form') || document.getElementById('franchise'); window.lenis ? window.lenis.scrollTo(target) : target.scrollIntoView(); }),
    brochure: () => linkChip('Franchise brochure (PDF) ↗', kb.links.brochure)
  };
  const actionsFor = (names, programme) => names.map(name => actionChips[name]?.(programme));

  const programmeCard = programme => {
    const card = el('div', 'as-card');
    card.append(el('strong', '', programme.name), el('span', '', programme.summary));
    const row = el('div', 'as-actions');
    row.style.marginTop = '6px';
    row.append(chip('Try it free', () => book(programme.name), true));
    if (programme.url) row.append(linkChip('Read more ↗', programme.url));
    card.append(row);
    return card;
  };
  const centreCard = centre => {
    const card = el('div', 'as-card');
    card.append(el('strong', '', centre.name), el('span', '', centre.address));
    const row = el('div', 'as-actions');
    row.style.marginTop = '6px';
    row.append(chip('Book here', () => book(null, centre.name), true),
      linkChip('Directions ↗', `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Karma by Satwik, ${centre.address}`)}`));
    card.append(row);
    return card;
  };

  /* ---------- flows ---------- */
  function menuChips() {
    return [
      chip('Help me choose a programme', () => { addUser('Help me choose a programme'); startFinder(); }),
      chip("What's in the free trial?", () => ask("What's in the free trial?")),
      chip('Centres & directions', () => { addUser('Centres & directions'); showCentres(); }),
      chip('Fees & timings', () => { addUser('Fees & timings'); feesAndTimings(); }),
      chip('Talk to the team', () => ask('Talk to the team'))
    ];
  }
  function greet() {
    say("Hi! I'm Karma's assistant. I answer from what Karma's website publishes. What would you like to know?", { actions: menuChips() });
  }
  function startFinder() {
    say("What's your main goal? Pick the closest one.", {
      actions: kb.goals.map(goal => chip(goal.label, () => { addUser(goal.label); suggest(goal); }))
    });
  }
  function suggest(goal) {
    const picks = goal.ids.map(id => kb.programmes.find(programme => programme.id === id)).filter(Boolean).slice(0, 4);
    say("Going by Karma's programme pages, these could suit you. The trainers will confirm during the assessment in your free trial.", {
      cards: picks.map(programmeCard),
      actions: [chip('Pick another goal', startFinder), actionChips.whatsapp(), actionChips.menu()]
    });
  }
  function showCentres() {
    say(kb.faqs.find(faq => faq.id === 'centres').answer, { cards: kb.centres.map(centreCard), actions: [actionChips.menu()] });
  }
  function feesAndTimings() {
    const price = kb.faqs.find(faq => faq.id === 'price').answer;
    const time = kb.faqs.find(faq => faq.id === 'time').answer;
    say(`${price}\n\n${time}`, { actions: actionsFor(['whatsapp', 'call', 'menu']) });
  }

  /* ---------- matching ---------- */
  const normal = text => ` ${text.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9&\s]/g, ' ').replace(/\s+/g, ' ').trim()} `;
  const hasPhrase = (text, phrase) => text.includes(` ${phrase} `);
  const hasStem = (text, stem) => text.includes(` ${stem}`);
  // one typo allowed in longer single words ("pilatis", "zumbaa", "nutriton")
  const near = (a, b) => {
    if (Math.abs(a.length - b.length) > 1) return false;
    let i = 0, j = 0, edits = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++edits > 1) return false;
      if (a[i + 1] === b[j] && a[i] === b[j + 1]) { i += 2; j += 2; }
      else if (a.length > b.length) i++;
      else if (b.length > a.length) j++;
      else { i++; j++; }
    }
    return edits + (a.length - i) + (b.length - j) <= 1;
  };
  // typos only on words of 5+ letters with the same first letter, so "lose" never reads as "close"
  const fuzzy = (tokens, word) => !word.includes(' ') && word.length >= 5 && tokens.some(token => token.length >= 5 && token[0] === word[0] && near(token, word));
  // generic words only break ties: "can my kids join" is about age, not the trial
  const weak = new Set(['join', 'start', 'free', 'book', 'try', 'new', 'offer', 'offers', 'options', 'classes', 'plan', 'level', 'time', 'open', 'near', 'where', 'team', 'bring', 'number', 'reach']);
  const matchOf = (text, tokens, word) => hasPhrase(text, word) ? (word.includes(' ') ? 3 : weak.has(word) ? 1 : 2) : fuzzy(tokens, word) ? 1 : 0;
  const score = (text, tokens, words) => words.reduce((sum, word) => sum + matchOf(text, tokens, word), 0);

  function respond(raw) {
    const text = normal(raw);
    if (!text.trim()) return;
    if (/^ (hi+|hello|hey|namaste|namaskar|good (morning|afternoon|evening)) $/.test(text)) {
      return say('Hello! Ask me about programmes, centres, the free trial or how to get in touch.', { actions: actionsFor(['finder', 'book']) });
    }
    if (/ (thank|thanks|thx|shukriya|dhanyavad)/.test(text)) {
      return say("You're welcome. When you're ready, the free trial is the best way to start.", { actions: actionsFor(['book', 'whatsapp']) });
    }
    if (kb.medical.some(stem => hasStem(text, stem))) {
      return say(kb.medicalAnswer, { actions: actionsFor(['call', 'whatsapp']) });
    }
    const tokens = text.trim().split(' ');
    const faqs = kb.faqs.map(faq => ({ faq, points: score(text, tokens, faq.words) })).filter(hit => hit.points).sort((a, b) => b.points - a.points);
    // longest phrase each programme matched; "aerial yoga" beats plain "yoga"
    const hits = kb.programmes.map(programme => {
      const best = [...programme.words, programme.name.toLowerCase()]
        .map(word => ({ word, points: matchOf(text, tokens, word) })).filter(match => match.points)
        .sort((a, b) => b.word.length - a.word.length)[0];
      return best && { programme, phrase: best.word, points: best.points };
    }).filter(Boolean);
    const kept = hits.filter(hit => !hits.some(other => other !== hit && other.phrase.length > hit.phrase.length && other.phrase.includes(hit.phrase)));
    const programmes = kept.map(hit => hit.programme);
    const exact = kept.filter(hit => hit.points >= 2).map(hit => hit.programme);
    const programmePoints = Math.max(0, ...kept.map(hit => hit.points));
    const centres = kb.centres.filter(centre => centre.words.some(word => matchOf(text, tokens, word)));
    const top = faqs[0]?.faq, topPoints = faqs[0]?.points || 0;

    // prices and timings are never published: say so first, whatever else was asked
    if (top && (top.id === 'price' || top.id === 'time')) {
      const both = faqs.some(hit => hit.faq.id === 'price') && faqs.some(hit => hit.faq.id === 'time');
      if (both) return feesAndTimings();
      return say(top.answer, { actions: actionsFor(top.actions) });
    }
    if (centres.length) return say(centres.length === 1 ? `Here's the ${centres[0].name} centre.` : "Here are the centres you mentioned.", { cards: centres.map(centreCard), actions: [actionChips.menu()] });
    // a question about who a programme suits ("mma for kids", "yoga for beginners"): answer it and show the programme
    if (top && topPoints >= 2 && ['beginner', 'age', 'unisex', 'mat'].includes(top.id) && exact.length) {
      return say(top.answer, { cards: exact.slice(0, 2).map(programmeCard), actions: [actionChips.menu()] });
    }
    // otherwise the stronger match wins; a specific topic wins a tie ("wedding dance" is about weddings)
    if (programmes.length && (!top || ['programmes', 'trial'].includes(top.id) || programmePoints > topPoints)) {
      const shown = exact.length ? exact : programmes;
      const intro = shown.length === 1 ? `Here's what Karma's website says about ${shown[0].name}.` : 'Here are the programmes that match.';
      return say(intro, { cards: shown.slice(0, 3).map(programmeCard), actions: [actionChips.menu()] });
    }
    if (top) return say(top.answer, { actions: actionsFor(top.actions, programmes[0]?.name) });
    return say(kb.fallback, { actions: actionsFor(['whatsapp', 'call', 'menu']) });
  }
  function ask(text) { addUser(text); respond(text); }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const text = input.value.trim().slice(0, 200);
    if (!text || thinking) return;
    input.value = '';
    if (kb.broken) { addUser(text); return unavailable(); }
    ask(text);
  });

  function unavailable() {
    say("Quick answers aren't available right now. The Karma team can help directly.", { actions: actionsFor(['whatsapp', 'call']) });
  }

  tuck();
  root.setAttribute('data-ready', '');
})();
