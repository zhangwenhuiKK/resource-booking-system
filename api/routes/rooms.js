const express = require('express')
const moment = require('moment')
const momentTimezone = require('moment-timezone');
const sendMail = require('../helpers/nodemailer')
const Room = require('../models/Room')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

router.get('/rooms', requireJWT, (req, res) => {
  Room.find()
    .then(rooms => {
      res.json(rooms)
    })
    .catch(error => {
      res.json({ error })
    })
})

router.post('/rooms', requireJWT, (req, res) => {
  Room.create(req.body)
    .then(room => {
      res.status(201).json(room)
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})
const localTime = (time) => {
  return momentTimezone.utc(time).tz(process.env.TIME_ZONE);
};
// Function to convert UTC JS Date object to a Moment.js object in UTC
const dateUTC = dateString => {
  return moment.utc(dateString)
}

const notifyCreatorBookingResult = (bookingStart,bookingEnd,email,roomName,isEditing=false)=>{
  const startTime = localTime(bookingStart), endTime = localTime(bookingEnd)
  sendMail({
    subject: `You have ${isEditing? 'updated your reservation of':'reserved'} ${roomName} for ${startTime.format("MMM D, YYYY")}, from ${startTime.format(
      "hh:mma")} to ${endTime.format("hh:mma")}.`,
    email: email,
    content: "Auto sent by the server. Please don't reply to this email."
  })
}

// Function to calculate the duration of the hours between the start and end of the booking
const durationHours = (bookingStart, bookingEnd) => {
  // convert the UTC Date objects to Moment.js objeccts
  let startDateUTC = dateUTC(bookingStart)
  let endDateUTC = dateUTC(bookingEnd)
  // calculate the duration of the difference between the two times
  let difference = moment.duration(endDateUTC.diff(startDateUTC))
  // return the difference in decimal format
  return difference.hours() + difference.minutes() / 60
}

// Make a booking
router.put('/rooms/:id', requireJWT, (req, res) => {
  const { id } = req.params

  // If the recurring array is empty, the booking is not recurring
  if (req.body.recurring.length === 0) {
    Room.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          bookings: {
            ...req.body,
            //Save booking creator's info
            user: req.user,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            // The duration of the booking in decimal format
            duration: durationHours(req.body.bookingStart, req.body.bookingEnd),
          }
        }
      },
      { new: true, runValidators: false, context: 'query' }
    )
      .then(room => {
        res.status(201).json(room)
        //send an email to notify the creator
        notifyCreatorBookingResult(req.body.bookingStart, req.body.bookingEnd,req.user.email,room.name)
      })
      .catch(error => {
        console.log(err)
        res.status(400).json({ error })
      })

    // If the booking is a recurring booking
  }
  //  else {

  //   // The first booking in the recurring booking range
  //   let firstBooking = req.body
  //   firstBooking.user = req.user    
  //   firstBooking.startHour = dateUTC(req.body.bookingStart).format('H.mm')
  //   firstBooking.duration = durationHours(req.body.bookingStart, req.body.bookingEnd)

  //   // An array containing the first booking, to which all additional bookings in the recurring range will be added
  //   let recurringBookings = [ firstBooking ]

  //   // A Moment.js object to track each date in the recurring range, initialised with the first date
  //   let bookingDateTracker = momentTimezone(firstBooking.bookingStart).tz('Europe/Brussels')

  //   // A Moment.js date object for the final booking date in the recurring booking range - set to one hour ahead of the first booking - to calculate the number of days/weeks/months between the first and last bookings when rounded down
  //   let lastBookingDate = momentTimezone(firstBooking.recurring[0]).tz('Europe/Brussels')
  //   lastBookingDate.hour(bookingDateTracker.hour() + 1)

  //   // The number of subsequent bookings in the recurring booking date range 
  //   let bookingsInRange = req.body.recurring[1] === 'daily' ? 
  //                         Math.floor(lastBookingDate.diff(bookingDateTracker, 'days', true)) :
  //                         req.body.recurring[1] === 'weekly' ?
  //                         Math.floor(lastBookingDate.diff(bookingDateTracker, 'weeks', true)) :
  //                         Math.floor(lastBookingDate.diff(bookingDateTracker, 'months', true))

  //   // Set the units which will be added to the bookingDateTracker - days, weeks or months
  //   let units = req.body.recurring[1] === 'daily' ? 'd' : 
  //               req.body.recurring[1] === 'weekly' ? 'w' : 'M'

  //   // Each loop will represent a potential booking in this range 
  //   for (let i = 0; i < bookingsInRange; i++) {

  //     // Add one unit to the booking tracker to get the date of the potential booking
  //     let proposedBookingDateStart = bookingDateTracker.add(1, units)

  //     // Check whether this day is a Sunday (no bookings on Sundays)
  //     if (proposedBookingDateStart.day() !== 0) {

  //       // Create a new booking object based on the first booking 
  //       let newBooking = Object.assign({}, firstBooking)

  //       // Calculate the end date/time of the new booking by adding the number of units to the first booking's end date/time
  //       let firstBookingEndDate = momentTimezone(firstBooking.bookingEnd).tz('Europe/Brussels')
  //       let proposedBookingDateEnd = firstBookingEndDate.add(i + 1, units)

  //       // Update the new booking object's start and end dates
  //       newBooking.bookingStart = proposedBookingDateStart.toDate()
  //       newBooking.bookingEnd = proposedBookingDateEnd.toDate()

  //       // Add the new booking to the recurring booking array
  //       recurringBookings.push(newBooking)
  //     }
  //   }


  //   // Find the relevant room and save the bookings
  //   Room.findByIdAndUpdate(
  //     id,
  //     {
  //       $push: {
  //         bookings: {
  //           $each:
  //           recurringBookings
  //         }
  //       }
  //     },
  //     { new: true, runValidators: true, context: 'query' }
  //   )
  //     .then(room => {
  //       res.status(201).json(room)
  //     })
  //     .catch(error => {
  //       res.status(400).json({ error })
  //     })
  // }
})

// Delete a booking
router.delete('/rooms/:id/:bookingId', requireJWT, (req, res) => {
  const { id } = req.params
  const { bookingId } = req.params
  Room.findByIdAndUpdate(
    id,
    { $pull: { bookings: { _id: bookingId } } },
    { new: true }
  )
    .then(room => {
      res.status(201).json(room)
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})

//Edit a booking
router.put('/rooms/edit/:id/:bookingId', requireJWT, (req, res) => {
  const { id, bookingId } = req.params
  Room.findOneAndUpdate(
    { _id: id, 'bookings._id': bookingId },
    {
      $set: {
        'bookings.$.bookingStart': req.body.bookingStart,
        'bookings.$.bookingEnd': req.body.bookingEnd,
        // 'bookings.$.startHour': dateUTC(req.body.bookingStart).format('H.mm'),
        'bookings.$.duration': durationHours(req.body.bookingStart, req.body.bookingEnd,true),
        'bookings.$.recurring': req.body.recurring,
        'bookings.$.group': req.body.group,
        'bookings.$.purpose': req.body.purpose,
        'bookings.$.roomId': req.body.roomId,
        'bookings.$.params': req.body.params
      }
    },
    { new: true })
    .then(room => {
      console.log('Successfuly updated your booking')
      res.status(201).json(room)
      notifyCreatorBookingResult(req.body.bookingStart, req.body.bookingEnd,req.user.email,room.name)
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})
module.exports = router
