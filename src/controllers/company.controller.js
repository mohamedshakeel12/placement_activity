import Company from '../models/Company.js';
import { createError } from '../utils/error.js';

export const createCompany = async (req, res, next) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    next(err);
  }
};

export const getCompanies = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, industry } = req.query;
    
    const query = { isActive: true };
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (industry) {
      query.industry = industry;
    }

    const companies = await Company.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Company.countDocuments(query);

    res.json({
      companies,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (err) {
    next(err);
  }
};

export const getCompanyById = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return next(createError(404, 'Company not found'));
    }
    res.json(company);
  } catch (err) {
    next(err);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!company) {
      return next(createError(404, 'Company not found'));
    }
    res.json(company);
  } catch (err) {
    next(err);
  }
};

export const deleteCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!company) {
      return next(createError(404, 'Company not found'));
    }
    res.json({ message: 'Company deleted successfully' });
  } catch (err) {
    next(err);
  }
}; 