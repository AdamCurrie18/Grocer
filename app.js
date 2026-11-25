(function () {
  "use strict";

  const form = document.getElementById("planner-form");
  const results = document.getElementById("results");
  const message = document.getElementById("form-message");
  const mealList = document.getElementById("meal-list");
  const shoppingList = document.getElementById("shopping-list");
  const currency = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" });
  let currentPlan = null;
  let checkedItems = new Set();

  function getPreferences() {
    return {
      budget: Number(form.elements.budget.value),
      people: Number(form.elements.people.value),
      location: form.elements.location.value.trim(),
      storeId: form.elements.store.value,
      diets: Array.from(form.querySelectorAll('input[name="diet"]:checked')).map(function (input) {
        return input.value;
      })
    };
  }

  function getEligibleMeals(diets) {
    return MEALS.filter(function (meal) {
      return diets.every(function (diet) { return meal.diets.indexOf(diet) !== -1; });
    });
  }

  function ingredientCost(ingredient, multiplier, servingScale) {
    return ingredient.price * ingredient.quantity * multiplier * servingScale;
  }

  function getAddedCost(meal, basket, multiplier, servingScale) {
    return meal.ingredients.reduce(function (total, ingredient) {
      const current = basket[ingredient.name];
      const alreadyAdded = current ? current.quantity : 0;
      const needed = ingredient.quantity * servingScale;
      return total + Math.max(0, needed - alreadyAdded) * ingredient.price * multiplier;
    }, 0);
  }

  function makePlan(preferences) {
    const store = STORES[preferences.storeId];
    const eligible = getEligibleMeals(preferences.diets);
    if (eligible.length === 0) return null;

    const servingScale = Math.ceil(preferences.people / 2);
    const basket = Object.create(null);
    const remaining = eligible.slice();
    const meals = [];

    while (meals.length < 7) {
      if (remaining.length === 0) remaining.push.apply(remaining, eligible.slice());
      const scored = remaining.map(function (meal) {
        return {
          meal: meal,
          cost: getAddedCost(meal, basket, store.factor, servingScale)
        };
      });
      scored.sort(function (a, b) { return a.cost - b.cost; });
      const finalists = scored.filter(function (entry) {
        return entry.cost <= scored[0].cost + Math.max(1.5, scored[0].cost * 0.18);
      });
      const chosen = finalists[Math.floor(Math.random() * finalists.length)].meal;
      meals.push(chosen);
      remaining.splice(remaining.indexOf(chosen), 1);

      chosen.ingredients.forEach(function (ingredient) {
        const quantity = ingredient.quantity * servingScale;
        if (!basket[ingredient.name]) {
          basket[ingredient.name] = {
            name: ingredient.name,
            quantity: 0,
            unit: ingredient.unit,
            price: ingredient.price,
            aisle: ingredient.aisle
          };
        }
        basket[ingredient.name].quantity += quantity;
      });
    }

    const items = Object.keys(basket).map(function (key) {
      const item = basket[key];
      item.estimatedCost = item.quantity * item.price * store.factor;
      return item;
    });
    const total = items.reduce(function (sum, item) { return sum + item.estimatedCost; }, 0);
    return { meals: meals, items: items, total: total, store: store, preferences: preferences };
  }

  function formatQuantity(quantity) {
    return Number.isInteger(quantity) ? String(quantity) : quantity.toFixed(1);
  }

  function renderMeals(plan) {
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    mealList.replaceChildren();

    plan.meals.forEach(function (meal, index) {
      const article = document.createElement("article");
      article.className = "meal-card";

      const day = document.createElement("span");
      day.className = "meal-day";
      day.textContent = weekdays[index];

      const illustration = document.createElement("span");
      illustration.className = "meal-illustration " + meal.color;
      illustration.setAttribute("aria-hidden", "true");
      illustration.textContent = meal.emoji;

      const details = document.createElement("div");
      details.className = "meal-details";
      const title = document.createElement("h4");
      title.textContent = meal.name;
      const description = document.createElement("p");
      description.textContent = meal.description;
      details.append(title, description);

      const time = document.createElement("span");
      time.className = "meal-time";
      time.textContent = meal.time + " min";

      article.append(day, illustration, details, time);
      mealList.append(article);
    });
    document.getElementById("menu-count").textContent = plan.meals.length + " dinners";
  }

  function renderShoppingList(plan) {
    shoppingList.replaceChildren();
    const aisles = Array.from(new Set(plan.items.map(function (item) { return item.aisle; })))
      .sort(function (a, b) { return a.localeCompare(b); });

    aisles.forEach(function (aisle) {
      const section = document.createElement("section");
      section.className = "aisle-section";
      const heading = document.createElement("h4");
      heading.textContent = aisle;
      section.append(heading);

      plan.items.filter(function (item) { return item.aisle === aisle; })
        .sort(function (a, b) { return a.name.localeCompare(b.name); })
        .forEach(function (item) {
          const label = document.createElement("label");
          label.className = "shopping-item";
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = checkedItems.has(item.name);
          checkbox.addEventListener("change", function () {
            if (checkbox.checked) checkedItems.add(item.name);
            else checkedItems.delete(item.name);
            label.classList.toggle("is-checked", checkbox.checked);
          });
          const name = document.createElement("span");
          name.className = "shopping-item-name";
          name.textContent = item.name;
          const quantity = document.createElement("span");
          quantity.className = "shopping-quantity";
          quantity.textContent = formatQuantity(item.quantity) + " " + item.unit;
          label.classList.toggle("is-checked", checkbox.checked);
          label.append(checkbox, name, quantity);
          section.append(label);
        });
      shoppingList.append(section);
    });
  }

  function renderPlan(plan) {
    currentPlan = plan;
    checkedItems = new Set();
    renderMeals(plan);
    renderShoppingList(plan);
    const location = plan.preferences.location;
    document.getElementById("results-subtitle").textContent =
      "A little inspiration for " + (location || "your week") + ", with everyday ingredients and easy-to-follow recipes.";
    document.getElementById("store-line").textContent =
      plan.store.name + " · " + (location || "Your area") + " · " + plan.preferences.people +
      (plan.preferences.people === 1 ? " person" : " people");
    document.getElementById("basket-total").textContent = currency.format(plan.total);

    const budgetStatus = document.getElementById("budget-status");
    const difference = plan.preferences.budget - plan.total;
    if (difference >= 0) {
      budgetStatus.className = "budget-status within-budget";
      budgetStatus.textContent = currency.format(difference) + " under your " + currency.format(plan.preferences.budget) + " budget";
    } else {
      budgetStatus.className = "budget-status over-budget";
      budgetStatus.textContent = currency.format(Math.abs(difference)) + " over your " + currency.format(plan.preferences.budget) + " budget — try a higher budget or fewer people.";
    }

    const storeLink = document.getElementById("store-link");
    storeLink.href = plan.store.url;
    document.getElementById("copy-button").textContent = "Copy shopping list ⧉";
    results.hidden = false;
  }

  function submitPlan(event) {
    if (event) event.preventDefault();
    if (!form.reportValidity()) return;

    const preferences = getPreferences();
    if (!preferences.location) {
      message.textContent = "Add a town or postal code so your plan has a location.";
      form.elements.location.focus();
      return;
    }
    const plan = makePlan(preferences);
    if (!plan) {
      message.textContent = "Those preferences don't match our current recipes. Try removing a preference to see more options.";
      return;
    }
    message.textContent = "";
    renderPlan(plan);
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("submit", submitPlan);
  document.getElementById("regenerate-button").addEventListener("click", submitPlan);
  document.getElementById("copy-button").addEventListener("click", async function () {
    if (!currentPlan) return;
    const lines = [
      "Goodfood shopping list — " + currentPlan.store.name + " (" + (currentPlan.preferences.location || "your area") + ")",
      "Estimated basket: " + currency.format(currentPlan.total),
      ""
    ];
    const aisles = Array.from(new Set(currentPlan.items.map(function (item) { return item.aisle; })))
      .sort(function (a, b) { return a.localeCompare(b); });
    aisles.forEach(function (aisle) {
      lines.push(aisle);
      currentPlan.items.filter(function (item) { return item.aisle === aisle; })
        .sort(function (a, b) { return a.name.localeCompare(b.name); })
        .forEach(function (item) {
          lines.push("- " + item.name + " — " + formatQuantity(item.quantity) + " " + item.unit);
        });
      lines.push("");
    });
    const button = document.getElementById("copy-button");
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      button.textContent = "Copied to clipboard ✓";
    } catch (error) {
      button.textContent = "Couldn't copy — select the list to copy";
    }
  });

  submitPlan();
})();
