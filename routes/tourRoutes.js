import express from 'express';
// import {
//   getAllTours,
//   getTour,
//   createTour,
//   updateTour,
//   deleteTour,
//   checkID,
//   checkBody,
// } from '../controllers/tourController.cjs';
import * as tourController from '../controllers/tourController.js';

const { checkBody, getAllTours, getTour, createTour, updateTour, deleteTour, checkID } = tourController;

const router = express.Router();

router.param('id', checkID);

router
  .route('/')
  .get(getAllTours)
  .post(checkBody, createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

export default router;
