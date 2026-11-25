(function () {
  "use strict";

  const form = document.getElementById("planner-form");
  const results = document.getElementById("results");
  const message = document.getElementById("form-message");
  const mealList = document.getElementById("meal-list");
  const shoppingList = document.getElementById("shopping-list");
  const recipeSearchForm = document.getElementById("recipe-search-form");
  const recipeQuery = document.getElementById("recipe-query");
  const recipeSearchResults = document.getElementById("recipe-search-results");
  const recipeSearchList = document.getElementById("recipe-search-list");
  const recipeSearchMessage = document.getElementById("recipe-search-message");
  const currency = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" });
  let currentPlan = null;
  let checkedItems = new Set();

  function getPreferences() {
    return {
      budget: Number(form.elements.budget.value),
      people: Number(form.elements.people.value),
      location: form.elements.location.value.trim(),
      storeId: form.elements.store.value,
      plus: document.getElementById("premium-controls").hidden === false,
      calories: Number(form.elements.calories.value),
      protein: Number(form.elements.protein.value),
      goal: form.elements.goal.value,
      pantry: form.elements.pantry.value,
      useDeals: form.elements.useDeals.checked,
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

  function normalizeSearchTerm(value) {
    return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim();
  }

  function findRecipeMatches(query) {
    const ignoredWords = ["a", "an", "and", "for", "have", "i", "ingredients", "make", "meal", "need", "of", "recipe", "some", "the", "to", "want", "with"];
    const terms = query.split(/[,;\n]+/).flatMap(function (part) {
      return normalizeSearchTerm(part).split(/\s+/).filter(function (term) {
        return term && ignoredWords.indexOf(term) === -1;
      });
    });

    return MEALS.map(function (meal) {
      const matchedIngredients = meal.ingredients.filter(function (ingredient) {
        const name = normalizeSearchTerm(ingredient.name);
        return terms.some(function (term) { return name.includes(term) || term.includes(name); });
      });
      const matchedTerms = terms.filter(function (term) {
        return normalizeSearchTerm(meal.name).includes(term) ||
          meal.ingredients.some(function (ingredient) {
            const name = normalizeSearchTerm(ingredient.name);
            return name.includes(term) || term.includes(name);
          });
      });
      return {
        meal: meal,
        matchedIngredients: matchedIngredients,
        matchedTerms: matchedTerms.length
      };
    }).filter(function (match) {
      return match.matchedTerms > 0;
    }).sort(function (a, b) {
      return b.matchedTerms - a.matchedTerms ||
        b.matchedIngredients.length - a.matchedIngredients.length ||
        a.meal.name.localeCompare(b.meal.name);
    });
  }

  function renderRecipeMatches(matches, query) {
    recipeSearchList.replaceChildren();

    if (matches.length === 0) {
      const emptyState = document.createElement("p");
      emptyState.className = "recipe-empty-state";
      emptyState.textContent = "No recipes in our sample collection matched that search. Try another dish or ingredient, or search YouTube for more ideas.";
      const videoSearch = document.createElement("a");
      videoSearch.className = "tutorial-link";
      videoSearch.href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(query + " recipe");
      videoSearch.target = "_blank";
      videoSearch.rel = "noopener noreferrer";
      videoSearch.textContent = "Search YouTube for “" + query + "” ↗";
      recipeSearchList.append(emptyState, videoSearch);
      return;
    }

    matches.forEach(function (match) {
      const meal = match.meal;
      const card = document.createElement("article");
      card.className = "recipe-result-card";

      const header = document.createElement("div");
      header.className = "recipe-result-header";
      const title = document.createElement("h4");
      title.textContent = meal.emoji + " " + meal.name;
      const time = document.createElement("span");
      time.className = "recipe-result-time";
      time.textContent = meal.time + " min";
      header.append(title, time);

      const description = document.createElement("p");
      description.className = "recipe-result-description";
      description.textContent = meal.description;

      const matchSummary = document.createElement("p");
      matchSummary.className = "recipe-match-summary";
      matchSummary.textContent = match.matchedIngredients.length
        ? "Matches: " + match.matchedIngredients.map(function (ingredient) { return ingredient.name; }).join(", ")
        : "Matches your meal search";

      const ingredientsHeading = document.createElement("h5");
      ingredientsHeading.textContent = "Ingredients";
      const ingredients = document.createElement("ul");
      ingredients.className = "recipe-ingredients";
      meal.ingredients.forEach(function (ingredient) {
        const item = document.createElement("li");
        item.textContent = ingredient.name;
        ingredients.append(item);
      });

      const stepsHeading = document.createElement("h5");
      stepsHeading.textContent = "How to make it";
      const steps = document.createElement("ol");
      steps.className = "recipe-steps";
      meal.steps.forEach(function (step) {
        const item = document.createElement("li");
        item.textContent = step;
        steps.append(item);
      });

      const videoLink = document.createElement("a");
      videoLink.className = "tutorial-link";
      videoLink.href = meal.tutorial
        ? meal.tutorial.url
        : "https://www.youtube.com/results?search_query=" + encodeURIComponent(meal.name + " recipe tutorial");
      videoLink.target = "_blank";
      videoLink.rel = "noopener noreferrer";
      videoLink.textContent = meal.tutorial
        ? "Watch: " + meal.tutorial.title + " · " + meal.tutorial.channel + " ↗"
        : "Find a YouTube tutorial ↗";

      card.append(header, description, matchSummary, ingredientsHeading, ingredients, stepsHeading, steps, videoLink);
      recipeSearchList.append(card);
    });
  }

  function submitRecipeSearch(event) {
    event.preventDefault();
    const query = recipeQuery.value.trim();
    const matches = findRecipeMatches(query);
    recipeSearchMessage.textContent = matches.length
      ? ""
      : "Try a dish name or one or more ingredients from our sample collection.";
    document.getElementById("recipe-results-heading").textContent = matches.length
      ? matches.length + (matches.length === 1 ? " recipe to try" : " recipes to try")
      : "No local recipes found";
    renderRecipeMatches(matches, query);
    recipeSearchResults.hidden = false;
  }

  function ingredientCost(ingredient, multiplier, servingScale) {
    return ingredient.price * ingredient.quantity * multiplier * servingScale;
  }

  function getAddedCost(meal, basket, multiplier, servingScale, pantryNames) {
    return meal.ingredients.reduce(function (total, ingredient) {
      if (pantryNames && pantryNames.some(function (name) {
        return ingredient.name.toLowerCase().includes(name) || name.includes(ingredient.name.toLowerCase());
      })) return total;
      const current = basket[ingredient.name];
      const alreadyAdded = current ? current.quantity : 0;
      const needed = ingredient.quantity * servingScale;
      return total + Math.max(0, needed - alreadyAdded) * ingredient.price * multiplier;
    }, 0);
  }

  function makeShoppingBasket(meals, preferences) {
    const basket = Object.create(null);
    const servingScale = Math.ceil(preferences.people / 2);
    const pantryNames = preferences.plus
      ? preferences.pantry.toLowerCase().split(",").map(function (name) { return name.trim(); }).filter(Boolean)
      : [];
    meals.forEach(function (meal) {
      meal.ingredients.forEach(function (ingredient) {
        if (pantryNames.some(function (name) {
          return ingredient.name.toLowerCase().includes(name) || name.includes(ingredient.name.toLowerCase());
        })) return;
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
    });
    return basket;
  }

  function priceBasket(basket, store, preferences) {
    const items = Object.keys(basket).map(function (key) {
      const item = basket[key];
      const onDeal = preferences && preferences.plus && preferences.useDeals &&
        store.deals.indexOf(item.name) !== -1;
      const dealFactor = onDeal ? 0.9 : 1;
      item.estimatedCost = Math.round(item.quantity * item.price * store.factor * dealFactor * 100) / 100;
      return item;
    });
    const total = Math.round(items.reduce(function (sum, item) { return sum + item.estimatedCost; }, 0) * 100) / 100;
    return { items: items, total: total };
  }

  function makePlan(preferences) {
    const store = STORES[preferences.storeId];
    const eligible = getEligibleMeals(preferences.diets);
    if (eligible.length === 0) return null;

    const servingScale = Math.ceil(preferences.people / 2);
    const basket = Object.create(null);
    const remaining = eligible.slice();
    const meals = [];
    const pantryNames = preferences.plus
      ? preferences.pantry.toLowerCase().split(",").map(function (name) { return name.trim(); }).filter(Boolean)
      : [];

    while (meals.length < 7) {
      if (remaining.length === 0) remaining.push.apply(remaining, eligible.slice());
      const scored = remaining.map(function (meal) {
        let cost = getAddedCost(meal, basket, store.factor, servingScale, pantryNames);
        if (preferences.plus && preferences.useDeals) {
          const dealCount = meal.ingredients.filter(function (ingredient) {
            return store.deals.indexOf(ingredient.name) !== -1;
          }).length;
          cost *= (1 - Math.min(0.24, dealCount * 0.06));
        }
        return {
          meal: meal,
          cost: cost
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
        if (pantryNames.some(function (name) {
          return ingredient.name.toLowerCase().includes(name) || name.includes(ingredient.name.toLowerCase());
        })) return;
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

    const shopping = priceBasket(makeShoppingBasket(meals, preferences), store, preferences);
    return { meals: meals, items: shopping.items, total: shopping.total, store: store, preferences: preferences };
  }

  function formatQuantity(quantity) {
    return Number.isInteger(quantity) ? String(quantity) : quantity.toFixed(1);
  }

  function renderMeals(plan) {
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    mealList.replaceChildren();

    plan.meals.forEach(function (meal, index) {
      const entry = document.createElement("article");
      entry.className = "meal-entry";
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

      const recipeButton = document.createElement("button");
      recipeButton.type = "button";
      recipeButton.className = "recipe-toggle";
      recipeButton.setAttribute("aria-expanded", "false");
      const recipeId = "recipe-panel-" + index;
      recipeButton.setAttribute("aria-controls", recipeId);
      recipeButton.textContent = "Recipe +";

      const recipePanel = document.createElement("div");
      recipePanel.className = "recipe-panel";
      recipePanel.id = recipeId;
      recipePanel.hidden = true;

      const ingredientsHeading = document.createElement("h5");
      ingredientsHeading.textContent = "Ingredients";
      const ingredients = document.createElement("ul");
      ingredients.className = "recipe-ingredients";
      meal.ingredients.forEach(function (ingredient) {
        const ingredientItem = document.createElement("li");
        ingredientItem.textContent = ingredient.name;
        ingredients.append(ingredientItem);
      });

      const stepsHeading = document.createElement("h5");
      stepsHeading.textContent = "How to make it";
      const steps = document.createElement("ol");
      steps.className = "recipe-steps";
      meal.steps.forEach(function (step) {
        const stepItem = document.createElement("li");
        stepItem.textContent = step;
        steps.append(stepItem);
      });

      const pantryNote = document.createElement("p");
      pantryNote.className = "recipe-note";
      pantryNote.textContent = "Recipes serve two. Oil, salt, and pepper are pantry basics and aren't included in the shopping list.";
      const tutorialLink = document.createElement("a");
      tutorialLink.className = "tutorial-link";
      if (meal.tutorial) {
        tutorialLink.href = meal.tutorial.url;
        tutorialLink.textContent = "Watch: " + meal.tutorial.title + " · " + meal.tutorial.channel + " ↗";
      } else {
        tutorialLink.href = "https://www.youtube.com/results?search_query=" +
          encodeURIComponent(meal.name + " recipe tutorial");
        tutorialLink.textContent = "Find a YouTube tutorial ↗";
      }
      tutorialLink.target = "_blank";
      tutorialLink.rel = "noopener noreferrer";
      tutorialLink.setAttribute("aria-label", "Open YouTube cooking tutorial for " + meal.name);
      recipePanel.append(ingredientsHeading, ingredients, stepsHeading, steps, pantryNote, tutorialLink);

      recipeButton.addEventListener("click", function () {
        recipePanel.hidden = !recipePanel.hidden;
        recipeButton.setAttribute("aria-expanded", String(!recipePanel.hidden));
        recipeButton.textContent = recipePanel.hidden ? "Recipe +" : "Hide −";
      });

      const actions = document.createElement("div");
      actions.className = "meal-actions";
      const swapButton = document.createElement("button");
      swapButton.type = "button";
      swapButton.className = "swap-toggle";
      const alternativesId = "alternatives-panel-" + index;
      swapButton.setAttribute("aria-controls", alternativesId);
      swapButton.setAttribute("aria-expanded", "false");
      const alternatives = getEligibleMeals(plan.preferences.diets).filter(function (alternative) {
        return alternative.name !== meal.name;
      });
      swapButton.disabled = alternatives.length === 0;
      swapButton.textContent = alternatives.length === 0 ? "No swaps" : "Swap +";

      const alternativesPanel = document.createElement("div");
      alternativesPanel.className = "alternatives-panel";
      alternativesPanel.id = alternativesId;
      alternativesPanel.hidden = true;
      if (alternatives.length === 0) {
        const noAlternatives = document.createElement("p");
        noAlternatives.textContent = "No other meals match these dietary preferences.";
        alternativesPanel.append(noAlternatives);
      } else {
        const alternativesHeading = document.createElement("h5");
        alternativesHeading.textContent = "Choose another meal";
        const choices = document.createElement("div");
        choices.className = "alternative-choices";
        alternatives.forEach(function (alternative) {
          const choice = document.createElement("button");
          choice.type = "button";
          choice.className = "alternative-choice";
          choice.textContent = alternative.emoji + " " + alternative.name + " · " + alternative.time + " min";
          choice.addEventListener("click", function () {
            replaceMeal(index, alternative);
          });
          choices.append(choice);
        });
        alternativesPanel.append(alternativesHeading, choices);
      }

      swapButton.addEventListener("click", function () {
        if (swapButton.disabled) return;
        alternativesPanel.hidden = !alternativesPanel.hidden;
        swapButton.setAttribute("aria-expanded", String(!alternativesPanel.hidden));
        swapButton.textContent = alternativesPanel.hidden ? "Swap +" : "Cancel swap";
      });

      actions.append(recipeButton, swapButton);
      article.append(day, illustration, details, time, actions);
      entry.append(article, recipePanel, alternativesPanel);
      mealList.append(entry);
    });
    document.getElementById("menu-count").textContent = plan.meals.length + " dinners";
  }

  function renderShoppingList(plan) {
    shoppingList.replaceChildren();
    const aisles = Array.from(new Set(plan.items.map(function (item) { return item.aisle; })))
      .sort(function (a, b) { return a.localeCompare(b); });
    let itemIndex = 0;

    aisles.forEach(function (aisle) {
      const section = document.createElement("section");
      section.className = "aisle-section";
      const heading = document.createElement("h4");
      heading.textContent = aisle;
      section.append(heading);

      plan.items.filter(function (item) { return item.aisle === aisle; })
        .sort(function (a, b) { return a.name.localeCompare(b.name); })
        .forEach(function (item) {
          const row = document.createElement("div");
          row.className = "shopping-item";
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = "shopping-item-" + itemIndex++;
          checkbox.checked = checkedItems.has(item.name);
          checkbox.addEventListener("change", function () {
            if (checkbox.checked) checkedItems.add(item.name);
            else checkedItems.delete(item.name);
            row.classList.toggle("is-checked", checkbox.checked);
          });
          const name = document.createElement("label");
          name.className = "shopping-item-name";
          name.htmlFor = checkbox.id;
          name.textContent = item.name;
          const quantity = document.createElement("span");
          quantity.className = "shopping-quantity";
          quantity.textContent = formatQuantity(item.quantity) + " " + item.unit;
          const price = document.createElement("span");
          price.className = "shopping-price";
          price.textContent = currency.format(item.estimatedCost);
          const searchLink = document.createElement("a");
          searchLink.className = "shopping-search";
          searchLink.href = "https://www.google.com/search?q=" + encodeURIComponent(
            'site:' + plan.store.searchDomain + ' "' + item.name + '"'
          );
          searchLink.target = "_blank";
          searchLink.rel = "noopener noreferrer";
          searchLink.setAttribute("aria-label", "Search " + item.name + " at " + plan.store.onlineName);
          searchLink.textContent = "Find ↗";
          row.classList.toggle("is-checked", checkbox.checked);
          row.append(checkbox, name, quantity, price, searchLink);
          section.append(row);
        });
      shoppingList.append(section);
    });
  }

  function renderPremiumSummary(plan) {
    const summary = document.getElementById("premium-plan-summary");
    summary.replaceChildren();
    if (!plan.preferences.plus) {
      summary.hidden = true;
      return;
    }

    const goalNames = { maintain: "Maintain", lose: "Weight loss", build: "Muscle building" };
    const dailyCalories = plan.preferences.calories;
    const dailyProtein = plan.preferences.protein;
    const dinnerProtein = Math.round(dailyProtein * 0.35);
    const pantryNames = plan.preferences.pantry.split(",").map(function (name) { return name.trim(); }).filter(Boolean);
    const ingredientNames = plan.meals.flatMap(function (meal) {
      return meal.ingredients.map(function (ingredient) { return ingredient.name; });
    });
    const reusedCount = new Set(ingredientNames.filter(function (name, index) {
      return ingredientNames.indexOf(name) !== index;
    }).map(function (name) { return name.toLowerCase(); })).size;
    const dealCount = plan.items.filter(function (item) {
      return plan.store.deals.indexOf(item.name) !== -1;
    }).length;

    const badges = [
      goalNames[plan.preferences.goal] + " goal",
      dailyCalories + " kcal / day",
      dailyProtein + " g protein / day",
      "~" + dinnerProtein + " g target at dinner",
      reusedCount + " ingredient(s) reused across meals",
      pantryNames.length ? pantryNames.length + " pantry item(s) reused" : "No pantry items entered",
      plan.preferences.useDeals ? dealCount + " deal match(es) this week" : "Weekly deals off"
    ];
    badges.forEach(function (text) {
      const badge = document.createElement("span");
      badge.textContent = text;
      summary.append(badge);
    });
    summary.hidden = false;
  }

  function renderPlan(plan) {
    currentPlan = plan;
    checkedItems = new Set();
    renderMeals(plan);
    renderShoppingList(plan);
    renderPremiumSummary(plan);
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
    storeLink.textContent = plan.store.name === "Sobeys"
      ? "Shop Sobeys on Voilà ↗"
      : "Browse " + plan.store.name + " online ↗";
    document.getElementById("copy-button").textContent = "Copy shopping list ⧉";
    results.hidden = false;
  }

  function replaceMeal(dayIndex, alternative) {
    if (!currentPlan) return;
    const meals = currentPlan.meals.slice();
    meals[dayIndex] = alternative;
    const shopping = priceBasket(makeShoppingBasket(meals, currentPlan.preferences), currentPlan.store, currentPlan.preferences);
    renderPlan({
      meals: meals,
      items: shopping.items,
      total: shopping.total,
      store: currentPlan.store,
      preferences: currentPlan.preferences
    });
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

  recipeSearchForm.addEventListener("submit", submitRecipeSearch);
  form.addEventListener("submit", submitPlan);
  const premiumToggle = document.getElementById("premium-toggle");
  const premiumControls = document.getElementById("premium-controls");
  const subscriptionModal = document.getElementById("subscription-modal");
  const headerSubscription = document.getElementById("header-subscription");
  const subscriptionAccept = document.getElementById("subscription-accept");

  function setPremium(active) {
    premiumControls.hidden = !active;
    premiumToggle.classList.toggle("is-active", active);
    premiumToggle.textContent = active ? "Plus is active ✓" : "Try Plus · $3/week";
    headerSubscription.classList.toggle("is-active", active);
    headerSubscription.innerHTML = active
      ? '<span aria-hidden="true">✦</span> Plus active'
      : '<span aria-hidden="true">✦</span> Subscription';
    subscriptionAccept.textContent = active ? "Keep Plus active" : "Accept $3/week";
    subscriptionAccept.setAttribute("aria-label", active ? "Keep Goodfood Plus active" : "Accept the hypothetical $3 weekly charge");
    try {
      localStorage.setItem("goodfood-plus-preview", active ? "active" : "inactive");
    } catch (error) {
      // The preview still works if browser storage is unavailable.
    }
  }

  let premiumInitiallyActive = false;
  try {
    premiumInitiallyActive = localStorage.getItem("goodfood-plus-preview") === "active";
  } catch (error) {
    premiumInitiallyActive = false;
  }
  setPremium(premiumInitiallyActive);
  premiumToggle.addEventListener("click", function () {
    if (premiumControls.hidden) {
      subscriptionModal.showModal();
    } else {
      setPremium(false);
    }
  });
  headerSubscription.addEventListener("click", function () {
    subscriptionModal.showModal();
  });
  subscriptionAccept.addEventListener("click", function () {
    setPremium(true);
    subscriptionModal.close("accepted");
    document.getElementById("planner").scrollIntoView({ behavior: "smooth", block: "start" });
  });
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
          lines.push("- " + item.name + " — " + formatQuantity(item.quantity) + " " + item.unit +
            " — est. " + currency.format(item.estimatedCost));
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
