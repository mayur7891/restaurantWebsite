// import jwt from 'jsonwebtoken';

// const auth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
 

//     let decodedData;

//       decodedData = await jwt.verify(token, 'test');

//       req.userId = decodedData?.id;
   

//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ message: 'Authentication failed' });
//   }
// };

// export default auth;
