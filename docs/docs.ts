
 
/**
   * @swagger
   * components:
   *     schemas:
   *         User:
   *             type: object
   *             properties:
   *                   email:
   *                      type: string
   *                   password:
   *                      type: string
   *             required:
   *                - email
   *                - password
   *         Arts:
   *             type: object
   *             properties: 
   *                    id:
   *                       type: string
   *                       description: Unique id of the art
   *                       example: 1sfs1f33af33aaaf
   *                    img:
   *                        type: string
   *                    height:
   *                        type: integer
   *                    width:
   *                        type: integer
   *                    Artist:
   *                         type: object
   *                         properties:
   *                                id:
   *                                  type: string
   *                                profilePic: 
   *                                  type: string
   *                    react:
   *                          type: object
   *                          properties:
   *                                  id: 
   *                                    type: string
   *                                  type:
   *                                    type: string
   *                                  artistId:
   *                                    type: string
   *                   
   * 
   */

/**
   * @swagger
   * /getPost:
   *   get:
   *     
   *     summary: Get All Post or Art
   *     description: This end point will return all Post or Art, no autentication is required, nsfw content will block by default
   *     responses:
   *         200:
   *             description: Test the getUser endpoint
   *             content:
   *                 application/json:
   *                        schema:
   *                            type: array
   *                            items:
   *                               $ref: '#/components/schemas/Arts'
   *     
   */


 
 


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login with email and password
 *     description: Using This endpoint will return user credential and access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully created a new post
 *       400:
 *         description: Invalid data provided
 */