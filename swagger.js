/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     tags:
 *       - Authentification - User
 *     summary: API to log in User
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User's login details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               default: cedric@gmail.com
 *             password:
 *               type: string
 *               default: '1234'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Successfully connected
 *               datas:
 *                 user:
 *                   _id: bazdaz56586
 *                   firstname: Rabarijohn
 *                   lastname: Cedric
 *                   email: cedric@gmail.com
 *                   birth_date: '2002-02-02T00:00:00.000Z'
 *                   phone_number: '0345387866'
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Incorrect email or password
 *               datas: null
 *               error:
 *                 code: ERROR_AUTH_USER_DENIED
 *                 message: Authentication failed, user or password is invalid
 */

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     tags:
 *       - Authentification - User
 *     summary: API to register User
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User's registration details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             firstname:
 *               type: string
 *             lastname:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             birth_date:
 *               type: string
 *             phone_number:
 *               type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Registered user successfully
 *               datas:
 *                 _id: adazdaz5as47855da
 *                 firstname: Test
 *                 lastname: lastnameTest
 *                 email: test@gmail.com
 *                 birth_date: '2002-02-02T00:00:00.000Z'
 *                 phone_number: '0345387866'
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: An error occurred while registering user
 *               error:
 *                 code: SOME_ERROR_CODE
 *                 message: Error message
 */

/**
 * @swagger
 * /api/v1/admin/login:
 *   post:
 *     tags:
 *       - Authentification - Admin
 *     summary: API to log in Admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Admin's login details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example: {}
 */
