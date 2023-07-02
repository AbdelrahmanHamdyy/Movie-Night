//@ts-nocheck
import { Company, CompanyData } from "../models/Company.ts";
import ReqError from "../utils/error.ts";

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
 * @returns {Array<CompanyData>} ompanies retrieved from database
 */
export async function indexCompanies(
  userId: number | undefined,
  skip: number,
  limit: number,
  follow: boolean
): Promise<Array<CompanyData>> {
  let companies: CompanyData;
  companies = follow
    ? await companyModel.getFollowedCompanies(userId, skip, limit)
    : await companyModel.index(skip, limit, userId);
  return companies;
}
