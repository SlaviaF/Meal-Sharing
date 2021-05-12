const express = require("express");
const { on } = require("../database");
const router = express.Router();
const knex = require("../database");


router.get("/", async (request, response) => {
    const reservations = await knex("reservations");
    response.json(reservations);
})

router.post("/", async (request, response) => {

    const insertedReservations = await knex("reservations")
        .insert({
            number_of_guests: request.body.number_of_guests,
            created_date: request.body.created_date,
            contact_phonenumber: request.body.contact_phonenumber,
            contact_name: request.body.contact_name,
            contact_email: request.body.contact_email,
            meal_id: request.body.meal_id,
        })
    response.json(insertedReservations)

})


router.get("/:id", async (request, response) => {
    const reservationId = request.params.id;
    if (isNaN(reservationId)) {
        response.status(400).json({ error: "Reservation Id must be an integer" })
        return
    }
    const reservationWithId = await knex("reservations")
        .where("reservations.id", "=", reservationId)
    response.json(reservationWithId);
})

router.put("/:id", async (request, response) => {
    const reservationsId = parseInt(request.params.id);
    if (isNaN(reservationsId)) {
        response.status(400).json({ error: "Reservation Id must be an integer" })
        return
    }
    const updateReservation = await knex('reservations').where({ id: reservationsId })
        .update({
            number_of_guests: request.body.number_of_guests,
            created_date: request.body.created_date,
            contact_phonenumber: request.body.contact_phonenumber,
            contact_name: request.body.contact_name,
            contact_email: request.body.contact_email,
            meal_id: request.body.meal_id,
        })
    response.json(updateReservation);
});

router.delete("/:id", async (request, response) => {
    const reservationId = parseInt(request.params.id);
    if (isNaN(reservationId)) {
        response.status(400).json({ error: "Reservation Id must be an integer" })
        return
    }
    const deleteReservation = await knex('reservations')
        .where({ id: reservationId })
        .del()

    response.json(deleteReservation)
});


module.exports = router;
