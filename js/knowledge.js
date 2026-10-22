/*
  Karma assistant: knowledge base.
  Every fact here comes from karmabysatwik.com (checked 23 Oct 2026) or the homepage built from it.
  Edit this file to change what the assistant knows; js/assistant.js only does matching and display.
  Never add prices, timings, trainer names or offers here until the studio confirms them.
*/
window.KARMA_KB = {
  brand: 'Karma by Satwik',
  contact: {
    phone: '+91 95061 54321',
    tel: '+919506154321',
    whatsapp: '919506154321',
    email: 'karmabysatwik@gmail.com',
    facebook: 'https://www.facebook.com/info.KarmabySatwik'
  },

  centres: [
    { id: 'birhana', name: 'Birhana Road', words: ['birhana', 'downtown', 'kanchani'],
      address: 'The backside of Kanchani Jewellers, 24/49, Birhana Road, Downtown, Kanpur' },
    { id: 'swaroop', name: 'Swaroop Nagar', words: ['swaroop', 'swarup', 'nageshwar', 'khalasi', 'sales tax'],
      address: 'Nageshwar Tower, 7/190, Sales Tax Road, Khalasi Line, Swaroop Nagar, Kanpur' },
    { id: 'kidwai', name: 'Kidwai Nagar', words: ['kidwai', 'south x', 'southx', 'anandpuri', 'm block'],
      address: '133/130, M Block, Kidwai Nagar, near South X Mall, Kanpur' },
    { id: 'shyam', name: 'Shyam Nagar', words: ['shyam', 'chhappan', 'chappan', 'chhappan bhog'],
      address: 'Chhappan Bhog Chauraha, opp. Virendra Swroop Education Center, Shyam Nagar, Kanpur, Uttar Pradesh 208007' }
  ],

  // name must match an <option> in the enquiry form's programme list
  programmes: [
    { id: 'strength', name: 'Strength & Conditioning', words: ['strength', 'conditioning', 's&c', 'functional', 'kettlebell'],
      url: 'https://karmabysatwik.com/strength-conditioning-in-kanpur/',
      summary: 'Resistance, cardiovascular and mobility work, planned after an assessment of your goals and adjusted with regular progress checks.' },
    { id: 'gym', name: 'Gym', words: ['gym', 'weights', 'machines', 'workout floor', 'unisex gym', 'cardio equipment'],
      url: 'https://karmabysatwik.com/best-unisex-gym-in-kanpur-hit-your-fitness-goal-with-us/',
      summary: 'A unisex gym with cardio machines, free weights, strength machines and resistance bands.' },
    { id: 'pt', name: 'Personal Training', words: ['personal', 'trainer', 'one on one', 'one-on-one', '1 on 1', 'pt', 'private'],
      url: 'https://karmabysatwik.com/strength-conditioning-in-kanpur/',
      summary: 'One-on-one coaching with a plan built around your goals, your level and your progress.' },
    { id: 'mma', name: 'Mix Martial Arts', words: ['mma', 'martial', 'self defence', 'self defense', 'fight', 'kickboxing', 'combat'],
      url: 'https://karmabysatwik.com/mix-martial-arts-kanpur/',
      summary: 'Mixed martial arts for fitness and self-defence, built on respect, discipline and perseverance.' },
    { id: 'yoga', name: 'Yoga', words: ['yoga', 'hatha', 'vinyasa', 'power yoga', 'restorative', 'meditation'],
      url: 'https://karmabysatwik.com/yoga-classes-in-kanpur/',
      summary: 'Hatha Yoga for beginners, dynamic Vinyasa flows, Power Yoga, Restorative Yoga and classes for flexibility. Mats are available at the studio.' },
    { id: 'aerial', name: 'Aerial Yoga', words: ['aerial', 'hammock', 'anti gravity', 'antigravity'],
      url: 'https://karmabysatwik.com/aerial-yoga-in-kanpur/',
      summary: 'Yoga in a hammock for deeper stretches, core strength and spinal decompression. Classes cater to all levels, from beginners to advanced.' },
    { id: 'pilates', name: 'Pilates & Reformer Pilates', words: ['pilates', 'reformer', 'core', 'posture'],
      url: 'https://karmabysatwik.com/pilates-in-kanpur/',
      summary: 'Low-impact work for core strength, flexibility and posture, on the mat and on the reformer. Gentle on the joints and suitable for all ages and fitness levels.' },
    { id: 'zumba', name: 'Zumba', words: ['zumba'],
      url: 'https://karmabysatwik.com/zumba-in-kanpur/',
      summary: 'High-energy dance workouts set to music, with classes for different fitness levels.' },
    { id: 'aqua', name: 'Aqua Zumba', words: ['aqua', 'aqua zumba', 'pool', 'water'],
      url: 'https://karmabysatwik.com/aqua-zumba-classes-in-kanpur/',
      summary: 'Zumba in a swimming pool: low impact, high energy, with the water adding resistance. Ask the team where and when it runs.' },
    { id: 'dance', name: 'Dance & BollyCardio', words: ['dance', 'bollycardio', 'bolly', 'bollywood', 'dance fitness'],
      url: 'https://karmabysatwik.com/bollycardio-in-kanpur/',
      summary: 'BollyCardio mixes Bollywood dance moves with cardio. There are dance classes for beginners and seasoned dancers too.' },
    { id: 'aerobics', name: 'Aerobics', words: ['aerobics', 'aerobic', 'cardio', 'hiit', 'interval'],
      url: 'https://karmabysatwik.com/aerobics-classes-in-kanpur/',
      summary: 'Rhythmic cardio classes with high, moderate and low-intensity intervals.' },
    { id: 'nutrition', name: 'Nutrition Counselling', words: ['nutrition', 'diet', 'dietitian', 'nutritionist', 'food', 'meal'],
      url: 'https://karmabysatwik.com/nutrition-counselling-services-in-kanpur/',
      summary: 'Personalised advice on your eating habits to support weight management, energy and your training. The studio also offers a free diet chart when you visit.' },
    { id: 'weight', name: 'Weight Loss & Body Transformation', words: ['weight loss', 'lose weight', 'fat', 'slim', 'transformation', 'weight management', 'obesity'],
      url: '',
      summary: 'Programmes for weight loss and weight management, body transformation, and fitness consultation. Ask about them at your trial.' }
  ],

  // goal -> programme ids, for "help me choose". Advisory only: trainers confirm at the free trial.
  goals: [
    { label: 'Lose weight', ids: ['weight', 'zumba', 'dance', 'aerobics', 'strength', 'nutrition'] },
    { label: 'Get stronger', ids: ['strength', 'gym', 'pt', 'mma'] },
    { label: 'Flexibility & posture', ids: ['yoga', 'pilates', 'aerial'] },
    { label: 'Calm & stress relief', ids: ['yoga', 'aerial'] },
    { label: 'Have fun & dance', ids: ['zumba', 'dance', 'aqua', 'aerobics'] },
    { label: 'Self-defence', ids: ['mma'] },
    { label: 'One-on-one attention', ids: ['pt', 'nutrition'] },
    { label: 'Eat better', ids: ['nutrition'] },
    { label: "I'm a beginner", ids: ['yoga', 'pilates', 'aerial', 'zumba'] }
  ],

  // Questions the site can answer. words: phrases that point to this answer (lower case).
  faqs: [
    { id: 'trial', words: ['trial', 'free', 'first session', 'try', 'demo', 'book', 'join', 'start', 'sign up', 'free month'],
      answer: 'Your free trial session includes a thorough intake, an assessment and goal setting. You also get a free diet chart when you visit. Send your details and the team will arrange it with you.',
      actions: ['book', 'whatsapp'] },
    { id: 'price', words: ['price', 'fee', 'fees', 'cost', 'charges', 'kitna', 'paisa', 'membership', 'package', 'plan', 'discount', 'offer', 'rate', 'monthly', 'rupees', 'rs'],
      answer: "Karma doesn't publish prices online, so I can't quote them. The team will share current fees for your centre and programme on WhatsApp or over the phone.",
      actions: ['whatsapp', 'call'] },
    { id: 'time', words: ['timing', 'timings', 'time', 'schedule', 'batch', 'slot', 'hours', 'open', 'close', 'morning', 'evening', 'kab', 'timetable'],
      answer: "Timings aren't published online and vary by centre and programme. Yoga, for example, runs in both mornings and evenings. Ask the team for the current timetable.",
      actions: ['whatsapp', 'call'] },
    { id: 'beginner', words: ['beginner', 'beginners', 'new', 'never', 'first time', 'unfit', 'out of shape', 'not fit', 'level'],
      answer: "Yes, beginners are welcome. Yoga has Hatha Yoga for Beginners, aerial yoga caters to all levels, and Pilates is low-impact and suits all ages and fitness levels. Your free trial starts with an assessment, so training begins at your level.",
      actions: ['finder', 'book'] },
    { id: 'unisex', words: ['unisex', 'ladies', 'women', 'woman', 'female', 'girls', 'men', 'couple', 'gender'],
      answer: 'Karma by Satwik is a unisex studio: classes and the gym floor are open to everyone.',
      actions: ['book'] },
    { id: 'mat', words: ['mat', 'mats', 'bring', 'carry', 'equipment', 'kit', 'wear', 'shoes'],
      answer: "For yoga, mats are available at the studio, and you're welcome to bring your own. For anything else you need to bring, ask the team when you book.",
      actions: ['whatsapp'] },
    { id: 'centres', words: ['centre', 'center', 'centres', 'centers', 'location', 'locations', 'address', 'where', 'kahan', 'near', 'nearest', 'branch', 'directions', 'map'],
      answer: 'Karma has four centres in Kanpur: Birhana Road, Swaroop Nagar, Kidwai Nagar and Shyam Nagar. Pick one for the address and directions.',
      actions: ['centres'] },
    { id: 'founder', words: ['satwik', 'founder', 'owner', 'who runs', 'goyal'],
      answer: "Karma was founded by Satwik Goyal, a fitness consultant from Kanpur. His expertise includes aerobics, Zumba, Pilates, strength and conditioning, functional and kettlebell training, rehabilitation, aqua workouts, tempo training and marathon running. His vision is to bust the fitness myths in day-to-day life.",
      actions: ['book'] },
    { id: 'trainers', words: ['trainers', 'instructors', 'coach', 'coaches', 'staff', 'qualified', 'certified', 'female trainer', 'female trainers', 'lady trainer', 'male trainer'],
      answer: "I can't list trainer names or qualifications because they aren't published on the website. The team can tell you who teaches your programme at your centre.",
      actions: ['whatsapp'] },
    { id: 'programmes', words: ['programmes', 'programs', 'classes', 'services', 'activities', 'what do you offer', 'offer', 'options'],
      answer: 'Karma offers gym and strength & conditioning, personal training, MMA, yoga, aerial yoga, Pilates and reformer Pilates, Zumba, Aqua Zumba, dance and BollyCardio, aerobics, nutrition counselling, and weight loss and body transformation programmes.',
      actions: ['finder', 'programmes'] },
    { id: 'diet', words: ['diet chart', 'diet plan', 'free diet'],
      answer: 'Karma offers a free diet chart when you visit the studio. For ongoing guidance, Karma also offers nutrition counselling.',
      actions: ['book'] },
    { id: 'enquiry', words: ['enquiry', 'enquire', 'form', 'fill', 'submit', 'contact', 'call back', 'callback', 'reach', 'talk', 'human', 'person', 'phone', 'number', 'email', 'whatsapp'],
      answer: 'You can call or WhatsApp +91 95061 54321, or email karmabysatwik@gmail.com. The enquiry form on this page opens WhatsApp with your details filled in, and nothing is sent until you press send there.',
      actions: ['whatsapp', 'call', 'book'] },
    { id: 'age', words: ['age', 'kids', 'kid', 'children', 'child', 'teen', 'teenager', 'senior', 'seniors', 'elderly', 'years old'],
      answer: "BollyCardio is open to all ages, from kids to seniors, and Pilates suits all ages and fitness levels. For age requirements in other classes, ask the team.",
      actions: ['whatsapp', 'book'] },
    { id: 'swimming', words: ['swimming', 'swim', 'swimming lessons', 'learn swimming', 'learn to swim'],
      answer: "The website doesn't list swimming lessons. It does list Aqua Zumba, a dance workout in a swimming pool; ask the team where and when it runs.",
      actions: ['whatsapp'] },
    { id: 'payment', words: ['pay', 'payment', 'upi', 'card', 'cash', 'emi', 'gpay', 'paytm'],
      answer: "The website doesn't cover payment options, so I can't confirm them. The team can tell you how to pay.",
      actions: ['whatsapp', 'call'] },
    { id: 'online', words: ['online', 'virtual', 'zoom', 'from home', 'home workout', 'live class'],
      answer: "Karma's website mentions online workout options but gives no details, so I can't say what's running now. Ask the team.",
      actions: ['whatsapp'] },
    { id: 'facilities', words: ['sauna', 'steam', 'parking', 'park', 'shower', 'showers', 'locker', 'lockers', 'changing room', 'washroom', 'ac', 'air conditioning', 'wifi', 'cafe', 'spa', 'swimming pool', 'lap pool', 'laps', 'facilities', 'amenities'],
      answer: "The website doesn't list facilities such as parking, showers, lockers, a sauna or a lap pool, so I can't confirm them. The team can tell you what your centre has.",
      actions: ['whatsapp', 'call'] },
    { id: 'wedding', words: ['wedding', 'sangeet', 'choreography', 'choreographer', 'mehndi', 'reception'],
      answer: 'Karma also offers wedding choreography for engagements, mehndi, sangeet, weddings and receptions.',
      actions: ['wedding', 'whatsapp'] },
    { id: 'franchise', words: ['franchise', 'franchisee', 'brochure', 'business', 'invest', 'investment', 'partner', 'open a studio', 'own studio'],
      answer: 'Karma offers franchises of its studio model. Investment starts from ₹15 lakh* for a Compact Studio of 1,500–2,000 sq ft; the Signature studio is ₹30–50 lakh* for 2,000–3,000 sq ft. Both include setup, training, systems and launch support, and no fitness-industry experience is required. (*As published on Karma\'s franchise page; the team confirms current terms.)',
      actions: ['franchise', 'brochure'] }
  ],

  // Words that mean the visitor is describing a health condition: never advise, always refer.
  medical: ['pregnan', 'injur', 'pain', 'surgery', 'operation', 'heart', 'bp', 'blood pressure', 'diabet', 'sugar',
    'asthma', 'thyroid', 'pcos', 'pcod', 'slip disc', 'disc', 'arthritis', 'hernia', 'fracture', 'medical', 'medicine',
    'doctor', 'condition', 'cholesterol', 'sciatica', 'spondyl', 'migraine', 'post partum', 'postpartum', 'knee', 'back problem'],
  medicalAnswer: "I can't give medical advice. Please check with your doctor before you start. During your free trial's intake and assessment, tell the trainers about your condition: Karma's assessment covers your goals, medical history and lifestyle.",

  fallback: "I can only answer from what Karma's website publishes, and I couldn't find that. The team can help directly on WhatsApp or by phone.",

  links: {
    wedding: 'https://karmabysatwik.com/wedding-choreographer-in-kanpur/',
    franchise: 'https://karmabysatwik.com/franchise/',
    brochure: 'https://drive.google.com/file/d/1De1wAvCjakTErEVmLcDR4cKuuY9K2FYd/view?usp=sharing'
  }
};
