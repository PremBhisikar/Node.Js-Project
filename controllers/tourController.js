import { readFile, writeFile } from 'fs/promises';

let tours;

export const checkID = async (req, res, next, val) => {
  const filePath = `${__dirname}/../dev-data/data/tours-simple.json`;

  try {
    const fileContent = await readFile(filePath, 'utf-8');
    tours = JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading tours file:', error.message);
    throw error;
  }

  next();
};

export const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

export const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};

export const getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

export const createTour = async (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);

  const filePath = `${__dirname}/../dev-data/data/tours-simple.json`;

  try {
    await writeFile(filePath, JSON.stringify(tours));
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (error) {
    console.error('Error writing tours file:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Error writing to the file'
    });
  }
};

export const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

export const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
