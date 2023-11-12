import * as geolib from "geolib";
export const checkLocation = (req, res, next) => {
  const { latitude, longitude } = req.body;
  const location = geolib.isPointInPolygon({ latitude, longitude }, [
    { latitude: 33.74473523503865, longitude: 73.12631927783735 },
    { latitude: 33.7446995500366, longitude: 73.14837776393999 },
    { latitude: 33.74330782337598, longitude: 73.15108143052454 },
    { latitude: 33.74505639938887, longitude: 73.15932117630607 },
    { latitude: 33.751086928858435, longitude: 73.16060863658443 },
    { latitude: 33.75187193700088, longitude: 73.13335739402575 },
    { latitude: 33.74473523503865, longitude: 73.12631927783735 },
  ]);
  if (location === true) {
    next();
  } else {
    res.status(401).json({ status: false });
  }
};
