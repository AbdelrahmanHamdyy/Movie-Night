//@ts-nocheck
import { Company, CompanyData } from "../models/Company.ts";
import { checkUserById } from "./userServices.ts";
import ReqError from "../utils/error.ts";
import { Request } from "express";
import { deleteFile } from "../utils/files.ts";

const companyModel = new Company();

/**
 * This function returns all companies in the database according
 * to a certain limit and skip count. If the follow parameter is set to true
 * then we only return the companies that the user follows
 *
 * @param {Number} userId Logged In User
 * @param {Number} skip Number of companies to skip
 * @param {Number} limit Number of companies to return
 * @param {boolean} follow True if only followed companies are to be returned, else false
 * @returns {Array<CompanyData>} companies retrieved from database
 */
export async function indexCompanies(
  userId: number | undefined,
  skip: number,
  limit: number,
  follow: boolean
): Promise<Array<CompanyData>> {
  const companies = follow
    ? await companyModel.getFollowedCompanies(userId, skip, limit)
    : await companyModel.index(skip, limit, userId);
  return companies;
}

/**
 * This function creates a new company from the request body parameters by
 * calling the database function in the model class after verifying that the
 * name given in the body isn't already taken and that the display photo was
 * sent.
 *
 * @param {Request["body"]} reqBody Contents of the request body
 * @param {Request["files"]} reqFiles Files sent with the request
 * @returns {Number} Company ID of the newly created company
 */
export async function createNewCompany(
  reqBody: Request["body"],
  reqFiles: Request["files"]
): Promise<Number> {
  let errMsg: string | null = null;
  const uniqueName = await companyModel.checkUniqueName(reqBody.name);
  if (!uniqueName)
    errMsg = `This company name (${reqBody.name}) already exists!`;
  if (!reqFiles || !reqFiles?.photo) errMsg = "Company photo not found";
  if (errMsg) {
    reqFiles?.photo && deleteFile(reqFiles?.photo[0].path);
    const error = new ReqError(errMsg);
    error.statusCode = 400;
    throw error;
  }
  const companyId = await companyModel.create({
    name: reqBody.name,
    about: reqBody.about,
    photo_url: reqFiles?.photo[0].path,
    location: reqBody.location,
    owner_id: reqBody.ownerId,
  });
  return companyId;
}

/**
 * This function takes a company id and checks if it's found in the database
 * or may have been deleted, then throws an error with a proper message
 *
 * @param {number} id Company ID
 * @returns {CompanyData} The company object found
 */
export async function checkCompanyById(id: number): Promise<CompanyData> {
  const company = await companyModel.getCompanyById(id);
  if (!company || company.deleted_at) {
    const error = new ReqError("Incorrect Company ID");
    error.statusCode = 400;
    throw error;
  }
  return company;
}

/**
 *
 *
 * @param {number} userId User ID
 * @param {number} companyId Company ID
 * @param {boolean} followed Indicates whether the user follows this company or not
 * @returns {string} Response message
 */
export async function manageFollowingCompany(
  userId: number,
  companyId: number,
  followed: boolean
): Promise<string> {
  const verifyFollowed: boolean = await companyModel.checkFollowedCompany(
    userId,
    companyId
  );
  if (followed !== verifyFollowed) {
    const error = new ReqError("Incorrect following status");
    error.statusCode = 400;
    throw error;
  }
  if (followed && verifyFollowed) {
    await companyModel.unfollow(userId, companyId);
    return "Unfollowed Company Successfully!";
  } else {
    await companyModel.follow(userId, companyId);
    return "Followed Company Successfully!";
  }
}

/**
 * This function updates the company attributes with new values
 * obtained from the request body as well as setting a new display
 * picture in case it's available in the request files
 *
 * @param {CompanyData} company The company object
 * @param {Request["body"]} body Request body containing the new company details
 * @param {Request["files"]} files Request files containing new brand image
 * @returns {void}
 */
export async function editCompany(
  company: CompanyData,
  body: Request["body"],
  files: Request["files"]
): Promise<void> {
  if (body.name) {
    const uniqueName: boolean = await companyModel.checkUniqueName(body.name);
    if (!uniqueName) {
      const error = new ReqError("This company name already exists!");
      error.statusCode = 400;
      throw error;
    }
    company.name = body.name;
  }
  if (body.ownerId) {
    await checkUserById(body.ownerId);
    company.owner_id = body.ownerId;
  }
  if (files?.photo) {
    deleteFile(company.photo_url);
    company.photo_url = files.photo[0].path;
  }
  company.about = body.about ?? company.about;
  company.location = body.location ?? company.location;

  await companyModel.update(company);
}
