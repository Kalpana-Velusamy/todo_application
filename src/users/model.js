import connectDatabase from "../database.js";
import crypto from 'crypto';
import multer from 'multer';
import path from 'path';
//user creation data to query conversion 

export async function addUsers(requestBody) {
  const encryptedPassword = crypto.createHash('md5').update(requestBody.password).digest('hex'); /** encryption for password */
  const query = `
      INSERT INTO todo_users (name, email,password,created_at)
      VALUES ($1, $2, $3,CURRENT_DATE)
      RETURNING *;
    `;
  const values = [requestBody.name, requestBody.email, encryptedPassword];
  await connectDatabase(query, values);
}

// /getUserByEmail

export async function getUserByEmail(email) {
  const query = `
      SELECT * FROM todo_users where email = $1;
    `;
  const values = [email];
  const response = await connectDatabase(query, values);
  //console.log("response from db is ", response)
  if (response.success == false) {
    response.code = 102
    return response;  //{sucess, data}
  } else {
    //console.log("response data length is  ", response.data.length)
    if (response.data.length > 0) {
      //console.log(response)
      return { success: true, code: 100, data: response.data[0] } //{name, mail, password}
    } else {
      return { success: false, code: 101, message: "User not found" } //
    }
  }
}

export async function getUserByID(id) {
  const query = `
      SELECT * FROM todo_users where id = $1;
    `;
  const values = [id];
  const response = await connectDatabase(query, values);
  //console.log("response from db is ", response)
  if (response.success == false) {
    response.code = 102
    return response;  //{sucess, data}
  } else {
    //console.log("response data length is  ", response.data.length)
    if (response.data.length > 0) {
      //console.log(response)
      return { success: true, code: 100, data: response.data[0] } //{name, mail, password}
    } else {
      return { success: false, code: 101, message: "User not found" } //
    }
  }
}

/** User profile data updates  */

export async function profileUpdate(req, res) {
  //let file_name;
  const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  // Check file type
  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
  //upload file call
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  }).single('profiledata');

  upload(req, res, async function (err) {
    //file_name = filename
    if (err) {
      return res.status(400).send({ message: err });
    }
    if (!req.file) {
      return res.status(400).send({ message: 'No file selected' });
    }

    //message: 'Image uploaded successfully',
    const uploaded_file_name = req.file.filename;
    const path = `/uploads/${req.file.filename}`;
    const userId = req.user.id; // Adjust based on your auth setup req.body.created_by = req.user.id
    const query = `
      INSERT INTO user_profile (user_id,filename,filepath)
      VALUES ($1,$2,$3)
      RETURNING *;
    `;
    const values = [userId, uploaded_file_name, path];
    const response = await connectDatabase(query, values);
    if (response.success == false) {
      response.code = 104
      return res.send(response);

    } else {
      //console.log("response data from db is :",response)

      return res.send({
        message: 'Image uploaded and logged successfully',
        uploaded_file_name,
        path: path
      }
      ); //

    }
  });

}

