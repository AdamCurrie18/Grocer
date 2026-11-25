// Illustrative recipe and grocery data for the Goodfood student prototype.
// Store prices are estimates and are not retrieved from retailer websites.
const STORES = {
  nofrills: { name: "No Frills", factor: 0.88, url: "https://www.nofrills.ca/" },
  walmart: { name: "Walmart", factor: 0.92, url: "https://www.walmart.ca/" },
  superstore: { name: "Atlantic Superstore", factor: 1, url: "https://www.atlanticsuperstore.ca/" },
  sobeys: { name: "Sobeys", factor: 1.12, url: "https://www.sobeys.com/" }
};

const MEALS = [
  {
    name: "Smoky black bean tacos", emoji: "🌮", color: "peach", time: 25, description: "with crunchy cabbage & lime",
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
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    ingredients: [
      { name: "Chickpeas", quantity: 2, unit: "cans", price: 1.29, aisle: "Canned & pantry" },
      { name: "Coconut milk", quantity: 1, unit: "can", price: 2.49, aisle: "Canned & pantry" },
      { name: "Baby spinach", quantity: 1, unit: "bag", price: 3.49, aisle: "Produce" },
      { name: "Brown rice", quantity: 1, unit: "bag", price: 3.99, aisle: "Bakery & grains" },
      { name: "Yellow onion", quantity: 1, unit: "each", price: 0.99, aisle: "Produce" }
    ]
  },
  {
    name: "Cozy lentil tomato soup", emoji: "🍲", color: "sage", time: 35, description: "with carrots & crusty bread",
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
    name: "Egg & potato breakfast-for-dinner", emoji: "🍳", color: "peach", time: 30, description: "with peppers & a little hot sauce",
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
    diets: ["gluten-free", "dairy-free", "high-protein"],
    ingredients: [
      { name: "Ground turkey", quantity: 1, unit: "pack", price: 7.99, aisle: "Meat & seafood" },
      { name: "Kidney beans", quantity: 2, unit: "cans", price: 1.29, aisle: "Canned & pantry" },
      { name: "Crushed tomatoes", quantity: 1, unit: "can", price: 1.79, aisle: "Canned & pantry" },
      { name: "Brown rice", quantity: 1, unit: "bag", price: 3.99, aisle: "Bakery & grains" },
      { name: "Yellow onion", quantity: 1, unit: "each", price: 0.99, aisle: "Produce" }
    ]
  },
  {
    name: "Lemony chickpea & spinach stew", emoji: "🍋", color: "lavender", time: 25, description: "with warm quinoa & fresh herbs",
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    ingredients: [
      { name: "Chickpeas", quantity: 2, unit: "cans", price: 1.29, aisle: "Canned & pantry" },
      { name: "Baby spinach", quantity: 1, unit: "bag", price: 3.49, aisle: "Produce" },
      { name: "Quinoa", quantity: 1, unit: "bag", price: 5.49, aisle: "Bakery & grains" },
      { name: "Lemon", quantity: 1, unit: "each", price: 0.99, aisle: "Produce" },
      { name: "Vegetable broth", quantity: 1, unit: "carton", price: 2.49, aisle: "Canned & pantry" }
    ]
  }
];
