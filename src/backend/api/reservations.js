const express = require("express");
const { on } = require("../database");
const router = express.Router();
const knex = require("../database");


router.get("/", async (request, response) => {
    try {
        const reservations = await knex("reservations");
        response.json(reservations);
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error." });
    }
})

router.post("/", async (request, response) => {
    try {
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
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error." });
    }
})


router.get("/:id", async (request, response) => {
    try {
        const reservationId = request.params.id;
        if (isNaN(reservationId)) {
            response.status(400).json({ error: "Reservation Id must be an integer" })
            return
        }
        const reservationWithId = await knex("reservations")
            .where("reservations.id", "=", reservationId)
        response.json(reservationWithId);
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error." });
    }
})

router.put("/:id", async (request, response) => {
    try {
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
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error." });
    }
});

router.delete("/:id", async (request, response) => {
    try {
        const reservationId = parseInt(request.params.id);
        if (isNaN(reservationId)) {
            response.status(400).json({ error: "Reservation Id must be an integer" })
            return
        }
        const deleteReservation = await knex('reservations')
            .where({ id: reservationId })
            .del()

        response.json(deleteReservation)
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error." });
    }
});


module.exports = router;
