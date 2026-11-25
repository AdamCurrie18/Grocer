// Illustrative recipe and grocery data for the Goodfood student prototype.
// Store prices are estimates and are not retrieved from retailer websites.
const STORES = {
  nofrills: { name: "No Frills", factor: 0.88, url: "https://www.nofrills.ca/", searchDomain: "nofrills.ca", onlineName: "No Frills", deals: ["Black beans", "Chickpeas", "Brown rice", "Yellow onion", "Eggs"] },
  walmart: { name: "Walmart", factor: 0.92, url: "https://www.walmart.ca/", searchDomain: "walmart.ca", onlineName: "Walmart", deals: ["Chicken breast", "Brown rice", "Baby spinach", "Eggs", "Black beans"] },
  superstore: { name: "Atlantic Superstore", factor: 1, url: "https://www.atlanticsuperstore.ca/", searchDomain: "atlanticsuperstore.ca", onlineName: "Atlantic Superstore", deals: ["Salmon fillets", "Broccoli", "Sweet potatoes", "Cucumber", "Lime"] },
  sobeys: { name: "Sobeys", factor: 1.12, url: "https://voila.ca/", searchDomain: "voila.ca", onlineName: "Sobeys on Voilà", deals: ["Ground turkey", "Bell pepper", "Crushed tomatoes", "Baby spinach", "Lemon"] }
};

