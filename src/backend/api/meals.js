const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {

  if ("maxPrice" in request.query) {
    const maxPrice = parseFloat(request.query.maxPrice)
    if (isNaN(maxPrice)) {
      response.status(400).json({ error: "maxPrice must be an integer" })
      return
    }
    const MaxPriceMeals = await knex('meals')
      .where("price", "<=", maxPrice)
    response.json(MaxPriceMeals);
    return
  }
  else if ("title" in request.query) {
    const title = request.query.title.toLowerCase();
    const matchTitle = await knex("meals")
      .where("meals.title", "like", "%" + title + "%");
    response.json(matchTitle);
  }

  else if ("createdAfter" in request.query) {
    const createdAfter = new Date(request.query.createdAfter);
    if (!createdAfter.getDate()) {
      response.status(400).json({ error: "createdAfter should a valid date" })
    }
    const concertDate = await knex("meals").
      where("created_date", ">=", createdAfter)
    response.json(concertDate)
  }

  else if ("limit" in request.query) {
    const limit = request.query.limit
    console.log(limit);
    const limitedMeals = await knex("meals").limit(limit)
    response.json(limitedMeals);
  }
/*  else if ("availableReservations" in request.query) {
    const availableReservations = request.query.availableReservations;
    if (availableReservations == "true") {

      const mealswithAvailableReservation = await knex("meals")
        .select("meals.id", "meals.title", "meals.max_reservations ")
        .sum({ total_reserved: 'reservations.number_of_guests' })
        .leftJoin("reservations", "meals.id", "reservations.meal_id")
        .groupBy("meals.title")
        .having("meals.max_reservations", ">", "total_reserved")
      response.json(mealswithAvailableReservation)
      return
    }
  }*/
  else if ("availableReservations" in request.query) {
      let availableReservations =
        request.query.availableReservations == "true";
      if (availableReservations) {
        filteredMeals = await knex("meals")
        let availableMeal = await knex
          .raw(
            `
    SELECT 
    COALESCE(SUM(reservations.number_of_guests), 0) AS total_reservations,
    meals.max_reservations,
    meals.title,
    meals.id
FROM
    meals
        LEFT JOIN
    reservations ON reservations.meals_id = meals.id
GROUP BY meals.id
HAVING max_reservations > total_reservations;
    
    `
          )
          .then((res) => response.send(res[0]));
        return;
        response.json(availableMeal);
      }
  }

    



    else {
      const meals = await knex("meals")
      response.json(meals);
    }



});

router.get("/:id", async (request, response) => {
  try {
    const mealID = parseInt(request.params.id);
    if (isNaN(mealID)) {
      response.status(400).json({ error: "MealId must be an integer" })
      return;
    }
    const mealWithId = await knex('meals')
      .where("meals.id", "=", mealID)
    response.json(mealWithId);

  } catch (error) {
    response.status(500).send({ error: "Internal Server Error." });
  }
});

router.post("/", async (request, response) => {
  try {
   console.log(request.body)
    const insertedMeal = await knex("meals")
      .insert({
        title: request.body.title,
        description: request.body.description,
        location: request.body.location,
        event_day: request.body.event_day,
        max_reservations: request.body.max_reservations,
        price: request.body.price,
        created_date: request.body.created_date
      })
    response.json(insertedMeal)
    } catch (error) {
    response.status(500).send({ error: "Internal Server Error." });
    }
  });
router.put("/:id", async (request, response) => {
  try {
    const mealId = parseInt(request.params.id);
    const updateMeal = await knex('meals').where({ id: mealId })
      .update({
        title: request.body.title,
        description: request.body.description,
        location: request.body.location,
        event_day: request.body.event_day,
        max_reservations: request.body.max_reservations,
        price: request.body.price,
        created_date: request.body.created_date
      })
    response.json(updateMeal);
  } catch (error) {
    response.status(500).send({ error: "Internal Server Error." });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const mealId = parseInt(request.params.id);
    const deleteMeal = await knex('meals')
      .delete()
      .where({ id: mealId });
  } catch (error) {
    response.status(500).send({ error: "Internal Server Error." });
  }
});


module.exports = router;
