/**
 * @swagger
 * /parent:
 *  get:
 *      description: Get all Parent from class_room db
 *      responses:
 *          200:
 *            description: success
 */

/**
 * @swagger
 * /parent/:id:
 *  get:
 *      description: Get one Parent_id from class_room db
 *      responses:
 *          200:
 *            description: success
 */

 /**
  * @swagger
  * /books:
  *  post:
  *      description: Create a new book
  *      parameters:
  *      - name: title
  *        description: title of the book
  *        in: formData
  *        required: true
  *        type: string       
  *      responses:
  *          201:
  *            description: Created
  */