const MEALS = [
  {
    name: "Smoky black bean tacos", emoji: "🌮", color: "peach", time: 25, description: "with crunchy cabbage & lime",
    steps: [
      "Drain and rinse the black beans. Warm them in a skillet with a splash of water and a pinch of cumin until hot.",
      "Thinly slice the cabbage and cut the lime into wedges.",
      "Warm the tortillas in a dry skillet or microwave.",
      "Fill each tortilla with beans, cabbage, and salsa. Finish with a squeeze of lime."
    ],
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free", "high-protein"],
    ingredients: [
      { name: "Corn tortillas", quantity: 1, unit: "pack", price: 3.49, aisle: "Bakery & grains" },
      { name: "Black beans", quantity: 2, unit: "cans", price: 1.29, aisle: "Canned & pantry" },
      { name: "Red cabbage", quantity: 1, unit: "head", price: 2.99, aisle: "Produce" },
      { name: "Lime", quantity: 1, unit: "each", price: 0.79, aisle: "Produce" },
      { name: "Salsa", quantity: 1, unit: "jar", price: 3.49, aisle: "Canned & pantry" }
    ]
  },
  {
    name: "Golden chickpea curry", emoji: "🍛", color: "gold", time: 30, description: "with fluffy rice & spinach",
    steps: [
      "Cook the brown rice according to the package directions.",
      "Dice the onion. Soften it in a pot with a little oil, then stir in the curry powder.",
      "Add drained chickpeas and coconut milk. Simmer gently for about 15 minutes.",
      "Stir in the spinach until wilted, then serve over the rice."
    ],
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    ingredients: [
      { name: "Chickpeas", quantity: 2, unit: "cans", price: 1.29, aisle: "Canned & pantry" },
      { name: "Coconut milk", quantity: 1, unit: "can", price: 2.49, aisle: "Canned & pantry" },
      { name: "Baby spinach", quantity: 1, unit: "bag", price: 3.49, aisle: "Produce" },
      { name: "Brown rice", quantity: 1, unit: "bag", price: 3.99, aisle: "Bakery & grains" },
      { name: "Yellow onion", quantity: 1, unit: "each", price: 0.99, aisle: "Produce" },
      { name: "Curry powder", quantity: 1, unit: "jar", price: 4.49, aisle: "Canned & pantry" }
    ]
  },
  {
    name: "Cozy lentil tomato soup", emoji: "🍲", color: "sage", time: 35, description: "with carrots & crusty bread",
    steps: [
      "Dice the onion and carrots. Soften them in a large pot with a little oil.",
      "Rinse the lentils, then add them to the pot with the crushed tomatoes and vegetable broth.",
      "Bring to a boil, then lower the heat and simmer until the lentils are tender, about 25 minutes.",
      "Season to taste and serve with warm bread."
    ],
    diets: ["vegetarian", "vegan", "dairy-free"],
    ingredients: [
      { name: "Green lentils", quantity: 1, unit: "bag", price: 3.49, aisle: "Canned & pantry" },
      { name: "Crushed tomatoes", quantity: 1, unit: "can", price: 1.79, aisle: "Canned & pantry" },
      { name: "Carrots", quantity: 1, unit: "bag", price: 2.49, aisle: "Produce" },
      { name: "Vegetable broth", quantity: 1, unit: "carton", price: 2.49, aisle: "Canned & pantry" },
      { name: "Yellow onion", quantity: 1, unit: "each", price: 0.99, aisle: "Produce" },
      { name: "Whole wheat bread", quantity: 1, unit: "loaf", price: 3.49, aisle: "Bakery & grains" }
    ]
  },
  {
    name: "Ginger tofu rice bowls", emoji: "🥢", color: "lavender", time: 25, description: "with crisp veggies & tamari",
    steps: [
      "Cook the brown rice according to the package directions.",
      "Pat the tofu dry, cut it into cubes, and brown in a lightly oiled skillet.",
      "Add the mixed vegetables and cook until hot. Grate in the ginger and splash in tamari.",
      "Serve the tofu and vegetables over rice."
    ],
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free", "high-protein"],
    ingredients: [
      { name: "Extra-firm tofu", quantity: 1, unit: "block", price: 3.49, aisle: "Dairy & alternatives" },
      { name: "Brown rice", quantity: 1, unit: "bag", price: 3.99, aisle: "Bakery & grains" },
      { name: "Frozen mixed vegetables", quantity: 1, unit: "bag", price: 3.49, aisle: "Frozen" },
      { name: "Tamari", quantity: 1, unit: "bottle", price: 4.49, aisle: "Canned & pantry" },
      { name: "Fresh ginger", quantity: 1, unit: "piece", price: 1.49, aisle: "Produce" }
    ]
  },
  {
    name: "One-pot tomato pasta", emoji: "🍝", color: "rose", time: 20, description: "with spinach & parmesan",
    steps: [
      "Add the pasta and crushed tomatoes to a pot with enough water to just cover the pasta. Season lightly.",
      "Bring to a simmer and cook, stirring often, until the pasta is tender, about 10–12 minutes. Add a splash of water if needed.",
      "Stir in the spinach until wilted.",
      "Serve with grated parmesan."
    ],
    diets: ["vegetarian"],
    ingredients: [
      { name: "Penne pasta", quantity: 1, unit: "box", price: 2.49, aisle: "Bakery & grains" },
      { name: "Crushed tomatoes", quantity: 1, unit: "can", price: 1.79, aisle: "Canned & pantry" },
      { name: "Baby spinach", quantity: 1, unit: "bag", price: 3.49, aisle: "Produce" },
      { name: "Parmesan", quantity: 1, unit: "wedge", price: 4.49, aisle: "Dairy & alternatives" }
    ]
  },
  {
    name: "Loaded sweet potatoes", emoji: "🍠", color: "gold", time: 35, description: "with black beans & avocado",
    steps: [
      "Scrub the sweet potatoes, prick them with a fork, and bake at 400°F until soft, about 35–45 minutes.",
      "Warm the drained black beans with a spoonful of salsa.",
      "Split each potato and spoon the beans on top.",
      "Add sliced avocado, more salsa, and a squeeze of lime."
    ],
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    ingredients: [
      { name: "Sweet potatoes", quantity: 1, unit: "bag", price: 4.49, aisle: "Produce" },
      { name: "Black beans", quantity: 2, unit: "cans", price: 1.29, aisle: "Canned & pantry" },
      { name: "Avocado", quantity: 2, unit: "each", price: 1.49, aisle: "Produce" },
      { name: "Lime", quantity: 1, unit: "each", price: 0.79, aisle: "Produce" },
      { name: "Salsa", quantity: 1, unit: "jar", price: 3.49, aisle: "Canned & pantry" }
    ]
  },
  {
    name: "Weeknight chickpea bowls", emoji: "🥗", color: "sage", time: 20, description: "with cucumber & lemon tahini",
    steps: [
      "Rinse the quinoa and cook according to the package directions.",
      "Drain and rinse the chickpeas, then chop the cucumber.",
      "Whisk tahini with lemon juice and a little water until smooth and pourable.",
      "Divide the quinoa into bowls, add chickpeas and cucumber, and drizzle with the lemon tahini."
    ],
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    ingredients: [
      { name: "Chickpeas", quantity: 2, unit: "cans", price: 1.29, aisle: "Canned & pantry" },
      { name: "Quinoa", quantity: 1, unit: "bag", price: 5.49, aisle: "Bakery & grains" },
      { name: "Cucumber", quantity: 1, unit: "each", price: 1.49, aisle: "Produce" },
      { name: "Tahini", quantity: 1, unit: "jar", price: 5.49, aisle: "Canned & pantry" },
      { name: "Lemon", quantity: 1, unit: "each", price: 0.99, aisle: "Produce" }
    ]
  },
  {
    name: "Egg & potato breakfast-for-dinner", emoji: "🍳", color: "peach", time: 30, description: "with peppers & green onion",
    steps: [
      "Dice the potatoes and bell pepper. Cook the potatoes in a lightly oiled skillet until browned and tender, about 15–20 minutes.",
      "Add the pepper and cook until softened.",
      "Beat the eggs, pour them into the skillet, and gently scramble until just set.",
      "Top with sliced green onion and season to taste."
    ],
    diets: ["vegetarian", "gluten-free", "high-protein"],
    ingredients: [
      { name: "Eggs", quantity: 1, unit: "dozen", price: 4.99, aisle: "Dairy & alternatives" },
      { name: "Yellow potatoes", quantity: 1, unit: "bag", price: 4.49, aisle: "Produce" },
      { name: "Bell pepper", quantity: 2, unit: "each", price: 1.49, aisle: "Produce" },
      { name: "Green onion", quantity: 1, unit: "bunch", price: 1.49, aisle: "Produce" }
    ]
  },
  {
    name: "Easy turkey & bean chili", emoji: "🥣", color: "rose", time: 35, description: "with warm rice & fresh cilantro",
    steps: [
      "Cook the brown rice according to the package directions.",
      "Dice the onion. In a pot, cook it with the ground turkey until the turkey is browned and cooked through.",
      "Stir in drained kidney beans, crushed tomatoes, a splash of water, and chili powder. Simmer for 20 minutes.",
      "Serve over rice with chopped cilantro, if available."
    ],
    diets: ["gluten-free", "dairy-free", "high-protein"],
    ingredients: [
      { name: "Ground turkey", quantity: 1, unit: "pack", price: 7.99, aisle: "Meat & seafood" },
      { name: "Kidney beans", quantity: 2, unit: "cans", price: 1.29, aisle: "Canned & pantry" },
      { name: "Crushed tomatoes", quantity: 1, unit: "can", price: 1.79, aisle: "Canned & pantry" },
      { name: "Brown rice", quantity: 1, unit: "bag", price: 3.99, aisle: "Bakery & grains" },
      { name: "Yellow onion", quantity: 1, unit: "each", price: 0.99, aisle: "Produce" },
      { name: "Chili powder", quantity: 1, unit: "jar", price: 3.49, aisle: "Canned & pantry" },
      { name: "Cilantro", quantity: 1, unit: "bunch", price: 1.49, aisle: "Produce" }
    ]
  },
  {
    name: "Lemony chickpea & spinach stew", emoji: "🍋", color: "lavender", time: 25, description: "with warm quinoa & lemon",
    steps: [
      "Rinse the quinoa, then simmer it in the vegetable broth according to the package directions.",
      "Drain and rinse the chickpeas. Stir them into the quinoa for the last few minutes to warm through.",
      "Fold in the spinach until wilted.",
      "Finish with lemon juice, black pepper, and a little olive oil, then serve warm."
    ],
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    ingredients: [
      { name: "Chickpeas", quantity: 2, unit: "cans", price: 1.29, aisle: "Canned & pantry" },
      { name: "Baby spinach", quantity: 1, unit: "bag", price: 3.49, aisle: "Produce" },
      { name: "Quinoa", quantity: 1, unit: "bag", price: 5.49, aisle: "Bakery & grains" },
      { name: "Lemon", quantity: 1, unit: "each", price: 0.99, aisle: "Produce" },
      { name: "Vegetable broth", quantity: 1, unit: "carton", price: 2.49, aisle: "Canned & pantry" }
    ]
  },
  {
    name: "Chicken fajita rice bowls", emoji: "🌶️", color: "peach", time: 30, description: "with peppers, onions & lime",
    diets: ["gluten-free", "dairy-free", "high-protein"],
    steps: [
      "Cook the brown rice according to the package directions.",
      "Slice the chicken, bell pepper, and onion. Season the chicken with salt, pepper, and a pinch of cumin.",
      "Cook the chicken in a lightly oiled skillet until cooked through. Add the pepper and onion and cook until tender.",
      "Serve over rice with lime juice."
    ],
    tutorial: {
      title: "Chicken Fajita Rice Bowl | Easy Chicken and Rice Bowl",
      channel: "The Yummy Delights",
      url: "https://www.youtube.com/watch?v=5AZxeO78ryI"
    },
    ingredients: [
      { name: "Chicken breast", quantity: 1, unit: "pack", price: 8.99, aisle: "Meat & seafood" },
      { name: "Brown rice", quantity: 1, unit: "bag", price: 3.99, aisle: "Bakery & grains" },
      { name: "Bell pepper", quantity: 2, unit: "each", price: 1.49, aisle: "Produce" },
      { name: "Yellow onion", quantity: 1, unit: "each", price: 0.99, aisle: "Produce" },
      { name: "Lime", quantity: 1, unit: "each", price: 0.79, aisle: "Produce" }
    ]
  },
  {
    name: "Easy tomato shakshuka", emoji: "🍳", color: "rose", time: 30, description: "eggs gently poached in spiced tomatoes",
    diets: ["vegetarian", "gluten-free", "dairy-free", "high-protein"],
    steps: [
      "Dice the onion and bell pepper. Soften them in a lightly oiled skillet.",
      "Add the crushed tomatoes, cumin, paprika, salt, and pepper. Simmer for 10 minutes.",
      "Make small wells in the sauce and crack an egg into each one.",
      "Cover and cook until the egg whites are set. Serve straight from the skillet."
    ],
    tutorial: {
      title: "Easy Shakshuka Recipe | How to Make The Best Shakshuka",
      channel: "The Cooking Foodie",
      url: "https://www.youtube.com/watch?v=urMyZ1WosYE"
    },
    ingredients: [
      { name: "Eggs", quantity: 1, unit: "dozen", price: 4.99, aisle: "Dairy & alternatives" },
      { name: "Crushed tomatoes", quantity: 1, unit: "can", price: 1.79, aisle: "Canned & pantry" },
      { name: "Bell pepper", quantity: 1, unit: "each", price: 1.49, aisle: "Produce" },
      { name: "Yellow onion", quantity: 1, unit: "each", price: 0.99, aisle: "Produce" }
    ]
  },
  {
    name: "Black bean quesadillas", emoji: "🧀", color: "gold", time: 20, description: "crispy tortillas with beans & melty cheese",
    diets: ["vegetarian"],
    steps: [
      "Drain and rinse the black beans, then lightly mash them with a fork.",
      "Spread beans and shredded cheese over half of each tortilla and fold it closed.",
      "Toast in a dry skillet over medium heat, turning once, until golden and the cheese melts.",
      "Cut into wedges and serve with salsa."
    ],
    tutorial: {
      title: "Hearty Black Bean Quesadillas",
      channel: "Budget Bytes",
      url: "https://www.youtube.com/watch?v=4AQiIjGnR7A"
    },
    ingredients: [
      { name: "Black beans", quantity: 2, unit: "cans", price: 1.29, aisle: "Canned & pantry" },
      { name: "Flour tortillas", quantity: 1, unit: "pack", price: 3.49, aisle: "Bakery & grains" },
      { name: "Shredded cheddar", quantity: 1, unit: "bag", price: 4.49, aisle: "Dairy & alternatives" },
      { name: "Salsa", quantity: 1, unit: "jar", price: 3.49, aisle: "Canned & pantry" }
    ]
  },
  {
    name: "Sheet-pan salmon & vegetables", emoji: "🐟", color: "lavender", time: 30, description: "with broccoli, sweet potatoes & lemon",
    diets: ["gluten-free", "dairy-free", "high-protein"],
    steps: [
      "Heat the oven to 425°F. Cut the sweet potatoes into small cubes and the broccoli into florets.",
      "Toss the vegetables with a little oil, salt, and pepper on a lined baking sheet. Roast for 15 minutes.",
      "Add the salmon to the pan, season it, and add lemon slices.",
      "Bake for 10–12 minutes more, until the salmon flakes easily and the vegetables are tender."
    ],
    tutorial: {
      title: "Sheet-pan salmon with broccoli and sweet potatoes",
      channel: "TODAY Food",
      url: "https://www.youtube.com/watch?v=g8VO1SIl0B0"
    },
    ingredients: [
      { name: "Salmon fillets", quantity: 1, unit: "pack", price: 11.99, aisle: "Meat & seafood" },
      { name: "Broccoli", quantity: 1, unit: "head", price: 2.99, aisle: "Produce" },
      { name: "Sweet potatoes", quantity: 1, unit: "bag", price: 4.49, aisle: "Produce" },
      { name: "Lemon", quantity: 1, unit: "each", price: 0.99, aisle: "Produce" }
    ]
  },
  {
    name: "Easy egg fried rice", emoji: "🍚", color: "sage", time: 20, description: "with vegetables, tamari & green onion",
    diets: ["vegetarian", "gluten-free", "dairy-free", "high-protein"],
    steps: [
      "Cook the brown rice, then spread it out to cool. Cold leftover rice works especially well.",
      "Scramble the eggs in a hot, lightly oiled skillet and set them aside.",
      "Stir-fry the mixed vegetables until hot. Add the rice and tamari and toss until warmed through.",
      "Fold the eggs back in and finish with sliced green onion."
    ],
    tutorial: {
      title: "Easy Egg Fried Rice (Better Than Takeout)",
      channel: "Nick's Kitchen",
      url: "https://www.youtube.com/watch?v=a7NtNxzROpI"
    },
    ingredients: [
      { name: "Brown rice", quantity: 1, unit: "bag", price: 3.99, aisle: "Bakery & grains" },
      { name: "Eggs", quantity: 1, unit: "dozen", price: 4.99, aisle: "Dairy & alternatives" },
      { name: "Frozen mixed vegetables", quantity: 1, unit: "bag", price: 3.49, aisle: "Frozen" },
      { name: "Tamari", quantity: 1, unit: "bottle", price: 4.49, aisle: "Canned & pantry" },
      { name: "Green onion", quantity: 1, unit: "bunch", price: 1.49, aisle: "Produce" }
    ]
  },
  {
    name: "Greek-style lentil salad", emoji: "🥗", color: "sage", time: 30, description: "with cucumber, tomato, lemon & parsley",
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free", "high-protein"],
    steps: [
      "Rinse the lentils and simmer in water until tender but not mushy, about 20–25 minutes. Drain and cool.",
      "Dice the cucumber and tomatoes and finely chop the red onion and parsley.",
      "Whisk lemon juice with a little olive oil, salt, and pepper.",
      "Toss the lentils and vegetables with the dressing. Serve chilled or at room temperature."
    ],
    tutorial: {
      title: "Mediterranean Lentil Salad Recipe | Vegan Salad Recipe",
      channel: "The Mediterranean Dish",
      url: "https://www.youtube.com/watch?v=sBfXW4nPJI8"
    },
    ingredients: [
      { name: "Green lentils", quantity: 1, unit: "bag", price: 3.49, aisle: "Canned & pantry" },
      { name: "Cucumber", quantity: 1, unit: "each", price: 1.49, aisle: "Produce" },
      { name: "Cherry tomatoes", quantity: 1, unit: "pint", price: 3.49, aisle: "Produce" },
      { name: "Red onion", quantity: 1, unit: "each", price: 1.49, aisle: "Produce" },
      { name: "Lemon", quantity: 1, unit: "each", price: 0.99, aisle: "Produce" },
      { name: "Parsley", quantity: 1, unit: "bunch", price: 1.49, aisle: "Produce" }
    ]
  },
  {
    name: "Buffalo chickpea salad wraps", emoji: "🌯", color: "peach", time: 20, description: "creamy, crunchy & completely plant-based",
    diets: ["vegetarian", "vegan", "dairy-free", "high-protein"],
    steps: [
      "Drain and rinse the chickpeas, then mash them in a bowl, leaving a few whole.",
      "Stir in buffalo sauce and vegan mayonnaise until creamy.",
      "Finely chop the celery and fold it into the chickpeas.",
      "Spoon into wraps with crisp lettuce, roll up, and enjoy."
    ],
    tutorial: {
      title: "20 Minute Buffalo Chickpea Salad Wraps",
      channel: "Vanilla And Bean",
      url: "https://www.youtube.com/watch?v=bfCWPTu6hi0"
    },
    ingredients: [
      { name: "Chickpeas", quantity: 2, unit: "cans", price: 1.29, aisle: "Canned & pantry" },
      { name: "Whole wheat wraps", quantity: 1, unit: "pack", price: 3.99, aisle: "Bakery & grains" },
      { name: "Celery", quantity: 1, unit: "bunch", price: 2.49, aisle: "Produce" },
      { name: "Romaine lettuce", quantity: 1, unit: "pack", price: 3.49, aisle: "Produce" },
      { name: "Buffalo sauce", quantity: 1, unit: "bottle", price: 4.49, aisle: "Canned & pantry" },
      { name: "Vegan mayonnaise", quantity: 1, unit: "jar", price: 5.49, aisle: "Canned & pantry" }
    ]
  }
];
