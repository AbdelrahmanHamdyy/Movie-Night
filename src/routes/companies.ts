import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult.ts";
import { optionalToken, verifyAuthToken } from "../middlewares/verifyToken.ts";
import companyController from "../controllers/companyController.ts";
import {
  getCompaniesValidator,
  companyIdValidator,
  followCompanyValidator,
  createCompanyValidator,
  updateCompanyValidator,
} from "../validators/companyValidators.ts";

const companyRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company Endpoints
 */

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Returns all companies of Movie-Night (This endpoint is a listing & Token is optional)
 *     tags: [Companies]
 *     parameters:
 *       - in: query
 *         name: skip
 *         description: The number of companies to skip before retrieving from the database
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         description: The amount of companies returned
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: follow
 *         description: This will return only the followed companies of the logged in user if true
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Companies returned successfully
 *         content:
 *           application/json:
 *             schema:
 *                 type: array
 *                 items:
 *                     $ref: '#/components/schemas/Company'
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       500:
 *         description: Internal server error
 */
companyRouter.get(
  "/companies",
  optionalToken,
  getCompaniesValidator,
  validateRequestSchema,
  companyController.getCompanies
);

/**
 * @swagger
 * /company/{id}:
 *   get:
 *     summary: Returns a company details from its id (Optional Token)
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Company ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Company returned successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Company'
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       500:
 *         description: Internal server error
 */
companyRouter.get(
  "/company/:id",
  optionalToken,
  companyIdValidator,
  validateRequestSchema,
  companyController.getCompany
);

/**
 * @swagger
 * /company:
 *   post:
 *     summary: Creates a new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             required:
 *               - name
 *               - photo
 *               - location
 *               - ownerId
 *             properties:
 *               name:
 *                   type: string
 *                   description: Company name
 *               about:
 *                   type: string
 *                   description: Description about the company background
 *               photo:
 *                   type: object
 *                   description: Display picture file
 *               location:
 *                   type: string
 *                   description: Country in which the company resides
 *               ownerId:
 *                   type: number
 *                   description: User ID of the company owner
 *     responses:
 *       201:
 *         description: Company created successfully
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       401:
 *         description: Unauthorized to create a new company
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       500:
 *         description: Internal server error
 *     security:
 *          - bearerAuth: []
 */
companyRouter.post(
  "/company",
  verifyAuthToken,
  createCompanyValidator,
  validateRequestSchema,
  companyController.createCompany
);

/**
 * @swagger
 * /company/{id}:
 *   delete:
 *     summary: Deletes a company from the database
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Company ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Company deleted successfully
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       404:
 *         description: Company not found
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       500:
 *         description: Internal server error
 *     security:
 *          - bearerAuth: []
 */
companyRouter.delete(
  "/company/:id",
  verifyAuthToken,
  companyIdValidator,
  validateRequestSchema,
  companyController.deleteCompany
);

/**
 * @swagger
 * /follow-company:
 *   post:
 *     summary: Allows user to follow or unfollow a company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userId
 *               - companyId
 *               - followed
 *             properties:
 *               userId:
 *                   type: number
 *                   description: User ID
 *               companyId:
 *                   type: number
 *                   description: Company ID to follow
 *               followed:
 *                   type: boolean
 *                   description: True to unfollow and false to follow
 *     responses:
 *       204:
 *         description: Followed/Unfollowed company successfully
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       409:
 *         description: User already follows/unfollows this company
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       500:
 *         description: Internal server error
 *     security:
 *          - bearerAuth: []
 */
companyRouter.post(
  "/follow-company",
  verifyAuthToken,
  followCompanyValidator,
  validateRequestSchema,
  companyController.followCompany
);

/**
 * @swagger
 * /company:
 *   put:
 *     summary: Updates a company details
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             required:
 *                - id
 *             properties:
 *               id:
 *                   type: number
 *                   description: Company ID to be updated
 *               name:
 *                   type: string
 *                   description: New company name (Must be unique)
 *               about:
 *                   type: string
 *                   description: New company about
 *               photo:
 *                   type: object
 *                   description: New company image
 *               location:
 *                   type: string
 *                   description: In case the company relocated
 *               ownerId:
 *                   type: number
 *                   description: Company now has a new owner
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       401:
 *         description: Unauthorized to update a company
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       500:
 *         description: Internal server error
 *     security:
 *          - bearerAuth: []
 */
companyRouter.put(
  "/company",
  verifyAuthToken,
  updateCompanyValidator,
  validateRequestSchema,
  companyController.updateCompany
);

export default companyRouter;
