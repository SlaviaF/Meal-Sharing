const express = require("express");
const { on } = require("../database");
const router = express.Router();
const knex = require("../database");


router.get("/", async (request, response) => {
    const reviews = await knex("reviews");
    response.json(reviews);
})

router.post("/", async (request, response) => {

    const insertedReviews = await knex("reviews")
        .insert({
            title: request.body.title,
            description: request.body.description,
            meal_id: request.body.meal_id,
            stars: request.body.stars,
            created_date: request.body.created_date,
        })
    response.json(insertedReviews);

})

router.get("/:id", async (request, response) => {
    const reviewsId = request.params.id;
    if (isNaN(reviewsId)) {
        response.status(400).json({ error: "Reviews Id must be an integer" })
        return
    }
    const reviewWithId = await knex("reviews")
        .where("reviews.id", "=", reviewsId)
    response.json(reviewWithId);
})

router.put("/:id", async (request, response) => {
    const reviewsId = parseInt(request.params.id);
    if (isNaN(reviewsId)) {
        response.status(400).json({ error: "Review Id must be an integer" })
        return
    }
    const updateReview = await knex('reviews').where({ id: reviewsId })
        .update({
            title: request.body.title,
            description: request.body.description,
            meal_id: request.body.meal_id,
            stars: request.body.stars,
            created_date: request.body.created_date,
        })
    response.json(updateReview);
});

router.delete("/:id", async (request, response) => {
    const reviewsId = parseInt(request.params.id);
    if (isNaN(reviewsId)) {
        response.status(400).json({ error: "Review Id must be an integer" })
        return
    }
    const deleteReview = await knex('reviews')
        .where({ id: reviewsId })
        .del()

    response.json(deleteReview);
});


module.exports = router;